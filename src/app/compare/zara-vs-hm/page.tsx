import Link from 'next/link';
import NewsletterCTA from '@/components/NewsletterCTA';
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Zara vs H&M 2026: Which Fast Fashion Brand Is Better?',
  description: 'We compared Zara and H&M on quality, price, sustainability, style, and sizing. Find out which fast fashion retailer wins for your wardrobe.',
  keywords: ['zara vs hm', 'zara vs h&m', 'fast fashion comparison', 'best fast fashion brand', 'zara review 2026', 'h&m review 2026'],
  alternates: { canonical: `${SITE_URL}/compare/zara-vs-hm` },
};

const data = [
  { feature: 'Price Range', zara: '$$', hm: '$–$$', winner: 'hm' },
  { feature: 'Quality', zara: 'Good–Very Good', hm: 'Fair–Good', winner: 'zara' },
  { feature: 'Trend Speed', zara: 'Runway to store in 2 weeks', hm: '4–6 weeks', winner: 'zara' },
  { feature: 'Size Range', zara: 'XS–XL', hm: 'XXS–4XL', winner: 'hm' },
  { feature: 'Sustainability', zara: 'Join Life collection', hm: 'Conscious Choice line', winner: 'hm' },
  { feature: 'Work Clothes', zara: 'Excellent', hm: 'Good', winner: 'zara' },
  { feature: 'Basics', zara: 'Good', hm: 'Excellent', winner: 'hm' },
  { feature: 'Returns', zara: '30 days', hm: '30 days (members: 60)', winner: 'hm' },
  { feature: 'Online Experience', zara: 'Minimal, editorial', hm: 'Feature-rich, filters', winner: 'tie' },
];

export default function ZaraVsHM() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Is Zara better quality than H&M?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, generally. Zara uses better fabrics and construction, especially in their structured pieces like blazers and coats. H&M basics are solid but their trend pieces tend to wear faster.' } },
      { '@type': 'Question', name: 'Which is cheaper, Zara or H&M?', acceptedAnswer: { '@type': 'Answer', text: 'H&M is consistently cheaper. Their basics start under $10, while Zara rarely goes below $20. However, Zara pieces tend to last longer, so cost-per-wear may be similar.' } },
      { '@type': 'Question', name: 'Which has better sustainability?', acceptedAnswer: { '@type': 'Answer', text: 'H&M edges ahead with their Conscious Choice line and garment collection program. Zara\'s Join Life collection is growing but H&M has been more transparent about their sustainability goals.' } },
    ],
  };

  return (
    <article className="pt-8 max-w-3xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Home</Link>
        <span>/</span>
        <span className="text-gray-600">Compare</span>
      </nav>

      <header className="mb-8">
        <span className="badge-new mb-3 inline-block">2026 Update</span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
          Zara vs H&M: Which Fast Fashion Brand Is Better in 2026?
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Two of the world&apos;s biggest fast fashion retailers, compared across 9 categories. Here&apos;s which one deserves your money.
        </p>
      </header>

      {/* Quick Verdict */}
      <div className="border border-gray-100 rounded-xl p-6 mb-8 bg-white">
        <h2 className="font-display text-lg font-bold text-gray-900 mb-4">Quick Verdict</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-center p-4 border border-gray-100 rounded-xl">
            <p className="font-display text-xl font-bold text-gray-900 mb-1">Zara</p>
            <p className="text-sm text-gray-400 mb-2">Best for: trend-forward pieces, work outfits, quality</p>
            <p className="font-mono text-2xl font-bold text-gray-900">4.4<span className="text-sm text-gray-400">/5</span></p>
            <a href="https://zara.com" target="_blank" rel="noopener noreferrer nofollow" className="btn-primary mt-3 inline-block text-sm !px-4 !py-2">Shop Zara</a>
          </div>
          <div className="text-center p-4 border border-gray-100 rounded-xl">
            <p className="font-display text-xl font-bold text-gray-900 mb-1">H&M</p>
            <p className="text-sm text-gray-400 mb-2">Best for: basics, budget, size inclusivity</p>
            <p className="font-mono text-2xl font-bold text-gray-900">4.2<span className="text-sm text-gray-400">/5</span></p>
            <a href="https://hm.com" target="_blank" rel="noopener noreferrer nofollow" className="btn-primary mt-3 inline-block text-sm !px-4 !py-2">Shop H&M</a>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="border border-gray-100 rounded-xl overflow-hidden mb-8 bg-white">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-4 py-3 text-sm font-mono font-semibold text-gray-700">Feature</th>
              <th className="text-center px-4 py-3 text-sm font-mono font-semibold text-gray-700">Zara</th>
              <th className="text-center px-4 py-3 text-sm font-mono font-semibold text-gray-700">H&M</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r, i) => (
              <tr key={i} className="border-t border-gray-50">
                <td className="px-4 py-3 text-sm text-gray-700 font-medium">{r.feature}</td>
                <td className={`px-4 py-3 text-sm text-center ${r.winner === 'zara' ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>{r.zara}</td>
                <td className={`px-4 py-3 text-sm text-center ${r.winner === 'hm' ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>{r.hm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose-style">
        <h2>Our Recommendation</h2>
        <p>Use both strategically. Zara is your go-to for statement pieces, structured workwear, and anything you want to look more expensive than it is. Their blazers, coats, and tailored pieces punch well above their price point.</p>
        <p>H&M excels at basics — t-shirts, underwear, loungewear, and everyday essentials. Their Conscious Choice line offers surprisingly good quality at rock-bottom prices. For size-inclusive shopping, H&M wins hands down with their extended range.</p>

        <h2>When to Choose Zara</h2>
        <p>Choose Zara when you need a specific trend piece fast, want work-appropriate clothing that looks premium, or need a statement coat or blazer. Zara&apos;s strength is translating runway trends into wearable, affordable pieces faster than anyone else.</p>

        <h2>When to Choose H&M</h2>
        <p>Choose H&M for wardrobe basics, loungewear, kids&apos; clothing, and sustainable fashion on a budget. Their collaboration collections (like H&M x designer collabs) also offer incredible value for limited-edition designer pieces.</p>

        <h2>FAQ</h2>
        <h3>Is Zara better quality than H&M?</h3>
        <p>Yes, generally. Zara uses better fabrics and construction, especially in their structured pieces like blazers and coats. H&M basics are solid but their trend pieces tend to wear faster.</p>

        <h3>Which is cheaper, Zara or H&M?</h3>
        <p>H&M is consistently cheaper. Their basics start under $10, while Zara rarely goes below $20. However, Zara pieces tend to last longer, so cost-per-wear may be similar.</p>

        <h3>Which has better sustainability?</h3>
        <p>H&M edges ahead with their Conscious Choice line and garment collection program. Zara&apos;s Join Life collection is growing but H&M has been more transparent about their sustainability goals.</p>
      </div>

      <div className="my-8">
        <h3 className="font-display font-bold text-gray-900 mb-4">More Comparisons</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link href="/compare/nordstrom-vs-asos" className="card-hover p-5 group">
            <p className="font-display font-bold text-sm text-gray-900 group-hover:text-gray-600 transition-colors">Nordstrom vs ASOS</p>
            <p className="text-xs text-gray-400 mt-1">Premium vs mid-range online shopping</p>
          </Link>
          <Link href="/compare/shein-vs-asos" className="card-hover p-5 group">
            <p className="font-display font-bold text-sm text-gray-900 group-hover:text-gray-600 transition-colors">SHEIN vs ASOS</p>
            <p className="text-xs text-gray-400 mt-1">Ultra-budget vs mid-range fashion</p>
          </Link>
        </div>
      </div>

      <NewsletterCTA />
    </article>
  );
}
