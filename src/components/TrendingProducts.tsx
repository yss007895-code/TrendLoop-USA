import { getFeaturedProducts } from '@/lib/guides-data';
import ProductCard from './ProductCard';

export default function TrendingProducts() {
  const products = getFeaturedProducts(8);

  return (
    <section className="mb-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="section-title">Trending Now</h2>
          <p className="text-sm text-gray-400 mt-1">Curated picks our readers are loving</p>
        </div>
        <a href="/shop" className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">
          View all
        </a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p, i) => (
          <ProductCard key={`${p.name}-${i}`} product={p} />
        ))}
      </div>
    </section>
  );
}
