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
  { label: 'Under $25', min: 0, max: 25 },
  { label: '$25 – $50', min: 25, max: 50 },
  { label: '$50+', min: 50, max: Infinity },
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
        workwear: ['work', 'professional', 'office', 'interview', 'laptop', 'blazer'],
        casual: ['casual', 'jeans', 'sneakers', 'minimalist', 'running'],
        'date-night': ['date', 'night'],
        seasonal: ['spring', 'summer', 'trending', 'must-have', 'accessories'],
        budget: ['affordable', 'budget', 'under-30', 'under-100', 'amazon-fashion'],
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
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <div className="flex gap-1 sm:ml-auto">
          {priceRanges.map((range, i) => (
            <button
              key={range.label}
              onClick={() => setActivePriceRange(i)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activePriceRange === i
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-400 mb-4">{filtered.length} items</p>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((p, i) => (
          <a
            key={`${p.name}-${i}`}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            className="product-card group block"
          >
            {p.image ? (
              <div className="relative h-40 overflow-hidden bg-gray-50">
                <SafeImage
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="product-card-action absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300">
                  <span className="text-white text-sm font-semibold px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                    Shop Now
                  </span>
                </div>
              </div>
            ) : (
              <div className="h-40 bg-gray-50 flex items-center justify-center">
                <span className="text-gray-300 text-sm">No image</span>
              </div>
            )}
            <div className="p-3">
              <p className="text-[11px] text-gray-400 uppercase tracking-wide">{p.brand}</p>
              <h4 className="font-medium text-sm text-gray-800 group-hover:text-gray-900 transition-colors leading-tight mt-0.5 line-clamp-2">
                {p.name}
              </h4>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="price-current text-sm">{p.price}</span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1.5 line-clamp-1">
                As seen in: {p.fromGuide}
              </p>
            </div>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-400">No items match your filters.</p>
          <button
            onClick={() => { setActiveCategory('all'); setActivePriceRange(0); }}
            className="mt-3 text-sm text-gray-500 hover:text-gray-900 font-medium"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
