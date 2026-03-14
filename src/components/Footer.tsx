import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <span className="font-display font-extrabold text-xl text-coral-400">
              TrendLoop
            </span>
            <p className="text-sm text-gray-400 leading-relaxed mt-3">Trending finds, honest reviews, and lifestyle essentials -- tested by real people.</p>
            <a href="mailto:contact@trendloopusa.net" className="inline-block mt-3 text-sm text-gray-400 hover:text-coral-400 transition-colors">
              contact@trendloopusa.net
            </a>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm tracking-wide mb-4 text-gray-200">Explore</h4>
            <div className="space-y-2.5">
              <Link href="/guides" className="block text-sm text-gray-400 hover:text-coral-400 transition-colors">All Guides</Link>
              <Link href="/about" className="block text-sm text-gray-400 hover:text-coral-400 transition-colors">About Us</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm tracking-wide mb-4 text-gray-200">Popular</h4>
            <div className="space-y-2.5">
              <Link href="/guides/viral-kitchen-gadgets-2026" className="block text-sm text-gray-400 hover:text-coral-400 transition-colors">Viral Kitchen Gadgets</Link>
              <Link href="/guides/best-standing-desks-2026" className="block text-sm text-gray-400 hover:text-coral-400 transition-colors">Best Standing Desks</Link>
              <Link href="/guides/top-fitness-trackers-2026" className="block text-sm text-gray-400 hover:text-coral-400 transition-colors">Top Fitness Trackers</Link>
              <Link href="/guides/camping-essentials-guide-2026" className="block text-sm text-gray-400 hover:text-coral-400 transition-colors">Camping Essentials</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm tracking-wide mb-4 text-gray-200">Company</h4>
            <div className="space-y-2.5">
              <Link href="/about" className="block text-sm text-gray-400 hover:text-coral-400 transition-colors">About</Link>
              <Link href="/privacy" className="block text-sm text-gray-400 hover:text-coral-400 transition-colors">Privacy Policy</Link>
              <Link href="/disclaimer" className="block text-sm text-gray-400 hover:text-coral-400 transition-colors">Disclaimer</Link>
            </div>
          </div>
        </div>

        {/* Our Network */}
        <div className="mt-10 pt-8 border-t border-gray-800">
          <h4 className="font-display font-bold text-sm tracking-wide mb-4 text-gray-200">Our Network</h4>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="https://securechoiceguide.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-coral-400 transition-colors">SecureChoiceGuide</a>
            <a href="https://smarttoolpicks.net" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-coral-400 transition-colors">SmartToolPicks</a>
            <a href="https://stylemedaily.org" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-coral-400 transition-colors">StyleMeDaily</a>
          </div>
        </div>

        <div className="mt-12 p-4 border border-gray-800 rounded-lg">
          <p className="text-xs text-gray-500 leading-relaxed">
            <span className="font-bold text-gray-400">Affiliate Disclosure:</span> TrendLoop USA is a participant in the Amazon Services LLC Associates Program and other affiliate programs. Some links on this site are affiliate links, meaning we may earn a small commission at no extra cost to you when you make a purchase through our links.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} TrendLoop USA. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-coral-400 transition-colors">Privacy</Link>
            <Link href="/disclaimer" className="text-xs text-gray-500 hover:text-coral-400 transition-colors">Disclaimer</Link>
            <Link href="/about" className="text-xs text-gray-500 hover:text-coral-400 transition-colors">About</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
