import React from 'react';

interface LinkItem {
  url: string;
  title: string;
  description?: string;
  type?: 'external' | 'internal';
}

interface LinkListProps {
  links: LinkItem[];
  title?: string;
  className?: string;
}

export default function LinkList({ links, title, className = '' }: LinkListProps) {
  return (
    <div className={`link-list ${className}`}>
      {title && (
        <h3 className="font-lora text-xl font-medium text-black mb-4">
          {title}
        </h3>
      )}
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <a 
              href={link.url}
              className="block p-4 border border-gray-200 rounded-lg hover:border-[--color-accent-green] hover:bg-[#FAFAFA] transition-colors group"
              target={link.type === 'external' ? '_blank' : '_self'}
              rel={link.type === 'external' ? 'noopener noreferrer' : undefined}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-black font-medium group-hover:text-[--color-primary] transition-colors">
                    {link.title}
                  </h4>
                  {link.description && (
                    <p className="text-[#666666] text-sm mt-1 leading-relaxed">
                      {link.description}
                    </p>
                  )}
                </div>
                {link.type === 'external' && (
                  <svg className="w-4 h-4 text-[#888888] mt-1 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                )}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
