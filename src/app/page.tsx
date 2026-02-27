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

  const pinterestPins = [
    { title: 'Capsule Wardrobe Guide 2026', image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400&h=600&fit=crop', url: '/guides/capsule-wardrobe-working-women-2026' },
    { title: 'Casual Outfits That Look Expensive', image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&h=600&fit=crop', url: '/guides/casual-outfits-look-expensive' },
    { title: 'First Date Outfits', image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=400&h=600&fit=crop', url: '/guides/first-date-outfits-every-vibe' },
    { title: 'Spring Fashion Trends', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop', url: '/guides/spring-fashion-trends-2026' },
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
      'https://instagram.com/trendloopusa',
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
        name: 'What is StyleMeDaily?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'StyleMeDaily is a personal styling platform that provides expert fashion guides, curated outfit ideas, and product recommendations for every woman, every occasion, and every budget.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I find the right outfit for my body type?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Take our free Style Quiz to discover your personal style profile, or browse our Body Shape Guide for tailored outfit recommendations based on your unique proportions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are the product recommendations affordable?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! We curate products across all price ranges, from budget-friendly finds under $30 to investment pieces. Each guide includes options for every budget.',
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
        {/* Hero â Clean editorial style */}
        <section className="pt-16 pb-20">
          <p className="text-sm text-gray-400 font-mono tracking-wide uppercase mb-4">
            Your Daily Style Edit
          </p>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5 text-gray-900">
            Fashion that fits{' '}
            <span className="font-display italic text-gray-400">your life</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-lg mb-8 leading-relaxed">
            Curated style guides, honest product reviews, and outfit inspiration
            for every occasion and every budget.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/shop" className="btn-primary text-center">Shop Editor&apos;s Picks</Link>
            <Link href="/guides" className="btn-secondary text-center">Browse Style Guides</Link>
          </div>
        </section>

        {/* Ad banner between hero and products */}
        <AdUnit slot="8863913673" format="horizontal" className="mb-4" />

        {/* Trending Products */}
        <TrendingProducts />

        {/* Editor's Picks â Top 3 guides */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="section-title">Editor&apos;s Picks</h2>
              <p className="text-sm text-gray-400 mt-1">Hand-selected guides by our styling team</p>
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

        {/* Pinterest Gallery â 4 pins */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="section-title">Trending Styles</h2>
              <p className="text-sm text-gray-400 mt-1">Our most popular style guides this week</p>
            </div>
            <a href="https://www.pinterest.com/trendloopusa/" target="_blank" rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">
              Follow
            </a>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {pinterestPins.map((pin, i) => (
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
