'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Users,
  Eye,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Globe,
  Smartphone,
  Monitor,
  RefreshCw,
} from 'lucide-react';

// ============================================================
// Analytics Dashboard
// ============================================================
// Unified analytics view for campaigns, website traffic, and conversions
// Template system for all RocketOpp SaaS sites
// ============================================================

interface AnalyticsSummary {
  pageviews: number;
  uniqueVisitors: number;
  avgSessionDuration: number;
  bounceRate: number;
  conversions: number;
  conversionRate: number;
}

interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
}

interface PageMetric {
  path: string;
  views: number;
  avgTime: number;
}

interface DeviceBreakdown {
  device: string;
  percentage: number;
  icon: React.ComponentType<{ className?: string }>;
}

export default function AnalyticsDashboard() {
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [trafficSources, setTrafficSources] = useState<TrafficSource[]>([]);
  const [topPages, setTopPages] = useState<PageMetric[]>([]);
  const [devices, setDevices] = useState<DeviceBreakdown[]>([]);

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      // In production, this would call your analytics API
      // For now, using mock data
      await new Promise((resolve) => setTimeout(resolve, 500));

      setSummary({
        pageviews: 12847,
        uniqueVisitors: 4823,
        avgSessionDuration: 142,
        bounceRate: 38.5,
        conversions: 127,
        conversionRate: 2.63,
      });

      setTrafficSources([
        { source: 'Google Search', visitors: 2341, percentage: 48.5 },
        { source: 'Direct', visitors: 1205, percentage: 25.0 },
        { source: 'LinkedIn', visitors: 723, percentage: 15.0 },
        { source: 'Twitter', visitors: 312, percentage: 6.5 },
        { source: 'Other', visitors: 242, percentage: 5.0 },
      ]);

      setTopPages([
        { path: '/', views: 5231, avgTime: 45 },
        { path: '/signup', views: 1823, avgTime: 120 },
        { path: '/dashboard', views: 1456, avgTime: 340 },
        { path: '/pricing', views: 892, avgTime: 89 },
        { path: '/login', views: 678, avgTime: 32 },
      ]);

      setDevices([
        { device: 'Desktop', percentage: 62, icon: Monitor },
        { device: 'Mobile', percentage: 31, icon: Smartphone },
        { device: 'Tablet', percentage: 7, icon: Globe },
      ]);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const StatCard = ({
    label,
    value,
    change,
    icon: Icon,
    format,
  }: {
    label: string;
    value: number;
    change?: number;
    icon: React.ComponentType<{ className?: string }>;
    format?: 'number' | 'percent' | 'duration';
  }) => {
    const formattedValue =
      format === 'percent'
        ? `${value.toFixed(1)}%`
        : format === 'duration'
        ? formatDuration(value)
        : value.toLocaleString();

    const isPositive = change && change > 0;
    const isNegative = change && change < 0;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6 border border-white/5"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-brand-teal/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-brand-teal" />
          </div>
          {change !== undefined && (
            <div
              className={`flex items-center gap-1 text-sm ${
                isPositive ? 'text-green-400' : isNegative ? 'text-red-400' : 'text-zinc-500'
              }`}
            >
              {isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : isNegative ? (
                <TrendingDown className="w-4 h-4" />
              ) : null}
              {Math.abs(change)}%
            </div>
          )}
        </div>
        <p className="text-2xl font-bold text-white">{formattedValue}</p>
        <p className="text-sm text-zinc-500 mt-1">{label}</p>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-brand-teal/30 border-t-brand-teal rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-zinc-400 mt-1">Track your site performance and conversions</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Period Selector */}
          <div className="flex items-center glass-card rounded-xl p-1 border border-white/5">
            {(['7d', '30d', '90d'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  period === p
                    ? 'bg-brand-teal/20 text-brand-teal'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : '90 Days'}
              </button>
            ))}
          </div>

          <button
            onClick={fetchAnalytics}
            className="p-2.5 glass-card rounded-xl border border-white/5 text-zinc-400 hover:text-white transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      {summary && (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard
            label="Page Views"
            value={summary.pageviews}
            change={12.5}
            icon={Eye}
          />
          <StatCard
            label="Unique Visitors"
            value={summary.uniqueVisitors}
            change={8.3}
            icon={Users}
          />
          <StatCard
            label="Avg. Session"
            value={summary.avgSessionDuration}
            change={5.2}
            icon={Clock}
            format="duration"
          />
          <StatCard
            label="Bounce Rate"
            value={summary.bounceRate}
            change={-2.1}
            icon={TrendingDown}
            format="percent"
          />
          <StatCard
            label="Conversions"
            value={summary.conversions}
            change={15.8}
            icon={ArrowUpRight}
          />
          <StatCard
            label="Conversion Rate"
            value={summary.conversionRate}
            change={4.2}
            icon={BarChart3}
            format="percent"
          />
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl border border-white/5 overflow-hidden"
        >
          <div className="p-6 border-b border-white/5">
            <h2 className="text-lg font-semibold text-white">Traffic Sources</h2>
          </div>
          <div className="p-6 space-y-4">
            {trafficSources.map((source) => (
              <div key={source.source}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-zinc-300">{source.source}</span>
                  <span className="text-sm text-zinc-500">
                    {source.visitors.toLocaleString()} ({source.percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-dark-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-teal to-brand-green rounded-full transition-all"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl border border-white/5 overflow-hidden"
        >
          <div className="p-6 border-b border-white/5">
            <h2 className="text-lg font-semibold text-white">Top Pages</h2>
          </div>
          <div className="divide-y divide-white/5">
            {topPages.map((page) => (
              <div
                key={page.path}
                className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-white">{page.path}</p>
                  <p className="text-xs text-zinc-500">{formatDuration(page.avgTime)} avg. time</p>
                </div>
                <p className="text-sm text-zinc-400">{page.views.toLocaleString()} views</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Device Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl border border-white/5 overflow-hidden"
        >
          <div className="p-6 border-b border-white/5">
            <h2 className="text-lg font-semibold text-white">Device Breakdown</h2>
          </div>
          <div className="p-6 space-y-4">
            {devices.map((device) => {
              const Icon = device.icon;
              return (
                <div key={device.device} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-dark-800 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-zinc-300">{device.device}</span>
                      <span className="text-sm text-zinc-500">{device.percentage}%</span>
                    </div>
                    <div className="h-2 bg-dark-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-teal to-brand-green rounded-full"
                        style={{ width: `${device.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary Circle */}
          <div className="p-6 border-t border-white/5">
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90">
                  {devices.map((device, index) => {
                    const offset = devices
                      .slice(0, index)
                      .reduce((sum, d) => sum + d.percentage, 0);
                    const circumference = 2 * Math.PI * 50;
                    const colors = ['#14b8a6', '#22c55e', '#84cc16'];

                    return (
                      <circle
                        key={device.device}
                        cx="64"
                        cy="64"
                        r="50"
                        fill="none"
                        stroke={colors[index]}
                        strokeWidth="12"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference * (1 - device.percentage / 100)}
                        transform={`rotate(${(offset / 100) * 360} 64 64)`}
                        className="transition-all duration-500"
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">
                      {summary?.uniqueVisitors.toLocaleString()}
                    </p>
                    <p className="text-xs text-zinc-500">Total Visitors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CRO9 Integration Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-6 border border-brand-teal/20 bg-brand-teal/5"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-teal/20 flex items-center justify-center flex-shrink-0">
            <BarChart3 className="w-6 h-6 text-brand-teal" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              Advanced Analytics Available
            </h3>
            <p className="text-zinc-400 text-sm mb-4">
              Connect CRO9 for heatmaps, session recordings, A/B testing, and conversion optimization insights.
            </p>
            <a
              href="https://cro9.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-brand-teal hover:text-brand-green transition-colors"
            >
              Learn more about CRO9
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
