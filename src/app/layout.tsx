import type { Metadata } from 'next';
import Script from 'next/script';
import '@/styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import NewsletterPopup from '@/components/NewsletterPopup';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'StyleMeDaily – Personal Style Guides for Every Woman', template: '%s | StyleMeDaily' },
  description: SITE_DESCRIPTION,
  keywords: ['personal stylist', 'fashion guide', 'outfit ideas', 'capsule wardrobe', 'what to wear', 'style tips women', 'women fashion 2026', 'affordable fashion', 'work outfits', 'date night outfits', 'spring fashion trends'],
  verification: {
    google: 'v9fb-JiTMvkHcxCMF',
  },
  other: {
    'p:domain_verify': 'c4d58b4c8b49f1f1f37420d23dc4b510',
    'google-adsense-account': 'ca-pub-8049649445649586',
  },
  openGraph: {
    type: 'website', locale: 'en_US', url: SITE_URL, siteName: SITE_NAME,
    title: 'StyleMeDaily – Personal Style Guides for Every Woman',
    description: 'Expert styling guides, curated outfit ideas, and personalized fashion advice.',
  },
  twitter: { card: 'summary_large_image', site: '@stylemedaily', creator: '@stylemedaily' },
  alternates: { canonical: SITE_URL },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body className="min-h-screen bg-cream antialiased">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: SITE_NAME,
            url: SITE_URL,
            description: SITE_DESCRIPTION,
            publisher: {
              '@type': 'Organization',
              name: SITE_NAME,
              url: SITE_URL,
            },
            potentialAction: {
              '@type': 'SearchAction',
              target: `${SITE_URL}/guides?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          }) }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
          />
        )}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `}
          </Script>
        )}
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        {process.env.NEXT_PUBLIC_SKIMLINKS_ID && (
          <Script
            src={`https://s.skimresources.com/js/${process.env.NEXT_PUBLIC_SKIMLINKS_ID}.skimlinks.js`}
            strategy="afterInteractive"
          />
        )}
        <Header />
        <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {children}
        </main>
        <Footer />
        <BackToTop />
        <NewsletterPopup />
      </body>
    </html>
  );
}
