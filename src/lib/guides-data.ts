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
  { slug: 'tech', name: 'Tech & Gadgets', icon: '💡' },
  { slug: 'room-decor', name: 'Room Aesthetic', icon: '🏠' },
  { slug: 'style', name: 'Gen Z Style', icon: '👗' },
];

export const shopCategories = [
  { slug: 'all', name: 'All Items' },
  { slug: 'viral', name: '🔥 Viral Finds' },
  { slug: 'tech', name: '💡 Tech & Gadgets' },
  { slug: 'room-decor', name: '🏠 Room Aesthetic' },
  { slug: 'style', name: '👗 Gen Z Style' },
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
    image: '/images/shop/tlu-hero-viral-finds-hero.webp',
    affiliateProducts: [
      { name: 'Govee Neon Rope Lights', brand: 'Govee', price: '$22', url: 'https://www.amazon.com/s?k=govee+neon+rope+lights&tag=trendloop-20', tag: 'Best Overall', image: '/images/shop/tlu-viral-neon-rope-lights-hero.webp' },
      { name: 'ENCALIFE Sunset Projection Lamp', brand: 'ENCALIFE', price: '$18', url: 'https://www.amazon.com/s?k=sunset+projection+lamp&tag=trendloop-20', tag: 'Viral Pick', image: '/images/shop/tlu-viral-sunset-lamp-hero.webp' },
      { name: 'Stanley Quencher 40oz Tumbler', brand: 'Stanley', price: '$45', url: 'https://www.amazon.com/s?k=stanley+quencher+40oz&tag=trendloop-20', tag: 'Most Viral', image: '/images/shop/tlu-viral-stanley-tumbler-hero.webp' },
      { name: 'PopSockets Phone Grip', brand: 'PopSockets', price: '$10', url: 'https://www.amazon.com/s?k=popsockets+phone+grip&tag=trendloop-20', tag: 'Best Value', image: '/images/shop/tlu-viral-popsocket-hero.webp' },
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
    image: '/images/shop/tlu-hero-room-aesthetic-hero.webp',
    affiliateProducts: [
      { name: 'Govee Star Projector Galaxy Light', brand: 'Govee', price: '$29', url: 'https://www.amazon.com/s?k=govee+star+projector&tag=trendloop-20', tag: 'Best Overall', image: '/images/shop/tlu-room-star-projector-hero.webp' },
      { name: 'Floating Wall Shelves Set of 3', brand: 'Amazon Basics', price: '$26', url: 'https://www.amazon.com/s?k=floating+wall+shelves+aesthetic&tag=trendloop-20', tag: 'Editor Pick', image: '/images/shop/tlu-room-floating-shelves-hero.webp' },
      { name: 'LED Neon Sign Custom Light', brand: 'Amazon', price: '$28', url: 'https://www.amazon.com/s?k=led+neon+sign&tag=trendloop-20', tag: 'Viral Find', image: '/images/shop/tlu-room-neon-sign-hero.webp' },
      { name: 'Chunky Knit Throw Blanket', brand: 'Amazon', price: '$24', url: 'https://www.amazon.com/s?k=chunky+knit+throw+blanket&tag=trendloop-20', tag: 'Cozy Pick', image: '/images/shop/tlu-room-knit-blanket-hero.webp' },
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
    emoji: '💡',
    image: '/images/shop/tlu-hero-tech-gadgets-hero.webp',
    affiliateProducts: [
      { name: 'Anker 10000mAh Power Bank', brand: 'Anker', price: '$22', url: 'https://www.amazon.com/s?k=anker+10000mah+power+bank&tag=trendloop-20', tag: 'Best Overall', image: '/images/shop/tlu-tech-power-bank-hero.webp' },
      { name: 'VANKYO Leisure 3W Mini Projector', brand: 'VANKYO', price: '$45', url: 'https://www.amazon.com/s?k=vankyo+mini+projector&tag=trendloop-20', tag: 'Top Gadget', image: '/images/shop/tlu-tech-mini-projector-hero.webp' },
      { name: '7-in-1 USB-C Hub Adapter', brand: 'Amazon', price: '$28', url: 'https://www.amazon.com/s?k=usb+c+hub+7+in+1&tag=trendloop-20', tag: 'Must Have', image: '/images/shop/tlu-tech-usb-hub-hero.webp' },
      { name: 'Bluetooth Beanie with Headphones', brand: 'Amazon', price: '$18', url: 'https://www.amazon.com/s?k=bluetooth+beanie+headphones&tag=trendloop-20', tag: 'Trend Pick', image: '/images/shop/tlu-tech-bluetooth-beanie-hero.webp' },
    ],
  },
  {
    slug: 'gen-z-style-under-30-2026',
    title: 'Gen Z Style Under $30: Street Fashion That Hits Different',
    category: 'style',
    description: 'Y2K, clean girl, cottagecore — whatever your vibe, these pieces under $30 hit every Gen Z aesthetic without wrecking your budget.',
    readTime: '11 min',
    date: '2026-02-28',
    tag: 'Pillar Guide',
    emoji: '👗',
    image: '/images/shop/tlu-hero-genz-style-hero.webp',
    affiliateProducts: [
      { name: 'Y2K Cargo Pants Wide Leg', brand: 'Amazon', price: '$28', url: 'https://www.amazon.com/s?k=y2k+cargo+pants+women&tag=trendloop-20', tag: 'Best Overall', image: '/images/shop/tlu-style-cargo-pants-hero.webp' },
      { name: 'Oversized Graphic Tee Vintage Wash', brand: 'Amazon', price: '$19', url: 'https://www.amazon.com/s?k=oversized+graphic+tee+women&tag=trendloop-20', tag: 'Most Viral', image: '/images/shop/tlu-style-graphic-tee-hero.webp' },
      { name: 'Bucket Hat Y2K Style', brand: 'Amazon', price: '$14', url: 'https://www.amazon.com/s?k=bucket+hat+women+y2k&tag=trendloop-20', tag: 'Trend Pick', image: '/images/shop/tlu-style-bucket-hat-hero.webp' },
      { name: 'Ribbed Cami Top 3-Pack', brand: 'Amazon', price: '$24', url: 'https://www.amazon.com/s?k=ribbed+cami+top+women+3+pack&tag=trendloop-20', tag: 'Best Value', image: '/images/shop/tlu-style-cami-top-hero.webp' },
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
    viral: ['viral', 'tiktok'],
    tech: ['tech', 'under-50', 'gadget'],
    'room-decor': ['room', 'aesthetic', 'decor', 'gen-z-room'],
    style: ['style', 'fashion', 'gen-z-style'],
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
