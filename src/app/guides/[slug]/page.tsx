import Link from 'next/link';
import type { Metadata } from 'next';
import { guides, getGuideBySlug, getRelatedGuides } from '@/lib/guides-data';
import type { AffiliateProduct, GuideSection } from '@/lib/guides-data';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import SafeImage from '@/components/SafeImage';
import GuideCard from '@/components/GuideCard';
import ShareButtons from '@/components/ShareButtons';
import AdUnit from '@/components/AdUnit';
import { notFound } from 'next/navigation';

// --------------- Static params ---------------

export function generateStaticParams() {
  return guides.map(g => ({ slug: g.slug }));
}

// --------------- Metadata ---------------

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = getGuideBySlug(params.slug);
  if (!guide) {
    return { title: 'Guide Not Found' };
  }

  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `${SITE_URL}/guides/${guide.slug}` },
    openGraph: {
      title: `${guide.title} | ${SITE_NAME}`,
      description: guide.description,
      url: `${SITE_URL}/guides/${guide.slug}`,
      type: 'article',
      publishedTime: guide.date,
      images: guide.image ? [{ url: guide.image, width: 1200, height: 630, alt: guide.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
      site: '@trendloopusa',
      creator: '@trendloopusa',
    },
  };
}

// --------------- Helpers ---------------

function RatingStars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < full ? 'text-coral-500' : i === full && half ? 'text-coral-300' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm font-semibold text-gray-700 ml-1">{rating}</span>
    </div>
  );
}

function ProductComparisonTable({ products }: { products: AffiliateProduct[] }) {
  return (
    <div className="overflow-x-auto mb-10">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-coral-50">
            <th className="text-left px-4 py-3 font-display font-bold text-gray-900">Product</th>
            <th className="text-left px-4 py-3 font-display font-bold text-gray-900">Brand</th>
            <th className="text-left px-4 py-3 font-display font-bold text-gray-900">Price</th>
            <th className="text-left px-4 py-3 font-display font-bold text-gray-900">Rating</th>
            <th className="text-left px-4 py-3 font-display font-bold text-gray-900">Best For</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={i} className="border-b border-surface-border hover:bg-surface-light transition-colors">
              <td className="px-4 py-3 font-medium text-gray-800">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="text-coral-600 hover:text-coral-700 underline underline-offset-2"
                >
                  {p.name}
                </a>
              </td>
              <td className="px-4 py-3 text-gray-600">{p.brand}</td>
              <td className="px-4 py-3 font-mono font-semibold text-gray-800">{p.price}</td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-coral-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold text-gray-700">{p.rating}</span>
                </span>
              </td>
              <td className="px-4 py-3 text-gray-600">{p.badge || '--'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProductDetailCard({ product }: { product: AffiliateProduct }) {
  return (
    <div className="bg-white border border-surface-border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      {product.image && (
        <div className="relative aspect-[16/10] bg-surface-light">
          <SafeImage
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-coral-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {product.badge}
            </span>
          )}
        </div>
      )}
      <div className="p-5">
        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">{product.brand}</p>
        <h4 className="font-display font-bold text-gray-900 text-lg mt-1">{product.name}</h4>

        <div className="flex items-center justify-between mt-3">
          <span className="font-mono font-bold text-coral-600 text-lg">{product.price}</span>
          <RatingStars rating={product.rating} />
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2">Pros</p>
            <ul className="space-y-1">
              {product.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold text-red-700 uppercase tracking-wider mb-2">Cons</p>
            <ul className="space-y-1">
              {product.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer nofollow sponsored"
          className="mt-5 block w-full text-center bg-coral-500 hover:bg-coral-600 text-white font-display font-bold py-3 rounded-lg transition-colors text-sm"
        >
          Check Price on Amazon
        </a>
      </div>
    </div>
  );
}

function TableOfContents({ sections }: { sections: GuideSection[] }) {
  return (
    <nav className="bg-surface-light border border-surface-border rounded-xl p-5 mb-8" aria-label="Table of contents">
      <h2 className="font-display font-bold text-gray-900 text-sm uppercase tracking-wider mb-3">In This Guide</h2>
      <ol className="space-y-2">
        {sections.map((s, i) => (
          <li key={i}>
            <a
              href={`#section-${i}`}
              className="flex items-start gap-2 text-sm text-gray-600 hover:text-coral-500 transition-colors"
            >
              <span className="font-mono text-coral-400 text-xs mt-0.5">{String(i + 1).padStart(2, '0')}</span>
              {s.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function AffiliateDisclosureBanner() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
      <p className="text-xs text-amber-800 leading-relaxed">
        <strong>Affiliate Disclosure:</strong> This guide contains affiliate links. If you purchase a product through our links, TrendLoop USA may earn a small commission at no additional cost to you. This helps support our testing and editorial work. We only recommend products we have personally tested and believe in.{' '}
        <Link href="/disclaimer" className="underline hover:text-amber-900">Read our full disclaimer</Link>.
      </p>
    </div>
  );
}

// --------------- Page ---------------

export default function GuideDetailPage({ params }: { params: { slug: string } }) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) notFound();

  const related = getRelatedGuides(params.slug, 3);
  const pageUrl = `${SITE_URL}/guides/${guide.slug}`;

  // JSON-LD: Article
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    datePublished: guide.date,
    dateModified: guide.date,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: pageUrl,
    image: guide.image ? `${SITE_URL}${guide.image}` : undefined,
  };

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guides` },
      { '@type': 'ListItem', position: 3, name: guide.title, item: pageUrl },
    ],
  };

  // JSON-LD: Product (aggregate for comparison)
  const productJsonLd = guide.affiliateProducts.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: guide.title,
    numberOfItems: guide.affiliateProducts.length,
    itemListElement: guide.affiliateProducts.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        brand: { '@type': 'Brand', name: p.brand },
        description: p.pros.join('. '),
        review: {
          '@type': 'Review',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: p.rating,
            bestRating: 5,
          },
          author: { '@type': 'Organization', name: SITE_NAME },
        },
        offers: {
          '@type': 'Offer',
          url: p.url,
          priceCurrency: 'USD',
          price: p.price.replace(/[^0-9.]/g, ''),
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {productJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      )}

      <article className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 pt-4">
          <ol className="flex items-center gap-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-coral-500 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/guides" className="hover:text-coral-500 transition-colors">Guides</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-600 font-medium truncate max-w-[200px]">{guide.title}</li>
          </ol>
        </nav>

        {/* Hero */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-coral-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {guide.tag}
            </span>
            <span className="text-sm text-gray-400">{guide.readTime}</span>
            <span className="text-sm text-gray-400">{guide.date}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-gray-900 leading-tight">
            {guide.title}
          </h1>
          <p className="text-lg text-gray-500 mt-3 leading-relaxed">{guide.description}</p>
        </header>

        {/* Hero Image */}
        {guide.image && (
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8 bg-surface-light">
            <SafeImage
              src={guide.image}
              alt={guide.title}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Ad - Top */}
        <AdUnit slot="8863913673" format="horizontal" className="mb-8" />

        {/* Affiliate Disclosure */}
        <AffiliateDisclosureBanner />

        {/* Table of Contents */}
        <TableOfContents sections={guide.sections} />

        {/* Product Comparison Table */}
        {guide.affiliateProducts.length > 0 && (
          <section className="mb-10">
            <h2 className="font-display text-xl font-bold text-gray-900 mb-4">Quick Comparison</h2>
            <ProductComparisonTable products={guide.affiliateProducts} />
          </section>
        )}

        {/* Article Sections */}
        <div className="prose-style">
          {guide.sections.map((section, i) => (
            <section key={i} id={`section-${i}`} className="mb-8 scroll-mt-20">
              <h2>{section.heading}</h2>
              <div dangerouslySetInnerHTML={{ __html: section.content }} />

              {/* Insert a product card after the 2nd section */}
              {i === 1 && guide.affiliateProducts[0] && (
                <div className="my-8">
                  <ProductDetailCard product={guide.affiliateProducts[0]} />
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Mid-article Ad */}
        <AdUnit slot="8863913673" format="horizontal" className="my-10" />

        {/* All Product Cards */}
        {guide.affiliateProducts.length > 0 && (
          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
              Products Featured in This Guide
              <span className="block h-1 w-16 bg-coral-500 mt-2 rounded-full" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guide.affiliateProducts.map((p, i) => (
                <ProductDetailCard key={i} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Affiliate Disclosure */}
        <AffiliateDisclosureBanner />

        {/* Share */}
        <div className="border-t border-surface-border pt-8 mb-12">
          <p className="text-center text-sm text-gray-500 mb-4 font-display font-medium">
            Found this helpful? Share it with friends.
          </p>
          <ShareButtons
            url={pageUrl}
            title={guide.title}
            image={guide.image ? `${SITE_URL}${guide.image}` : undefined}
          />
        </div>

        {/* Related Guides */}
        {related.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
              Related Guides
              <span className="block h-1 w-16 bg-coral-500 mt-2 rounded-full" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((g, i) => (
                <GuideCard key={g.slug} guide={g} index={i} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
