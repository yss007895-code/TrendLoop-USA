import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { guides } from '@/lib/guides-data';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import GuideCard from '@/components/GuideCard';
import NewsletterCTA from '@/components/NewsletterCTA';
import TrendingProducts from '@/components/TrendingProducts';
import ShopByCategory from '@/components/ShopByCategory';
import AdUnit from '@/components/AdUnit';

export default function HomePage() {
  const deepDives = guides.slice(0, 3);

  const categoryPills = [
    { label: 'Viral Finds', href: '/shop' },
    { label: 'Tech', href: '/guides/best-tech-under-50-2026' },
    { label: 'Room Aesthetic', href: '/guides/gen-z-room-aesthetic-budget-2026' },
    { label: 'Style', href: '/guides' },
  ];

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      'https://www.pinterest.com/trendloopusa/',
      'https://twitter.com/trendloopusa',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@trendloopusa.net',
      contactType: 'customer service',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is TrendLoop USA?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'TrendLoop USA is a Gen Z trend platform that curates viral products, aesthetic room finds, budget tech, and style picks from Amazon — all under $50.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are the products really under $30?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Our Budget Picks section features hand-picked Gen Z fashion and lifestyle products all priced under $30. We update our picks weekly based on trending Amazon finds.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you choose viral products?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our editors track trending products across social platforms and curate the ones that are genuinely useful, affordable, and worth the hype. We only feature products with strong reviews.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div>
        {/* Hero — Full width black background */}
        <section className="-mx-4 sm:-mx-6 lg:-mx-8 bg-[#111111] px-4 sm:px-6 lg:px-8 py-20 mb-12">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-display text-[3.5rem] sm:text-[5rem] font-black leading-none text-white uppercase" style={{ letterSpacing: '-0.03em' }}>
              TRENDLOOP
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 mt-4 max-w-xl font-body">
              Viral finds, budget tech, aesthetic room picks, and Gen Z fashion — all under $50.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link href="/shop" className="bg-accent text-white font-display font-bold px-8 py-3.5 text-sm uppercase tracking-wide hover:bg-white hover:text-[#111111] transition-colors text-center">
                Shop Viral Finds
              </Link>
              <Link href="/guides" className="border-2 border-white text-white font-display font-bold px-8 py-3.5 text-sm uppercase tracking-wide hover:bg-white hover:text-[#111111] transition-colors text-center">
                Browse Guides
              </Link>
            </div>
          </div>
        </section>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categoryPills.map(pill => (
            <Link
              key={pill.label}
              href={pill.href}
              className="px-5 py-2 bg-surface text-[#111111] font-display font-bold text-sm uppercase tracking-wide hover:bg-[#111111] hover:text-white transition-colors"
            >
              {pill.label}
            </Link>
          ))}
        </div>

        {/* Ad */}
        <AdUnit slot="8863913673" format="horizontal" className="mb-8" />

        {/* Trending Products */}
        <TrendingProducts />

        {/* Deep Dives — Numbered guides */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-black text-[#111111] uppercase tracking-tight">
              DEEP DIVES
              <span className="block h-1 w-16 bg-accent mt-2" />
            </h2>
            <Link href="/guides" className="text-sm font-display font-bold uppercase tracking-wide text-[#111111] hover:text-accent transition-colors">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deepDives.map((g, i) => <GuideCard key={g.slug} guide={g} index={i} />)}
          </div>
        </section>

        {/* Ad */}
        <AdUnit slot="8863913673" format="horizontal" className="mb-8" />

        {/* Shop by Category */}
        <ShopByCategory />

        {/* Newsletter */}
        <section className="mb-20">
          <NewsletterCTA />
        </section>
      </div>
    </>
  );
}
