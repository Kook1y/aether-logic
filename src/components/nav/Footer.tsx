export default function Footer() {
  const links = [
    { label: 'Documentation', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ];

  return (
    <footer className="w-full py-8 flex flex-col items-center gap-4 mt-auto z-10 text-[10px] tracking-widest uppercase">
      <div className="flex items-center gap-6">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-slate-600 hover:text-violet-300 opacity-50 hover:opacity-100 transition-all duration-200"
          >
            {link.label}
          </a>
        ))}
      </div>
      <p className="text-slate-500 opacity-50">
        &copy; 2025 Aether Logic. The clarity of a solved equation.
      </p>
    </footer>
  );
}
