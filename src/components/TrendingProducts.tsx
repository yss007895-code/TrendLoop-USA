import { getFeaturedProducts } from '@/lib/guides-data';
import ProductCard from './ProductCard';

export default function TrendingProducts() {
  const products = getFeaturedProducts(6);

  return (
    <section className="mb-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
          Trending
          <span className="block h-1 w-16 bg-coral-500 mt-2 rounded-full" />
        </h2>
        <a href="/guides" className="text-sm font-display font-semibold text-gray-400 hover:text-coral-500 transition-colors">
          View all
        </a>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {products.slice(0, 2).map((p, i) => (
          <div key={`${p.name}-${i}`} className="lg:col-span-2">
            <ProductCard product={p} />
          </div>
        ))}
        {products.slice(2, 4).map((p, i) => (
          <div key={`${p.name}-${i}`}>
            <ProductCard product={p} />
          </div>
        ))}
        {products.slice(4, 6).map((p, i) => (
          <div key={`${p.name}-${i}`}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
