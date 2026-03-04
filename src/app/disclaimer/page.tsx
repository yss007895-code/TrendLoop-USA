import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Disclaimer & FTC Disclosure',
  description: 'Disclaimer and FTC affiliate disclosure for TrendLoop USA. Transparency about our affiliate relationships and editorial standards.',
  alternates: { canonical: `${SITE_URL}/disclaimer` },
  openGraph: {
    title: `Disclaimer & FTC Disclosure | ${SITE_NAME}`,
    description: 'Transparency about our affiliate relationships and editorial standards.',
    url: `${SITE_URL}/disclaimer`,
    type: 'website',
  },
};

export default function DisclaimerPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Disclaimer', item: `${SITE_URL}/disclaimer` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-3xl mx-auto py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-coral-500 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-600 font-medium">Disclaimer</li>
          </ol>
        </nav>

        <h1 className="font-display text-4xl font-extrabold text-gray-900 mb-2">Disclaimer & FTC Disclosure</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: March 1, 2026</p>

        <div className="prose-style">
          {/* FTC Disclosure */}
          <div className="bg-coral-50 border border-coral-200 rounded-xl p-6 mb-8">
            <h2 className="!mt-0 text-coral-800">FTC Affiliate Disclosure</h2>
            <p className="text-coral-700">
              In accordance with the Federal Trade Commission&apos;s 16 CFR Part 255, &quot;Guides Concerning the Use of Endorsements and Testimonials in Advertising,&quot; TrendLoop USA hereby discloses that some of the links on this website are affiliate links.
            </p>
            <p className="text-coral-700">
              This means that if you click on an affiliate link and make a purchase, we may receive a commission at no additional cost to you. This commission helps support the operation of our website and allows us to continue providing free content and product reviews.
            </p>
          </div>

          <h2>Affiliate Partnerships</h2>
          <p>TrendLoop USA participates in the following affiliate and advertising programs:</p>
          <ul>
            <li><strong>Amazon Services LLC Associates Program:</strong> An affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.</li>
            <li><strong>Google AdSense:</strong> A program that allows publishers to serve automatic text, image, video, or interactive media advertisements targeted to site content and audience.</li>
            <li><strong>Skimlinks:</strong> An affiliate marketing platform that automatically converts certain product links into affiliate links.</li>
          </ul>
          <p>
            We may also participate in other affiliate programs from time to time. Affiliate links on our site are always marked with appropriate disclosure, and we make every effort to be transparent about our commercial relationships.
          </p>

          <h2>Editorial Independence</h2>
          <p>
            Our affiliate relationships do not influence our editorial content, product ratings, or recommendations. We maintain strict editorial independence and only recommend products we genuinely believe provide value to our readers.
          </p>
          <p>Key principles of our editorial process:</p>
          <ul>
            <li>No brand or advertiser has editorial control over our content.</li>
            <li>Product ratings and rankings are based on our testing methodology and editorial judgment.</li>
            <li>We have and will continue to recommend products that offer no affiliate commission when they are the best option.</li>
            <li>We have and will continue to advise against products from affiliate partners when they do not meet our standards.</li>
            <li>Sponsored content, if any, is always clearly labeled as such.</li>
          </ul>

          <h2>Product Reviews & Recommendations</h2>
          <p>
            The product reviews, opinions, and recommendations on TrendLoop USA are based on our research, testing, and editorial judgment. Individual experiences with products may vary. We encourage readers to conduct their own research and consider their specific needs before making a purchase.
          </p>
          <p>
            Product prices, availability, ratings, and specifications are subject to change. We make every effort to keep our content accurate and up-to-date, but we cannot guarantee that all information is current at the time of reading.
          </p>

          <h2>General Disclaimer</h2>
          <p>
            The information on TrendLoop USA is provided &quot;as is&quot; without warranties of any kind, express or implied. We do not warrant that the information is complete, accurate, reliable, or error-free.
          </p>
          <p>
            TrendLoop USA shall not be held liable for any damages resulting from the use of information or products featured on this website. Use of this website and reliance on any information provided is solely at your own risk.
          </p>

          <h2>Medical & Health Disclaimer</h2>
          <p>
            Content related to health, wellness, and fitness products is for informational purposes only and is not intended as medical advice. Always consult a qualified healthcare professional before making changes to your health routine or purchasing health-related products.
          </p>

          <h2>Trademarks</h2>
          <p>
            All product names, logos, brands, and trademarks mentioned on this website are the property of their respective owners. Use of these names, logos, and brands does not imply endorsement by the trademark holders.
          </p>
          <p>
            Amazon, the Amazon logo, and AmazonSupply are trademarks of Amazon.com, Inc. or its affiliates.
          </p>

          <h2>External Links</h2>
          <p>
            Our website contains links to external websites that are not operated by us. We have no control over the content, privacy policies, or practices of third-party sites. We are not responsible for the content or accuracy of any linked external website.
          </p>

          <h2>Changes to This Disclaimer</h2>
          <p>
            We reserve the right to modify this disclaimer at any time. Changes will be posted on this page with an updated effective date.
          </p>

          <h2>Contact</h2>
          <p>
            If you have any questions about this disclaimer or our affiliate relationships, please contact us at{' '}
            <a href="mailto:contact@trendloopusa.net">contact@trendloopusa.net</a>.
          </p>
        </div>
      </div>
    </>
  );
}
