import { Sparkles } from 'lucide-react';

export const LoadingSpinner: React.FC<{ message?: string }> = ({
  message = 'Loading...',
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 border-4 border-cheddar-gray-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-cheddar-orange border-r-orange-400 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-cheddar-orange animate-pulse" />
        </div>
      </div>
      <p
        className="text-lg text-cheddar-gray-700 font-medium text-center max-w-md"
        aria-live="polite"
        aria-busy="true"
      >
        {message}
      </p>
      <div className="flex gap-1 mt-4">
        <div
          className="w-2 h-2 bg-cheddar-orange rounded-full animate-bounce"
          style={{ animationDelay: '0ms' }}
        ></div>
        <div
          className="w-2 h-2 bg-cheddar-orange rounded-full animate-bounce"
          style={{ animationDelay: '150ms' }}
        ></div>
        <div
          className="w-2 h-2 bg-cheddar-orange rounded-full animate-bounce"
          style={{ animationDelay: '300ms' }}
        ></div>
      </div>
    </div>
  );
};
