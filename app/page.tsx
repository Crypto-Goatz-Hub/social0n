'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Zap, Target, BarChart3, Shield, Check, ArrowRight,
  Sparkles, ChevronDown, Users, Clock, TrendingUp,
  Instagram, Linkedin, Facebook, Globe,
  Play, Calendar, Layers
} from 'lucide-react';
import { Logo, LogoIcon } from '@/components/Logo';

const campaignTypes = [
  {
    title: 'Local Visibility Accelerator',
    description: 'Drive calls, directions, and local leads with geo-targeted social campaigns.',
    platforms: ['Google Business', 'Facebook', 'Instagram'],
    icon: Target,
    color: 'from-brand-teal to-brand-green',
    price: 197,
  },
  {
    title: 'Authority Builder',
    description: 'Build trust and inbound interest with thought leadership content.',
    platforms: ['LinkedIn', 'Facebook'],
    icon: TrendingUp,
    color: 'from-brand-green to-brand-lime',
    price: 247,
  },
  {
    title: 'Content → Lead Engine',
    description: 'Capture emails and nurture leads with strategic lead magnet campaigns.',
    platforms: ['LinkedIn', 'Facebook', 'Instagram'],
    icon: Users,
    color: 'from-brand-teal to-cyan-500',
    price: 297,
  },
  {
    title: 'Brand Momentum Engine',
    description: 'Boost share-of-voice and engagement with pattern-interrupt content.',
    platforms: ['All Platforms'],
    icon: Zap,
    color: 'from-brand-lime to-yellow-400',
    price: 197,
  },
];

const features = [
  {
    icon: Layers,
    title: 'Strategic Modules',
    description: 'Proven, battle-tested content strategies selected by AI for your specific goals.',
  },
  {
    icon: Shield,
    title: 'Platform-Safe',
    description: 'Built-in posting limits and rules to protect your accounts from penalties.',
  },
  {
    icon: Calendar,
    title: 'Time-Boxed Campaigns',
    description: 'Finite 30-day campaign runs with clear objectives and deliverables.',
  },
  {
    icon: BarChart3,
    title: 'Transparent Reporting',
    description: 'Honest metrics focused on engagement trends and funnel activity.',
  },
];

const howItWorks = [
  {
    step: 1,
    title: 'Connect',
    subtitle: 'Link Your Accounts',
    description: 'Connect your social accounts and CRM in seconds. We handle the technical setup.',
    icon: Globe,
  },
  {
    step: 2,
    title: 'Customize',
    subtitle: 'Choose Your Campaign',
    description: 'Select from proven campaign types. AI picks the best modules for your industry.',
    icon: Zap,
  },
  {
    step: 3,
    title: 'Automate',
    subtitle: 'Watch Results Flow',
    description: 'Campaigns run automatically. Approve content, track performance, capture leads.',
    icon: Play,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-900 overflow-x-hidden">
      {/* Navigation - Premium floating pill */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
        <div className="glass-header rounded-full px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Logo size="md" />
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a href="#campaigns" className="text-zinc-400 hover:text-white transition-colors">
                Campaigns
              </a>
              <a href="#how-it-works" className="text-zinc-400 hover:text-white transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="text-zinc-400 hover:text-white transition-colors">
                Pricing
              </a>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link href="/signup">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-2.5 btn-gradient text-white rounded-xl font-medium"
                >
                  Start Campaign
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/5 via-transparent to-brand-green/5" />

        <div className="relative text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 glass-card rounded-full text-brand-teal text-sm mb-10"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Campaign-as-a-Service Platform</span>
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight"
          >
            Social Automation
            <br />
            <span className="text-gradient-brand">
              Delivers Results
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Stop posting randomly. Start running
            <span className="text-white"> outcome-driven campaigns </span>
            that generate leads, build authority, and grow your brand.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 btn-gradient text-white rounded-2xl font-semibold text-lg flex items-center gap-3 shadow-glow-brand"
              >
                Launch Your First Campaign
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <a href="#how-it-works">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 glass-card text-white rounded-2xl font-medium text-lg hover:bg-white/5 transition-all"
              >
                See How It Works
              </motion.button>
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-zinc-500"
          >
            {[
              { icon: Check, text: 'No long-term contracts' },
              { icon: Check, text: 'Platform-safe posting' },
              { icon: Check, text: 'AI-powered content' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <item.icon className="w-4 h-4 text-brand-green" />
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Supported platforms */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-12 flex items-center justify-center gap-6"
          >
            {[
              { icon: Linkedin, name: 'LinkedIn' },
              { icon: Facebook, name: 'Facebook' },
              { icon: Instagram, name: 'Instagram' },
              { icon: Globe, name: 'Google Business' },
            ].map((platform) => (
              <div
                key={platform.name}
                className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-zinc-500 hover:text-brand-teal transition-colors"
                title={platform.name}
              >
                <platform.icon className="w-6 h-6" />
              </div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-zinc-600"
            >
              <ChevronDown className="w-8 h-8" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Campaign Types Section */}
      <section id="campaigns" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full text-brand-teal text-sm mb-8"
            >
              <Target className="w-4 h-4" />
              <span>Outcome-Driven Campaigns</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Choose Your Objective
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-zinc-400 max-w-2xl mx-auto"
            >
              Each campaign is purpose-built for a specific outcome.
              <span className="text-white"> Pick one, and we handle the rest.</span>
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {campaignTypes.map((campaign, index) => {
              const Icon = campaign.icon;
              return (
                <motion.div
                  key={campaign.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="feature-card glass-card rounded-2xl p-8 border border-white/5"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${campaign.color} flex items-center justify-center shadow-glow-brand`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold text-white">${campaign.price}</span>
                      <span className="text-zinc-500 text-sm block">per campaign</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-white mb-3">{campaign.title}</h3>
                  <p className="text-zinc-400 mb-6">{campaign.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {campaign.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="px-3 py-1 text-xs rounded-full bg-white/5 text-zinc-400 border border-white/10"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 px-6 bg-gradient-to-b from-transparent via-brand-teal/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              HOW IT WORKS
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-zinc-400"
            >
              Three simple steps to transform your social presence
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="glass-card rounded-2xl p-8 border border-white/5"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-teal to-brand-green flex items-center justify-center text-white font-bold text-lg">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  </div>

                  <div className="glass-card rounded-xl p-6 mb-6 flex items-center justify-center">
                    <Icon className="w-12 h-12 text-brand-teal" />
                  </div>

                  <h4 className="text-lg font-medium text-white mb-2">{item.subtitle}</h4>
                  <p className="text-zinc-400">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-6 border border-white/5"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-teal/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-brand-teal" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-zinc-400 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-16 glass-card rounded-3xl border border-brand-teal/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/10 to-brand-green/5 rounded-3xl" />

            <div className="relative">
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-brand-teal to-brand-green rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-glow-brand animate-float"
              >
                <Zap className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Turn On Your Social?
              </h2>

              <p className="text-xl text-zinc-400 mb-10 max-w-xl mx-auto">
                Launch your first campaign today.
                <span className="text-white"> No long-term contracts. Pay per campaign.</span>
              </p>

              <Link href="/signup">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-12 py-5 btn-gradient text-white rounded-2xl font-semibold text-lg inline-flex items-center gap-3 shadow-glow-brand"
                >
                  Start Your Campaign
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>

              <p className="mt-6 text-zinc-500 text-sm">
                Starting at $197 per campaign run
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-zinc-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <Logo size="md" />

            <div className="flex items-center gap-10 text-zinc-400">
              {['Campaigns', 'How It Works', 'Pricing', 'Login'].map((item) => (
                <Link
                  key={item}
                  href={item === 'Login' ? '/login' : `#${item.toLowerCase().replace(' ', '-')}`}
                  className="hover:text-white transition-colors text-sm"
                >
                  {item}
                </Link>
              ))}
            </div>

            <p className="text-zinc-600 text-sm">
              © {new Date().getFullYear()} Social0n
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
