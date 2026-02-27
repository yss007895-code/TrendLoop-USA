import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <span className="font-display font-bold text-lg text-gray-900 tracking-tight">
              Style<span className="text-blush-500">Me</span>Daily
            </span>
            <p className="text-sm text-gray-400 leading-relaxed mt-3">Expert styling guides and curated fashion advice for every woman, every occasion.</p>
            <a href="mailto:contact@trendloopusa.net" className="inline-block mt-3 text-sm text-gray-400 hover:text-gray-600 transition-colors">
              contact@trendloopusa.net
            </a>
          </div>
          <div>
            <h4 className="font-display font-semibold text-gray-900 text-sm mb-3">Explore</h4>
            <div className="space-y-2">
              <Link href="/shop" className="block text-sm text-gray-400 hover:text-gray-600 transition-colors">Shop All Items</Link>
              <Link href="/guides" className="block text-sm text-gray-400 hover:text-gray-600 transition-colors">Style Guides</Link>
              <Link href="/blog" className="block text-sm text-gray-400 hover:text-gray-600 transition-colors">Blog</Link>
              <Link href="/style-quiz" className="block text-sm text-gray-400 hover:text-gray-600 transition-colors">Style Quiz</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold text-gray-900 text-sm mb-3">Popular</h4>
            <div className="space-y-2">
              <Link href="/guides/capsule-wardrobe-working-women-2026" className="block text-sm text-gray-400 hover:text-gray-600 transition-colors">Capsule Wardrobe</Link>
              <Link href="/guides/dress-for-body-shape-guide" className="block text-sm text-gray-400 hover:text-gray-600 transition-colors">Body Shape Guide</Link>
              <Link href="/compare/nordstrom-vs-asos" className="block text-sm text-gray-400 hover:text-gray-600 transition-colors">Nordstrom vs ASOS</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold text-gray-900 text-sm mb-3">Company</h4>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm text-gray-400 hover:text-gray-600 transition-colors">About</Link>
              <Link href="/contact" className="block text-sm text-gray-400 hover:text-gray-600 transition-colors">Contact</Link>
              <Link href="/privacy" className="block text-sm text-gray-400 hover:text-gray-600 transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-xs text-gray-500 leading-relaxed">
            <span className="font-semibold">Affiliate Disclosure:</span> StyleMeDaily is a participant in the Amazon Services LLC Associates Program and other affiliate programs. Some links on this site are affiliate links, meaning we may earn a small commission at no extra cost to you when you make a purchase through our links.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} TrendLoop Team. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Privacy</Link>
            <span className="text-gray-200">|</span>
            <Link href="/about" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">About</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
