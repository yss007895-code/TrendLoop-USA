import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'StyleMeDaily privacy policy — how we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return (
    <div className="pt-12 max-w-3xl mx-auto">
      <header className="mb-10">
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400">Last updated: February 18, 2026</p>
      </header>

      <div className="prose-style">
        <p>StyleMeDaily (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy. This policy explains how we collect, use, and protect your data when you visit our website.</p>

        <h2>Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul className="list-disc pl-6 space-y-1 text-gray-600 text-sm mb-4">
          <li>Email address (when you subscribe to our newsletter)</li>
          <li>Usage data via analytics (pages visited, referral sources, device type)</li>
          <li>Cookies for analytics and advertising purposes</li>
          <li>Information you provide through contact forms</li>
          <li>Style quiz responses (stored locally, not transmitted)</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use collected information to:</p>
        <ul className="list-disc pl-6 space-y-1 text-gray-600 text-sm mb-4">
          <li>Provide and improve our content and recommendations</li>
          <li>Send newsletters and style updates (opt-in only)</li>
          <li>Analyze site usage to improve user experience</li>
          <li>Display relevant advertisements via Google AdSense</li>
          <li>Respond to inquiries and partnership requests</li>
        </ul>

        <h2>Third-Party Services</h2>
        <p>We use the following third-party services, each with their own privacy policies:</p>
        <ul className="list-disc pl-6 space-y-1 text-gray-600 text-sm mb-4">
          <li><strong>Google Analytics</strong> — website traffic analysis</li>
          <li><strong>Google AdSense</strong> — advertising</li>
          <li><strong>Skimlinks</strong> — affiliate link management</li>
          <li><strong>Mailchimp</strong> — newsletter distribution</li>
          <li><strong>Amazon Associates</strong> — affiliate product links</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          We use cookies for analytics, advertising, and site functionality. Essential cookies are required for the site to function. Analytics and advertising cookies help us understand traffic patterns and display relevant ads. You can control cookies through your browser settings.
        </p>

        <h2>Affiliate Links</h2>
        <p>
          Our site contains affiliate links to products and retailers. When you click these links and make a purchase, we may receive a small commission at no additional cost to you. This does not influence our editorial recommendations.
        </p>

        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 space-y-1 text-gray-600 text-sm mb-4">
          <li>Access, correct, or delete your personal data</li>
          <li>Unsubscribe from our newsletter at any time</li>
          <li>Opt out of personalized advertising</li>
          <li>Request information about data we hold about you</li>
        </ul>

        <h2>Data Security</h2>
        <p>
          We implement appropriate technical measures to protect your personal data. However, no method of transmission over the internet is 100% secure.
        </p>

        <h2>Children&apos;s Privacy</h2>
        <p>
          Our site is not directed to children under 13. We do not knowingly collect personal information from children.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date.
        </p>

        <h2>Contact</h2>
        <p>
          Privacy questions or data requests: <a href="mailto:contact@trendloopusa.net">contact@trendloopusa.net</a>
        </p>
      </div>
    </div>
  );
}
