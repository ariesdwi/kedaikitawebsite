

export const ProductSkeleton = () => (
  <div className="rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10 animate-pulse">
    <div className="aspect-[4/3] bg-white/5" />
    <div className="p-8 space-y-4">
      <div className="h-6 w-3/4 bg-white/5 rounded-lg" />
      <div className="h-4 w-full bg-white/5 rounded-lg" />
      <div className="h-4 w-2/3 bg-white/5 rounded-lg" />
      <div className="h-8 w-1/3 bg-white/5 rounded-lg mt-4" />
    </div>
  </div>
);

export const CategorySkeleton = () => (
  <div className="container py-4 flex gap-4 overflow-hidden">
    {[1, 2, 3, 4, 5].map(i => (
      <div key={i} className="h-10 w-24 bg-white/5 rounded-full animate-pulse flex-shrink-0" />
    ))}
  </div>
);
