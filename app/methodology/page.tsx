'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Brain, Zap, Target, BarChart3, Shield, Clock, Users,
  ArrowRight, Check, Sparkles, Layers, Settings, Send,
  RefreshCw, Eye, MessageSquare, Share2, Heart, Bookmark,
  TrendingUp, AlertCircle, CheckCircle2, XCircle
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { SimpleFlowChart } from '@/components/ui/AnimatedFlowChart';

const methodologySteps = [
  {
    phase: 'Phase 1',
    title: 'Discovery & Analysis',
    duration: 'Day 1',
    description: 'AI analyzes your business, competitors, and target audience to establish baseline metrics.',
    activities: [
      'Business profile analysis',
      'Competitor content audit',
      'Audience persona mapping',
      'Industry benchmark setting',
      'Goal alignment calibration',
    ],
    icon: Eye,
  },
  {
    phase: 'Phase 2',
    title: 'Strategy Configuration',
    duration: 'Day 1-2',
    description: 'Based on analysis, AI selects optimal content modules and timing strategies.',
    activities: [
      'Module selection (from 14 available)',
      'Posting frequency optimization',
      'Platform priority ranking',
      'Content pillar definition',
      'Engagement target setting',
    ],
    icon: Settings,
  },
  {
    phase: 'Phase 3',
    title: 'Content Generation',
    duration: 'Day 2-3',
    description: 'AI generates 30 days of platform-optimized content following scientific frameworks.',
    activities: [
      'Hook line engineering',
      'Value proposition stacking',
      'CTA pathway design',
      'Visual direction notes',
      'Hashtag strategy application',
    ],
    icon: Sparkles,
  },
  {
    phase: 'Phase 4',
    title: 'Campaign Execution',
    duration: 'Day 4-30',
    description: 'Automated posting with real-time monitoring and algorithmic adaptation.',
    activities: [
      'Scheduled content publishing',
      'Engagement monitoring',
      'Performance tracking',
      'Algorithm response analysis',
      'Mid-campaign optimization',
    ],
    icon: Send,
  },
  {
    phase: 'Phase 5',
    title: 'Analysis & Learning',
    duration: 'Day 30+',
    description: 'Campaign data feeds back into the AI to improve future performance.',
    activities: [
      'Performance report generation',
      'Success pattern identification',
      'Audience response analysis',
      'Recommendation generation',
      'Model refinement',
    ],
    icon: BarChart3,
  },
];

const platformStrategies = [
  {
    platform: 'LinkedIn',
    postTypes: ['Thought leadership', 'Industry insights', 'Case studies', 'Carousel posts'],
    optimalTiming: 'Tue-Thu, 7-8am & 5-6pm',
    frequency: '3-4x per week',
    algorithm: 'Prioritizes dwell time, comments, and share depth',
  },
  {
    platform: 'Facebook',
    postTypes: ['Community content', 'Behind-the-scenes', 'Video content', 'Polls'],
    optimalTiming: 'Wed-Fri, 1-4pm',
    frequency: '1-2x per day',
    algorithm: 'Favors meaningful interactions and native video',
  },
  {
    platform: 'Instagram',
    postTypes: ['Visual stories', 'Reels', 'Carousels', 'User-generated content'],
    optimalTiming: 'Mon, Wed, Fri, 11am-1pm',
    frequency: '1x feed, 3x stories daily',
    algorithm: 'Rewards saves, shares, and Reel engagement',
  },
  {
    platform: 'Google Business',
    postTypes: ['Updates', 'Offers', 'Events', 'Products'],
    optimalTiming: 'Mon-Fri, 9am-5pm',
    frequency: '2-3x per week',
    algorithm: 'Boosts local search visibility and Maps ranking',
  },
];

const safetyProtocols = [
  {
    rule: 'Daily Post Limits',
    description: 'Never exceed platform-recommended daily posting limits',
    icon: Shield,
    status: 'enforced',
  },
  {
    rule: 'Content Velocity',
    description: 'Gradual ramp-up prevents algorithmic red flags',
    icon: TrendingUp,
    status: 'enforced',
  },
  {
    rule: 'Engagement Authenticity',
    description: 'No fake engagement or automation of interactions',
    icon: Heart,
    status: 'enforced',
  },
  {
    rule: 'Content Originality',
    description: 'All content is generated fresh, never duplicated',
    icon: Sparkles,
    status: 'enforced',
  },
  {
    rule: 'Platform ToS Compliance',
    description: 'Full compliance with each platform\'s terms of service',
    icon: CheckCircle2,
    status: 'enforced',
  },
  {
    rule: 'Account Health Monitoring',
    description: 'Real-time monitoring for any warning signs',
    icon: AlertCircle,
    status: 'active',
  },
];

const engagementMetrics = [
  { metric: 'Impressions', description: 'Total views of your content', icon: Eye },
  { metric: 'Engagement Rate', description: 'Interactions / Impressions', icon: Heart },
  { metric: 'Click-through Rate', description: 'Link clicks / Impressions', icon: Target },
  { metric: 'Share Velocity', description: 'Shares within first hour', icon: Share2 },
  { metric: 'Save Rate', description: 'Bookmarks / Total engagement', icon: Bookmark },
  { metric: 'Comment Depth', description: 'Avg replies per comment thread', icon: MessageSquare },
];

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-dark-900">
      {/* Navigation */}
      <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
        <div className="glass-header rounded-2xl md:rounded-full px-4 md:px-8 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Logo size="md" />
            </Link>
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              <Link href="/science" className="text-zinc-400 hover:text-white transition-colors text-sm">
                The Science
              </Link>
              <Link href="/#campaigns" className="text-zinc-400 hover:text-white transition-colors text-sm">
                Campaigns
              </Link>
              <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors text-sm">
                Pricing
              </Link>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <Link href="/login" className="text-zinc-400 hover:text-white transition-colors text-sm hidden sm:block">
                Sign In
              </Link>
              <Link href="/signup">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-3 md:px-5 py-2 md:py-2.5 btn-gradient text-white rounded-xl font-medium text-sm"
                >
                  <span className="hidden sm:inline">Start Campaign</span>
                  <span className="sm:hidden">Start</span>
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 md:pt-40 pb-16 md:pb-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 glass-card rounded-full text-brand-teal text-sm mb-10"
          >
            <Layers className="w-4 h-4" />
            <span>Step-by-Step Process</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
          >
            Our Scientific
            <br />
            <span className="text-gradient-brand">Methodology</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
          >
            Every Social0n campaign follows a rigorous, data-driven process designed to maximize
            engagement while keeping your accounts safe and compliant.
          </motion.p>
        </div>
      </section>

      {/* Simple Flow Chart */}
      <section className="py-10 px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <SimpleFlowChart />
        </div>
      </section>

      {/* Methodology Steps */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              The 5-Phase Campaign Process
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-zinc-400 max-w-2xl mx-auto"
            >
              From analysis to execution, every step is optimized for performance
            </motion.p>
          </div>

          <div className="space-y-8">
            {methodologySteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.phase}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-8 border border-white/5 hover:border-brand-teal/30 transition-all"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-teal to-brand-green flex items-center justify-center">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <div className="text-brand-teal text-sm font-medium">{step.phase}</div>
                          <div className="text-white font-bold text-xl">{step.title}</div>
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-zinc-400 text-sm">
                        <Clock className="w-4 h-4" />
                        {step.duration}
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <p className="text-zinc-300 mb-6">{step.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {step.activities.map((activity, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-zinc-400">
                            <Check className="w-4 h-4 text-brand-green flex-shrink-0" />
                            {activity}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform Strategies */}
      <section className="py-32 px-6 bg-gradient-to-b from-transparent via-brand-teal/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Platform-Specific Optimization
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-zinc-400"
            >
              Each platform has unique algorithms. We optimize for each one.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {platformStrategies.map((platform, index) => (
              <motion.div
                key={platform.platform}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 border border-white/5"
              >
                <h3 className="text-2xl font-bold text-white mb-4">{platform.platform}</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-zinc-500">Post Types:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {platform.postTypes.map((type) => (
                        <span key={type} className="px-2 py-1 bg-white/5 rounded text-zinc-300">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <span className="text-zinc-500">Timing:</span>
                      <div className="text-zinc-300">{platform.optimalTiming}</div>
                    </div>
                    <div>
                      <span className="text-zinc-500">Frequency:</span>
                      <div className="text-zinc-300">{platform.frequency}</div>
                    </div>
                  </div>
                  <div>
                    <span className="text-zinc-500">Algorithm Focus:</span>
                    <div className="text-brand-teal">{platform.algorithm}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Protocols */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full text-brand-teal text-sm mb-8"
            >
              <Shield className="w-4 h-4" />
              <span>Account Safety First</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Platform-Safe Protocols
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-zinc-400 max-w-2xl mx-auto"
            >
              Your accounts are protected by multiple safety layers
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyProtocols.map((protocol, index) => {
              const Icon = protocol.icon;
              return (
                <motion.div
                  key={protocol.rule}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl p-6 border border-white/5"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-brand-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">{protocol.rule}</h3>
                      <p className="text-sm text-zinc-400 mb-3">{protocol.description}</p>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                        protocol.status === 'enforced' ? 'bg-brand-green/20 text-brand-green' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        <CheckCircle2 className="w-3 h-3" />
                        {protocol.status === 'enforced' ? 'Always Enforced' : 'Active Monitoring'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Metrics We Track */}
      <section className="py-32 px-6 bg-gradient-to-b from-transparent via-brand-teal/5 to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Metrics That Matter in 2026
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-zinc-400"
            >
              We track the metrics that actually influence algorithm ranking
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {engagementMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.metric}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl p-6 border border-white/5 text-center"
                >
                  <Icon className="w-10 h-10 text-brand-teal mx-auto mb-4" />
                  <h3 className="font-bold text-white mb-2">{metric.metric}</h3>
                  <p className="text-sm text-zinc-500">{metric.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-16 border border-brand-teal/20"
          >
            <RefreshCw className="w-16 h-16 text-brand-teal mx-auto mb-8" />
            <h2 className="text-4xl font-bold text-white mb-6">
              Experience the Methodology
            </h2>
            <p className="text-xl text-zinc-400 mb-10 max-w-xl mx-auto">
              See the scientific approach in action with your first campaign.
            </p>
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-5 btn-gradient text-white rounded-2xl font-semibold text-lg inline-flex items-center gap-3"
              >
                Start Your Campaign
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-zinc-800/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <Logo size="md" />
          <div className="flex items-center gap-10 text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors text-sm">Home</Link>
            <Link href="/science" className="hover:text-white transition-colors text-sm">The Science</Link>
            <Link href="/pricing" className="hover:text-white transition-colors text-sm">Pricing</Link>
            <Link href="/login" className="hover:text-white transition-colors text-sm">Login</Link>
          </div>
          <p className="text-zinc-600 text-sm">© {new Date().getFullYear()} Social0n</p>
        </div>
      </footer>
    </div>
  );
}
