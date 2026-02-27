import Link from 'next/link';
import NewsletterCTA from '@/components/NewsletterCTA';
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'SHEIN vs ASOS 2026: Ultra-Budget vs Mid-Range Fashion Compared',
  description: 'Is SHEIN worth it or should you spend more at ASOS? We compared quality, shipping, returns, sustainability, and value to help you decide.',
  keywords: ['shein vs asos', 'shein review', 'asos review', 'cheap online fashion', 'is shein worth it 2026', 'best online fashion store'],
  alternates: { canonical: `${SITE_URL}/compare/shein-vs-asos` },
};

const data = [
  { feature: 'Price Range', shein: '$3–$30', asos: '$10–$80', winner: 'shein' },
  { feature: 'Quality', shein: 'Variable (hit or miss)', asos: 'Consistent (good)', winner: 'asos' },
  { feature: 'Shipping Speed', shein: '7–14 days', asos: '4–7 days', winner: 'asos' },
  { feature: 'Returns', shein: '1 free return/order', asos: 'Free returns (45 days)', winner: 'asos' },
  { feature: 'Size Range', shein: 'XS–4XL', asos: 'XXS–4XL (Petite/Tall)', winner: 'asos' },
  { feature: 'Trend Speed', shein: 'Ultra fast (daily drops)', asos: 'Fast (weekly)', winner: 'shein' },
  { feature: 'Sustainability', shein: 'Poor', asos: 'Improving (Responsible Edit)', winner: 'asos' },
  { feature: 'Brand Variety', shein: 'SHEIN only', asos: '850+ brands', winner: 'asos' },
  { feature: 'Customer Service', shein: 'Basic', asos: 'Good', winner: 'asos' },
];

export default function SheinVsAsos() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Is SHEIN good quality?', acceptedAnswer: { '@type': 'Answer', text: 'SHEIN quality is highly variable. Some pieces are surprisingly good for the price, while others are unwearable. The key is to read reviews carefully and check fabric composition before buying. Avoid anything under $5 — the sweet spot is $15-25.' } },
      { '@type': 'Question', name: 'Is ASOS worth the extra money over SHEIN?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, in most cases. ASOS offers more consistent quality, faster shipping, better returns, and access to 850+ brands. The price difference is often just $10-20 per item, but you get significantly better quality and customer service.' } },
      { '@type': 'Question', name: 'Is SHEIN ethical?', acceptedAnswer: { '@type': 'Answer', text: 'SHEIN has faced criticism for labor practices, environmental impact, and design copying. If sustainability matters to you, ASOS is the better choice with their Responsible Edit line and more transparent supply chain.' } },
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
          SHEIN vs ASOS: Is Ultra-Budget Fashion Worth It?
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          We tested both for 3 months. Here&apos;s the honest breakdown of quality, value, and whether SHEIN&apos;s rock-bottom prices are actually a good deal.
        </p>
      </header>

      <div className="border border-gray-100 rounded-xl p-6 mb-8 bg-white">
        <h2 className="font-display text-lg font-bold text-gray-900 mb-4">Quick Verdict</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-center p-4 border border-gray-100 rounded-xl">
            <p className="font-display text-xl font-bold text-gray-900 mb-1">SHEIN</p>
            <p className="text-sm text-gray-400 mb-2">Best for: experimental trends, ultra-budget shopping</p>
            <p className="font-mono text-2xl font-bold text-gray-900">3.5<span className="text-sm text-gray-400">/5</span></p>
          </div>
          <div className="text-center p-4 border border-gray-100 rounded-xl">
            <p className="font-display text-xl font-bold text-gray-900 mb-1">ASOS</p>
            <p className="text-sm text-gray-400 mb-2">Best for: reliable quality, brand variety, returns</p>
            <p className="font-mono text-2xl font-bold text-gray-900">4.3<span className="text-sm text-gray-400">/5</span></p>
          </div>
        </div>
      </div>

      <div className="border border-gray-100 rounded-xl overflow-hidden mb-8 bg-white">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-4 py-3 text-sm font-mono font-semibold text-gray-700">Feature</th>
              <th className="text-center px-4 py-3 text-sm font-mono font-semibold text-gray-700">SHEIN</th>
              <th className="text-center px-4 py-3 text-sm font-mono font-semibold text-gray-700">ASOS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r, i) => (
              <tr key={i} className="border-t border-gray-50">
                <td className="px-4 py-3 text-sm text-gray-700 font-medium">{r.feature}</td>
                <td className={`px-4 py-3 text-sm text-center ${r.winner === 'shein' ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>{r.shein}</td>
                <td className={`px-4 py-3 text-sm text-center ${r.winner === 'asos' ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>{r.asos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose-style">
        <h2>The Bottom Line</h2>
        <p>ASOS wins 7 out of 9 categories and is the better overall choice for most women. The slightly higher prices are justified by consistent quality, better customer service, and a much wider brand selection.</p>
        <p>SHEIN has its place if you want to experiment with a trend before committing money to it. But for anything you plan to wear more than 3 times, ASOS (or even H&M) is the smarter investment.</p>

        <h2>When SHEIN Makes Sense</h2>
        <p>Festival outfits, costume parties, testing a trend before buying quality, and accessories like hair clips and phone cases. Keep your expectations realistic and always read reviews with photos.</p>

        <h2>When to Choose ASOS Instead</h2>
        <p>Work clothes, date night outfits, wardrobe staples, and anything you want to keep longer than one season. ASOS&apos;s own brand offers great value, and their marketplace gives you access to hundreds of other brands.</p>

        <h2>FAQ</h2>
        <h3>Is SHEIN good quality?</h3>
        <p>Highly variable. Some pieces are surprisingly good, others are unwearable. Read reviews carefully and check fabric composition. The sweet spot is $15–25 items.</p>

        <h3>Is ASOS worth the extra money over SHEIN?</h3>
        <p>Yes. ASOS offers more consistent quality, faster shipping, better returns, and access to 850+ brands. The price difference is often just $10–20 but quality is significantly better.</p>

        <h3>Is SHEIN ethical?</h3>
        <p>SHEIN has faced criticism for labor practices and environmental impact. If sustainability matters to you, ASOS is the better choice with their Responsible Edit line.</p>
      </div>

      <div className="my-8">
        <h3 className="font-display font-bold text-gray-900 mb-4">More Comparisons</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link href="/compare/nordstrom-vs-asos" className="card-hover p-5 group">
            <p className="font-display font-bold text-sm text-gray-900 group-hover:text-gray-600 transition-colors">Nordstrom vs ASOS</p>
            <p className="text-xs text-gray-400 mt-1">Premium vs mid-range online shopping</p>
          </Link>
          <Link href="/compare/zara-vs-hm" className="card-hover p-5 group">
            <p className="font-display font-bold text-sm text-gray-900 group-hover:text-gray-600 transition-colors">Zara vs H&M</p>
            <p className="text-xs text-gray-400 mt-1">Fast fashion quality and style compared</p>
          </Link>
        </div>
      </div>

      <NewsletterCTA />
    </article>
  );
}
