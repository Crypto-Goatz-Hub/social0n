'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Megaphone,
  TrendingUp,
  Users,
  Calendar,
  ArrowRight,
  Zap,
  Play,
  Pause,
  CheckCircle,
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  posts_published: number;
  posts_remaining: number;
  leads_generated: number;
  engagement_rate: number;
  started_at: string;
  ends_at: string;
}

interface Stats {
  active_campaigns: number;
  total_posts: number;
  total_leads: number;
  avg_engagement: number;
}

export default function DashboardPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('/api/campaigns/dashboard');
      const data = await res.json();

      if (data.success) {
        setCampaigns(data.campaigns || []);
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    active: 'bg-green-500/10 text-green-400 border-green-500/20',
    paused: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    completed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    draft: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
  };

  const statusIcons = {
    active: Play,
    paused: Pause,
    completed: CheckCircle,
    draft: Calendar,
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
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-zinc-400 mt-1">
            Track your campaign performance and results
          </p>
        </div>
        <Link
          href="/dashboard/campaigns/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 btn-gradient text-white rounded-xl font-semibold"
        >
          <Zap className="w-5 h-5" />
          New Campaign
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Active Campaigns',
            value: stats?.active_campaigns || 0,
            icon: Megaphone,
            color: 'from-brand-teal to-brand-green',
          },
          {
            label: 'Posts Published',
            value: stats?.total_posts || 0,
            icon: Calendar,
            color: 'from-blue-500 to-cyan-500',
          },
          {
            label: 'Leads Generated',
            value: stats?.total_leads || 0,
            icon: Users,
            color: 'from-purple-500 to-pink-500',
          },
          {
            label: 'Avg. Engagement',
            value: `${stats?.avg_engagement || 0}%`,
            icon: TrendingUp,
            color: 'from-orange-500 to-red-500',
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl p-6 border border-white/5"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-zinc-500 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Active Campaigns */}
      <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-lg font-semibold text-white">Your Campaigns</h2>
          <Link
            href="/dashboard/campaigns"
            className="text-sm text-brand-teal hover:text-brand-green transition-colors flex items-center gap-1"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {campaigns.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-dark-800 flex items-center justify-center mx-auto mb-4">
              <Megaphone className="w-8 h-8 text-zinc-600" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              No campaigns yet
            </h3>
            <p className="text-zinc-500 mb-6 max-w-sm mx-auto">
              Launch your first campaign to start automating your social media presence.
            </p>
            <Link
              href="/dashboard/campaigns/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 btn-gradient text-white rounded-xl font-semibold"
            >
              <Zap className="w-5 h-5" />
              Create Campaign
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {campaigns.slice(0, 5).map((campaign, i) => {
              const StatusIcon = statusIcons[campaign.status];
              const progress = Math.round(
                (campaign.posts_published / (campaign.posts_published + campaign.posts_remaining)) * 100
              ) || 0;

              return (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={`/dashboard/campaigns/${campaign.id}`}
                    className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${statusColors[campaign.status]}`}>
                      <StatusIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-white truncate">
                          {campaign.name}
                        </h3>
                        <span className={`px-2 py-0.5 text-xs rounded-full border ${statusColors[campaign.status]}`}>
                          {campaign.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-zinc-500">
                        <span>{campaign.posts_published} posts</span>
                        <span>{campaign.leads_generated} leads</span>
                        <span>{campaign.engagement_rate}% engagement</span>
                      </div>
                    </div>
                    <div className="w-24 hidden sm:block">
                      <div className="h-2 bg-dark-900 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-brand-teal to-brand-green rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-zinc-500 mt-1 text-right">
                        {progress}% complete
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-zinc-600" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
