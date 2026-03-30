import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassButton from '@/components/ui/GlassButton';

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const features = [
  {
    icon: 'all_inclusive',
    label: 'Constant Evolution',
    labelColor: 'text-primary',
    description: 'Infinite variable support with dynamic symbolic algebra capable of expanding to any dimensionality.',
  },
  {
    icon: 'high_quality',
    label: 'High Fidelity',
    labelColor: 'text-secondary',
    description: 'Render 4D manifolds and complex surfaces with sub-pixel precision and real-time interactivity.',
  },
  {
    icon: 'auto_awesome',
    label: 'Clarity Engine',
    labelColor: 'text-tertiary',
    description: 'Step-by-step proofs with natural language explanations that illuminate every transformation.',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    if (query.trim()) {
      navigate('/solve', { state: { input: query } });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] gap-16 max-w-5xl mx-auto"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      {/* Hero */}
      <motion.div className="text-center" variants={fadeUp}>
        <h1 className="text-6xl md:text-8xl font-thin tracking-tight select-none">
          Aether<span className="text-primary font-bold">Logic</span>
        </h1>
        <p className="mt-4 font-mono text-on-surface-variant text-sm md:text-base tracking-widest uppercase">
          The Engine of Absolute Precision
        </p>
      </motion.div>

      {/* Central glass input panel */}
      <motion.div
        className="glass w-full max-w-3xl rounded-2xl p-1 relative overflow-hidden"
        variants={fadeUp}
      >
        {/* Refractive top edge */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="flex items-center gap-3 px-5 py-4">
          <span className="material-symbols-outlined text-on-surface-variant/50 text-2xl">
            calculate
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask any mathematical question..."
            className="flex-1 bg-transparent text-xl font-mono text-on-surface placeholder:text-on-surface-variant/30 outline-none"
          />
          <button
            onClick={handleSubmit}
            className="bg-primary-container text-on-primary-container rounded-xl p-3 hover:brightness-110 transition-all"
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </motion.div>

      {/* Quick action buttons */}
      <motion.div className="flex items-center gap-4 flex-wrap justify-center" variants={fadeUp}>
        <GlassButton onClick={() => navigate('/solve')} className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[18px]">psychology</span>
          <span className="font-mono text-xs uppercase tracking-widest">Solve</span>
        </GlassButton>
        <GlassButton onClick={() => navigate('/graph')} className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[18px]">query_stats</span>
          <span className="font-mono text-xs uppercase tracking-widest">Graph</span>
        </GlassButton>
        <GlassButton onClick={() => navigate('/practice')} className="flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary text-[18px]">model_training</span>
          <span className="font-mono text-xs uppercase tracking-widest">Practice</span>
        </GlassButton>
      </motion.div>

      {/* Feature cards */}
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full" variants={fadeUp}>
        {features.map((f) => (
          <div
            key={f.label}
            className="glass rounded-2xl p-6 relative overflow-hidden group"
          >
            {/* Faded icon top-right */}
            <span className="material-symbols-outlined absolute top-4 right-4 text-5xl text-on-surface-variant/5 group-hover:text-on-surface-variant/10 transition-colors">
              {f.icon}
            </span>

            <p className={`font-mono text-[10px] uppercase tracking-widest ${f.labelColor} mb-2`}>
              {f.label}
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
