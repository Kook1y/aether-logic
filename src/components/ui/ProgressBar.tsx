interface ProgressBarProps {
  value: number;
  color?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
  showLabel?: boolean;
}

const colorStyles = {
  primary: {
    bg: 'bg-primary',
    shadow: 'shadow-[0_0_8px_rgba(208,188,255,0.4)]',
  },
  secondary: {
    bg: 'bg-secondary',
    shadow: 'shadow-[0_0_8px_rgba(204,194,220,0.4)]',
  },
  tertiary: {
    bg: 'bg-tertiary',
    shadow: 'shadow-[0_0_8px_rgba(239,184,200,0.4)]',
  },
};

export default function ProgressBar({
  value,
  color = 'primary',
  className = '',
  showLabel = false,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const { bg, shadow } = colorStyles[color];

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="text-xs text-on-surface-variant font-mono mb-1 text-right">
          {Math.round(clamped)}%
        </div>
      )}
      <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${bg} ${shadow} transition-all duration-500 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
