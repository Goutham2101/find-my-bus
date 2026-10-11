import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading bus details...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <Loader2 className="w-10 h-10 text-blue-700 animate-spin mb-3" />
      <p className="text-sm font-medium text-slate-600">{message}</p>
    </div>
  );
};
