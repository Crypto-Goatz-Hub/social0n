'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, AlertCircle, Zap, Shield, Globe, Check } from 'lucide-react';
import { Logo } from '@/components/Logo';

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const error = searchParams.get('error');

  useEffect(() => {
    // Check if already onboarded
    fetch('/api/auth/session')
      .then(res => res.json())
      .then(data => {
        if (!data.authenticated) {
          router.push('/login');
        } else if (data.user?.onboarding_completed) {
          router.push('/dashboard');
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        router.push('/login');
      });
  }, [router]);

  const handleConnect = () => {
    setConnecting(true);
    window.location.href = '/api/crm/connect';
  };

  const steps = [
    {
      icon: Globe,
      title: 'Create Your Account',
      description: 'Set up your business profile with social media access',
    },
    {
      icon: Shield,
      title: 'Connect Platforms',
      description: 'Link your Facebook, Instagram, LinkedIn, and Google Business',
    },
    {
      icon: Zap,
      title: 'Launch Campaigns',
      description: 'AI generates and publishes content on autopilot',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-teal/30 border-t-brand-teal rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/5 via-transparent to-brand-green/5" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <Logo size="lg" />
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Connect Your Business</h1>
          <p className="text-zinc-400">
            One more step to start running AI-powered campaigns
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400">
            <AlertCircle className="w-5 h-5" />
            {error === 'connect_failed' && 'Connection failed. Please try again.'}
            {error === 'invalid_state' && 'Session expired. Please try again.'}
            {error === 'no_location' && 'No business location found. Please complete setup.'}
            {error === 'callback_failed' && 'Something went wrong. Please try again.'}
            {!['connect_failed', 'invalid_state', 'no_location', 'callback_failed'].includes(error) && 'An error occurred. Please try again.'}
          </div>
        )}

        <div className="glass-card rounded-2xl p-8 border border-white/5">
          {/* Steps */}
          <div className="space-y-6 mb-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      i === 0 ? 'bg-gradient-to-br from-brand-teal to-brand-green' : 'bg-white/5'
                    }`}>
                      {i === 0 ? (
                        <Icon className="w-5 h-5 text-white" />
                      ) : (
                        <Icon className="w-5 h-5 text-zinc-500" />
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className={`font-medium ${i === 0 ? 'text-white' : 'text-zinc-400'}`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-zinc-500 mt-0.5">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* What you get */}
          <div className="p-4 bg-brand-teal/5 border border-brand-teal/20 rounded-xl mb-8">
            <p className="text-sm font-medium text-brand-teal mb-3">Your subscription includes:</p>
            <div className="space-y-2">
              {[
                'AI-powered content generation',
                'Multi-platform social posting',
                'Campaign analytics & reporting',
                'Lead capture automation',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-zinc-300">
                  <Check className="w-4 h-4 text-brand-green flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleConnect}
            disabled={connecting}
            className="w-full py-4 btn-gradient text-white rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {connecting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Connect & Subscribe
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <p className="mt-4 text-xs text-zinc-500 text-center">
            You'll be redirected to complete your business setup and subscription
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-dark-900 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-brand-teal/30 border-t-brand-teal rounded-full animate-spin" />
        </div>
      }
    >
      <OnboardingContent />
    </Suspense>
  );
}
