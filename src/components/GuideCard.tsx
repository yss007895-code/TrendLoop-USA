import SafeImage from '@/components/SafeImage';
import Link from 'next/link';
import type { StyleGuide } from '@/lib/guides-data';

export default function GuideCard({ guide }: { guide: StyleGuide }) {
  const minPrice = guide.affiliateProducts?.reduce((min, p) => {
    const price = parseFloat(p.price.replace('$', ''));
    return price < min ? price : min;
  }, 999);

  return (
    <Link href={`/guides/${guide.slug}`} className="card-hover block group overflow-hidden rounded-xl">
      {guide.image ? (
        <div className="relative h-44 overflow-hidden">
          <SafeImage
            src={guide.image}
            alt={guide.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className="text-[11px] font-medium text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
              {guide.tag}
            </span>
          </div>
          <div className="absolute top-3 right-3 text-xs text-white bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
            {guide.readTime}
          </div>
        </div>
      ) : (
        <div className="p-5 pb-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="badge-new">{guide.tag}</span>
            <span className="text-xs text-gray-400">{guide.readTime}</span>
          </div>
        </div>
      )}
      <div className="p-5">
        <h3 className="font-display font-bold text-gray-900 group-hover:text-gray-600 transition-colors mb-2 leading-snug">
          {guide.title}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2 mb-3">{guide.description}</p>
        {guide.affiliateProducts && guide.affiliateProducts.length > 0 && (
          <div className="flex items-center gap-3">
            {/* Product thumbnails */}
            <div className="flex -space-x-2">
              {guide.affiliateProducts.slice(0, 3).map((p, i) => (
                p.image ? (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-white overflow-hidden relative">
                    <SafeImage src={p.image} alt={p.name} fill sizes="28px" className="object-cover" />
                  </div>
                ) : (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-gray-100" />
                )
              ))}
            </div>
            <span className="text-xs text-gray-400">
              Shop {guide.affiliateProducts.length} items{minPrice && minPrice < 999 ? ` from $${minPrice}` : ''}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
