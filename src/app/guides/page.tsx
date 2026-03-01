import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import { guides } from '@/lib/guides-data';
import GuidesClient from './GuidesClient';

export const metadata: Metadata = {
  title: 'Guides — Trending Products, Reviews & Lifestyle Tips',
  description: 'Browse guides on viral products, tech picks, lifestyle trends, and honest reviews for 2026.',
  keywords: ['product guides', 'viral products', 'trending 2026', 'lifestyle tips', 'product reviews', 'best amazon finds'],
  alternates: { canonical: `${SITE_URL}/guides` },
  openGraph: {
    title: 'Guides — Trending Products, Reviews & Lifestyle Tips',
    description: 'Browse guides on viral products, tech picks, lifestyle trends, and honest reviews for 2026.',
    url: `${SITE_URL}/guides`,
    siteName: SITE_NAME,
    type: 'website',
  },
};

export default function GuidesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'TrendLoop USA Style Guides',
    description: 'Browse expert styling guides with outfit ideas and fashion advice.',
    url: `${SITE_URL}/guides`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: guides.length,
      itemListElement: guides.slice(0, 10).map((g, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/guides/${g.slug}`,
        name: g.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GuidesClient />
    </>
  );
}
