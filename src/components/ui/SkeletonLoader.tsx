export function SkeletonLoader() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg border border-gray-200">
          <div className="aspect-video bg-gray-200 rounded-t-lg" />
          <div className="p-6 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="flex justify-between items-center pt-2">
              <div className="h-3 bg-gray-200 rounded w-20" />
              <div className="h-3 bg-gray-200 rounded w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}