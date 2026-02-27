'use client';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

// Category-specific fallback images (all verified 200 OK)
const FALLBACK_IMAGES: Record<string, string> = {
  fashion: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop',
  workwear: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop',
  casual: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=400&fit=crop',
  seasonal: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop',
  default: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
};

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  category?: string;
  fallbackSrc?: string;
}

export default function SafeImage({ category, fallbackSrc, src, alt, ...props }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      const fallback = fallbackSrc
        || FALLBACK_IMAGES[category || '']
        || FALLBACK_IMAGES.default;
      setImgSrc(fallback);
      setHasError(true);
    }
  };

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
}
