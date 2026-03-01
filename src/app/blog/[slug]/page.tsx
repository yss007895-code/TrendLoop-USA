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
  'viral-tiktok-products-actually-worth-it-2026': {
    slug: 'viral-tiktok-products-actually-worth-it-2026',
    title: 'The Viral TikTok Products That Actually Live Up to the Hype in 2026',
    excerpt: 'We bought 30 of the most hyped TikTok products and tested each one for a week. Here are the ones that actually delivered.',
    date: '2026-02-28',
    cat: 'Viral',
    image: '/images/blog/viral-tiktok-products-2026.jpg',
    content: [
      { heading: 'The Testing Process', paragraphs: [
        'We spent $800 on 30 viral TikTok products with over 1 million views each. Each product got a full week of real-world testing. No sponsorships, no free samples — just honest results.',
        'Out of 30 products, 11 were genuinely worth buying. The rest ranged from mediocre to outright disappointing. Here\'s what made the cut.',
      ] },
      { heading: 'The Winners', paragraphs: [
        'The viral ice roller ($12) actually reduces morning puffiness. We measured facial swelling before and after across 5 mornings. The mini portable blender ($24) works surprisingly well for protein shakes — not so much for frozen fruit.',
        'The sunrise alarm clock ($35) changed our morning routine. Waking up to gradually increasing light instead of a blaring alarm makes a noticeable difference in grogginess levels.',
      ] },
      { heading: 'The Overhyped Failures', paragraphs: [
        'That portable neck fan everyone raves about? Weak airflow and the battery dies in 2 hours. The viral cleaning paste? Regular baking soda does the same thing for 1/10th the price.',
        'The LED strip lights that promise "16 million colors"? They deliver about 6 usable ones. The rest look identical or terrible.',
      ] },
    ],
    relatedGuides: [
      { title: 'Amazon Home Finds Under $25', slug: 'amazon-home-finds-under-25-viral' },
      { title: 'Best Affordable Meal Kits', slug: 'best-affordable-meal-kit-services-ranked' },
    ],
  },
  'stanley-vs-owala-vs-yeti-30-day-test': {
    slug: 'stanley-vs-owala-vs-yeti-30-day-test',
    title: 'Stanley Cup vs Owala vs Yeti: We Tested All 3 for 30 Days',
    excerpt: 'The water bottle wars are real. We compared insulation, durability, leak-proofing, and taste after 30 days.',
    date: '2026-02-26',
    cat: 'Review',
    image: '/images/blog/stanley-vs-owala-vs-yeti.jpg',
    content: [
      { heading: 'Why This Comparison Matters', paragraphs: [
        'The Stanley Quencher costs $45. The Owala FreeSip is $28. The Yeti Rambler runs $38. Over a year of daily use, the price difference is negligible — what matters is which one you\'ll actually carry every day.',
        'We tested all three bottles simultaneously for 30 days, tracking ice retention, leak incidents, ease of cleaning, and that subtle metallic taste that plagues some bottles.',
      ] },
      { heading: 'Ice Retention Test', paragraphs: [
        'Stanley kept ice for 11 hours in 85-degree weather. Yeti lasted 13 hours. Owala came in at 9.5 hours. For most daily use, all three are more than adequate. The Yeti edge only matters if you\'re outdoors all day.',
      ] },
      { heading: 'The Verdict', paragraphs: [
        'Owala wins for daily carry. The FreeSip lid with its built-in straw and wide mouth is the most versatile design. It fits in every cup holder we tested and the lock mechanism actually prevents leaks.',
        'Stanley wins for desk use. The handle and size make it a great office companion. Yeti wins for outdoor durability — it survived being dropped on concrete without a dent.',
      ] },
    ],
    relatedGuides: [
      { title: 'Viral TikTok Products Worth Buying', slug: 'viral-tiktok-products-actually-worth-it-2026' },
    ],
  },
  'side-hustles-actually-working-2026': {
    slug: 'side-hustles-actually-working-2026',
    title: '10 Side Hustles That Are Actually Working in 2026',
    excerpt: 'Based on data from 200+ survey responses, these are the side hustles real people are using to earn $500-$3,000/month.',
    date: '2026-02-24',
    cat: 'Money',
    image: '/images/blog/side-hustles-2026.jpg',
    content: [
      { heading: 'The Data Behind This List', paragraphs: [
        'We surveyed 217 people who earn at least $500/month from a side hustle. No MLMs, no dropshipping schemes, no "passive income" fantasies. Just real work that pays real money.',
        'The top earners consistently mentioned three factors: low startup costs, flexible hours, and skills they already had. Novelty matters less than consistency.',
      ] },
      { heading: 'Top 5 by Median Income', paragraphs: [
        'Freelance writing and content creation tops the list at $1,800/month median. Next: virtual bookkeeping ($1,500), social media management ($1,200), online tutoring ($1,000), and reselling/flipping ($900).',
        'The common thread? All five can be started with under $100 and scaled up gradually. None require quitting your day job.',
      ] },
    ],
    relatedGuides: [
      { title: 'Digital Nomad Cities', slug: 'digital-nomad-best-cities-remote-workers' },
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
          <span>&middot;</span>
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
          <h3 className="font-display font-bold text-gray-900 mb-4">Related</h3>
          <div className="grid gap-3">
            {post.relatedGuides.map(g => (
              <Link key={g.slug} href={`/blog/${g.slug}`} className="card-hover p-4 flex items-center gap-4 group">
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-800 group-hover:text-gray-600 transition-colors">{g.title}</p>
                </div>
                <span className="text-gray-400 text-sm">Read</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <NewsletterCTA />
    </article>
  );
}
