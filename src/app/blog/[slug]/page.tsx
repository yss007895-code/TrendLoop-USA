import { notFound } from 'next/navigation';
import SafeImage from '@/components/SafeImage';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import NewsletterCTA from '@/components/NewsletterCTA';
import type { Metadata } from 'next';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  cat: string;
  image: string;
  content: { heading: string; paragraphs: string[] }[];
  relatedGuides: { title: string; slug: string }[];
}

const blogPosts: Record<string, BlogPost> = {
  'quiet-luxury-guide': {
    slug: 'quiet-luxury-guide',
    title: 'Quiet Luxury in 2026: How to Nail the "Old Money" Look on Any Budget',
    excerpt: 'The quiet luxury trend isn\'t going anywhere. Here\'s how to achieve that understated, expensive-looking aesthetic without spending a fortune.',
    date: '2026-02-18',
    cat: 'Style',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&h=500&fit=crop',
    content: [
      { heading: 'What Is Quiet Luxury?', paragraphs: [
        'Quiet luxury is the antithesis of logo-heavy fashion. Think The Row, not Gucci. It\'s about investing in well-made pieces in neutral tones with impeccable fit — clothing that whispers wealth rather than screaming it.',
        'The trend exploded in 2023 with shows like Succession and has evolved into a lasting style movement. In 2026, it\'s less about imitating billionaires and more about building a wardrobe of timeless, quality pieces.',
      ] },
      { heading: 'The Key Pieces You Need', paragraphs: [
        'Start with a well-fitting cashmere sweater in cream, navy, or gray. Add tailored trousers in a straight or wide-leg cut. A structured blazer in black or camel is non-negotiable. For shoes, leather loafers or clean minimalist sneakers.',
        'The secret is fabric quality — even at lower price points, look for high wool content, real leather, and dense cotton. Avoid anything shiny, logo-covered, or overly trendy.',
      ] },
      { heading: 'How to Get the Look on a Budget', paragraphs: [
        'Amazon, H&M\'s premium line, and Uniqlo are your best friends. Focus on fit over brand — a $30 blazer that fits perfectly looks more expensive than a $300 one that doesn\'t.',
        'Stick to a neutral palette: black, white, cream, navy, camel, and gray. Avoid bright colors and prints. Invest in one quality leather bag and one pair of good shoes — these are the details people notice.',
      ] },
      { heading: 'Common Mistakes to Avoid', paragraphs: [
        'Don\'t confuse quiet luxury with boring. The look should feel intentional and polished, not like you gave up trying. Accessories matter — a silk scarf, quality sunglasses, or simple gold jewelry elevates everything.',
        'Also avoid going full monochrome head-to-toe. Mix textures (cashmere with cotton, leather with silk) to add visual interest while keeping the palette restrained.',
      ] },
    ],
    relatedGuides: [
      { title: 'Casual Outfits That Look Expensive', slug: 'casual-outfits-look-expensive' },
      { title: 'How to Build a Minimalist Wardrobe', slug: 'how-to-build-minimalist-wardrobe' },
      { title: 'Capsule Wardrobe Guide', slug: 'capsule-wardrobe-working-women-2026' },
    ],
  },
  'spring-color-trends': {
    slug: 'spring-color-trends',
    title: 'The 5 Colors That Will Dominate Spring 2026 (And How to Wear Them)',
    excerpt: 'Vanilla yellow, soft sage, powder blue, warm terracotta, and lavender are this season\'s key colors.',
    date: '2026-02-17',
    cat: 'Trends',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=500&fit=crop',
    content: [
      { heading: 'Vanilla Yellow', paragraphs: [
        'The biggest color of spring 2026 is vanilla yellow — a soft, buttery shade that flatters every skin tone. It showed up on runways from Bottega Veneta to Jacquemus and is already flooding fast fashion.',
        'Wear it as a blouse, knit top, or midi dress. Pair with white jeans, cream trousers, or denim. For a bolder look, try head-to-toe yellow with different shades and textures.',
      ] },
      { heading: 'Soft Sage', paragraphs: [
        'Sage green continues its reign as the neutral alternative to gray. This muted, earthy green works beautifully in linen blazers, cargo pants, and lightweight knits.',
        'Style it with cream, white, or other earth tones for a grounded, sophisticated look. It\'s especially strong in workwear this season.',
      ] },
      { heading: 'Powder Blue', paragraphs: [
        'A perennial spring favorite, powder blue feels fresh and optimistic. This season it\'s showing up in structured silhouettes — tailored shorts, button-downs, and even suiting.',
        'Pair with navy for a tonal look, or contrast with warm browns and tans.',
      ] },
      { heading: 'Warm Terracotta', paragraphs: [
        'Terracotta brings warmth to spring wardrobes. It\'s earthier than rust and softer than orange, making it surprisingly versatile and flattering on warm and medium skin tones.',
        'Try it in a linen dress, a structured bag, or statement earrings. It pairs beautifully with cream, olive, and chocolate brown.',
      ] },
      { heading: 'Lavender', paragraphs: [
        'Lavender makes a soft comeback after a brief retreat. This spring it\'s less "Gen Z purple" and more sophisticated — think muted, dusty tones rather than bright lilac.',
        'Best in soft fabrics like silk, cashmere, or cotton jersey. A lavender knit with white trousers is one of the easiest, most polished spring outfits you can put together.',
      ] },
    ],
    relatedGuides: [
      { title: 'Spring Fashion Trends 2026', slug: 'spring-fashion-trends-2026' },
      { title: '10 Must-Have Fashion Items for Spring', slug: 'spring-2026-must-have-items' },
      { title: 'Spring 2026 Accessories Trends', slug: 'trending-spring-accessories-2026' },
    ],
  },
  'capsule-wardrobe-mistakes': {
    slug: 'capsule-wardrobe-mistakes',
    title: '7 Capsule Wardrobe Mistakes That Are Costing You Money',
    excerpt: 'Building a capsule wardrobe sounds simple, but most people get it wrong.',
    date: '2026-02-16',
    cat: 'Guide',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=500&fit=crop',
    content: [
      { heading: 'Mistake 1: Too Many Neutrals, Not Enough Personality', paragraphs: [
        'The biggest capsule wardrobe mistake is building a closet full of black, white, and gray and wondering why getting dressed feels boring. You need at least 2-3 "accent" pieces — a colored blazer, a printed scarf, a statement shoe.',
        'A capsule wardrobe should feel like you, just edited. If you love color, keep color. The goal is fewer pieces, not no personality.',
      ] },
      { heading: 'Mistake 2: Ignoring Fit', paragraphs: [
        'Spending $200 on a "quality" blazer that doesn\'t fit properly is worse than a $40 one that does. Fit is the single biggest factor in whether clothes look expensive.',
        'Budget $50-100 per year for tailoring. Getting pants hemmed, blazers taken in at the waist, and sleeves shortened transforms cheap clothes into expensive-looking ones.',
      ] },
      { heading: 'Mistake 3: Buying "Capsule Wardrobe" Items You Hate', paragraphs: [
        'Every capsule wardrobe guide says you need a white button-down. But if you hate wearing button-downs, that shirt will sit unworn. Replace prescribed items with YOUR version.',
        'Hate blazers? A structured cardigan works. Don\'t wear heels? Nice flats or loafers. The best capsule wardrobe is one you\'ll actually wear.',
      ] },
      { heading: 'Mistake 4: Not Considering Your Actual Lifestyle', paragraphs: [
        'If you work from home 4 days a week, 60% of your wardrobe should be elevated loungewear and casual pieces — not office suits. Build your capsule around how you actually live.',
        'Track what you wear for 2 weeks before building your capsule. You\'ll be surprised how different your real life is from your imagined wardrobe needs.',
      ] },
      { heading: 'Mistakes 5-7: Overbuying, Ignoring Seasons, and Not Testing', paragraphs: [
        'Don\'t buy everything at once. Start with 15 pieces and live with them for a month. You\'ll quickly learn what\'s missing without wasting money on things you don\'t need.',
        'Build seasonally — a summer capsule needs different fabrics and weights than a winter one. And always "test drive" expensive purchases by wearing the outfit 3 times mentally before buying.',
      ] },
    ],
    relatedGuides: [
      { title: 'Capsule Wardrobe Guide for Working Women', slug: 'capsule-wardrobe-working-women-2026' },
      { title: 'How to Build a Minimalist Wardrobe', slug: 'how-to-build-minimalist-wardrobe' },
      { title: '12 Affordable Fashion Brands', slug: 'affordable-fashion-brands-guide' },
    ],
  },
};

const allSlugs = Object.keys(blogPosts);

export function generateStaticParams() {
  return allSlugs.map(slug => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts[params.slug];
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: post.image, width: 1200, height: 630 }],
      siteName: SITE_NAME,
    },
    alternates: { canonical: `${SITE_URL}/blog/${params.slug}` },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug];
  if (!post) notFound();

  return (
    <article className="pt-8 max-w-3xl mx-auto">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-gray-600">Blog</Link>
        <span>/</span>
        <span className="text-gray-600">{post.cat}</span>
      </nav>

      <header className="mb-8">
        <span className="badge-new mb-3 inline-block">{post.cat}</span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">{post.title}</h1>
        <p className="text-lg text-gray-400 leading-relaxed">{post.excerpt}</p>
        <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
          <span>By TrendLoop USA Team</span>
          <span>·</span>
          <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </header>

      <div className="mb-8 rounded-2xl overflow-hidden relative h-64 sm:h-80">
        <SafeImage src={post.image} alt={post.title} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
      </div>

      <div className="prose-style">
        {post.content.map((section, idx) => (
          <div key={idx}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((p, pIdx) => (
              <p key={pIdx}>{p}</p>
            ))}
          </div>
        ))}
      </div>

      {post.relatedGuides.length > 0 && (
        <div className="mt-10 mb-8">
          <h3 className="font-display font-bold text-gray-900 mb-4">Related Guides</h3>
          <div className="grid gap-3">
            {post.relatedGuides.map(g => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="card-hover p-4 flex items-center gap-4 group">
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-800 group-hover:text-gray-600 transition-colors">{g.title}</p>
                </div>
                <span className="text-gray-400 text-sm">View guide</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <NewsletterCTA />
    </article>
  );
}
