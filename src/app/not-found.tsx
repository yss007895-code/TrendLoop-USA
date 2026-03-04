import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="pt-20 pb-20 text-center max-w-lg mx-auto">
      <p className="font-mono text-7xl font-bold text-coral-500 mb-4">404</p>
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-3">
        Page not found
      </h1>
      <p className="text-gray-500 mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/" className="btn-primary text-sm">Go Home</Link>
        <Link href="/guides" className="btn-secondary text-sm">Browse Guides</Link>
      </div>

      <div className="mt-12 border border-surface-border rounded-xl p-6">
        <h2 className="font-display font-bold text-gray-900 text-sm mb-4 uppercase tracking-wide">Popular right now</h2>
        <div className="space-y-0 text-left">
          {[
            { title: 'Viral Kitchen Gadgets 2026', href: '/guides/viral-kitchen-gadgets-2026' },
            { title: 'Best Standing Desks 2026', href: '/guides/best-standing-desks-2026' },
            { title: 'Top Fitness Trackers 2026', href: '/guides/top-fitness-trackers-2026' },
            { title: 'Camping Essentials Guide', href: '/guides/camping-essentials-guide-2026' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="flex items-center gap-3 py-3 text-sm text-gray-500 hover:text-coral-500 transition-colors border-b border-surface-border">
              <span className="text-coral-400">&rarr;</span>
              <span>{link.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
