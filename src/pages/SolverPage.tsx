import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import GlassPanel from '@/components/ui/GlassPanel';
import GradientButton from '@/components/ui/GradientButton';
import Chip from '@/components/ui/Chip';
import MathText from '@/components/ui/MathText';
import ShimmerLoader from '@/components/ui/ShimmerLoader';
import { useSolverStore } from '@/stores/solverStore';
import type { Topic } from '@/types/solver';

const topics: { label: string; value: Topic; color: 'primary' | 'secondary' | 'tertiary' }[] = [
  { label: 'Calculus', value: 'calculus', color: 'primary' },
  { label: 'Algebra', value: 'algebra', color: 'secondary' },
  { label: 'Statistics', value: 'statistics', color: 'tertiary' },
];

const stepColors: Record<string, string> = {
  primary: 'border-primary text-primary',
  secondary: 'border-secondary text-secondary',
  tertiary: 'border-tertiary text-tertiary',
};

const stepLineColors: Record<string, string> = {
  primary: 'from-primary/40',
  secondary: 'from-secondary/40',
  tertiary: 'from-tertiary/40',
};

export default function SolverPage() {
  const location = useLocation();
  const {
    input, topic, steps, finalResult, finalLabel,
    isLoading, isComplete,
    setInput, setTopic, compute, toggleStep,
  } = useSolverStore();

  const [showExplain, setShowExplain] = useState(false);

  // If we arrived with state from the landing page input
  useEffect(() => {
    const passedInput = (location.state as { input?: string } | null)?.input;
    if (passedInput) {
      setInput(passedInput);
    }
  }, [location.state, setInput]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 min-h-[calc(100vh-8rem)]">
      {/* LEFT: Problem Input */}
      <div className="md:col-span-5">
        <GlassPanel className="h-full flex flex-col">
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-1">
            Problem Input
          </p>
          <h2 className="text-2xl font-bold mb-6">Define the Equation</h2>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={'f(x) = \\int e^{-x^2} dx'}
            className="flex-1 min-h-[200px] w-full bg-surface-container-lowest/50 rounded-xl p-4 font-mono text-2xl text-on-surface placeholder:text-on-surface-variant/30 outline-none resize-none border border-outline-variant/10 focus:border-primary/30 transition-colors"
          />

          <div className="flex items-center justify-between mt-6 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              {topics.map((t) => (
                <Chip
                  key={t.value}
                  label={t.label}
                  color={t.color}
                  active={topic === t.value}
                  onClick={() => setTopic(t.value)}
                />
              ))}
            </div>

            <GradientButton onClick={compute} disabled={isLoading || !input.trim()}>
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                Compute Solution
              </span>
            </GradientButton>
          </div>
        </GlassPanel>
      </div>

      {/* RIGHT: Analysis */}
      <div className="md:col-span-7">
        <GlassPanel className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-secondary mb-1">
                Analysis Complete
              </p>
              <h2 className="text-2xl font-bold">Iterative Breakdown</h2>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-on-surface-variant/50">
                <span className="material-symbols-outlined text-[20px]">share</span>
              </button>
              <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-on-surface-variant/50">
                <span className="material-symbols-outlined text-[20px]">print</span>
              </button>
            </div>
          </div>

          {/* Steps */}
          <div className="flex-1 overflow-y-auto">
            {steps.length === 0 && !isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-on-surface-variant/30 gap-3">
                <span className="material-symbols-outlined text-5xl">function</span>
                <p className="font-mono text-sm">Enter an equation and compute to see the breakdown</p>
              </div>
            )}

            {isLoading && steps.length === 0 && (
              <ShimmerLoader lines={5} />
            )}

            <AnimatePresence>
              {steps.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex gap-4 mb-2"
                >
                  {/* Step number + connecting line */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => toggleStep(step.id)}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono text-xs shrink-0 ${stepColors[step.accentColor]}`}
                    >
                      {step.id}
                    </button>
                    {i < steps.length - 1 && (
                      <div className={`w-px flex-1 min-h-[24px] bg-gradient-to-b ${stepLineColors[step.accentColor]} to-transparent`} />
                    )}
                  </div>

                  {/* Step content */}
                  <div className="flex-1 pb-4">
                    <button
                      onClick={() => toggleStep(step.id)}
                      className="text-left w-full"
                    >
                      <p className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant/50 mb-0.5">
                        {step.title}
                      </p>
                    </button>

                    <AnimatePresence>
                      {step.isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
                            {step.explanation}
                          </p>
                          <div className="bg-surface-container-lowest/50 rounded-xl px-4 py-3">
                            <MathText tex={step.latex} display className="text-on-surface" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && steps.length > 0 && (
              <div className="flex items-center gap-3 mt-4 text-on-surface-variant/50">
                <div className="w-5 h-5 border-2 border-primary/40 border-t-primary rounded-full animate-spin" />
                <span className="font-mono text-xs">Computing next step...</span>
              </div>
            )}
          </div>

          {/* Final result */}
          <AnimatePresence>
            {isComplete && finalResult && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-6 glass rounded-xl p-5 flex items-center gap-5"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(208,188,255,0.15)]">
                  <span className="material-symbols-outlined text-primary">
                    signature
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant/50 mb-1">
                    {finalLabel || 'Final Result'}
                  </p>
                  <MathText tex={finalResult} display className="text-2xl font-mono font-bold" />
                </div>
                <button
                  onClick={() => setShowExplain(!showExplain)}
                  className="px-4 py-2 rounded-xl bg-surface-container-highest/50 hover:bg-white/5 transition-colors font-mono text-xs uppercase tracking-widest text-on-surface-variant"
                >
                  Explain Why
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassPanel>
      </div>
    </div>
  );
}
