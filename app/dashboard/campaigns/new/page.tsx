'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MapPin,
  Award,
  Target,
  Rocket,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Building2,
  Users,
  Sparkles,
  Calendar,
  Clock,
} from 'lucide-react';

type CampaignType = 'local_visibility' | 'authority_builder' | 'content_to_lead' | 'brand_momentum';
type Platform = 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'gmb';

const CAMPAIGN_TYPES = {
  local_visibility: {
    id: 'local_visibility',
    name: 'Local Visibility',
    description: 'Dominate local search with Google Business and Facebook presence',
    icon: MapPin,
    duration: '30 days',
    posts: 20,
    price: 197,
    platforms: ['facebook', 'instagram', 'gmb'] as Platform[],
    outcomes: ['Increased local search visibility', 'More Google reviews', 'Local community engagement'],
  },
  authority_builder: {
    id: 'authority_builder',
    name: 'Authority Builder',
    description: 'Establish thought leadership with educational content series',
    icon: Award,
    duration: '60 days',
    posts: 35,
    price: 297,
    platforms: ['linkedin', 'twitter', 'facebook'] as Platform[],
    outcomes: ['Industry expert positioning', 'Professional network growth', 'Inbound lead magnetism'],
  },
  content_to_lead: {
    id: 'content_to_lead',
    name: 'Content → Lead',
    description: 'Turn social posts into qualified leads with strategic CTAs',
    icon: Target,
    duration: '45 days',
    posts: 40,
    price: 247,
    platforms: ['facebook', 'instagram', 'linkedin'] as Platform[],
    outcomes: ['Lead generation system', 'Email list growth', 'Qualified prospect pipeline'],
  },
  brand_momentum: {
    id: 'brand_momentum',
    name: 'Brand Momentum',
    description: 'Build consistent brand presence across all platforms',
    icon: Rocket,
    duration: '90 days',
    posts: 90,
    price: 497,
    platforms: ['facebook', 'instagram', 'linkedin', 'twitter', 'tiktok'] as Platform[],
    outcomes: ['Brand recognition growth', 'Cross-platform consistency', 'Engagement rate improvement'],
  },
};

const PLATFORMS = {
  facebook: { name: 'Facebook', icon: Facebook, color: 'text-blue-500' },
  instagram: { name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
  linkedin: { name: 'LinkedIn', icon: Linkedin, color: 'text-blue-600' },
  twitter: { name: 'X (Twitter)', icon: Twitter, color: 'text-zinc-400' },
  tiktok: { name: 'TikTok', icon: Sparkles, color: 'text-pink-400' },
  gmb: { name: 'Google Business', icon: MapPin, color: 'text-green-500' },
};

const TONES = [
  { id: 'professional', label: 'Professional', desc: 'Polished and business-focused' },
  { id: 'casual', label: 'Casual', desc: 'Relaxed and conversational' },
  { id: 'friendly', label: 'Friendly', desc: 'Warm and approachable' },
  { id: 'authoritative', label: 'Authoritative', desc: 'Expert and commanding' },
];

export default function NewCampaignPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [campaignType, setCampaignType] = useState<CampaignType | null>(null);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [businessContext, setBusinessContext] = useState({
    businessName: '',
    industry: '',
    targetAudience: '',
    uniqueValue: '',
    tone: 'professional' as string,
    keywords: '',
    location: '',
  });
  const [scheduleConfig, setScheduleConfig] = useState({
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    preferredTimes: ['09:00', '12:00', '17:00'],
    excludeDays: [] as number[],
    startDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  const selectedType = campaignType ? CAMPAIGN_TYPES[campaignType] : null;

  const handleTypeSelect = (type: CampaignType) => {
    setCampaignType(type);
    setPlatforms(CAMPAIGN_TYPES[type].platforms);
  };

  const togglePlatform = (platform: Platform) => {
    setPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const toggleExcludeDay = (day: number) => {
    setScheduleConfig((prev) => ({
      ...prev,
      excludeDays: prev.excludeDays.includes(day)
        ? prev.excludeDays.filter((d) => d !== day)
        : [...prev.excludeDays, day],
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return campaignType !== null;
      case 2:
        return platforms.length > 0;
      case 3:
        return (
          businessContext.businessName &&
          businessContext.industry &&
          businessContext.targetAudience
        );
      case 4:
        return scheduleConfig.startDate;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    if (!campaignType) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${businessContext.businessName} - ${selectedType?.name}`,
          type: campaignType,
          platforms,
          businessContext: {
            ...businessContext,
            keywords: businessContext.keywords.split(',').map((k) => k.trim()).filter(Boolean),
          },
          scheduleConfig,
        }),
      });

      const data = await res.json();

      if (data.success) {
        router.push(`/dashboard/campaigns/${data.campaign.id}`);
      } else {
        setError(data.error || 'Failed to create campaign');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard/campaigns"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Campaigns
        </Link>
        <h1 className="text-2xl font-bold text-white">Create New Campaign</h1>
        <p className="text-zinc-400 mt-1">
          Set up your social automation campaign in minutes
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                s < step
                  ? 'bg-brand-teal text-white'
                  : s === step
                  ? 'bg-brand-teal/20 text-brand-teal border-2 border-brand-teal'
                  : 'bg-dark-800 text-zinc-500'
              }`}
            >
              {s < step ? <Check className="w-4 h-4" /> : s}
            </div>
            {s < 4 && (
              <div
                className={`flex-1 h-1 rounded-full ${
                  s < step ? 'bg-brand-teal' : 'bg-dark-800'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-lg font-semibold text-white mb-2">
                Choose Your Campaign Type
              </h2>
              <p className="text-zinc-400">
                Each campaign is designed for specific outcomes
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {Object.values(CAMPAIGN_TYPES).map((type) => {
                const Icon = type.icon;
                const isSelected = campaignType === type.id;

                return (
                  <button
                    key={type.id}
                    onClick={() => handleTypeSelect(type.id as CampaignType)}
                    className={`text-left p-6 rounded-2xl border-2 transition-all ${
                      isSelected
                        ? 'border-brand-teal bg-brand-teal/10'
                        : 'border-white/10 bg-dark-800 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isSelected
                            ? 'bg-brand-teal text-white'
                            : 'bg-dark-700 text-zinc-400'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">
                          {type.name}
                        </h3>
                        <p className="text-sm text-zinc-400 mb-3">
                          {type.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-zinc-500">
                          <span>{type.duration}</span>
                          <span>{type.posts} posts</span>
                          <span className="text-brand-teal font-semibold">
                            ${type.price}
                          </span>
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <p className="text-xs text-zinc-500 mb-2">Outcomes:</p>
                        <ul className="space-y-1">
                          {type.outcomes.map((outcome) => (
                            <li
                              key={outcome}
                              className="flex items-center gap-2 text-sm text-zinc-300"
                            >
                              <Check className="w-3 h-3 text-brand-teal" />
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-lg font-semibold text-white mb-2">
                Select Platforms
              </h2>
              <p className="text-zinc-400">
                Choose where you want to post (recommended platforms pre-selected)
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(PLATFORMS).map(([id, platform]) => {
                const Icon = platform.icon;
                const isSelected = platforms.includes(id as Platform);
                const isRecommended = selectedType?.platforms.includes(id as Platform);

                return (
                  <button
                    key={id}
                    onClick={() => togglePlatform(id as Platform)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-brand-teal bg-brand-teal/10'
                        : 'border-white/10 bg-dark-800 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-6 h-6 ${platform.color}`} />
                      <div className="text-left">
                        <p className="font-medium text-white">{platform.name}</p>
                        {isRecommended && (
                          <p className="text-xs text-brand-teal">Recommended</p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-lg font-semibold text-white mb-2">
                Tell Us About Your Business
              </h2>
              <p className="text-zinc-400">
                This helps us create content that sounds like you
              </p>
            </div>

            <div className="glass-card rounded-2xl border border-white/5 p-6 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">
                    Business Name *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="text"
                      value={businessContext.businessName}
                      onChange={(e) =>
                        setBusinessContext({ ...businessContext, businessName: e.target.value })
                      }
                      placeholder="Acme Inc."
                      className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">
                    Industry *
                  </label>
                  <input
                    type="text"
                    value={businessContext.industry}
                    onChange={(e) =>
                      setBusinessContext({ ...businessContext, industry: e.target.value })
                    }
                    placeholder="e.g., Real Estate, Marketing, Healthcare"
                    className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">
                  Target Audience *
                </label>
                <div className="relative">
                  <Users className="absolute left-4 top-3 w-5 h-5 text-zinc-500" />
                  <textarea
                    value={businessContext.targetAudience}
                    onChange={(e) =>
                      setBusinessContext({ ...businessContext, targetAudience: e.target.value })
                    }
                    placeholder="Describe your ideal customer (e.g., Small business owners aged 30-50 looking for marketing solutions)"
                    rows={2}
                    className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">
                  What Makes You Unique?
                </label>
                <textarea
                  value={businessContext.uniqueValue}
                  onChange={(e) =>
                    setBusinessContext({ ...businessContext, uniqueValue: e.target.value })
                  }
                  placeholder="Your unique value proposition or competitive advantage"
                  rows={2}
                  className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none resize-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">
                    Keywords (comma separated)
                  </label>
                  <input
                    type="text"
                    value={businessContext.keywords}
                    onChange={(e) =>
                      setBusinessContext({ ...businessContext, keywords: e.target.value })
                    }
                    placeholder="marketing, growth, automation"
                    className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">
                    Location (for local campaigns)
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="text"
                      value={businessContext.location}
                      onChange={(e) =>
                        setBusinessContext({ ...businessContext, location: e.target.value })
                      }
                      placeholder="City, State"
                      className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-3">
                  Brand Tone
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {TONES.map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() =>
                        setBusinessContext({ ...businessContext, tone: tone.id })
                      }
                      className={`p-3 rounded-xl border-2 text-left transition-all ${
                        businessContext.tone === tone.id
                          ? 'border-brand-teal bg-brand-teal/10'
                          : 'border-white/10 bg-dark-700 hover:border-white/20'
                      }`}
                    >
                      <p className="font-medium text-white text-sm">{tone.label}</p>
                      <p className="text-xs text-zinc-500">{tone.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-lg font-semibold text-white mb-2">
                Schedule & Launch
              </h2>
              <p className="text-zinc-400">
                Configure when your content goes live
              </p>
            </div>

            <div className="glass-card rounded-2xl border border-white/5 p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">
                    Start Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="date"
                      value={scheduleConfig.startDate}
                      onChange={(e) =>
                        setScheduleConfig({ ...scheduleConfig, startDate: e.target.value })
                      }
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">
                    Timezone
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <select
                      value={scheduleConfig.timezone}
                      onChange={(e) =>
                        setScheduleConfig({ ...scheduleConfig, timezone: e.target.value })
                      }
                      className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-white/10 rounded-xl text-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none appearance-none"
                    >
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-3">
                  Skip Days (optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                    <button
                      key={day}
                      onClick={() => toggleExcludeDay(i)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        scheduleConfig.excludeDays.includes(i)
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-dark-700 text-zinc-400 border border-white/10 hover:border-white/20'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-zinc-500 mt-2">
                  Click days you want to skip posting
                </p>
              </div>
            </div>

            {/* Summary */}
            {selectedType && (
              <div className="glass-card rounded-2xl border border-brand-teal/30 p-6">
                <h3 className="font-semibold text-white mb-4">Campaign Summary</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-zinc-500">Campaign Type</p>
                    <p className="text-white font-medium">{selectedType.name}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500">Duration</p>
                    <p className="text-white font-medium">{selectedType.duration}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500">Total Posts</p>
                    <p className="text-white font-medium">{selectedType.posts} posts</p>
                  </div>
                  <div>
                    <p className="text-zinc-500">Platforms</p>
                    <p className="text-white font-medium">
                      {platforms.map((p) => PLATFORMS[p].name).join(', ')}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-zinc-500 text-sm">Campaign Price</p>
                    <p className="text-2xl font-bold text-white">${selectedType.price}</p>
                  </div>
                  <p className="text-xs text-zinc-500 max-w-xs">
                    One-time payment. Includes all AI content generation, scheduling, and reporting.
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                {error}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-2 px-5 py-2.5 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        ) : (
          <div />
        )}

        {step < 4 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
            className="flex items-center gap-2 px-6 py-3 btn-gradient text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!canProceed() || loading}
            className="flex items-center gap-2 px-6 py-3 btn-gradient text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Launch Campaign
                <Rocket className="w-5 h-5" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
