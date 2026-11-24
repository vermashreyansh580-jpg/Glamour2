import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface StudioImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  fallbackLabel?: string;
}

export function StudioImage({
  src,
  alt,
  className = '',
  loading = 'eager',
  fallbackLabel,
}: StudioImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F5E8E6] via-[#FAF6F2] to-[#EDD5D1] text-[#7A4B54] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Sparkles className="w-6 h-6 mb-2 opacity-75" strokeWidth={1.5} />
        <span className="font-display text-lg text-[#2D2124]">
          {fallbackLabel || 'Glamour Hub Studio'}
        </span>
        <span className="text-xs text-[#665458] mt-1 max-w-[26ch]">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
