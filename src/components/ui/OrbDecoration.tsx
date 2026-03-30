import { motion } from 'framer-motion';

interface OrbDecorationProps {
  color: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  position: { top?: string; left?: string; right?: string; bottom?: string };
}

const colorMap = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
};

const sizeMap = {
  sm: { dimensions: 'w-32 h-32', blur: 'blur-[120px]', opacity: 'opacity-[0.08]' },
  md: { dimensions: 'w-64 h-64', blur: 'blur-[120px]', opacity: 'opacity-[0.06]' },
  lg: { dimensions: 'w-96 h-96', blur: 'blur-[160px]', opacity: 'opacity-[0.05]' },
};

export default function OrbDecoration({
  color,
  size = 'md',
  className = '',
  position,
}: OrbDecorationProps) {
  const { dimensions, blur, opacity } = sizeMap[size];

  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={position}
      className={`absolute rounded-full ${colorMap[color]} ${dimensions} ${blur} ${opacity} pointer-events-none ${className}`}
    />
  );
}
