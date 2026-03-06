import React from 'react';

interface ImageWideProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

export default function ImageWide({ src, alt, caption, className = '' }: ImageWideProps) {
  return (
    <figure className={`image-wide my-8 ${className}`}>
      <div className="overflow-hidden rounded-lg">
        <img 
          src={src} 
          alt={alt}
          className="w-full h-auto object-cover"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-[#666666] mt-3 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
