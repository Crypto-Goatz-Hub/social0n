'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Link2,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  MapPin,
  Sparkles,
  Check,
  Plus,
  ExternalLink,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

interface Connection {
  id: string;
  platform: string;
  account_name: string;
  account_id: string;
  connected_at: string;
  status: 'active' | 'expired' | 'error';
}

const PLATFORMS = [
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    description: 'Connect your Facebook Page to post updates and engage with your audience.',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    description: 'Share photos, reels, and stories to grow your Instagram presence.',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Linkedin,
    color: 'text-blue-600',
    bgColor: 'bg-blue-600/10',
    description: 'Build professional authority with LinkedIn posts and articles.',
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    icon: Twitter,
    color: 'text-zinc-400',
    bgColor: 'bg-zinc-400/10',
    description: 'Join conversations and share quick updates with your followers.',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: Sparkles,
    color: 'text-pink-400',
    bgColor: 'bg-pink-400/10',
    description: 'Create engaging short-form video content for TikTok.',
  },
  {
    id: 'gmb',
    name: 'Google Business',
    icon: MapPin,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    description: 'Manage your Google Business Profile posts and updates.',
  },
];

export default function ConnectionsPage() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const res = await fetch('/api/connections');
      const data = await res.json();

      if (data.success) {
        setConnections(data.connections || []);
      }
    } catch (error) {
      console.error('Error fetching connections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (platform: string) => {
    // In a real implementation, this would redirect to OAuth flow
    window.open(`/api/connections/${platform}/auth`, '_blank');
  };

  const handleDisconnect = async (connectionId: string) => {
    if (!confirm('Are you sure you want to disconnect this account?')) return;

    try {
      const res = await fetch(`/api/connections/${connectionId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setConnections((prev) => prev.filter((c) => c.id !== connectionId));
      }
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  };

  const getConnectionForPlatform = (platformId: string) => {
    return connections.find((c) => c.platform === platformId);
  };

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
      <div>
        <h1 className="text-2xl font-bold text-white">Connections</h1>
        <p className="text-zinc-400 mt-1">
          Connect your social media accounts to enable automated posting
        </p>
      </div>

      {/* Info Banner */}
      <div className="glass-card rounded-2xl border border-brand-teal/30 p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-teal/20 flex items-center justify-center shrink-0">
            <Link2 className="w-5 h-5 text-brand-teal" />
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">Secure Connections</h3>
            <p className="text-sm text-zinc-400">
              We use secure OAuth to connect to your accounts. We never store your passwords
              and only request the minimum permissions needed for posting.
            </p>
          </div>
        </div>
      </div>

      {/* Platform List */}
      <div className="grid gap-4">
        {PLATFORMS.map((platform, i) => {
          const connection = getConnectionForPlatform(platform.id);
          const Icon = platform.icon;

          return (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-2xl border border-white/5 p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl ${platform.bgColor} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-7 h-7 ${platform.color}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-white">{platform.name}</h3>
                    {connection && (
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        connection.status === 'active'
                          ? 'bg-green-500/10 text-green-400'
                          : connection.status === 'expired'
                          ? 'bg-yellow-500/10 text-yellow-400'
                          : 'bg-red-500/10 text-red-400'
                      }`}>
                        {connection.status}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-400 mb-2">
                    {platform.description}
                  </p>
                  {connection && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-zinc-500">Connected as:</span>
                      <span className="text-white font-medium">{connection.account_name}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {connection ? (
                    <>
                      {connection.status !== 'active' && (
                        <button
                          onClick={() => handleConnect(platform.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-xl hover:bg-yellow-500/30 transition-colors"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Reconnect
                        </button>
                      )}
                      <button
                        onClick={() => handleDisconnect(connection.id)}
                        className="px-4 py-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                      >
                        Disconnect
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleConnect(platform.id)}
                      className="flex items-center gap-2 px-5 py-2.5 btn-gradient text-white rounded-xl font-semibold"
                    >
                      <Plus className="w-5 h-5" />
                      Connect
                    </button>
                  )}
                </div>
              </div>

              {connection?.status === 'expired' && (
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-sm text-yellow-400">
                  <AlertCircle className="w-4 h-4" />
                  Your connection has expired. Please reconnect to continue posting.
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Help Section */}
      <div className="glass-card rounded-2xl border border-white/5 p-6">
        <h3 className="font-semibold text-white mb-3">Need Help?</h3>
        <p className="text-sm text-zinc-400 mb-4">
          If you're having trouble connecting your accounts, check out our setup guides
          or contact support for assistance.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:support@social0n.com"
            className="flex items-center gap-2 px-4 py-2 bg-dark-800 text-zinc-300 rounded-xl hover:bg-dark-700 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
