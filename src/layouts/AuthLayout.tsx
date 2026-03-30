import { Outlet } from 'react-router-dom';
import OrbDecoration from '@/components/ui/OrbDecoration';

export default function AuthLayout() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-surface text-on-surface overflow-hidden">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <OrbDecoration
          color="primary"
          size="md"
          position={{ top: '10%', left: '20%' }}
        />
        <OrbDecoration
          color="secondary"
          size="md"
          position={{ bottom: '15%', right: '15%' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <Outlet />
      </div>
    </div>
  );
}
