import React from 'react';
import HeroImage from './HeroImage';

interface PostHeaderProps {
  title: string;
  heroImage?: string;
  heroAlt?: string;
  category?: string;
  type?: string;
  date?: Date;
  className?: string;
}

export default function PostHeader({ 
  title, 
  heroImage, 
  heroAlt, 
  category, 
  type, 
  date,
  className = '' 
}: PostHeaderProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`post-header ${className}`}>
      {heroImage && (
        <div className="mb-8">
          <HeroImage 
            src={heroImage}
            alt={heroAlt || title}
            title={title}
          />
        </div>
      )}
      
      <div className="flex flex-col gap-4">
        {(category || type) && (
          <div className="flex items-center gap-3 flex-wrap">
            {category && (
              <span className="bg-[#F0F0F0] text-[#666] px-3 py-1 rounded-full text-sm font-medium">
                {category}
              </span>
            )}
            {type && (
              <span className="bg-[--color-primary] text-white px-3 py-1 rounded-full text-sm font-medium">
                {type}
              </span>
            )}
          </div>
        )}
        
        <h1 className="font-lora font-medium text-4xl md:text-5xl lg:text-[64px] leading-[1.1] text-black">
          {title}
        </h1>
        
        {date && (
          <time className="text-[#888888] text-[13px] font-medium">
            {formatDate(date)}
          </time>
        )}
      </div>
    </div>
  );
}
