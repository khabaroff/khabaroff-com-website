import React from 'react';

interface HeroImageProps {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function HeroImage({ src, alt, title, subtitle, className = '' }: HeroImageProps) {
  return (
    <div className={`hero-image ${className}`}>
      <div className="relative overflow-hidden rounded-lg">
        <img 
          src={src} 
          alt={alt}
          className="w-full h-auto object-cover"
        />
        {(title || subtitle) && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            {title && (
              <h2 className="text-white text-2xl md:text-3xl font-lora font-medium mb-2">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-white/90 text-base md:text-lg">
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
