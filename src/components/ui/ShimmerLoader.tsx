interface ShimmerLoaderProps {
  lines?: number;
  className?: string;
}

const widths = ['w-full', 'w-4/5', 'w-3/5'];

export default function ShimmerLoader({
  lines = 3,
  className = '',
}: ShimmerLoaderProps) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-4 rounded bg-surface-container-high animate-shimmer ${widths[i % widths.length]}`}
        />
      ))}
    </div>
  );
}
