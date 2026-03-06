import React from 'react';

interface BookCardProps {
  title: string;
  author: string;
  cover?: string;
  rating?: number;
  year?: number;
  description?: string;
  quotes?: string[];
  amazonLink?: string;
  className?: string;
}

export default function BookCard({ 
  title, 
  author, 
  cover, 
  rating, 
  year, 
  description, 
  quotes,
  amazonLink,
  className = '' 
}: BookCardProps) {
  return (
    <div className={`book-card ${className}`}>
      <div className="flex flex-col md:flex-row gap-6 p-6 border border-gray-200 rounded-lg">
        {cover && (
          <div className="flex-shrink-0">
            <img 
              src={cover} 
              alt={`Обложка книги "${title}"`}
              className="w-32 h-48 object-cover rounded shadow-md"
            />
          </div>
        )}
        
        <div className="flex-1">
          <div className="mb-4">
            <h3 className="font-lora text-xl font-medium text-black mb-1">
              {title}
            </h3>
            <p className="text-[#666666] text-sm">
              {author}
              {year && <span className="ml-2">({year})</span>}
            </p>
          </div>

          {rating && (
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-[#666666]">{rating}/5</span>
            </div>
          )}

          {description && (
            <p className="text-[#666666] text-sm leading-relaxed mb-4">
              {description}
            </p>
          )}

          {quotes && quotes.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-black text-sm mb-2">Ключевые цитаты:</h4>
              {quotes.map((quote, index) => (
                <blockquote key={index} className="border-l-2 border-[--color-accent-green] pl-3 mb-2">
                  <p className="text-[#666666] text-sm italic leading-relaxed">
                    "{quote}"
                  </p>
                </blockquote>
              ))}
            </div>
          )}

          {amazonLink && (
            <a 
              href={amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[--color-primary] text-sm font-medium hover:opacity-70 transition-opacity"
            >
              Купить на Amazon
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
