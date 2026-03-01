import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="pt-20 pb-20 text-center max-w-lg mx-auto">
      <p className="font-mono text-6xl font-bold text-gray-200 mb-4">404</p>
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-3">
        Page not found
      </h1>
      <p className="text-gray-400 mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/" className="btn-primary text-sm">Go Home</Link>
        <Link href="/guides" className="btn-secondary text-sm">Browse Guides</Link>
        <Link href="/shop" className="btn-secondary text-sm">Shop All Items</Link>
      </div>

      <div className="mt-12 border border-gray-100 rounded-xl p-6 bg-white">
        <h2 className="font-display font-bold text-gray-900 text-sm mb-3">Popular right now</h2>
        <div className="space-y-2 text-left">
          {[
            { title: 'Viral TikTok Products Worth Buying', href: '/blog/viral-tiktok-products-actually-worth-it-2026' },
            { title: 'Stanley vs Owala vs Yeti', href: '/blog/stanley-vs-owala-vs-yeti-30-day-test' },
            { title: 'Side Hustles That Actually Work', href: '/blog/side-hustles-actually-working-2026' },
            { title: 'Best Meal Kit Services Ranked', href: '/blog/best-affordable-meal-kit-services-ranked' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="block text-sm text-gray-500 hover:text-gray-900 transition-colors py-1">
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
