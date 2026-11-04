export function ProductCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex h-full flex-col rounded-2xl border border-border bg-surface p-3 shadow-card md:p-4"
    >
      <div className="skeleton aspect-[4/3] w-full rounded-xl motion-safe:animate-shimmer" />
      <div className="skeleton mt-4 h-6 w-2/3 rounded-full motion-safe:animate-shimmer" />
      <div className="skeleton mt-2 h-4 w-full rounded-full motion-safe:animate-shimmer" />
      <div className="skeleton mt-1 h-4 w-4/5 rounded-full motion-safe:animate-shimmer" />
      <div className="mt-auto flex items-end justify-between pt-4">
        <div className="skeleton h-6 w-20 rounded-full motion-safe:animate-shimmer" />
        <div className="skeleton h-11 w-28 rounded-full motion-safe:animate-shimmer" />
      </div>
    </div>
  );
}
 
export default ProductCardSkeleton;