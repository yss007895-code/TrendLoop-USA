'use client';
import { useState, useMemo } from 'react';
import SafeImage from '@/components/SafeImage';
import type { AffiliateProduct } from '@/lib/guides-data';

type ProductWithSource = AffiliateProduct & { fromGuide: string; fromGuideSlug: string };

interface ShopPageClientProps {
  products: ProductWithSource[];
  categories: { slug: string; name: string }[];
}

const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $20', min: 0, max: 20 },
  { label: '$20 – $30', min: 20, max: 30 },
  { label: '$30+', min: 30, max: Infinity },
];

export default function ShopPageClient({ products, categories }: ShopPageClientProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activePriceRange, setActivePriceRange] = useState(0);

  const filtered = useMemo(() => {
    const range = priceRanges[activePriceRange];
    return products.filter(p => {
      const price = parseFloat(p.price.replace('$', ''));
      const priceMatch = price >= range.min && price < range.max;
      if (activeCategory === 'all') return priceMatch;
      const catMap: Record<string, string[]> = {
        tech: ['tech', 'under-50', 'gadget', 'charger', 'projector'],
        'room-decor': ['room', 'aesthetic', 'decor', 'gen-z-room'],
        viral: ['viral', 'tiktok'],
        style: ['style', 'fashion', 'old-money', 'capsule'],
        budget: ['budget', 'under-30'],
      };
      const keywords = catMap[activeCategory] || [];
      const slug = p.fromGuideSlug || '';
      const categoryMatch = keywords.some(k => slug.includes(k));
      return priceMatch && categoryMatch;
    });
  }, [products, activeCategory, activePriceRange]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex gap-1 overflow-x-auto border-b border-gray-100 sm:border-0">
          {categories.map(cat => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-3.5 py-2 text-sm font-medium whitespace-nowrap rounded-lg transition-colors ${
                activeCategory === cat.slug
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {priceRanges.map((range, i) => (
            <button
              key={i}
              onClick={() => setActivePriceRange(i)}
              className={`px-3 py-2 text-xs font-medium whitespace-nowrap rounded-lg transition-colors ${
                activePriceRange === i
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-400 text-sm py-12 text-center">No items match your filters.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product, i) => (
            <a
              key={i}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="group border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-square bg-gray-50">
                <SafeImage
                  src={product.image || '/images/placeholder.jpg'}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.tag && (
                  <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    {product.tag}
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-400 mb-1">{product.brand}</p>
                <p className="text-sm font-medium text-gray-900 leading-snug line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-blue-600">{product.price}</span>
                  <span className="text-xs text-gray-300">View on Amazon</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
