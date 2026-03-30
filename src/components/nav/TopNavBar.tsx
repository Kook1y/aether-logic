import { NavLink } from 'react-router-dom';
import { useUIStore } from '../../stores/uiStore';

const navLinks = [
  { to: '/solve', label: 'Solve' },
  { to: '/graph', label: 'Graph' },
  { to: '/practice', label: 'Practice' },
  { to: '/auth', label: 'Profile' },
];

export default function TopNavBar() {
  const focusMode = useUIStore((s) => s.focusMode);

  if (focusMode) return null;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-3
        bg-slate-900/40 backdrop-blur-xl rounded-full mt-4 mx-auto max-w-4xl
        border-t border-white/10 shadow-[0_0_40px_rgba(208,188,255,0.06)]"
    >
      {/* Left: Logo */}
      <span className="text-xl font-light tracking-widest text-on-surface select-none">
        Aether Logic
      </span>

      {/* Center: Nav Links */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `text-sm transition-colors duration-200 ${
                isActive
                  ? 'text-white font-medium border-b border-violet-400 pb-1'
                  : 'text-slate-400 hover:text-white'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* Right: Icon buttons */}
      <div className="flex items-center gap-2">
        <button className="text-violet-300 p-2 rounded-lg hover:bg-white/5 transition-colors hidden md:block">
          <span className="material-symbols-outlined text-[20px]">settings</span>
        </button>
        <button className="text-violet-300 p-2 rounded-lg hover:bg-white/5 transition-colors md:hidden">
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>
      </div>
    </nav>
  );
}
