'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Building2, ArrowRight, AlertCircle, Check, Chrome, Linkedin } from 'lucide-react';
import { Logo } from '@/components/Logo';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        router.push('/dashboard/campaigns/new');
      } else {
        setError(data.error || 'Failed to create account');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    'AI-powered content generation',
    'Platform-safe posting rules',
    'Lead capture & nurturing',
    'Transparent reporting',
  ];

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/5 via-transparent to-brand-green/5" />

      {/* Left side - Benefits */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <div className="max-w-md">
          <Logo size="lg" />
          <h2 className="mt-8 text-3xl font-bold text-white">
            Social Automation
            <span className="text-gradient-brand"> Delivers Results</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Stop posting randomly. Start running outcome-driven campaigns.
          </p>

          <div className="mt-10 space-y-4">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-brand-teal/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-brand-teal" />
                </div>
                <span className="text-zinc-300">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="text-center mb-8 lg:hidden">
            <Link href="/" className="inline-block">
              <Logo size="lg" />
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Create your account</h1>
            <p className="text-zinc-400">Start your first campaign in minutes</p>
          </div>

          {/* Signup Form */}
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
                  onClick={() => { window.location.href = '/api/auth/oauth/google?mode=signup'; }}
                  className="w-full py-3 px-4 bg-dark-800 border border-white/10 rounded-xl text-white hover:bg-dark-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Chrome className="w-5 h-5 text-brand-teal" />
                  Continue with Google
                </button>
                <button
                  type="button"
                  onClick={() => { window.location.href = '/api/auth/oauth/linkedin?mode=signup'; }}
                  className="w-full py-3 px-4 bg-dark-800 border border-white/10 rounded-xl text-white hover:bg-dark-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Linkedin className="w-5 h-5 text-blue-400" />
                  Continue with LinkedIn
                </button>
              </div>

              <div className="flex items-center gap-3 text-xs text-zinc-500">
                <div className="flex-1 h-px bg-white/5" />
                or sign up with email
                <div className="flex-1 h-px bg-white/5" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Smith"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Company</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Inc."
                    className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    required
                    minLength={8}
                    className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors"
                  />
                </div>
                <p className="mt-2 text-xs text-zinc-500">Minimum 8 characters</p>
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
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="mt-4 text-xs text-zinc-500 text-center">
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>

          {/* Sign in link */}
          <p className="mt-8 text-center text-zinc-500">
            Already have an account?{' '}
            <Link href="/login" className="text-brand-teal hover:text-brand-green transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
