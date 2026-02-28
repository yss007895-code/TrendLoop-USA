export interface StyleGuide {
  slug: string;
  title: string;
  category: string;
  description: string;
  readTime: string;
  date: string;
  tag: string;
  emoji: string;
  image?: string;
  affiliateProducts?: AffiliateProduct[];
}

export interface AffiliateProduct {
  name: string;
  brand: string;
  price: string;
  url: string;
  tag?: string;
  image?: string;
}

export const categories = [
  { slug: 'all', name: 'All Finds', icon: '✨' },
  { slug: 'viral', name: 'Viral Finds', icon: '🔥' },
  { slug: 'tech', name: 'Tech', icon: '⚡' },
  { slug: 'room-decor', name: 'Room Decor', icon: '🏠' },
  { slug: 'style', name: 'Style', icon: '💅' },
  { slug: 'budget', name: 'Budget Picks', icon: '💰' },
];

export const shopCategories = [
  { slug: 'all', name: 'All Items' },
  { slug: 'tech', name: 'Tech' },
  { slug: 'room-decor', name: 'Room Decor' },
  { slug: 'viral', name: 'Viral Finds' },
  { slug: 'style', name: 'Style' },
  { slug: 'budget', name: 'Budget Picks' },
];

export const guides: StyleGuide[] = [
  {
    slug: 'viral-tiktok-products-2026',
    title: 'Top 10 TikTok Viral Products 2026: Everyone Is Buying These',
    category: 'viral',
    description: 'These are the products blowing up on TikTok right now. From LED gadgets to aesthetic room finds, these viral picks are actually worth the hype.',
    readTime: '8 min',
    date: '2026-02-28',
    tag: 'Trending Now',
    emoji: '🔥',
    image: '/images/guides/old-money-aesthetic-on-a-budget-2026-hero.jpg',
    affiliateProducts: [
      { name: 'Govee Neon Rope Lights', brand: 'Amazon', price: '$22', url: 'https://www.amazon.com/s?k=govee+neon+rope+lights&tag=trendloop-20', tag: 'Best Overall', image: '/images/guides/old-money-aesthetic-on-a-budget-2026-prod0.jpg' },
      { name: 'ENCALIFE Sunset Projection Lamp', brand: 'Amazon', price: '$18', url: 'https://www.amazon.com/s?k=sunset+projection+lamp&tag=trendloop-20', tag: 'Viral Pick', image: '/images/guides/old-money-aesthetic-on-a-budget-2026-prod1.jpg' },
      { name: 'Stanley Quencher 40oz Tumbler', brand: 'Amazon', price: '$45', url: 'https://www.amazon.com/s?k=stanley+quencher+40oz&tag=trendloop-20', tag: 'Most Viral', image: '/images/guides/old-money-aesthetic-on-a-budget-2026-prod2.jpg' },
      { name: 'PopSockets Phone Grip', brand: 'Amazon', price: '$10', url: 'https://www.amazon.com/s?k=popsockets+phone+grip&tag=trendloop-20', tag: 'Best Value', image: '/images/guides/old-money-aesthetic-on-a-budget-2026-prod3.jpg' },
    ],
  },
  {
    slug: 'gen-z-room-aesthetic-budget-2026',
    title: 'Gen Z Room Aesthetic on a Budget 2026: Transform Your Space Under $100',
    category: 'room-decor',
    description: 'You do not need to spend thousands to get that dreamy Gen Z aesthetic room. These Amazon picks under $30 each will completely transform your space.',
    readTime: '10 min',
    date: '2026-02-28',
    tag: 'Pillar Guide',
    emoji: '🏠',
    image: '/images/guides/spring-2026-luxury-fashion-trends-quiet-power-dressing-1.jpg',
    affiliateProducts: [
      { name: 'Govee Star Projector Galaxy Light', brand: 'Amazon', price: '$29', url: 'https://www.amazon.com/s?k=govee+star+projector&tag=trendloop-20', tag: 'Best Overall', image: '/images/guides/work-capsule-wardrobe-essentials-2026-prod0.jpg' },
      { name: 'Floating Wall Shelves Set of 3', brand: 'Amazon', price: '$26', url: 'https://www.amazon.com/s?k=floating+wall+shelves+aesthetic&tag=trendloop-20', tag: 'Editor Pick', image: '/images/guides/work-capsule-wardrobe-essentials-2026-prod1.jpg' },
      { name: 'LED Neon Sign Custom Light', brand: 'Amazon', price: '$28', url: 'https://www.amazon.com/s?k=led+neon+sign&tag=trendloop-20', tag: 'Viral Find', image: '/images/guides/work-capsule-wardrobe-essentials-2026-prod2.jpg' },
      { name: 'Chunky Knit Throw Blanket', brand: 'Amazon', price: '$24', url: 'https://www.amazon.com/s?k=chunky+knit+throw+blanket&tag=trendloop-20', tag: 'Cozy Pick', image: '/images/guides/work-capsule-wardrobe-essentials-2026-prod3.jpg' },
    ],
  },
  {
    slug: 'best-tech-under-50-2026',
    title: 'Best Tech Under $50 in 2026: Gadgets Gen Z Actually Uses',
    category: 'tech',
    description: 'Great tech does not have to drain your bank account. These are the most useful gadgets under $50 that Gen Z is actually buying and loving.',
    readTime: '9 min',
    date: '2026-02-28',
    tag: 'Best Value',
    emoji: '⚡',
    image: '/images/guides/spring-2026-luxury-fashion-trends-quiet-power-dressing-2.jpg',
    affiliateProducts: [
      { name: 'Anker 10000mAh Power Bank', brand: 'Amazon', price: '$22', url: 'https://www.amazon.com/s?k=anker+10000mah+power+bank&tag=trendloop-20', tag: 'Best Overall', image: '/images/guides/refined-90s-minimalism-understated-luxury-curated-essentials.jpg' },
      { name: 'VANKYO Leisure 3W Mini Projector', brand: 'Amazon', price: '$45', url: 'https://www.amazon.com/s?k=vankyo+mini+projector&tag=trendloop-20', tag: 'Top Gadget', image: '/images/guides/spring-2026-luxury-fashion-trends-quiet-power-dressing-3.jpg' },
      { name: '7-in-1 USB-C Hub Adapter', brand: 'Amazon', price: '$28', url: 'https://www.amazon.com/s?k=usb+c+hub+7+in+1&tag=trendloop-20', tag: 'Must Have', image: '/images/guides/old-money-aesthetic-on-a-budget-2026-prod1.jpg' },
      { name: 'Bluetooth Beanie with Headphones', brand: 'Amazon', price: '$18', url: 'https://www.amazon.com/s?k=bluetooth+beanie+headphones&tag=trendloop-20', tag: 'Trend Pick', image: '/images/guides/old-money-aesthetic-on-a-budget-2026-prod2.jpg' },
    ],
  },
  {
    slug: 'budget-fashion-under-30-2026',
    title: 'Budget Fashion Under $30: Gen Z Style That Looks Expensive',
    category: 'budget',
    description: 'Y2K, clean girl, cottagecore — whatever your vibe, these pieces under $30 hit every Gen Z aesthetic without wrecking your budget.',
    readTime: '11 min',
    date: '2026-02-28',
    tag: 'Pillar Guide',
    emoji: '💅',
    image: '/images/guides/spring-2026-luxury-fashion-trends-quiet-power-dressing-3.jpg',
    affiliateProducts: [
      { name: 'Y2K Cargo Pants Wide Leg', brand: 'Amazon', price: '$28', url: 'https://www.amazon.com/s?k=y2k+cargo+pants+women&tag=trendloop-20', tag: 'Best Overall', image: '/images/guides/old-money-aesthetic-on-a-budget-2026-prod0.jpg' },
      { name: 'Oversized Graphic Tee Vintage Wash', brand: 'Amazon', price: '$19', url: 'https://www.amazon.com/s?k=oversized+graphic+tee+women&tag=trendloop-20', tag: 'Most Viral', image: '/images/guides/old-money-aesthetic-on-a-budget-2026-prod1.jpg' },
      { name: 'Bucket Hat Y2K Style', brand: 'Amazon', price: '$14', url: 'https://www.amazon.com/s?k=bucket+hat+women+y2k&tag=trendloop-20', tag: 'Trend Pick', image: '/images/guides/old-money-aesthetic-on-a-budget-2026-prod2.jpg' },
      { name: 'Ribbed Cami Top 3-Pack', brand: 'Amazon', price: '$24', url: 'https://www.amazon.com/s?k=ribbed+cami+top+women+3+pack&tag=trendloop-20', tag: 'Best Value', image: '/images/guides/old-money-aesthetic-on-a-budget-2026-prod3.jpg' },
    ],
  },
];

export function getGuideBySlug(slug: string) {
  return guides.find(g => g.slug === slug);
}

export function getGuidesByCategory(category: string) {
  if (category === 'all') return guides;
  return guides.filter(g => g.category === category);
}

export function getAllProducts(): (AffiliateProduct & { fromGuide: string; fromGuideSlug: string })[] {
  const seen = new Set<string>();
  const products: (AffiliateProduct & { fromGuide: string; fromGuideSlug: string })[] = [];
  for (const guide of guides) {
    if (!guide.affiliateProducts) continue;
    for (const p of guide.affiliateProducts) {
      const key = `${p.name}|${p.brand}`;
      if (seen.has(key)) continue;
      seen.add(key);
      products.push({ ...p, fromGuide: guide.title, fromGuideSlug: guide.slug });
    }
  }
  return products;
}

export function getProductsByCategory(
  category: string,
  count?: number,
): (AffiliateProduct & { fromGuide: string; fromGuideSlug: string })[] {
  const all = getAllProducts();
  if (category === 'all') return count ? all.slice(0, count) : all;
  const catMap: Record<string, string[]> = {
    tech: ['tech', 'under-50', 'gadget', 'charger', 'projector'],
    'room-decor': ['room', 'aesthetic', 'decor', 'gen-z-room'],
    viral: ['viral', 'tiktok'],
    style: ['style', 'fashion', 'old-money', 'capsule'],
    budget: ['budget', 'under-30'],
  };
  const keywords = catMap[category] || [];
  const filtered = all.filter(p => keywords.some(k => p.fromGuideSlug.includes(k)));
  return count ? filtered.slice(0, count) : filtered;
}

export function getFeaturedProducts(count: number = 8): (AffiliateProduct & { fromGuide: string; fromGuideSlug: string })[] {
  const all = getAllProducts();
  const priorityTags = ['Editor Pick', 'Best Overall', 'Best Value', 'Best Seller', 'Trend Pick', 'Must Have', '#1 Must Have', 'Top Pick', 'Most Viral', 'Viral Pick', 'Viral Find'];
  const featured = all.filter(p => p.tag && priorityTags.includes(p.tag));
  const rest = all.filter(p => !p.tag || !priorityTags.includes(p.tag));
  return [...featured, ...rest].slice(0, count);
}
