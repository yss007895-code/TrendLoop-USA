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
  { slug: 'all', name: 'All Styles', icon: '✨' },
  { slug: 'workwear', name: 'Workwear', icon: '👔' },
  { slug: 'casual', name: 'Casual Chic', icon: '👗' },
  { slug: 'date-night', name: 'Date Night', icon: '💃' },
  { slug: 'seasonal', name: 'Seasonal', icon: '🌸' },
  { slug: 'body-type', name: 'Body Types', icon: '💖' },
  { slug: 'budget', name: 'On a Budget', icon: '💰' },
  { slug: 'occasion', name: 'Occasions', icon: '🎉' },
];

export const guides: StyleGuide[] = [
  {
    slug: 'work-capsule-wardrobe-essentials-2026',
    title: 'The Ultimate Work Capsule Wardrobe 2026: 10 Essentials for Endless Outfits',
    category: 'workwear',
    description: 'Tired of \'I have nothing to wear\' mornings? Build a chic, versatile work capsule wardrobe for 2026 with these 10 essential, affordable pieces.',
    readTime: '12 min',
    date: '2026-02-23',
    tag: 'Pillar Guide',
    emoji: '👗',
    image: '/images/guides/work-capsule-wardrobe-essentials-2026-hero.jpg',
    affiliateProducts: [
      { name: 'The Drop Women\'s Blake Long Blazer', brand: 'Amazon', price: '$70', url: 'https://amzn.to/4rVjOFg', tag: 'Best Overall', image: '/images/guides/work-capsule-wardrobe-essentials-2026-prod0.jpg' },
      { name: 'GRACE KARIN Women\'s High Waist Pencil Pants with Pockets', brand: 'Amazon', price: '$38', url: 'https://amzn.to/3ZCaw4S', tag: 'Top Trousers', image: '/images/guides/work-capsule-wardrobe-essentials-2026-prod1.jpg' },
      { name: 'Hotouch Women\'s Cotton Button Down Shirt Long Sleeve', brand: 'Amazon', price: '$29', url: 'https://amzn.to/3Mro3JB', tag: 'Must-Have Basic', image: '/images/guides/work-capsule-wardrobe-essentials-2026-prod2.jpg' },
      { name: 'Vince Camuto Women\'s Felima Suede Loafer', brand: 'Amazon', price: '$99', url: 'https://amzn.to/3OhrhzW', tag: 'Best Footwear', image: '/images/guides/work-capsule-wardrobe-essentials-2026-prod3.jpg' },
    ],
  },
  {
    slug: 'old-money-aesthetic-on-a-budget-2026',
    title: 'Old Money Aesthetic on a Budget: 12 Luxe Looks for Less in 2026',
    category: 'budget',
    description: 'Want the timeless old money look without the trust fund? Our 2026 guide shows you how to build a luxe wardrobe on a budget. Get the look now!',
    readTime: '12 min',
    date: '2026-02-23',
    tag: 'Pillar Guide',
    emoji: '💎',
    image: '/images/guides/old-money-aesthetic-on-a-budget-2026-hero.jpg',
    affiliateProducts: [
      { name: 'The Drop Women\'s Blake Long Blazer', brand: 'Amazon', price: '$75', url: 'https://amzn.to/4rVjOFg', tag: 'Best Overall', image: '/images/guides/old-money-aesthetic-on-a-budget-2026-prod0.jpg' },
      { name: 'ANRABESS Women\'s Two Piece Sweater Set', brand: 'Amazon', price: '$50', url: 'https://amzn.to/3ZCaw4S', tag: 'Best Knit Set', image: '/images/guides/old-money-aesthetic-on-a-budget-2026-prod1.jpg' },
      { name: 'PAVOI 14K Gold Plated Chunky Open Hoops', brand: 'Amazon', price: '$14', url: 'https://amzn.to/3Mro3JB', tag: 'Best Accessory', image: '/images/guides/old-money-aesthetic-on-a-budget-2026-prod2.jpg' },
      { name: 'JW PEI Women\'s Eva Shoulder Bag', brand: 'Amazon', price: '$59', url: 'https://amzn.to/3OhrhzW', tag: 'Best Bag', image: '/images/guides/old-money-aesthetic-on-a-budget-2026-prod3.jpg' },
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

export function getFeaturedProducts(count: number = 8): (AffiliateProduct & { fromGuide: string; fromGuideSlug: string })[] {
  const all = getAllProducts();
  const priorityTags = ['Editor Pick', 'Best Overall', 'Best Value', 'Best Seller', 'Trend Pick', 'Must Have', '#1 Must Have', 'Top Pick'];
  const featured = all.filter(p => p.tag && priorityTags.includes(p.tag));
  const rest = all.filter(p => !p.tag || !priorityTags.includes(p.tag));
  return [...featured, ...rest].slice(0, count);
}

export function getProductsByCategory(category: string, count: number = 8): (AffiliateProduct & { fromGuide: string; fromGuideSlug: string })[] {
  const seen = new Set<string>();
  const products: (AffiliateProduct & { fromGuide: string; fromGuideSlug: string })[] = [];
  const categoryGuides = category === 'all' ? guides : guides.filter(g => g.category === category);
  for (const guide of categoryGuides) {
    if (!guide.affiliateProducts) continue;
    for (const p of guide.affiliateProducts) {
      const key = `${p.name}|${p.brand}`;
      if (seen.has(key)) continue;
      seen.add(key);
      products.push({ ...p, fromGuide: guide.title, fromGuideSlug: guide.slug });
    }
  }
  return products.slice(0, count);
}

export const shopCategories = [
  { slug: 'all', name: 'All' },
  { slug: 'workwear', name: 'Workwear' },
  { slug: 'casual', name: 'Casual' },
  { slug: 'date-night', name: 'Date Night' },
  { slug: 'seasonal', name: 'Seasonal' },
  { slug: 'budget', name: 'Budget Finds' },
];