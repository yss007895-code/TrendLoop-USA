import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'TrendLoop USA is an independent product discovery platform. We test, review, and recommend trending products across categories so you can make smarter buying decisions.',
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: `About Us | ${SITE_NAME}`,
    description: 'Independent product discovery and reviews. Tested by real people, not algorithms.',
    url: `${SITE_URL}/about`,
    type: 'website',
  },
};

export default function AboutPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-3xl mx-auto py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-coral-500 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-600 font-medium">About</li>
          </ol>
        </nav>

        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          About TrendLoop USA
        </h1>

        <div className="prose-style">
          <p>
            TrendLoop USA is an independent product discovery platform built for people who want honest answers before spending their money. We cover trending products, home essentials, health and wellness gear, outdoor equipment, and everything in between -- always with the goal of separating genuine quality from marketing hype.
          </p>

          <h2>Our Mission</h2>
          <p>
            The internet is full of product recommendations driven by affiliate commissions rather than actual experience. We exist to change that. Every product featured on TrendLoop USA has been researched, tested, or evaluated by our editorial team using consistent methodologies that prioritize your interests over our bottom line.
          </p>
          <p>
            Our mission is simple: help you make smarter buying decisions by providing clear, honest, and thoroughly researched product guidance.
          </p>

          <h2>How We Test</h2>
          <p>
            Our review process follows a structured methodology designed to eliminate bias and deliver actionable insights:
          </p>
          <ul>
            <li><strong>Research Phase:</strong> We analyze customer reviews, expert opinions, specification sheets, and brand histories to create a comprehensive baseline for each product category.</li>
            <li><strong>Hands-On Testing:</strong> Whenever possible, we test products in real-world conditions over extended periods -- not just unboxing impressions. Standing desks are used for full work weeks. Kitchen gadgets are tested with multiple recipes. Fitness trackers are worn 24/7 for at least two weeks.</li>
            <li><strong>Comparative Analysis:</strong> We always test products alongside their direct competitors so our recommendations are grounded in relative performance, not isolated impressions.</li>
            <li><strong>Ongoing Updates:</strong> Products change. Prices drop, firmware updates improve (or break) functionality, and new competitors emerge. We revisit and update our guides regularly to keep recommendations current.</li>
          </ul>

          <h2>Editorial Independence</h2>
          <p>
            TrendLoop USA is monetized through affiliate partnerships (primarily Amazon Associates) and display advertising. This means we earn a small commission when you purchase products through our links -- at no additional cost to you.
          </p>
          <p>
            Critically, our affiliate relationships never influence our editorial decisions. We have recommended products from brands with no affiliate program and advised against products that would have earned us higher commissions. Our credibility depends on honest recommendations, and we take that responsibility seriously.
          </p>
          <p>
            No brand has ever paid us for a positive review, and we do not accept sponsored placements in our editorial content.
          </p>

          <h2>What We Cover</h2>
          <p>Our editorial focus spans four main categories:</p>
          <ul>
            <li><strong>Trending Now:</strong> Viral products, kitchen gadgets, and the items everyone is talking about -- tested to see if they actually deliver.</li>
            <li><strong>Home & Living:</strong> Standing desks, home decor, organization tools, and everything that makes your living space better.</li>
            <li><strong>Health & Wellness:</strong> Fitness trackers, air purifiers, sleep gear, and products that support a healthier lifestyle.</li>
            <li><strong>Outdoor:</strong> Camping gear, hiking essentials, and equipment for getting outside -- tested on real trips.</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            Have a question, suggestion, or correction? We welcome reader feedback and use it to improve our content.
          </p>
          <p>
            Email us at{' '}
            <a href="mailto:contact@trendloopusa.net" className="text-coral-500 hover:text-coral-600">
              contact@trendloopusa.net
            </a>
          </p>
          <p>
            Follow us on{' '}
            <a href="https://twitter.com/trendloopusa" target="_blank" rel="noopener noreferrer" className="text-coral-500 hover:text-coral-600">
              Twitter/X
            </a>
            {' '}and{' '}
            <a href="https://www.pinterest.com/trendloopusa/" target="_blank" rel="noopener noreferrer" className="text-coral-500 hover:text-coral-600">
              Pinterest
            </a>
            {' '}for the latest updates and trending finds.
          </p>
        </div>
      </div>
    </>
  );
}
