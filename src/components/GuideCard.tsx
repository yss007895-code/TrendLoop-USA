import SafeImage from '@/components/SafeImage';
import Link from 'next/link';
import type { StyleGuide } from '@/lib/guides-data';

export default function GuideCard({ guide, index }: { guide: StyleGuide; index?: number }) {
  const num = index !== undefined ? String(index + 1).padStart(2, '0') : null;

  return (
    <Link href={`/guides/${guide.slug}`} className="group block border-t border-surface-border pt-5">
      {guide.image && (
        <div className="relative aspect-[16/10] overflow-hidden mb-4 bg-surface-light rounded-xl">
          <SafeImage
            src={guide.image}
            alt={guide.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className="text-[11px] font-display font-bold text-white bg-coral-500 px-3 py-1 rounded-full uppercase tracking-wide">
              {guide.tag}
            </span>
          </div>
        </div>
      )}
      <div>
        <div className="flex items-start gap-4">
          {num && (
            <span className="font-mono text-3xl font-bold text-coral-400 leading-none shrink-0 mt-0.5">
              {num}
            </span>
          )}
          <div>
            <h3 className="font-display font-bold text-gray-900 group-hover:text-coral-500 transition-colors leading-snug text-lg">
              {guide.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1.5 line-clamp-2">{guide.description}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs font-mono text-gray-400">{guide.readTime}</span>
              {guide.affiliateProducts && guide.affiliateProducts.length > 0 && (
                <span className="text-xs font-mono text-gray-400">
                  {guide.affiliateProducts.length} items
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
