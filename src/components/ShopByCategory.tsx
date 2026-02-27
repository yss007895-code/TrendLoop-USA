'use client';
import { useState } from 'react';
import SafeImage from '@/components/SafeImage';
import { shopCategories, getProductsByCategory } from '@/lib/guides-data';
import type { AffiliateProduct } from '@/lib/guides-data';

// Pre-compute all category products at module level for static compatibility
const categoryProducts: Record<string, (AffiliateProduct & { fromGuide: string; fromGuideSlug: string })[]> = {};
for (const cat of shopCategories) {
  categoryProducts[cat.slug] = getProductsByCategory(cat.slug, 4);
}

export default function ShopByCategory() {
  const [active, setActive] = useState('all');
  const products = categoryProducts[active] || [];

  return (
    <section className="mb-20">
      <div className="mb-6">
        <h2 className="section-title">Shop by Category</h2>
        <p className="text-sm text-gray-400 mt-1">Find exactly what you need</p>
      </div>

      <div className="flex gap-1 border-b border-gray-100 mb-6 overflow-x-auto">
        {shopCategories.map(cat => (
          <button
            key={cat.slug}
            onClick={() => setActive(cat.slug)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
              active === cat.slug ? 'tab-active' : 'tab-inactive'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((p, i) => (
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
                  sizes="(max-width: 640px) 50vw, 25vw"
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
            </div>
          </a>
        ))}
      </div>

      <div className="text-center mt-6">
        <a href="/shop" className="inline-block text-sm text-gray-500 hover:text-gray-900 font-medium border border-gray-200 px-6 py-2.5 rounded-lg hover:border-gray-300 transition-all">
          Browse all {active === 'all' ? '' : shopCategories.find(c => c.slug === active)?.name.toLowerCase() + ' '}items
        </a>
      </div>
    </section>
  );
}
