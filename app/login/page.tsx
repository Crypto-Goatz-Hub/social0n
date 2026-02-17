'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, AlertCircle, Chrome, Linkedin } from 'lucide-react';
import { Logo } from '@/components/Logo';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        // VIP users go straight to dashboard; others check onboarding
        router.push((data.onboarding_completed || data.is_vip) ? '/dashboard' : '/onboarding');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/5 via-transparent to-brand-green/5" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <Logo size="lg" />
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-zinc-400">Sign in to manage your campaigns</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 border border-white/5">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div className="grid gap-3">
              <button
                type="button"
                onClick={() => { window.location.href = '/api/auth/oauth/google?mode=login'; }}
                className="w-full py-3 px-4 bg-dark-800 border border-white/10 rounded-xl text-white hover:bg-dark-700 transition-colors flex items-center justify-center gap-2"
              >
                <Chrome className="w-5 h-5 text-brand-teal" />
                Continue with Google
              </button>
              <button
                type="button"
                onClick={() => { window.location.href = '/api/auth/oauth/linkedin?mode=login'; }}
                className="w-full py-3 px-4 bg-dark-800 border border-white/10 rounded-xl text-white hover:bg-dark-700 transition-colors flex items-center justify-center gap-2"
              >
                <Linkedin className="w-5 h-5 text-blue-400" />
                Continue with LinkedIn
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <div className="flex-1 h-px bg-white/5" />
              or sign in with email
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-4 btn-gradient text-white rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <div className="mt-6 text-center">
            <Link href="/forgot-password" className="text-zinc-500 hover:text-brand-teal text-sm transition-colors">
              Forgot password?
            </Link>
          </div>
        </form>

        {/* Sign up link */}
        <p className="mt-8 text-center text-zinc-500">
          Don't have an account?{' '}
          <Link href="/signup" className="text-brand-teal hover:text-brand-green transition-colors">
            Start your first campaign
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
