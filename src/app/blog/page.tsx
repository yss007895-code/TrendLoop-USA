import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Trends, Culture & Lifestyle',
  description: 'What\'s trending now — viral products, food trends, tech picks, side hustles, and lifestyle tips for 2026.',
  keywords: ['trending 2026', 'viral products', 'lifestyle trends', 'food trends', 'side hustles', 'streaming comparison', 'best meal kits'],
};

const posts = [
  {
    slug: 'viral-tiktok-products-actually-worth-it-2026',
    title: 'The Viral TikTok Products That Actually Live Up to the Hype in 2026',
    excerpt: 'We bought 30 of the most hyped TikTok products and tested each one for a week. Some were worth every penny. Most were not. Here are the ones that actually delivered.',
    date: 'Feb 28, 2026',
    time: '12 min',
    cat: 'Viral',
    image: '/images/blog/viral-tiktok-products-2026.svg',
    link: '/blog/viral-tiktok-products-actually-worth-it-2026',
  },
  {
    slug: 'stanley-vs-owala-vs-yeti-30-day-test',
    title: 'Stanley Cup vs Owala vs Yeti: We Tested All 3 for 30 Days',
    excerpt: 'The water bottle wars are real. We compared insulation, durability, leak-proofing, and taste after 30 days of daily use. The winner surprised us.',
    date: 'Feb 26, 2026',
    time: '10 min',
    cat: 'Review',
    image: '/images/blog/stanley-vs-owala-vs-yeti.svg',
    link: '/blog/stanley-vs-owala-vs-yeti-30-day-test',
  },
  {
    slug: 'side-hustles-actually-working-2026',
    title: '10 Side Hustles That Are Actually Working in 2026',
    excerpt: 'Forget the get-rich-quick schemes. These are the side hustles real people are using to make $500-$3,000/month, based on data from 200+ survey responses.',
    date: 'Feb 24, 2026',
    time: '14 min',
    cat: 'Money',
    image: '/images/blog/side-hustles-2026.svg',
    link: '/blog/side-hustles-actually-working-2026',
  },
  {
    slug: 'best-affordable-meal-kit-services-ranked',
    title: 'The Best Affordable Meal Kit Services Ranked',
    excerpt: 'HelloFresh, EveryPlate, Dinnerly, Blue Apron — we ordered from all of them for a month. Here\'s the honest breakdown on taste, cost per serving, and convenience.',
    date: 'Feb 22, 2026',
    time: '11 min',
    cat: 'Food',
    image: '/images/blog/meal-kit-services-ranked.svg',
    link: '/blog/best-affordable-meal-kit-services-ranked',
  },
  {
    slug: 'cities-everyone-moving-to-2026',
    title: 'Why Everyone Is Moving to These 5 US Cities in 2026',
    excerpt: 'Austin is out. Boise is cooling off. The new migration hotspots might not be where you think — and the reasons go beyond just cost of living.',
    date: 'Feb 20, 2026',
    time: '9 min',
    cat: 'Lifestyle',
    image: '/images/blog/cities-moving-to-2026.svg',
    link: '/blog/cities-everyone-moving-to-2026',
  },
  {
    slug: 'netflix-vs-disney-plus-vs-max-2026',
    title: 'The Streaming Wars: Netflix vs Disney+ vs Max — Which Is Worth It?',
    excerpt: 'With prices rising across the board, keeping all three isn\'t realistic anymore. We compared content libraries, pricing tiers, and ad experiences to pick just one.',
    date: 'Feb 18, 2026',
    time: '10 min',
    cat: 'Entertainment',
    image: '/images/blog/streaming-wars-2026.svg',
    link: '/blog/netflix-vs-disney-plus-vs-max-2026',
  },
  {
    slug: 'amazon-home-finds-under-25-viral',
    title: '15 Amazon Home Finds Under $25 That Went Viral for a Reason',
    excerpt: 'LED lights, organizers, kitchen tools, and bathroom upgrades — the viral Amazon home products that are actually worth the hype, all under $25.',
    date: 'Feb 16, 2026',
    time: '8 min',
    cat: 'Finds',
    image: '/images/blog/amazon-home-finds-2026.svg',
    link: '/blog/amazon-home-finds-under-25-viral',
  },
  {
    slug: 'biggest-food-trends-america-2026',
    title: 'The Biggest Food Trends Taking Over America in 2026',
    excerpt: 'From Dubai chocolate bars to protein-everything to the cottage cheese renaissance — the food trends that are actually reshaping how Americans eat this year.',
    date: 'Feb 14, 2026',
    time: '9 min',
    cat: 'Food',
    image: '/images/blog/food-trends-2026.svg',
    link: '/blog/biggest-food-trends-america-2026',
  },
  {
    slug: 'electric-cars-under-30k-worth-buying',
    title: 'Electric Cars Under $30K: What\'s Actually Worth Buying',
    excerpt: 'The Chevy Equinox EV, Nissan Leaf, and a few newcomers are making EVs affordable. We compared range, features, and real-world costs to find the best deal.',
    date: 'Feb 12, 2026',
    time: '13 min',
    cat: 'Tech',
    image: '/images/blog/electric-cars-under-30k.svg',
    link: '/blog/electric-cars-under-30k-worth-buying',
  },
  {
    slug: 'digital-nomad-best-cities-remote-workers',
    title: 'The Rise of the Digital Nomad: Best Cities for Remote Workers',
    excerpt: 'Lisbon, Mexico City, Bali — the usual suspects. But the smartest remote workers are going somewhere else. Here are the cities with the best cost-to-quality ratio in 2026.',
    date: 'Feb 10, 2026',
    time: '11 min',
    cat: 'Lifestyle',
    image: '/images/blog/digital-nomad-cities-2026.svg',
    link: '/blog/digital-nomad-best-cities-remote-workers',
  },
];

export default function BlogPage() {
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="pt-8 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="section-title">The Loop</h1>
        <p className="text-gray-400 mt-1">What&apos;s trending now — culture, lifestyle, and everything in between</p>
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
              <span>&middot;</span>
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
                <span>&middot;</span>
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
        <p className="text-gray-400 text-sm mb-6">New trends, viral finds, and lifestyle picks delivered every Thursday.</p>
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
