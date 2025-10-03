export const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="h-6 bg-secondary-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-secondary-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-secondary-200 rounded w-2/3 mb-4"></div>
          <div className="flex gap-2 mt-4">
            <div className="h-8 bg-secondary-200 rounded w-20"></div>
            <div className="h-8 bg-secondary-200 rounded w-20"></div>
            <div className="h-8 bg-secondary-200 rounded w-20"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
