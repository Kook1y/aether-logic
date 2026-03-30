import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import TopNavBar from '@/components/nav/TopNavBar';
import SideNavBar from '@/components/nav/SideNavBar';
import Footer from '@/components/nav/Footer';
import CommandPalette from '@/components/ui/CommandPalette';
import OrbDecoration from '@/components/ui/OrbDecoration';
import { useCommandPalette } from '@/hooks/useCommandPalette';

export default function RootLayout() {
  const location = useLocation();
  useCommandPalette();

  return (
    <div className="relative min-h-screen bg-surface text-on-surface overflow-x-hidden">
      {/* Fixed background layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="math-grid absolute inset-0 opacity-20" />
        <OrbDecoration
          color="primary"
          size="lg"
          position={{ top: '-10%', left: '-5%' }}
        />
        <OrbDecoration
          color="secondary"
          size="lg"
          position={{ bottom: '-10%', right: '-5%' }}
        />
      </div>

      {/* Decorative floating math equations */}
      <div className="fixed left-4 top-1/4 hidden xl:block pointer-events-none z-0 opacity-5 font-mono text-xs leading-relaxed text-on-surface-variant select-none">
        <p>&nabla; &times; E = -&part;B/&part;t</p>
        <p className="mt-2">&nabla; &middot; B = 0</p>
        <p className="mt-2">&nabla; &times; H = J + &part;D/&part;t</p>
        <p className="mt-2">&nabla; &middot; D = &rho;</p>
      </div>
      <div className="fixed right-4 top-1/3 hidden xl:block pointer-events-none z-0 opacity-5 font-mono text-xs leading-relaxed text-on-surface-variant text-right select-none">
        <p>e^(i&pi;) + 1 = 0</p>
        <p className="mt-2">E = mc&sup2;</p>
        <p className="mt-2">&zeta;(s) = &Sigma; n^(-s)</p>
        <p className="mt-2">&int; e^(-x&sup2;) dx = &radic;&pi;</p>
      </div>

      {/* Navigation */}
      <SideNavBar />
      <TopNavBar />

      {/* Main content area */}
      <main className="relative z-10 pl-0 lg:pl-24 pt-24 pb-20 px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <CommandPalette />
    </div>
  );
}
