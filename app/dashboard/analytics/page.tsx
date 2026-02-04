'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, BarChart3 } from 'lucide-react';

export default function AnalyticsDashboard() {
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 300);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-zinc-400 mt-1">Track your site performance and conversions</p>
        </div>

        <button
          onClick={handleRefresh}
          className="p-2.5 glass-card rounded-xl border border-white/5 text-zinc-400 hover:text-white transition-colors"
          aria-label="Refresh"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-10 border border-white/5 text-center"
      >
        <div className="mx-auto mb-4 w-12 h-12 rounded-xl bg-brand-teal/10 flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-brand-teal" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Analytics not connected yet</h3>
        <p className="text-zinc-400">
          Add your GA4 measurement ID and CRO9 site ID in production to start tracking.
        </p>
      </motion.div>
    </div>
  );
}
