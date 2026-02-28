import { getFeaturedProducts } from '@/lib/guides-data';
import ProductCard from './ProductCard';

export default function TrendingProducts() {
  const products = getFeaturedProducts(6);

  return (
    <section className="mb-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-2xl sm:text-3xl font-black text-[#111111] uppercase tracking-tight">
          TRENDING
          <span className="block h-1 w-16 bg-accent mt-2" />
        </h2>
        <a href="/shop" className="text-sm font-display font-bold uppercase tracking-wide text-[#111111] hover:text-accent transition-colors">
          View all
        </a>
      </div>
      {/* Asymmetric grid: 2 large + 2 small per visual row */}
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
