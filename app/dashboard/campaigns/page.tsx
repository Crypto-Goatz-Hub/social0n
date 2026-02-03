'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Megaphone,
  Plus,
  Search,
  Filter,
  Play,
  Pause,
  CheckCircle,
  Calendar,
  ArrowRight,
  MoreVertical,
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  type: string;
  type_label: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  posts_published: number;
  posts_remaining: number;
  leads_generated: number;
  engagement_rate: number;
  started_at: string;
  ends_at: string;
  platforms: string[];
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await fetch('/api/campaigns');
      const data = await res.json();

      if (data.success) {
        setCampaigns(data.campaigns || []);
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
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

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-brand-teal/30 border-t-brand-teal rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Campaigns</h1>
          <p className="text-zinc-400 mt-1">
            Manage your social automation campaigns
          </p>
        </div>
        <Link
          href="/dashboard/campaigns/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 btn-gradient text-white rounded-xl font-semibold"
        >
          <Plus className="w-5 h-5" />
          New Campaign
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search campaigns..."
            className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none pl-12 pr-10 py-3 bg-dark-800 border border-white/10 rounded-xl text-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Campaign List */}
      {filteredCampaigns.length === 0 ? (
        <div className="glass-card rounded-2xl border border-white/5 p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-dark-800 flex items-center justify-center mx-auto mb-4">
            <Megaphone className="w-8 h-8 text-zinc-600" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            {search || statusFilter !== 'all' ? 'No campaigns found' : 'No campaigns yet'}
          </h3>
          <p className="text-zinc-500 mb-6 max-w-sm mx-auto">
            {search || statusFilter !== 'all'
              ? 'Try adjusting your search or filters.'
              : 'Create your first campaign to start automating your social media presence.'}
          </p>
          {!search && statusFilter === 'all' && (
            <Link
              href="/dashboard/campaigns/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 btn-gradient text-white rounded-xl font-semibold"
            >
              <Plus className="w-5 h-5" />
              Create Campaign
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredCampaigns.map((campaign, i) => {
            const StatusIcon = statusIcons[campaign.status];
            const progress = Math.round(
              (campaign.posts_published / (campaign.posts_published + campaign.posts_remaining)) * 100
            ) || 0;

            return (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/dashboard/campaigns/${campaign.id}`}
                  className="block glass-card rounded-2xl border border-white/5 p-6 hover:border-brand-teal/30 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${statusColors[campaign.status]}`}>
                      <StatusIcon className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white truncate">
                          {campaign.name}
                        </h3>
                        <span className={`px-2.5 py-1 text-xs rounded-full border ${statusColors[campaign.status]}`}>
                          {campaign.status}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-500 mb-3">
                        {campaign.type_label}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                        <span>{campaign.posts_published} / {campaign.posts_published + campaign.posts_remaining} posts</span>
                        <span>{campaign.leads_generated} leads</span>
                        <span>{campaign.engagement_rate}% engagement</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-32 hidden lg:block">
                        <div className="flex justify-between text-xs text-zinc-500 mb-1">
                          <span>Progress</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="h-2 bg-dark-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-brand-teal to-brand-green rounded-full"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-zinc-600" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
