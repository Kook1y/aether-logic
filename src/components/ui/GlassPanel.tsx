import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  elevated?: boolean;
  padding?: string;
  rounded?: string;
  withGlow?: boolean;
  withEdge?: boolean;
}

export default function GlassPanel({
  children,
  className = '',
  elevated = false,
  padding = 'p-6',
  rounded = 'rounded-2xl',
  withGlow = false,
  withEdge = false,
}: GlassPanelProps) {
  const glassClass = elevated ? 'glass-elevated' : 'glass';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`${glassClass} ${padding} ${rounded} ${withGlow ? 'glass-inner-glow' : ''} relative ${className}`}
    >
      {withEdge && (
        <div className="refractive-edge absolute top-0 left-0 right-0 h-px rounded-t-2xl" />
      )}
      {children}
    </motion.div>
  );
}
