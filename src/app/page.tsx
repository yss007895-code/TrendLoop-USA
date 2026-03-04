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
    { label: 'Trending Now', href: '/guides' },
    { label: 'Home & Living', href: '/guides/best-standing-desks-2026' },
    { label: 'Health & Wellness', href: '/guides/top-fitness-trackers-2026' },
    { label: 'Outdoor', href: '/guides/camping-essentials-guide-2026' },
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
          text: 'TrendLoop USA is a product discovery platform that tests and reviews trending products across categories like kitchen gadgets, home office, health & wellness, and outdoor gear.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does TrendLoop USA test products?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our editorial team tests products in real-world conditions over extended periods. We use standardized testing methodologies, compare products against direct competitors, and provide honest assessments with detailed pros and cons.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does TrendLoop USA earn affiliate commissions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Some links on our site are affiliate links (primarily Amazon Associates), meaning we may earn a small commission when you make a purchase. This never influences our editorial recommendations. See our full disclaimer for details.',
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
        {/* Hero -- Coral warm theme */}
        <section className="-mx-6 px-6 bg-coral-500 py-20 mb-12">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
              Trending products,
              <br />
              <span className="text-coral-100">honestly reviewed.</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mt-4 max-w-xl font-body">
              We test the products everyone is talking about -- so you know what is actually worth your money.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link href="/guides" className="bg-white text-coral-600 font-display font-bold px-8 py-3.5 text-sm rounded-lg hover:bg-coral-50 transition-colors text-center">
                Explore What&apos;s Trending
              </Link>
              <Link href="/about" className="bg-coral-600 text-white font-display font-bold px-8 py-3.5 text-sm rounded-lg border-2 border-coral-400 hover:bg-coral-700 transition-colors text-center">
                How We Test
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
              className="px-5 py-2 bg-surface-muted text-gray-600 font-display font-semibold text-sm rounded-full hover:bg-coral-50 hover:text-coral-600 transition-colors border border-surface-border"
            >
              {pill.label}
            </Link>
          ))}
        </div>

        {/* Ad */}
        <AdUnit slot="8863913673" format="horizontal" className="mb-8" />

        {/* Trending Products */}
        <TrendingProducts />

        {/* Deep Dives -- Guide cards */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
              Deep Dives
              <span className="block h-1 w-16 bg-coral-500 mt-2 rounded-full" />
            </h2>
            <Link href="/guides" className="text-sm font-display font-semibold text-gray-400 hover:text-coral-500 transition-colors">
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
