import OrbDecoration from '@/components/ui/OrbDecoration';

export default function MathGridBg() {
  return (
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
  );
}
