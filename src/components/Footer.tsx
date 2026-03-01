import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <span className="font-display font-black text-xl uppercase tracking-tight-brand">
              TRENDLOOP
            </span>
            <p className="text-sm text-gray-400 leading-relaxed mt-3">Trending finds, viral picks, and lifestyle essentials.</p>
            <a href="mailto:contact@trendloopusa.net" className="inline-block mt-3 text-sm text-gray-400 hover:text-accent transition-colors">
              contact@trendloopusa.net
            </a>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wide mb-4">Explore</h4>
            <div className="space-y-2.5">
              <Link href="/shop" className="block text-sm text-gray-400 hover:text-white transition-colors">Shop All</Link>
              <Link href="/guides" className="block text-sm text-gray-400 hover:text-white transition-colors">Guides</Link>
              <Link href="/blog" className="block text-sm text-gray-400 hover:text-white transition-colors">Blog</Link>
              <Link href="/style-quiz" className="block text-sm text-gray-400 hover:text-white transition-colors">Style Quiz</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wide mb-4">Popular</h4>
            <div className="space-y-2.5">
              <Link href="/blog/viral-tiktok-products-actually-worth-it-2026" className="block text-sm text-gray-400 hover:text-white transition-colors">Viral TikTok Products</Link>
              <Link href="/blog/stanley-vs-owala-vs-yeti-30-day-test" className="block text-sm text-gray-400 hover:text-white transition-colors">Stanley vs Owala vs Yeti</Link>
              <Link href="/blog/side-hustles-actually-working-2026" className="block text-sm text-gray-400 hover:text-white transition-colors">Side Hustles 2026</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wide mb-4">Company</h4>
            <div className="space-y-2.5">
              <Link href="/about" className="block text-sm text-gray-400 hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="block text-sm text-gray-400 hover:text-white transition-colors">Contact</Link>
              <Link href="/privacy" className="block text-sm text-gray-400 hover:text-white transition-colors">Privacy</Link>
            </div>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div className="mt-12 p-4 border border-gray-800">
          <p className="text-xs text-gray-500 leading-relaxed">
            <span className="font-bold text-gray-400">Affiliate Disclosure:</span> TrendLoop USA is a participant in the Amazon Services LLC Associates Program and other affiliate programs. Some links on this site are affiliate links, meaning we may earn a small commission at no extra cost to you when you make a purchase through our links.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} TrendLoop USA. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-white transition-colors">Privacy</Link>
            <Link href="/about" className="text-xs text-gray-500 hover:text-white transition-colors">About</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
