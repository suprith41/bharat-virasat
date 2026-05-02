import { useState } from "react";

const DEFAULT_FALLBACK_SRC =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" role="img" aria-label="State card image unavailable">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#f7f2e8" />
          <stop offset="100%" stop-color="#e7d7c5" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#g)" />
      <circle cx="400" cy="250" r="72" fill="#d9c2a3" opacity="0.45" />
      <path d="M184 408c60-70 132-105 216-105s156 35 216 105" fill="none" stroke="#8c6f52" stroke-width="18" stroke-linecap="round" />
      <text x="400" y="340" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="700" fill="#6b5540">Image unavailable</text>
    </svg>
  `);

type StateCardImageProps = {
  src?: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
};

export function StateCardImage({ src, alt, className, fallbackSrc = DEFAULT_FALLBACK_SRC }: StateCardImageProps) {
  const [imageSrc, setImageSrc] = useState(src ?? fallbackSrc);

  return (
    <img
      src={imageSrc}
      alt={alt}
      crossOrigin="anonymous"
      onError={(event) => {
        if (event.currentTarget.src !== fallbackSrc) {
          event.currentTarget.src = fallbackSrc;
          setImageSrc(fallbackSrc);
        }
      }}
      className={className}
      loading="lazy"
      decoding="async"
    />
  );
}