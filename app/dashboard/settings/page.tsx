'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Building2,
  Mail,
  Lock,
  Bell,
  CreditCard,
  Trash2,
  Check,
  AlertCircle,
} from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  company: string;
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    company: '',
  });
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [notifications, setNotifications] = useState({
    campaign_updates: true,
    weekly_reports: true,
    marketing: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/auth/session');
      const data = await res.json();

      if (data.authenticated && data.user) {
        setProfile({
          name: data.user.name || '',
          email: data.user.email || '',
          company: data.user.company || '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update profile' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Something went wrong' });
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwords.new !== passwords.confirm) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    if (passwords.new.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters' });
      return;
    }

    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('/api/user/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwords.current,
          newPassword: passwords.new,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Password updated successfully' });
        setPasswords({ current: '', new: '', confirm: '' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update password' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Something went wrong' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-brand-teal/30 border-t-brand-teal rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-zinc-400 mt-1">
          Manage your account and preferences
        </p>
      </div>

      {/* Message */}
      {message.text && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-green-500/10 text-green-400 border border-green-500/20'
              : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}
        >
          {message.type === 'success' ? (
            <Check className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          {message.text}
        </motion.div>
      )}

      {/* Profile Section */}
      <div className="glass-card rounded-2xl border border-white/5 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-brand-teal/20 flex items-center justify-center">
            <User className="w-5 h-5 text-brand-teal" />
          </div>
          <div>
            <h2 className="font-semibold text-white">Profile Information</h2>
            <p className="text-sm text-zinc-500">Update your account details</p>
          </div>
        </div>

        <form onSubmit={handleProfileUpdate} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Company</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="text"
                  value={profile.company}
                  onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 btn-gradient text-white rounded-xl font-semibold disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>

      {/* Password Section */}
      <div className="glass-card rounded-2xl border border-white/5 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-brand-teal/20 flex items-center justify-center">
            <Lock className="w-5 h-5 text-brand-teal" />
          </div>
          <div>
            <h2 className="font-semibold text-white">Change Password</h2>
            <p className="text-sm text-zinc-500">Update your password</p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-5">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Current Password</label>
            <input
              type="password"
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">New Password</label>
              <input
                type="password"
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Confirm New Password</label>
              <input
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving || !passwords.current || !passwords.new}
            className="px-6 py-3 btn-gradient text-white rounded-xl font-semibold disabled:opacity-50"
          >
            {saving ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>

      {/* Notifications Section */}
      <div className="glass-card rounded-2xl border border-white/5 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-brand-teal/20 flex items-center justify-center">
            <Bell className="w-5 h-5 text-brand-teal" />
          </div>
          <div>
            <h2 className="font-semibold text-white">Notifications</h2>
            <p className="text-sm text-zinc-500">Manage email notifications</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { key: 'campaign_updates', label: 'Campaign Updates', desc: 'Get notified when campaigns start, complete, or encounter issues' },
            { key: 'weekly_reports', label: 'Weekly Reports', desc: 'Receive a weekly summary of your campaign performance' },
            { key: 'marketing', label: 'Marketing & Tips', desc: 'Get tips, best practices, and product updates' },
          ].map((item) => (
            <label
              key={item.key}
              className="flex items-center justify-between p-4 bg-dark-800 rounded-xl cursor-pointer hover:bg-dark-700 transition-colors"
            >
              <div>
                <p className="font-medium text-white">{item.label}</p>
                <p className="text-sm text-zinc-500">{item.desc}</p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={notifications[item.key as keyof typeof notifications]}
                  onChange={(e) =>
                    setNotifications({ ...notifications, [item.key]: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-dark-600 rounded-full peer peer-checked:bg-brand-teal transition-colors" />
                <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full peer-checked:translate-x-5 transition-transform" />
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="glass-card rounded-2xl border border-red-500/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h2 className="font-semibold text-white">Danger Zone</h2>
            <p className="text-sm text-zinc-500">Irreversible actions</p>
          </div>
        </div>

        <p className="text-sm text-zinc-400 mb-4">
          Once you delete your account, all of your data will be permanently removed.
          This action cannot be undone.
        </p>

        <button className="px-5 py-2.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
}
