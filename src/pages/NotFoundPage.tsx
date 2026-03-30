import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassPanel from '@/components/ui/GlassPanel';

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <GlassPanel className="text-center max-w-md" padding="p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-8xl font-thin text-primary mb-4">404</h1>
          <p className="font-mono text-on-surface-variant text-sm uppercase tracking-widest mb-8">
            Page not found
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-surface-container-high/60 hover:bg-white/5 px-6 py-3 rounded-xl text-sm font-medium transition-all border-t border-white/5"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to Home
          </Link>
        </motion.div>
      </GlassPanel>
    </div>
  );
}
