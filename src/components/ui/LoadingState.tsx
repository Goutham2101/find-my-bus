import React from 'react';

export interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  fullPage?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading details, please wait...',
  size = 'md',
  fullPage = false,
}) => {
  const spinnerSizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-14 h-14 border-4',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base font-medium',
    lg: 'text-lg font-semibold',
  };

  const container = (
    <div className="flex flex-col items-center justify-center p-8 text-center" role="status" aria-live="polite">
      <div
        className={`${spinnerSizes[size]} border-blue-200 border-t-blue-700 rounded-full animate-spin mb-4`}
        aria-hidden="true"
      />
      <p className={`text-slate-700 ${textSizes[size]}`}>{message}</p>
      <span className="sr-only">Loading content</span>
    </div>
  );

  if (fullPage) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center w-full">
        {container}
      </div>
    );
  }

  return container;
};
