interface ChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  color?: 'primary' | 'secondary' | 'tertiary';
}

const colorMap = {
  primary: { bg: 'bg-primary/10', text: 'text-primary' },
  secondary: { bg: 'bg-secondary/10', text: 'text-secondary' },
  tertiary: { bg: 'bg-tertiary/10', text: 'text-tertiary' },
};

export default function Chip({
  label,
  active = false,
  onClick,
  color = 'primary',
}: ChipProps) {
  const colors = colorMap[color];

  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest
        transition-colors duration-200
        ${active
          ? `${colors.bg} ${colors.text}`
          : 'bg-surface-container-highest/50 text-on-surface-variant'}`}
    >
      {label}
    </button>
  );
}
