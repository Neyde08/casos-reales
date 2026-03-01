export default function CaseCardSkeleton() {
  return (
    <div
      className="rounded-2xl overflow-hidden border h-full flex flex-col animate-pulse"
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--card-border)',
      }}
      aria-hidden="true"
      role="presentation"
    >
      {/* Image skeleton */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 skeleton" />

        {/* Badge skeleton */}
        <div className="absolute top-4 right-4">
          <div className="w-20 h-6 rounded-full skeleton" />
        </div>

        {/* Year & Location skeleton */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <div className="w-14 h-8 rounded-lg skeleton" />
          <div className="w-24 h-8 rounded-lg skeleton" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Type badge skeleton */}
        <div className="mb-3">
          <div className="w-28 h-7 rounded-lg skeleton" />
        </div>

        {/* Title skeleton */}
        <div className="mb-3 space-y-2">
          <div className="w-full h-5 rounded skeleton" />
          <div className="w-3/4 h-5 rounded skeleton" />
        </div>

        {/* Victim skeleton */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-7 h-7 rounded-lg skeleton flex-shrink-0" />
          <div className="w-32 h-4 rounded skeleton" />
        </div>

        {/* Summary skeleton */}
        <div className="space-y-2 mb-4">
          <div className="w-full h-4 rounded skeleton" />
          <div className="w-5/6 h-4 rounded skeleton" />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Footer skeleton */}
        <div
          className="mt-4 pt-4 border-t flex items-center justify-between"
          style={{ borderColor: 'var(--card-border)' }}
        >
          <div className="w-16 h-4 rounded skeleton" />
          <div className="w-20 h-4 rounded skeleton" />
        </div>
      </div>
    </div>
  )
}

export function CaseCardSkeletonGrid({ count = 4 }: { count?: number }) {
  return (
    <div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-label="Cargando casos..."
      aria-busy="true"
    >
      {Array.from({ length: count }).map((_, index) => (
        <CaseCardSkeleton key={index} />
      ))}
    </div>
  )
}
