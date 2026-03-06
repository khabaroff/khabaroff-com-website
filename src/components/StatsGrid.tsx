import React from 'react';

interface StatItem {
  value: string;
  label: string;
  description?: string;
}

interface StatsGridProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export default function StatsGrid({ stats, columns = 4, className = '' }: StatsGridProps) {
  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4'
  };

  return (
    <div className={`stats-grid ${className}`}>
      <div className={`grid ${gridClasses[columns]} gap-6 md:gap-8`}>
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="font-lora text-3xl md:text-5xl font-medium text-black mb-2">
              {stat.value}
            </div>
            <div className="text-[#666666] text-sm leading-relaxed mb-1">
              {stat.label}
            </div>
            {stat.description && (
              <div className="text-[#888888] text-xs leading-relaxed">
                {stat.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
