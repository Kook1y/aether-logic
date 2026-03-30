import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useUIStore } from '../../stores/uiStore';

interface Command {
  id: string;
  label: string;
  icon: string;
  shortcut?: string;
  action: () => void;
}

export default function CommandPalette() {
  const { commandPaletteOpen, closePalette, toggleFocusMode } = useUIStore();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: Command[] = [
    {
      id: 'solve',
      label: 'Go to Solver',
      icon: 'psychology',
      shortcut: 'S',
      action: () => { navigate('/solve'); closePalette(); },
    },
    {
      id: 'graph',
      label: 'Go to Graph',
      icon: 'query_stats',
      shortcut: 'G',
      action: () => { navigate('/graph'); closePalette(); },
    },
    {
      id: 'practice',
      label: 'Go to Practice',
      icon: 'model_training',
      shortcut: 'P',
      action: () => { navigate('/practice'); closePalette(); },
    },
    {
      id: 'focus',
      label: 'Toggle Focus Mode',
      icon: 'visibility_off',
      shortcut: 'F',
      action: () => { toggleFocusMode(); closePalette(); },
    },
    {
      id: 'home',
      label: 'Go Home',
      icon: 'home',
      shortcut: 'H',
      action: () => { navigate('/'); closePalette(); },
    },
  ];

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    if (commandPaletteOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [commandPaletteOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        useUIStore.getState().toggleCommandPalette();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closePalette();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] bg-surface/80 backdrop-blur-md flex items-start justify-center pt-[20vh]"
          onClick={closePalette}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="glass-elevated rounded-2xl w-full max-w-lg overflow-hidden shadow-celestial-lg"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            <div className="p-4 border-b border-white/5">
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type a command..."
                className="w-full bg-transparent text-on-surface placeholder:text-on-surface-variant/50
                  outline-none font-mono text-sm"
              />
            </div>

            <div className="p-2 max-h-64 overflow-y-auto">
              {filtered.length === 0 && (
                <div className="px-4 py-6 text-center text-on-surface-variant/50 text-sm">
                  No commands found
                </div>
              )}
              {filtered.map((cmd, i) => (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left
                    transition-colors duration-100
                    ${i === selectedIndex ? 'bg-white/5 text-on-surface' : 'text-on-surface-variant hover:bg-white/5'}`}
                >
                  <span className="material-symbols-outlined text-[20px] opacity-60">
                    {cmd.icon}
                  </span>
                  <span className="flex-1 text-sm">{cmd.label}</span>
                  {cmd.shortcut && (
                    <kbd className="font-mono text-[10px] text-on-surface-variant/40 bg-surface-container-high/50 px-2 py-0.5 rounded">
                      {cmd.shortcut}
                    </kbd>
                  )}
                </button>
              ))}
            </div>

            <div className="px-4 py-2 border-t border-white/5 flex items-center gap-4 text-[10px] text-on-surface-variant/30 font-mono">
              <span>ESC close</span>
              <span>ENTER select</span>
              <span>ARROWS navigate</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
