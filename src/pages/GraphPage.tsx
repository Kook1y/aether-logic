import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGraphStore } from '@/stores/graphStore';
import { useGraph } from '@/hooks/useGraph';

export default function GraphPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  useGraph(containerRef);

  const { equations, sliders, updateSlider, updateEquation, cursorPos, resetViewport } =
    useGraphStore();

  return (
    <div className="relative w-full h-[calc(100vh-6rem)] overflow-hidden -mt-4">
      {/* Grid background */}
      <div className="absolute inset-0 math-grid opacity-30 pointer-events-none" />

      {/* Axis crosshairs */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-px bg-outline-variant/20" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-full w-px bg-outline-variant/20" />
      </div>

      {/* Graph canvas mount point */}
      <div ref={containerRef} className="absolute inset-0 z-10" />

      {/* Floating equation input panel */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="absolute top-28 left-6 lg:left-28 w-72 lg:w-80 space-y-4 z-20"
      >
        {equations.map((eq, i) => (
          <div
            key={eq.id}
            className="glass rounded-2xl p-4"
            style={{ borderLeft: `3px solid ${eq.color}` }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] tracking-widest text-on-surface-variant uppercase">
                Expression {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className="material-symbols-outlined text-sm"
                style={{ color: eq.color }}
              >
                check_circle
              </span>
            </div>
            <div className="bg-surface-container-lowest/60 rounded-xl p-3 flex items-center gap-3">
              <span className="font-mono text-lg" style={{ color: eq.color }}>
                y =
              </span>
              <input
                type="text"
                value={eq.expression}
                onChange={(e) =>
                  updateEquation(eq.id, { expression: e.target.value })
                }
                spellCheck={false}
                className="bg-transparent border-none outline-none text-on-surface font-mono text-base w-full"
              />
            </div>
          </div>
        ))}

        {/* Sliders panel */}
        <div className="glass rounded-2xl p-4 space-y-5">
          {sliders.map((slider) => (
            <div key={slider.id}>
              <div className="flex justify-between items-center mb-2">
                <label className="font-mono text-xs text-on-surface-variant">
                  {slider.name} ({slider.symbol})
                </label>
                <span className="font-mono text-primary text-sm">
                  {slider.value.toFixed(2)}
                </span>
              </div>
              <div className="relative h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary-container rounded-full"
                  style={{
                    width: `${((slider.value - slider.min) / (slider.max - slider.min)) * 100}%`,
                  }}
                />
              </div>
              <input
                type="range"
                min={slider.min}
                max={slider.max}
                step={slider.step}
                value={slider.value}
                onChange={(e) => updateSlider(slider.id, parseFloat(e.target.value))}
                className="w-full mt-1 accent-primary opacity-0 h-4 cursor-pointer absolute"
                style={{ marginTop: '-14px' }}
              />
            </div>
          ))}
        </div>

        {/* Variable tags */}
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1.5 bg-surface-container-highest/50 backdrop-blur-md rounded-full font-mono text-[10px] text-on-surface-variant flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            DOMAIN: [-10, 10]
          </span>
          <span className="px-3 py-1.5 bg-surface-container-highest/50 backdrop-blur-md rounded-full font-mono text-[10px] text-on-surface-variant flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            STEP: 0.01
          </span>
        </div>
      </motion.div>

      {/* Coordinate tooltip */}
      {cursorPos && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
          <div className="bg-surface-container/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 shadow-xl">
            <span className="font-mono text-[10px] text-on-surface">
              x: {cursorPos.x.toFixed(3)}, y: {cursorPos.y.toFixed(3)}
            </span>
          </div>
        </div>
      )}

      {/* Stats panel (bottom-right) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="absolute bottom-28 right-6 lg:right-8 w-56 lg:w-64 space-y-4 z-20"
      >
        <div className="glass rounded-xl p-4">
          <h4 className="font-mono text-[10px] uppercase text-on-surface-variant mb-3 tracking-wider">
            Point of Interest
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-xs">
              <span className="text-on-surface-variant/50">Root:</span>
              <span className="text-on-surface">(0.00, 0.00)</span>
            </div>
            <div className="flex justify-between font-mono text-xs">
              <span className="text-on-surface-variant/50">Peak:</span>
              <span className="text-on-surface">(1.57, 2.45)</span>
            </div>
            <div className="flex justify-between font-mono text-xs">
              <span className="text-on-surface-variant/50">Integral:</span>
              <span className="text-on-surface">4.90</span>
            </div>
          </div>
        </div>

        {/* Zoom controls */}
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => {
              const store = useGraphStore.getState();
              const { xMin, xMax, yMin, yMax } = store.viewport;
              const cx = (xMin + xMax) / 2;
              const cy = (yMin + yMax) / 2;
              const hw = (xMax - xMin) / 4;
              const hh = (yMax - yMin) / 4;
              store.setViewport({ xMin: cx - hw, xMax: cx + hw, yMin: cy - hh, yMax: cy + hh });
            }}
            className="w-10 h-10 flex items-center justify-center glass rounded-xl hover:bg-white/5 transition-all"
          >
            <span className="material-symbols-outlined text-primary text-xl">zoom_in</span>
          </button>
          <button
            onClick={() => {
              const store = useGraphStore.getState();
              const { xMin, xMax, yMin, yMax } = store.viewport;
              const cx = (xMin + xMax) / 2;
              const cy = (yMin + yMax) / 2;
              const hw = (xMax - xMin);
              const hh = (yMax - yMin);
              store.setViewport({ xMin: cx - hw, xMax: cx + hw, yMin: cy - hh, yMax: cy + hh });
            }}
            className="w-10 h-10 flex items-center justify-center glass rounded-xl hover:bg-white/5 transition-all"
          >
            <span className="material-symbols-outlined text-primary text-xl">zoom_out</span>
          </button>
          <button
            onClick={resetViewport}
            className="w-10 h-10 flex items-center justify-center glass rounded-xl hover:bg-white/5 transition-all"
          >
            <span className="material-symbols-outlined text-primary text-xl">
              center_focus_strong
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
