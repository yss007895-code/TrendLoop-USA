'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = [
    { href: '/guides', label: 'Guides' },
    { href: '/about', label: 'About' },
    { href: '/disclaimer', label: 'Disclaimer' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/' || pathname === '';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-display font-extrabold text-xl tracking-tight text-coral-500">
            TrendLoop
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? 'page' : undefined}
                className={`px-4 py-2 text-sm font-display font-semibold transition-colors rounded-lg ${
                  isActive(l.href)
                    ? 'text-coral-500 bg-coral-50'
                    : 'text-gray-600 hover:text-coral-500 hover:bg-coral-50'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/guides"
              className="ml-2 bg-coral-500 hover:bg-coral-600 text-white text-sm font-display font-bold px-5 py-2 rounded-lg transition-colors"
            >
              Explore What&apos;s Trending
            </Link>
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-500 hover:text-coral-500 p-2"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            )}
          </button>
        </div>

        {open && (
          <nav className="md:hidden pb-4 pt-2 animate-fade-in border-t border-surface-border">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(l.href) ? 'page' : undefined}
                className={`block px-4 py-3 text-sm font-display font-semibold rounded-lg ${
                  isActive(l.href)
                    ? 'text-coral-500 bg-coral-50'
                    : 'text-gray-600 hover:text-coral-500 hover:bg-coral-50'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/guides"
              onClick={() => setOpen(false)}
              className="block mx-4 mt-3 text-center bg-coral-500 hover:bg-coral-600 text-white text-sm font-display font-bold px-5 py-2.5 rounded-lg transition-colors"
            >
              Explore What&apos;s Trending
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
