import React from 'react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'success';
  children: React.ReactNode;
  className?: string;
}

export default function Callout({ type = 'info', children, className = '' }: CalloutProps) {
  const typeClasses = {
    info: 'bg-blue-50 border-l-4 border-blue-400 text-blue-800',
    warning: 'bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800',
    success: 'bg-green-50 border-l-4 border-green-400 text-green-800'
  };

  return (
    <div className={`callout p-4 rounded-r-lg my-6 ${typeClasses[type]} ${className}`}>
      {children}
    </div>
  );
}
