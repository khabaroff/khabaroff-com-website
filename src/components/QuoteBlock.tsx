import React from 'react';

interface QuoteBlockProps {
  quote: string;
  author?: string;
  source?: string;
  type?: 'default' | 'large' | 'pullout';
  className?: string;
}

export default function QuoteBlock({ 
  quote, 
  author, 
  source, 
  type = 'default', 
  className = '' 
}: QuoteBlockProps) {
  const baseClasses = 'quote-block';
  const typeClasses = {
    default: 'border-l-4 border-[--color-accent-green] pl-6 py-4 my-6 bg-[#FAFAFA] rounded-r',
    large: 'border-l-4 border-[--color-primary] pl-8 py-6 my-8 bg-[#F5F5F5] rounded-r',
    pullout: 'text-center py-8 my-12 border-t border-b border-gray-200'
  };

  const textClasses = {
    default: 'text-lg leading-relaxed text-[#333333]',
    large: 'text-xl leading-relaxed text-[#1A1A1A] font-medium',
    pullout: 'text-2xl md:text-3xl leading-relaxed text-[#1A1A1A] font-lora font-medium'
  };

  return (
    <blockquote className={`${baseClasses} ${typeClasses[type]} ${className}`}>
      <p className={`${textClasses[type]} mb-4`}>
        "{quote}"
      </p>
      {(author || source) && (
        <footer className="text-sm text-[#666666]">
          {author && <cite className="font-medium not-italic">{author}</cite>}
          {author && source && <span className="mx-2">—</span>}
          {source && <span className="italic">{source}</span>}
        </footer>
      )}
    </blockquote>
  );
}
