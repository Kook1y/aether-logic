import { useUIStore } from '../../stores/uiStore';

const navItems = [
  { icon: 'terminal', label: 'CMD', id: 'cmd' },
  { icon: 'function', label: 'VAR', id: 'var' },
  { icon: 'history', label: 'HIST', id: 'hist' },
  { icon: 'local_library', label: 'LIB', id: 'lib' },
] as const;

export default function SideNavBar() {
  const { focusMode, toggleCommandPalette } = useUIStore();

  if (focusMode) return null;

  const handleClick = (id: string) => {
    if (id === 'cmd') {
      toggleCommandPalette();
    }
  };

  return (
    <nav
      className="fixed left-0 top-0 bottom-0 w-20 hidden lg:flex flex-col items-center py-8 z-40
        bg-slate-950/20 backdrop-blur-2xl rounded-2xl m-4 h-[calc(100vh-2rem)]
        shadow-2xl shadow-purple-900/20"
    >
      {/* Top: Logo */}
      <div className="text-lg font-bold text-violet-200 select-none mb-8">A</div>

      {/* Middle: Icon buttons */}
      <div className="flex flex-col items-center gap-4 flex-1 justify-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className="flex flex-col items-center gap-1 p-3 rounded-xl
              text-slate-500 opacity-60 hover:opacity-100 hover:bg-white/5
              transition-all duration-200"
          >
            <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
            <span className="font-mono text-[8px] uppercase tracking-wider">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Bottom */}
      <div className="text-slate-600 opacity-40">
        <span className="material-symbols-outlined text-[18px]">more_horiz</span>
      </div>
    </nav>
  );
}
