import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for TrendLoop USA. Learn how we collect, use, and protect your information.',
  alternates: { canonical: `${SITE_URL}/privacy` },
  openGraph: {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: 'Privacy Policy for TrendLoop USA.',
    url: `${SITE_URL}/privacy`,
    type: 'website',
  },
};

export default function PrivacyPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: `${SITE_URL}/privacy` },
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
            <li className="text-gray-600 font-medium">Privacy Policy</li>
          </ol>
        </nav>

        <h1 className="font-display text-4xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: March 1, 2026</p>

        <div className="prose-style">
          <p>
            TrendLoop USA (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the website trendloopusa.net. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>

          <h2>Information We Collect</h2>
          <h3>Automatically Collected Information</h3>
          <p>When you visit our website, we may automatically collect certain information about your device and browsing behavior, including:</p>
          <ul>
            <li>IP address and geographic location (country/region level)</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages visited, time spent on pages, and navigation paths</li>
            <li>Referring website or search engine</li>
            <li>Device type (desktop, mobile, tablet)</li>
          </ul>

          <h3>Information You Provide</h3>
          <p>
            If you subscribe to our newsletter, contact us via email, or interact with any forms on our site, we may collect your email address and any information you voluntarily provide.
          </p>

          <h2>How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul>
            <li>Analyze website traffic and user behavior to improve our content and user experience</li>
            <li>Serve relevant advertisements through our advertising partners</li>
            <li>Respond to inquiries and communicate with newsletter subscribers</li>
            <li>Monitor and prevent technical issues</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>Third-Party Services</h2>

          <h3>Google Analytics</h3>
          <p>
            We use Google Analytics to analyze website traffic. Google Analytics collects information about your use of our website through cookies and similar technologies. This data is transmitted to and stored by Google. For more information, see{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a>.
          </p>
          <p>
            You can opt out of Google Analytics by installing the{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.
          </p>

          <h3>Google AdSense</h3>
          <p>
            We use Google AdSense to display advertisements on our website. AdSense may use cookies and web beacons to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting{' '}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
          </p>

          <h3>Amazon Associates Program</h3>
          <p>
            TrendLoop USA is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. When you click an affiliate link and make a purchase, Amazon may set cookies on your device to track the referral. For more information, see{' '}
            <a href="https://www.amazon.com/gp/help/customer/display.html?nodeId=468496" target="_blank" rel="noopener noreferrer">Amazon&apos;s Privacy Notice</a>.
          </p>

          <h3>Skimlinks</h3>
          <p>
            We use Skimlinks to automatically convert certain product links into affiliate links. Skimlinks may collect browsing data through cookies. For more information, visit the{' '}
            <a href="https://skimlinks.com/privacy-policy/" target="_blank" rel="noopener noreferrer">Skimlinks Privacy Policy</a>.
          </p>

          <h2>Cookies</h2>
          <p>
            Our website uses cookies -- small text files stored on your device -- to enhance your browsing experience and enable the third-party services described above. You can control cookie settings through your browser preferences. Disabling cookies may affect the functionality of certain features on our website.
          </p>
          <p>Types of cookies we use:</p>
          <ul>
            <li><strong>Essential cookies:</strong> Required for basic site functionality.</li>
            <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our content (Google Analytics).</li>
            <li><strong>Advertising cookies:</strong> Used to deliver relevant advertisements (Google AdSense, Skimlinks).</li>
            <li><strong>Affiliate cookies:</strong> Track referrals to partner sites (Amazon Associates).</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement reasonable technical and organizational measures to protect the information we collect. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            Our website is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have inadvertently collected such information, we will take steps to delete it promptly.
          </p>

          <h2>Your Rights</h2>
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt out of data processing for certain purposes</li>
            <li>Data portability</li>
          </ul>
          <p>
            California residents may have additional rights under the California Consumer Privacy Act (CCPA). Please contact us to exercise any of these rights.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &quot;Last updated&quot; date. We encourage you to review this policy periodically.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <p>
            <strong>Email:</strong>{' '}
            <a href="mailto:contact@trendloopusa.net">contact@trendloopusa.net</a>
          </p>
          <p>
            <strong>Website:</strong>{' '}
            <a href="https://trendloopusa.net">trendloopusa.net</a>
          </p>
        </div>
      </div>
    </>
  );
}
