import type { ReactNode } from 'react';

interface GlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  active?: boolean;
}

export default function GlassButton({
  children,
  onClick,
  className = '',
  active = false,
}: GlassButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`backdrop-blur-xl border-t border-white/5 px-4 py-2 rounded-xl
        transition-colors duration-200
        ${active
          ? 'bg-primary/10 text-primary'
          : 'bg-surface-variant/30 hover:bg-white/5 text-on-surface-variant'}
        ${className}`}
    >
      {children}
    </button>
  );
}
