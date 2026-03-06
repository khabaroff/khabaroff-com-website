import React from 'react';

interface TwoColumnsProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  children?: React.ReactNode;
  gap?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function TwoColumns({ left, right, children, gap = 'medium', className = '' }: TwoColumnsProps) {
  // If children is provided, split it into two columns
  const childArray = React.Children.toArray(children);
  const leftContent = left || childArray[0];
  const rightContent = right || childArray[1];

  const gapClasses = {
    small: 'gap-4 md:gap-6',
    medium: 'gap-6 md:gap-8',
    large: 'gap-8 md:gap-12'
  };

  return (
    <div className={`two-columns grid grid-cols-1 md:grid-cols-2 ${gapClasses[gap]} ${className}`}>
      <div className="column-left">{leftContent}</div>
      <div className="column-right">{rightContent}</div>
    </div>
  );
}
