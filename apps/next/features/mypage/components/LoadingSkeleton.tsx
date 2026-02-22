export function LoadingSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="読み込み中">
      <div className="h-10 w-48 animate-pulse rounded bg-slate-200" />
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-28 animate-pulse rounded-2xl border border-slate-200 bg-slate-100"
          />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="h-56 animate-pulse rounded-2xl border border-slate-200 bg-slate-100" />
        <div className="h-56 animate-pulse rounded-2xl border border-slate-200 bg-slate-100" />
      </div>
    </div>
  );
}
