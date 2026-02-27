import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Fashion Tips, Trends & Style News',
  description: 'The latest fashion tips, trend reports, and style advice for modern women. Stay updated with seasonal trends, outfit ideas, and product reviews.',
  keywords: ['fashion blog', 'style news', 'fashion trends 2026', 'outfit ideas', 'style tips'],
};

const posts = [
  {
    slug: 'quiet-luxury-guide',
    title: 'Quiet Luxury in 2026: How to Nail the "Old Money" Look on Any Budget',
    excerpt: 'The quiet luxury trend isn\'t going anywhere. Here\'s how to achieve that understated, expensive-looking aesthetic without spending a fortune — from fabric choices to color palettes.',
    date: 'Feb 18, 2026',
    time: '8 min',
    cat: 'Style',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&h=400&fit=crop',
    link: '/blog/quiet-luxury-guide',
  },
  {
    slug: 'spring-color-trends',
    title: 'The 5 Colors That Will Dominate Spring 2026 (And How to Wear Them)',
    excerpt: 'Vanilla yellow, soft sage, powder blue, warm terracotta, and lavender are this season\'s key colors. We break down how to incorporate each into your existing wardrobe.',
    date: 'Feb 17, 2026',
    time: '6 min',
    cat: 'Trends',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop',
    link: '/blog/spring-color-trends',
  },
  {
    slug: 'capsule-wardrobe-mistakes',
    title: '7 Capsule Wardrobe Mistakes That Are Costing You Money',
    excerpt: 'Building a capsule wardrobe sounds simple, but most people get it wrong. From buying too many neutrals to ignoring fit, here are the mistakes to avoid.',
    date: 'Feb 16, 2026',
    time: '7 min',
    cat: 'Guide',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=400&fit=crop',
    link: '/blog/capsule-wardrobe-mistakes',
  },
  {
    slug: 'nordstrom-vs-asos',
    title: 'Nordstrom vs ASOS: We Compared 9 Categories So You Don\'t Have To',
    excerpt: 'Quality, pricing, sizing, returns, sustainability — we spent weeks comparing both retailers to help you decide where your fashion budget goes further.',
    date: 'Feb 15, 2026',
    time: '11 min',
    cat: 'Comparison',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=400&fit=crop',
    link: '/compare/nordstrom-vs-asos',
  },
  {
    slug: 'jeans-buying-guide',
    title: 'We Tried 40+ Pairs of Jeans So You Don\'t Have To — Here Are the 10 Best',
    excerpt: 'From high-waisted wide legs to the perfect straight cut — our honest, tested rankings for every body type and budget in 2026.',
    date: 'Feb 14, 2026',
    time: '15 min',
    cat: 'Review',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=400&fit=crop',
    link: '/guides/best-jeans-for-women-2026',
  },
  {
    slug: 'body-shape-dressing',
    title: 'The Visual Guide to Dressing for Your Body Shape',
    excerpt: 'Pear, apple, hourglass, rectangle, or inverted triangle — find your type and discover the specific cuts, fabrics, and silhouettes that flatter you most.',
    date: 'Feb 12, 2026',
    time: '16 min',
    cat: 'Guide',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop',
    link: '/guides/dress-for-body-shape-guide',
  },
  {
    slug: 'amazon-fashion-haul',
    title: '25 Amazon Fashion Finds Under $30 That Actually Look Expensive',
    excerpt: 'From viral TikTok picks to hidden gems — every item is rated 4+ stars and looks way more expensive than it is. Our honest take after testing each one.',
    date: 'Feb 10, 2026',
    time: '12 min',
    cat: 'Finds',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop',
    link: '/guides/amazon-fashion-finds-under-30',
  },
  {
    slug: 'spring-workwear',
    title: 'Spring Workwear Capsule: 15 Pieces, 30 Outfits',
    excerpt: 'Transition your work wardrobe into spring with these 15 versatile pieces. We mapped out 30 outfit combinations so you never have to think about getting dressed.',
    date: 'Feb 8, 2026',
    time: '12 min',
    cat: 'Workwear',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop',
    link: '/guides/spring-workwear-capsule-2026',
  },
  {
    slug: 'interview-outfits',
    title: 'What to Wear to Every Type of Job Interview in 2026',
    excerpt: 'Corporate, startup, creative agency, or remote — first impressions matter. The complete guide to looking professional without overdressing.',
    date: 'Feb 6, 2026',
    time: '11 min',
    cat: 'Guide',
    image: 'https://images.unsplash.com/photo-1560264280-88b68371db39?w=600&h=400&fit=crop',
    link: '/guides/what-to-wear-job-interview-2026',
  },
  {
    slug: 'summer-preview',
    title: 'Summer 2026 Fashion Preview: What We\'re Already Adding to Cart',
    excerpt: 'It\'s never too early to prep for summer. From linen everything to the return of the maxi dress — here\'s what we\'re buying now before it sells out.',
    date: 'Feb 4, 2026',
    time: '9 min',
    cat: 'Preview',
    image: 'https://images.unsplash.com/photo-1469504512102-900f29606341?w=600&h=400&fit=crop',
    link: '/guides/summer-fashion-essentials-2026',
  },
  {
    slug: 'sunglasses-face-shape',
    title: 'The Only Sunglasses Guide You Need: Best Frames for Your Face Shape',
    excerpt: 'Round, oval, square, or heart — we matched the best frame styles to every face shape, all under $50. Includes our tested top picks.',
    date: 'Feb 2, 2026',
    time: '10 min',
    cat: 'Accessories',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=400&fit=crop',
    link: '/guides/best-sunglasses-face-shape-2026',
  },
  {
    slug: 'stitch-fix-review',
    title: 'Stitch Fix vs Personal Stylist: An Honest Comparison After 6 Months',
    excerpt: 'We tested Stitch Fix for 6 months and compared it to working with a personal stylist. Here\'s the real cost breakdown and which option delivered better results.',
    date: 'Jan 30, 2026',
    time: '10 min',
    cat: 'Review',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop',
    link: '/guides/stitch-fix-vs-personal-stylist',
  },
];

export default function BlogPage() {
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="pt-8 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="section-title">The Edit</h1>
        <p className="text-gray-400 mt-1">Fashion insights, honest reviews, and trend analysis</p>
      </div>

      {/* Featured Post */}
      <Link href={featured.link} className="block group mb-12">
        <div className="card-hover overflow-hidden rounded-xl">
          {featured.image && (
            <div className="relative h-64 sm:h-80 overflow-hidden">
              <SafeImage
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="text-[11px] font-medium text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  {featured.cat}
                </span>
              </div>
            </div>
          )}
          <div className="p-6">
            <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
              <span>{featured.date}</span>
              <span>·</span>
              <span>{featured.time} read</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-gray-900 group-hover:text-gray-600 transition-colors mb-3 leading-snug">
              {featured.title}
            </h2>
            <p className="text-gray-400 leading-relaxed">{featured.excerpt}</p>
          </div>
        </div>
      </Link>

      {/* Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rest.map(p => (
          <Link key={p.slug} href={p.link} className="card-hover block group overflow-hidden rounded-xl">
            {p.image && (
              <div className="relative h-44 overflow-hidden">
                <SafeImage
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-medium text-white bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    {p.cat}
                  </span>
                </div>
              </div>
            )}
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                <span>{p.date}</span>
                <span>·</span>
                <span>{p.time} read</span>
              </div>
              <h3 className="font-display font-bold text-gray-900 group-hover:text-gray-600 transition-colors mb-2 leading-snug">
                {p.title}
              </h3>
              <p className="text-sm text-gray-400 line-clamp-2">{p.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Newsletter CTA */}
      <div className="mt-16 border border-gray-100 rounded-xl p-8 text-center bg-white">
        <h3 className="font-display text-xl font-bold text-gray-900 mb-2">Stay in the Loop</h3>
        <p className="text-gray-400 text-sm mb-6">New articles and style picks delivered every Thursday.</p>
        <iframe
          src="https://trendloopusa.substack.com/embed"
          width="100%"
          height="130"
          style={{ border: '1px solid #EEE', background: 'white', borderRadius: '12px', maxWidth: '480px', display: 'block', margin: '0 auto' }}
          frameBorder={0}
          scrolling="no"
        />
        <p className="text-[11px] text-gray-400 mt-3">No spam. Unsubscribe anytime.</p>
      </div>
    </div>
  );
}
