import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import StyleQuizClient from './StyleQuizClient';

export const metadata: Metadata = {
  title: 'Free Style Quiz — Discover Your Style Personality',
  description: 'Take our free 5-question style quiz to discover your fashion personality and get personalized outfit recommendations tailored to your lifestyle and budget.',
  keywords: ['style quiz', 'fashion personality', 'what is my style', 'personal style quiz', 'outfit quiz'],
  alternates: { canonical: `${SITE_URL}/style-quiz` },
  openGraph: {
    title: 'Free Style Quiz — Discover Your Style Personality',
    description: 'Take our free 5-question style quiz and get personalized outfit recommendations.',
    url: `${SITE_URL}/style-quiz`,
    siteName: SITE_NAME,
    type: 'website',
  },
};

export default function StyleQuizPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: 'StyleMeDaily Style Personality Quiz',
    description: 'Discover your fashion personality with our free 5-question style quiz.',
    url: `${SITE_URL}/style-quiz`,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StyleQuizClient />
    </>
  );
}
