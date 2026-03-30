import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import GlassPanel from '@/components/ui/GlassPanel';
import GradientButton from '@/components/ui/GradientButton';
import { useAuthStore } from '@/stores/authStore';

type Mode = 'signin' | 'signup';

export default function AuthPage() {
  const navigate = useNavigate();
  const { signIn, signUp, continueAsGuest, error, isLoading, clearError } = useAuthStore();
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const toggleMode = () => {
    setMode((m) => (m === 'signin' ? 'signup' : 'signin'));
    clearError();
    setLocalError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    if (!email.trim() || !password.trim()) {
      setLocalError('Please fill in all fields.');
      return;
    }

    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setLocalError('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        setLocalError('Password must be at least 6 characters.');
        return;
      }
      await signUp(email, password);
    } else {
      await signIn(email, password);
    }

    // Check if auth succeeded (no error set)
    const currentError = useAuthStore.getState().error;
    if (!currentError) {
      navigate('/');
    }
  };

  const handleGuest = () => {
    continueAsGuest();
    navigate('/');
  };

  const displayError = localError || error;

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <GlassPanel elevated className="w-full max-w-md" padding="p-8">
        {/* Branding */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-thin tracking-tight">
            Aether<span className="text-primary font-bold">Logic</span>
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant mt-2">
            {mode === 'signin' ? 'Welcome back' : 'Create your account'}
          </p>
        </div>

        {/* Mode toggle */}
        <div className="flex rounded-xl bg-surface-container-lowest/50 p-1 mb-8">
          <button
            onClick={() => mode !== 'signin' && toggleMode()}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              mode === 'signin'
                ? 'bg-surface-container-high text-on-surface shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => mode !== 'signup' && toggleMode()}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              mode === 'signup'
                ? 'bg-surface-container-high text-on-surface shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-surface-container-lowest border border-outline-variant/10 focus:border-secondary/40 rounded-xl px-4 py-3 font-mono text-sm text-on-surface placeholder:text-on-surface-variant/30 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-surface-container-lowest border border-outline-variant/10 focus:border-secondary/40 rounded-xl px-4 py-3 font-mono text-sm text-on-surface placeholder:text-on-surface-variant/30 outline-none transition-colors"
            />
          </div>

          <AnimatePresence>
            {mode === 'signup' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <label className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-surface-container-lowest border border-outline-variant/10 focus:border-secondary/40 rounded-xl px-4 py-3 font-mono text-sm text-on-surface placeholder:text-on-surface-variant/30 outline-none transition-colors"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error */}
          {displayError && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-error text-sm font-mono"
            >
              {displayError}
            </motion.p>
          )}

          {/* Submit */}
          <GradientButton
            type="submit"
            loading={isLoading}
            className="w-full"
          >
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </GradientButton>
        </form>

        {/* Guest option */}
        <div className="mt-6 text-center">
          <button
            onClick={handleGuest}
            className="text-on-surface-variant/50 hover:text-on-surface-variant text-sm font-mono transition-colors"
          >
            Continue as guest &rarr;
          </button>
        </div>
      </GlassPanel>
    </div>
  );
}
