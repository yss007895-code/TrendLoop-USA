'use client';
import { useState, useEffect } from 'react';

interface StickyShopBarProps {
  productCount: number;
  firstProductUrl: string;
}

export default function StickyShopBar({ productCount, firstProductUrl }: StickyShopBarProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (dismissed) return;
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissed]);

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden animate-slide-in-bottom">
      <div className="bg-white border-t border-gray-200 shadow-lg px-4 py-3 flex items-center gap-3">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">{productCount} items in this guide</p>
          <p className="text-xs text-gray-400">Tap to shop curated picks</p>
        </div>
        <a
          href={firstProductUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
        >
          Shop {productCount} Items
        </a>
        <button
          onClick={() => setDismissed(true)}
          className="text-gray-400 hover:text-gray-600 text-lg leading-none"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
