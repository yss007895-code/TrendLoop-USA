import Link from 'next/link';
import NewsletterCTA from '@/components/NewsletterCTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nordstrom vs ASOS 2026: Best Online Shopping for Women',
  description: 'We compared Nordstrom and ASOS on quality, price, sizing, returns, and style. Find out which is better for your wardrobe and budget.',
  keywords: ['nordstrom vs asos', 'online shopping comparison', 'best online store women', 'nordstrom review', 'asos review 2026'],
};

const data = [
  { feature: 'Price Range', nordstrom: '$$–$$$$', asos: '$–$$', winner: 'asos' },
  { feature: 'Quality', nordstrom: 'Excellent', asos: 'Good', winner: 'nordstrom' },
  { feature: 'Size Range', nordstrom: 'XXS–3X', asos: 'XXS–4XL (Petite/Tall)', winner: 'asos' },
  { feature: 'Returns', nordstrom: 'Free, no time limit', asos: 'Free within 45 days', winner: 'nordstrom' },
  { feature: 'Shipping Speed', nordstrom: '3–5 days (free)', asos: '4–7 days (free $50+)', winner: 'nordstrom' },
  { feature: 'Trend Speed', nordstrom: 'Moderate', asos: 'Very Fast', winner: 'asos' },
  { feature: 'Work Clothes', nordstrom: 'Excellent', asos: 'Good', winner: 'nordstrom' },
  { feature: 'Casual/Going Out', nordstrom: 'Good', asos: 'Excellent', winner: 'asos' },
  { feature: 'Sustainability', nordstrom: 'Improving', asos: 'Responsible Edit', winner: 'tie' },
];

export default function NordstromVsAsos() {
  return (
    <article className="pt-8 max-w-3xl mx-auto">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Home</Link>
        <span>/</span>
        <span className="text-gray-600">Compare</span>
      </nav>

      <header className="mb-8">
        <span className="badge-new mb-3 inline-block">Updated Feb 2026</span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
          Nordstrom vs ASOS: Best Online Shopping for Women in 2026
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          We compared both retailers across 9 categories to help you decide where to spend your fashion budget.
        </p>
      </header>

      {/* Quick Verdict */}
      <div className="border border-gray-100 rounded-xl p-6 mb-8 bg-white">
        <h2 className="font-display text-lg font-bold text-gray-900 mb-4">Quick Verdict</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-center p-4 border border-gray-100 rounded-xl">
            <p className="font-display text-xl font-bold text-gray-900 mb-1">Nordstrom</p>
            <p className="text-sm text-gray-400 mb-2">Best for: quality basics, work clothes, returns</p>
            <p className="font-mono text-2xl font-bold text-gray-900">4.5<span className="text-sm text-gray-400">/5</span></p>
            <a href="https://nordstrom.com" target="_blank" rel="noopener noreferrer nofollow" className="btn-primary mt-3 inline-block text-sm !px-4 !py-2">Shop Nordstrom</a>
          </div>
          <div className="text-center p-4 border border-gray-100 rounded-xl">
            <p className="font-display text-xl font-bold text-gray-900 mb-1">ASOS</p>
            <p className="text-sm text-gray-400 mb-2">Best for: trends, budget fashion, size inclusivity</p>
            <p className="font-mono text-2xl font-bold text-gray-900">4.3<span className="text-sm text-gray-400">/5</span></p>
            <a href="https://asos.com" target="_blank" rel="noopener noreferrer nofollow" className="btn-primary mt-3 inline-block text-sm !px-4 !py-2">Shop ASOS</a>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="border border-gray-100 rounded-xl overflow-hidden mb-8 bg-white">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-4 py-3 text-sm font-mono font-semibold text-gray-700">Feature</th>
              <th className="text-center px-4 py-3 text-sm font-mono font-semibold text-gray-700">Nordstrom</th>
              <th className="text-center px-4 py-3 text-sm font-mono font-semibold text-gray-700">ASOS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r, i) => (
              <tr key={i} className="border-t border-gray-50">
                <td className="px-4 py-3 text-sm text-gray-700 font-medium">{r.feature}</td>
                <td className={`px-4 py-3 text-sm text-center ${r.winner === 'nordstrom' ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
                  {r.nordstrom}
                </td>
                <td className={`px-4 py-3 text-sm text-center ${r.winner === 'asos' ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
                  {r.asos}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose-style">
        <h2>Our Recommendation</h2>
        <p>
          Both retailers serve different needs. Shop Nordstrom for investment pieces — blazers, quality denim, leather goods, and classic work staples. Their no-questions-asked return policy means zero risk.
        </p>
        <p>
          Turn to ASOS for trend-driven pieces on a budget. Their size range is unmatched, and their &ldquo;new in&rdquo; section updates multiple times per week.
        </p>

        <h2>FAQ</h2>
        {[
          { q: 'Which has better quality?', a: 'Nordstrom wins on quality across the board. Better fabrics, construction, and longevity. ASOS is great for trends but expect fast-fashion quality at fast-fashion prices.' },
          { q: 'Which is more size-inclusive?', a: 'ASOS is the clear winner with dedicated Petite, Tall, Curve, and Maternity lines, ranging from XXS to 4XL. Nordstrom tops out at 3X for most brands.' },
          { q: 'Which has better sales?', a: 'Both have excellent sales. Nordstrom\'s Anniversary Sale (July) offers deep discounts on premium brands. ASOS runs frequent 20–30% off promotions year-round.' },
        ].map((f, i) => (
          <div key={i} className="mb-4">
            <h3 className="!mt-4 !mb-1">{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </div>

      {/* More Comparisons */}
      <div className="my-8">
        <h3 className="font-display font-bold text-gray-900 mb-4">More Comparisons</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link href="/compare/zara-vs-hm" className="card-hover p-5 group">
            <p className="font-display font-bold text-sm text-gray-900 group-hover:text-gray-600 transition-colors">Zara vs H&M</p>
            <p className="text-xs text-gray-400 mt-1">Fast fashion showdown — quality, price, and style compared</p>
          </Link>
          <Link href="/compare/shein-vs-asos" className="card-hover p-5 group">
            <p className="font-display font-bold text-sm text-gray-900 group-hover:text-gray-600 transition-colors">SHEIN vs ASOS</p>
            <p className="text-xs text-gray-400 mt-1">Ultra-budget vs mid-range — which delivers more value?</p>
          </Link>
        </div>
      </div>

      <NewsletterCTA />
    </article>
  );
}
