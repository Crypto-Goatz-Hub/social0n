'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Play,
  Pause,
  Trash2,
  Calendar,
  Users,
  TrendingUp,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  MapPin,
  Sparkles,
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  type: string;
  type_label: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  platforms: string[];
  business_context: {
    businessName: string;
    industry: string;
    targetAudience: string;
  };
  posts_published: number;
  posts_remaining: number;
  leads_generated: number;
  engagement_rate: number;
  started_at: string | null;
  ends_at: string | null;
  created_at: string;
  type_config: {
    duration: string;
    price: number;
    totalPosts: number;
  };
}

interface Post {
  id: string;
  platform: string;
  content: string;
  scheduled_for: string;
  published_at: string | null;
  status: 'scheduled' | 'published' | 'failed' | 'cancelled';
  engagement_data: {
    likes: number;
    comments: number;
    shares: number;
  } | null;
}

const PLATFORM_ICONS: Record<string, any> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
  tiktok: Sparkles,
  gmb: MapPin,
};

const PLATFORM_COLORS: Record<string, string> = {
  facebook: 'text-blue-500',
  instagram: 'text-pink-500',
  linkedin: 'text-blue-600',
  twitter: 'text-zinc-400',
  tiktok: 'text-pink-400',
  gmb: 'text-green-500',
};

export default function CampaignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchCampaign();
  }, [params.id]);

  const fetchCampaign = async () => {
    try {
      const res = await fetch(`/api/campaigns/${params.id}`);
      const data = await res.json();

      if (data.success) {
        setCampaign(data.campaign);
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error('Error fetching campaign:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!campaign) return;
    setActionLoading(true);

    try {
      const res = await fetch(`/api/campaigns/${campaign.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (data.success) {
        setCampaign({ ...campaign, status: newStatus as Campaign['status'] });
      }
    } catch (error) {
      console.error('Error updating campaign:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!campaign || !confirm('Are you sure you want to delete this campaign?')) return;
    setActionLoading(true);

    try {
      const res = await fetch(`/api/campaigns/${campaign.id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (data.success) {
        router.push('/dashboard/campaigns');
      }
    } catch (error) {
      console.error('Error deleting campaign:', error);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-brand-teal/30 border-t-brand-teal rounded-full animate-spin" />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-white mb-2">Campaign not found</h2>
        <Link href="/dashboard/campaigns" className="text-brand-teal hover:underline">
          Back to campaigns
        </Link>
      </div>
    );
  }

  const progress = Math.round(
    (campaign.posts_published / (campaign.posts_published + campaign.posts_remaining)) * 100
  ) || 0;

  const statusColors = {
    draft: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
    active: 'bg-green-500/10 text-green-400 border-green-500/20',
    paused: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    completed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <Link
            href="/dashboard/campaigns"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Campaigns
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">{campaign.name}</h1>
            <span className={`px-3 py-1 text-sm rounded-full border ${statusColors[campaign.status]}`}>
              {campaign.status}
            </span>
          </div>
          <p className="text-zinc-400 mt-1">{campaign.type_label}</p>
        </div>

        <div className="flex items-center gap-3">
          {campaign.status === 'draft' && (
            <button
              onClick={() => handleStatusChange('active')}
              disabled={actionLoading}
              className="flex items-center gap-2 px-5 py-2.5 btn-gradient text-white rounded-xl font-semibold disabled:opacity-50"
            >
              <Play className="w-5 h-5" />
              Start Campaign
            </button>
          )}
          {campaign.status === 'active' && (
            <button
              onClick={() => handleStatusChange('paused')}
              disabled={actionLoading}
              className="flex items-center gap-2 px-5 py-2.5 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-xl font-semibold hover:bg-yellow-500/30 transition-colors disabled:opacity-50"
            >
              <Pause className="w-5 h-5" />
              Pause
            </button>
          )}
          {campaign.status === 'paused' && (
            <button
              onClick={() => handleStatusChange('active')}
              disabled={actionLoading}
              className="flex items-center gap-2 px-5 py-2.5 btn-gradient text-white rounded-xl font-semibold disabled:opacity-50"
            >
              <Play className="w-5 h-5" />
              Resume
            </button>
          )}
          <button
            onClick={handleDelete}
            disabled={actionLoading}
            className="p-2.5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Posts Published',
            value: campaign.posts_published,
            icon: Calendar,
            color: 'from-brand-teal to-brand-green',
          },
          {
            label: 'Posts Remaining',
            value: campaign.posts_remaining,
            icon: Clock,
            color: 'from-blue-500 to-cyan-500',
          },
          {
            label: 'Leads Generated',
            value: campaign.leads_generated,
            icon: Users,
            color: 'from-purple-500 to-pink-500',
          },
          {
            label: 'Engagement Rate',
            value: `${campaign.engagement_rate}%`,
            icon: TrendingUp,
            color: 'from-orange-500 to-red-500',
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl p-5 border border-white/5"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-zinc-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Progress */}
      <div className="glass-card rounded-2xl border border-white/5 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Campaign Progress</h2>
          <span className="text-brand-teal font-medium">{progress}%</span>
        </div>
        <div className="h-3 bg-dark-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-brand-teal to-brand-green rounded-full"
          />
        </div>
        <div className="flex items-center justify-between mt-3 text-sm text-zinc-500">
          <span>{campaign.posts_published} published</span>
          <span>{campaign.posts_remaining} remaining</span>
        </div>
      </div>

      {/* Platforms */}
      <div className="glass-card rounded-2xl border border-white/5 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Active Platforms</h2>
        <div className="flex flex-wrap gap-3">
          {campaign.platforms.map((platform) => {
            const Icon = PLATFORM_ICONS[platform] || Calendar;
            const color = PLATFORM_COLORS[platform] || 'text-zinc-400';

            return (
              <div
                key={platform}
                className="flex items-center gap-2 px-4 py-2 bg-dark-800 rounded-xl border border-white/10"
              >
                <Icon className={`w-5 h-5 ${color}`} />
                <span className="text-white capitalize">{platform === 'gmb' ? 'Google Business' : platform}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scheduled Posts */}
      <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-lg font-semibold text-white">Scheduled Posts</h2>
          <span className="text-sm text-zinc-500">{posts.length} posts</span>
        </div>

        {posts.length === 0 ? (
          <div className="p-12 text-center">
            <Calendar className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-400">
              {campaign.status === 'draft'
                ? 'Posts will be generated when you start the campaign'
                : 'No posts scheduled'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {posts.slice(0, 10).map((post) => {
              const Icon = PLATFORM_ICONS[post.platform] || Calendar;
              const color = PLATFORM_COLORS[post.platform] || 'text-zinc-400';
              const scheduledDate = new Date(post.scheduled_for);

              return (
                <div key={post.id} className="flex items-center gap-4 p-4">
                  <div className={`w-10 h-10 rounded-xl bg-dark-800 flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white truncate">
                      {post.content || 'Content pending generation...'}
                    </p>
                    <p className="text-sm text-zinc-500">
                      {scheduledDate.toLocaleDateString()} at {scheduledDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className={`px-3 py-1 text-xs rounded-full border ${
                    post.status === 'published'
                      ? 'bg-green-500/10 text-green-400 border-green-500/20'
                      : post.status === 'failed'
                      ? 'bg-red-500/10 text-red-400 border-red-500/20'
                      : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                  }`}>
                    {post.status}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
