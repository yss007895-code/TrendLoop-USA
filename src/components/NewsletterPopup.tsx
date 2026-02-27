'use client';
import { useState, useEffect, useRef } from 'react';

const POPUP_KEY = 'smd_popup_shown';
const SHOW_DELAY_MS = 30000;

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem(POPUP_KEY)) return;

    timer.current = setTimeout(() => setVisible(true), SHOW_DELAY_MS);

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 5 && !sessionStorage.getItem(POPUP_KEY)) {
        if (timer.current) clearTimeout(timer.current);
        setVisible(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (timer.current) clearTimeout(timer.current);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(POPUP_KEY, '1');
  };

  if (!visible) return null;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="newsletter-popup-title" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={dismiss} />
      <div className="relative bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl animate-fade-in text-center">
        <button onClick={dismiss} aria-label="Close" className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-lg leading-none">✕</button>
        <span className="text-3xl block mb-3">✨</span>
        <h2 id="newsletter-popup-title" className="font-display text-xl font-bold text-gray-900 mb-2">Get the Weekly Style Edit</h2>
        <p className="text-sm text-gray-400 mb-5 leading-relaxed">
          Outfit ideas, trend reports, and curated Amazon finds — every Thursday.
          <strong className="block text-gray-600 mt-1">Free, every Thursday.</strong>
        </p>
        <iframe
          src="https://trendloopusa.substack.com/embed"
          title="Newsletter signup form"
          width="100%"
          height="130"
          style={{ border: '1px solid #EEE', background: 'white', borderRadius: '12px', display: 'block', margin: '0 auto' }}
          frameBorder={0}
          scrolling="no"
        />
        <button onClick={dismiss} className="text-[11px] text-gray-400 mt-3 hover:text-gray-600 transition-colors underline block mx-auto">
          No thanks
        </button>
      </div>
    </div>
  );
}
