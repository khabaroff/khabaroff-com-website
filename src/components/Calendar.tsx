import React from 'react';

interface CalendarProps {
  className?: string;
}

export default function Calendar({ className = '' }: CalendarProps) {
  return (
    <div className={`calendar-component ${className}`}>
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <span className="text-blue-700 font-medium">Событие</span>
        </div>
        <p className="text-blue-600 mt-2 text-sm">
          Это календарный компонент для демонстрации кастомных MDX компонентов.
        </p>
      </div>
    </div>
  );
}
