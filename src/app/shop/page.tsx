import type { Metadata } from 'next';
import { getAllProducts, shopCategories } from '@/lib/guides-data';
import ShopPageClient from './ShopPageClient';

export const metadata: Metadata = {
  title: 'Shop Trending Finds — Gen Z Picks Under $50',
  description: 'Shop the most viral Gen Z products: tech gadgets, room decor, budget fashion, and TikTok finds. All under $50, all on Amazon.',
  keywords: ['gen z products', 'tiktok viral finds', 'aesthetic room decor', 'tech gadgets under 50', 'budget fashion 2026', 'trending amazon finds'],
};

export default function ShopPage() {
  const allProducts = getAllProducts();

  return (
    <div className="pt-8 max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="section-title">Shop Trending Finds</h1>
        <p className="text-gray-400 mt-1 text-sm">
          {allProducts.length} viral picks curated for Gen Z
        </p>
      </div>
      <ShopPageClient products={allProducts} categories={shopCategories} />
    </div>
  );
}
