import { motion } from 'framer-motion';
import GlassPanel from '@/components/ui/GlassPanel';
import GradientButton from '@/components/ui/GradientButton';
import ProgressBar from '@/components/ui/ProgressBar';
import { usePracticeStore } from '@/stores/practiceStore';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const velocityTopics = [
  { topic: 'VECTORS & MATRICES', progress: 88, color: 'secondary' as const },
  { topic: 'STOCHASTIC PROCESSES', progress: 42, color: 'primary' as const },
  { topic: 'COMPLEX NUMBERS', progress: 12, color: 'tertiary' as const },
];

export default function PracticePage() {
  const { practiceSets, pastPapers, resetFilters } = usePracticeStore();
  const featured = practiceSets.find((s) => s.isFeatured);

  return (
    <motion.div
      className="max-w-7xl mx-auto"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.header className="mb-12" variants={fadeUp}>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Practice & Past Papers
        </h1>
        <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
          Refine your understanding through rigorous application. Access a curated
          repository of global examinations and targeted problem sets.
        </p>
      </motion.header>

      {/* Filters */}
      <motion.section className="flex flex-wrap items-center gap-3 mb-10" variants={fadeUp}>
        <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/10">
          <span className="material-symbols-outlined text-sm text-primary">filter_alt</span>
          <span className="text-xs font-mono uppercase tracking-widest text-on-surface-variant">
            Filter By
          </span>
        </div>

        {[
          { label: 'Topic:', value: 'Calculus III', color: 'text-primary' },
          { label: 'Difficulty:', value: 'Advanced', color: 'text-secondary' },
          { label: 'Curriculum:', value: 'A-Level Further', color: 'text-primary-container' },
          { label: 'Year:', value: '2020 - 2024', color: 'text-on-surface-variant' },
        ].map((f) => (
          <button
            key={f.label}
            className="bg-surface-container-highest/50 backdrop-blur-md hover:bg-surface-bright/20 px-4 py-2 rounded-full text-sm text-on-surface transition-all border-t border-white/5"
          >
            {f.label} <span className={`font-medium ${f.color}`}>{f.value}</span>
          </button>
        ))}

        <button
          onClick={resetFilters}
          className="ml-auto flex items-center gap-1 text-primary hover:text-primary-container transition-colors text-sm font-medium"
        >
          <span className="material-symbols-outlined text-lg">restart_alt</span>
          Reset All
        </button>
      </motion.section>

      {/* Bento grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Featured practice set */}
        {featured && (
          <motion.div className="lg:col-span-8" variants={fadeUp}>
            <GlassPanel className="h-full relative overflow-hidden group" padding="p-8 md:p-10">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-[120px] text-primary">
                  calculate
                </span>
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-5">
                  <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase border border-secondary/20">
                    Recommended
                  </span>
                  <span className="text-on-surface-variant text-xs font-mono">
                    ESTIMATED TIME: {featured.estimatedMinutes} MIN
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
                  Mastering {featured.title}:
                  <br />
                  <span className="text-primary">{featured.subtitle}</span>
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div>
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-widest block">
                      Questions
                    </span>
                    <span className="text-xl font-mono">{featured.questionCount}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-widest block">
                      Success Rate
                    </span>
                    <span className="text-xl font-mono">{featured.successRate}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-widest block">
                      Difficulty
                    </span>
                    <span className="text-xl font-mono text-tertiary capitalize">
                      {featured.difficulty}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-widest block">
                      Points
                    </span>
                    <span className="text-xl font-mono">{featured.points}</span>
                  </div>
                </div>

                <div className="mt-auto flex items-center gap-4">
                  <GradientButton>
                    <span className="flex items-center gap-2">
                      Begin Session
                      <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </span>
                  </GradientButton>
                  <button className="bg-surface-container-high/60 backdrop-blur text-on-surface font-medium px-6 py-3 rounded-xl border-t border-white/10 hover:bg-surface-bright/20 transition-all">
                    Save for Later
                  </button>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        )}

        {/* Sidebar: Velocity + Streak */}
        <motion.div className="lg:col-span-4 flex flex-col gap-6" variants={fadeUp}>
          <GlassPanel>
            <h3 className="text-sm font-mono uppercase tracking-widest text-on-surface-variant mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">insights</span>
              Learning Velocity
            </h3>
            <div className="space-y-5">
              {velocityTopics.map((v) => (
                <div key={v.topic}>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span>{v.topic}</span>
                    <span
                      className={
                        v.color === 'primary'
                          ? 'text-primary'
                          : v.color === 'secondary'
                          ? 'text-secondary'
                          : 'text-tertiary'
                      }
                    >
                      {v.progress}%
                    </span>
                  </div>
                  <ProgressBar value={v.progress} color={v.color} />
                </div>
              ))}
            </div>
          </GlassPanel>

          <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
            <h3 className="text-lg font-bold mb-2">Practice Streak</h3>
            <p className="text-xs text-on-surface-variant mb-4">
              You've solved 14 problems in the last 48 hours. Keep the momentum.
            </p>
            <div className="flex gap-2">
              {['M', 'T', 'W'].map((day, i) => (
                <div
                  key={day}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    i < 2
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-high border border-primary/20 text-on-surface-variant'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Past Papers */}
        <motion.div className="lg:col-span-12 mt-6" variants={fadeUp}>
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-2xl font-bold">Past Examination Papers</h2>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-on-surface-variant">SORT BY:</span>
              <button className="text-primary">RECENTLY ADDED</button>
            </div>
          </div>

          <div className="space-y-3">
            {pastPapers.map((paper) => (
              <motion.div
                key={paper.id}
                whileHover={{ scale: 1.005 }}
                className="group flex items-center gap-5 p-5 rounded-2xl bg-surface-container-low hover:bg-surface-bright/10 transition-all border-t border-transparent hover:border-white/5 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0">
                  <span className="material-symbols-outlined">description</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-semibold truncate">{paper.title}</h4>
                  <p className="text-xs font-mono text-on-surface-variant uppercase tracking-widest mt-0.5">
                    {paper.curriculum} {paper.year} &bull; {paper.paperInfo}
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-10 mr-6">
                  <div className="text-right">
                    <span className="text-[10px] text-on-surface-variant uppercase block">
                      Submissions
                    </span>
                    <span className="font-mono text-sm">{paper.submissions}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-on-surface-variant uppercase block">
                      Avg. Score
                    </span>
                    <span className="font-mono text-sm text-secondary">{paper.avgScore}</span>
                  </div>
                </div>
                <button className="p-2 rounded-full hover:bg-primary/20 text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
