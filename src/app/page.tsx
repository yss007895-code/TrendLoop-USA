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
  const editorPicks = guides.slice(0, 3);

  const trendingPins = [
    { title: 'Top TikTok Viral Products 2026', image: '/images/guides/old-money-aesthetic-on-a-budget-2026-hero.jpg', url: '/guides/viral-tiktok-products-2026' },
    { title: 'Gen Z Room Aesthetic on a Budget', image: '/images/guides/spring-2026-luxury-fashion-trends-quiet-power-dressing-1.jpg', url: '/guides/gen-z-room-aesthetic-budget-2026' },
    { title: 'Best Tech Under $50', image: '/images/guides/spring-2026-luxury-fashion-trends-quiet-power-dressing-2.jpg', url: '/guides/best-tech-under-50-2026' },
    { title: 'Budget Fashion Under $30', image: '/images/guides/spring-2026-luxury-fashion-trends-quiet-power-dressing-3.jpg', url: '/guides/budget-fashion-under-30-2026' },
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
        {/* Hero — Gen Z editorial style */}
        <section className="pt-16 pb-20">
          <p className="text-sm text-blue-500 font-mono tracking-wide uppercase mb-4">
            Trending Now
          </p>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5 text-gray-900">
            Trending now.{' '}
            <span className="font-display italic text-gray-400">Curated for you.</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-lg mb-8 leading-relaxed">
            Viral finds, budget tech, aesthetic room picks, and Gen Z fashion —
            all under $50 and shipping from Amazon.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/shop" className="btn-primary text-center">Shop Viral Finds</Link>
            <Link href="/guides" className="btn-secondary text-center">Browse Trend Guides</Link>
          </div>
        </section>

        {/* Ad banner between hero and products */}
        <AdUnit slot="8863913673" format="horizontal" className="mb-4" />

        {/* Trending Products */}
        <TrendingProducts />

        {/* Editor Picks — Top 3 guides */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="section-title">Trending Guides</h2>
              <p className="text-sm text-gray-400 mt-1">This week&apos;s most popular picks</p>
            </div>
            <Link href="/guides" className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">View all</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {editorPicks.map(g => <GuideCard key={g.slug} guide={g} />)}
          </div>
        </section>

        {/* Ad banner between guides and shop */}
        <AdUnit slot="8863913673" format="horizontal" className="mb-4" />

        {/* Shop by Category */}
        <ShopByCategory />

        {/* Newsletter */}
        <section className="mb-20">
          <NewsletterCTA />
        </section>

        {/* Trending Gallery — 4 guides */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="section-title">What&apos;s Hot Right Now</h2>
              <p className="text-sm text-gray-400 mt-1">Our most popular guides this week</p>
            </div>
            <Link href="/guides" className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">
              See all
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {trendingPins.map((pin, i) => (
              <Link key={i} href={pin.url} className="group relative rounded-xl overflow-hidden aspect-[2/3] block">
                <SafeImage
                  src={pin.image}
                  alt={pin.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-display font-bold text-white text-sm leading-tight">
                    {pin.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
