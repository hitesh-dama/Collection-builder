export const SkeletonLoader = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Hero image skeleton */}
      <div className="w-full h-64 bg-gradient-to-r from-cheddar-gray-200 via-cheddar-gray-100 to-cheddar-gray-200 rounded-lg animate-shimmer bg-[length:1000px_100%]" />
      
      {/* Title skeleton */}
      <div className="h-8 w-3/4 bg-gradient-to-r from-cheddar-gray-200 via-cheddar-gray-100 to-cheddar-gray-200 rounded animate-shimmer bg-[length:1000px_100%]" />
      
      {/* Description skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-full bg-gradient-to-r from-cheddar-gray-200 via-cheddar-gray-100 to-cheddar-gray-200 rounded animate-shimmer bg-[length:1000px_100%]" />
        <div className="h-4 w-5/6 bg-gradient-to-r from-cheddar-gray-200 via-cheddar-gray-100 to-cheddar-gray-200 rounded animate-shimmer bg-[length:1000px_100%]" />
      </div>

      {/* Donation panel skeleton */}
      <div className="border border-cheddar-gray-200 rounded-lg p-6 space-y-3">
        <div className="h-6 w-1/3 bg-gradient-to-r from-cheddar-gray-200 via-cheddar-gray-100 to-cheddar-gray-200 rounded animate-shimmer bg-[length:1000px_100%]" />
        <div className="h-4 w-1/2 bg-gradient-to-r from-cheddar-gray-200 via-cheddar-gray-100 to-cheddar-gray-200 rounded animate-shimmer bg-[length:1000px_100%]" />
      </div>
    </div>
  );
};
