import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About StyleMeDaily — Our Mission & Team',
  description: 'StyleMeDaily provides expert styling guides and personalized fashion advice for every woman. Learn about our mission and editorial standards.',
};

export default function AboutPage() {
  return (
    <div className="pt-12 max-w-3xl mx-auto">
      <header className="mb-12">
        <p className="text-sm text-gray-400 font-mono uppercase tracking-wide mb-3">About Us</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Style advice that actually works
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          We create practical, no-nonsense styling guides for women who want to look great without spending hours or a fortune.
        </p>
      </header>

      <div className="prose-style">
        <h2>Our Mission</h2>
        <p>
          StyleMeDaily was born from a simple idea: every woman deserves access to great style advice, regardless of her budget, body type, or lifestyle. We believe getting dressed should feel easy, not stressful.
        </p>
        <p>
          Our team creates in-depth style guides, honest product reviews, and retailer comparisons that save you time and money. Every recommendation is personally tested and vetted before we publish it.
        </p>

        <h2>What We Cover</h2>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
          {[
            { title: 'Style Guides', desc: 'Step-by-step outfit guides for every occasion' },
            { title: 'Product Reviews', desc: 'Honest, tested reviews of clothing and accessories' },
            { title: 'Retailer Comparisons', desc: 'Side-by-side breakdowns to help you shop smarter' },
            { title: 'Capsule Wardrobes', desc: 'Minimalist wardrobe plans that maximize outfits' },
            { title: 'Body Type Guides', desc: 'Flattering styles for every shape and size' },
            { title: 'Trend Reports', desc: 'What to buy now and what to skip' },
          ].map((item, i) => (
            <div key={i} className="border border-gray-100 rounded-xl p-4 bg-white">
              <h3 className="font-display font-bold text-sm text-gray-900 mb-1">{item.title}</h3>
              <p className="text-xs text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2>Editorial Standards</h2>
        <p>
          We only recommend products we genuinely believe in. Our editorial team tests items firsthand, compares prices across retailers, and verifies quality before any product makes it into a guide. We never let affiliate relationships influence our recommendations.
        </p>

        <h2>Affiliate Disclosure</h2>
        <p>
          Some links on StyleMeDaily are affiliate links. This means we may earn a small commission if you purchase through our links, at no extra cost to you. This helps us keep creating free content for our readers.
        </p>

        <h2>Get in Touch</h2>
        <p>
          Questions, feedback, or partnership inquiries? Reach us at{' '}
          <a href="mailto:contact@trendloopusa.net">contact@trendloopusa.net</a>.
          You can also follow us on{' '}
          <a href="https://www.pinterest.com/trendloopusa/" target="_blank" rel="noopener noreferrer">Pinterest</a> for daily outfit inspiration.
        </p>
      </div>

      <div className="mt-12 border border-gray-100 rounded-xl p-6 bg-white text-center">
        <h3 className="font-display font-bold text-gray-900 mb-2">Start exploring</h3>
        <p className="text-sm text-gray-400 mb-4">Find your next favorite outfit</p>
        <div className="flex justify-center gap-3">
          <Link href="/guides" className="btn-primary text-sm">Browse Guides</Link>
          <Link href="/style-quiz" className="btn-secondary text-sm">Take Style Quiz</Link>
        </div>
      </div>
    </div>
  );
}
