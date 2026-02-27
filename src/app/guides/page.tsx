import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import { guides } from '@/lib/guides-data';
import GuidesClient from './GuidesClient';

export const metadata: Metadata = {
  title: 'Style Guides — Outfit Ideas & Fashion Tips for Every Woman',
  description: 'Browse expert styling guides with outfit ideas, capsule wardrobe tips, and fashion advice for work, dates, casual, and special occasions.',
  keywords: ['style guides', 'outfit ideas', 'fashion tips', 'capsule wardrobe', 'what to wear', 'women fashion 2026'],
  alternates: { canonical: `${SITE_URL}/guides` },
  openGraph: {
    title: 'Style Guides — Outfit Ideas & Fashion Tips',
    description: 'Browse expert styling guides with outfit ideas and fashion advice for every occasion.',
    url: `${SITE_URL}/guides`,
    siteName: SITE_NAME,
    type: 'website',
  },
};

export default function GuidesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'StyleMeDaily Style Guides',
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
