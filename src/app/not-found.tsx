import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="pt-20 pb-20 text-center max-w-lg mx-auto">
      <p className="font-mono text-7xl font-bold text-accent mb-4">404</p>
      <h1 className="font-display text-2xl font-bold text-white mb-3">
        Page not found
      </h1>
      <p className="text-zinc-500 mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/" className="btn-primary text-sm">Go Home</Link>
        <Link href="/guides" className="btn-secondary text-sm">Browse Guides</Link>
        <Link href="/shop" className="btn-secondary text-sm">Shop All Items</Link>
      </div>

      <div className="mt-12 border border-zinc-800 p-6">
        <h2 className="font-display font-bold text-white text-sm mb-4 uppercase tracking-wide">Popular right now</h2>
        <div className="space-y-0 text-left">
          {[
            { title: 'Viral TikTok Products Worth Buying', href: '/blog/viral-tiktok-products-actually-worth-it-2026' },
            { title: 'Stanley vs Owala vs Yeti', href: '/blog/stanley-vs-owala-vs-yeti-30-day-test' },
            { title: 'Side Hustles That Actually Work', href: '/blog/side-hustles-actually-working-2026' },
            { title: 'Best Meal Kit Services Ranked', href: '/blog/best-affordable-meal-kit-services-ranked' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="flex items-center gap-3 py-3 text-sm text-zinc-500 hover:text-accent transition-colors border-b border-zinc-800">
              <span className="text-accent">&rarr;</span>
              <span>{link.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
