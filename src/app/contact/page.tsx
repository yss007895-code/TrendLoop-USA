import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — Partnerships & Inquiries',
  description: 'Get in touch with the StyleMeDaily team for partnerships, sponsorships, or general inquiries.',
};

export default function ContactPage() {
  return (
    <div className="pt-12 max-w-2xl mx-auto">
      <header className="mb-10">
        <p className="text-sm text-gray-400 font-mono uppercase tracking-wide mb-3">Contact</p>
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-3">Get in touch</h1>
        <p className="text-gray-400">We&apos;d love to hear from you. Whether it&apos;s a partnership inquiry, feedback, or just a hello.</p>
      </header>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <div className="border border-gray-100 rounded-xl p-6 bg-white">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-mono mb-2">General Inquiries</p>
          <a href="mailto:contact@trendloopusa.net" className="text-sm text-gray-900 font-medium hover:text-gray-600 transition-colors">
            contact@trendloopusa.net
          </a>
        </div>
        <div className="border border-gray-100 rounded-xl p-6 bg-white">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-mono mb-2">Partnerships</p>
          <a href="mailto:contact@trendloopusa.net" className="text-sm text-gray-900 font-medium hover:text-gray-600 transition-colors">
            contact@trendloopusa.net
          </a>
        </div>
        <div className="border border-gray-100 rounded-xl p-6 bg-white">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-mono mb-2">Pinterest</p>
          <a href="https://www.pinterest.com/trendloopusa/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-900 font-medium hover:text-gray-600 transition-colors">
            @trendloopusa
          </a>
        </div>
        <div className="border border-gray-100 rounded-xl p-6 bg-white">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-mono mb-2">Response Time</p>
          <p className="text-sm text-gray-900 font-medium">Within 24 hours</p>
        </div>
      </div>

      <div className="border border-gray-100 rounded-xl p-6 bg-white">
        <h2 className="font-display font-bold text-gray-900 mb-1">Partnership Opportunities</h2>
        <p className="text-sm text-gray-400 mb-4">
          We work with fashion brands, retailers, and agencies on sponsored content, product reviews, and affiliate partnerships. If your brand aligns with our audience of style-conscious women, let&apos;s talk.
        </p>
        <a href="mailto:contact@trendloopusa.net" className="btn-primary text-sm inline-block">Send Partnership Inquiry</a>
      </div>
    </div>
  );
}
