import Link from 'next/link';
import type { Metadata } from 'next';
import { guides, categories } from '@/lib/guides-data';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import GuideCard from '@/components/GuideCard';
import AdUnit from '@/components/AdUnit';

export const metadata: Metadata = {
  title: 'Guides -- Product Reviews & Buying Guides',
  description: 'Expert buying guides and product reviews across trending gadgets, home & living, health & wellness, and outdoor gear. Tested, ranked, and honestly reviewed.',
  alternates: { canonical: `${SITE_URL}/guides` },
  openGraph: {
    title: 'Guides -- Product Reviews & Buying Guides | TrendLoop USA',
    description: 'Expert buying guides and product reviews across trending gadgets, home & living, health & wellness, and outdoor gear.',
    url: `${SITE_URL}/guides`,
    type: 'website',
  },
};

export default function GuidesPage() {
  const featured = guides.slice(0, 3);
  const allGuides = guides;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guides` },
    ],
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Guides -- Product Reviews & Buying Guides',
    description: 'Expert buying guides and product reviews across trending gadgets, home & living, health & wellness, and outdoor gear.',
    url: `${SITE_URL}/guides`,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <div>
        {/* Hero */}
        <section className="-mx-6 px-6 bg-coral-500 py-16 mb-12">
          <div className="max-w-7xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-white/70">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-white font-medium">Guides</li>
              </ol>
            </nav>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              Buying Guides & Reviews
            </h1>
            <p className="text-lg text-white/80 mt-3 max-w-2xl font-body">
              Products we have tested, ranked, and honestly reviewed -- so you can spend your money on what actually works.
            </p>
          </div>
        </section>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <Link
            href="/guides"
            className="px-5 py-2 bg-coral-500 text-white font-display font-semibold text-sm rounded-full transition-colors"
          >
            All Guides
          </Link>
          {categories.map(cat => (
            <span
              key={cat.slug}
              className="px-5 py-2 bg-surface-muted text-gray-600 font-display font-semibold text-sm rounded-full hover:bg-coral-50 hover:text-coral-600 transition-colors cursor-default"
            >
              {cat.name}
            </span>
          ))}
        </div>

        {/* Featured Guides */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
            Featured Guides
            <span className="block h-1 w-16 bg-coral-500 mt-2 rounded-full" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((g, i) => (
              <GuideCard key={g.slug} guide={g} index={i} />
            ))}
          </div>
        </section>

        {/* Ad */}
        <AdUnit slot="8863913673" format="horizontal" className="mb-10" />

        {/* All Guides */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
            All Guides
            <span className="block h-1 w-16 bg-coral-500 mt-2 rounded-full" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allGuides.map((g, i) => (
              <GuideCard key={g.slug} guide={g} index={i} />
            ))}
          </div>
        </section>

        {/* Browse by Category */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
            Browse by Category
            <span className="block h-1 w-16 bg-coral-500 mt-2 rounded-full" />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map(cat => {
              const count = guides.filter(g => g.category === cat.slug).length;
              return (
                <div
                  key={cat.slug}
                  className="group p-6 bg-white border border-surface-border rounded-xl hover:border-coral-300 hover:shadow-sm transition-all"
                >
                  <h3 className="font-display font-bold text-gray-900 group-hover:text-coral-500 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {count} {count === 1 ? 'guide' : 'guides'}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Ad */}
        <AdUnit slot="8863913673" format="horizontal" className="mb-10" />
      </div>
    </>
  );
}
