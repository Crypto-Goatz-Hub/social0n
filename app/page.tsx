'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Zap, Target, BarChart3, Shield, Check, ArrowRight,
  Sparkles, ChevronDown, Users, Clock, TrendingUp,
  Instagram, Linkedin, Facebook, Globe,
  Play, Calendar, Layers, Brain, Microscope, FlaskConical,
  LineChart, Atom, Binary, Activity, Lightbulb, Database
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { SimpleFlowChart } from '@/components/ui/AnimatedFlowChart';

const campaignTypes = [
  {
    title: 'Local Visibility Accelerator',
    description: 'Geo-targeted campaigns using proximity-based engagement algorithms to drive calls, directions, and local leads.',
    platforms: ['Google Business', 'Facebook', 'Instagram'],
    icon: Target,
    color: 'from-brand-teal to-brand-green',
    price: 197,
    scienceNote: 'Optimized for local search ranking signals',
  },
  {
    title: 'Authority Builder',
    description: 'Thought leadership content engineered using credibility triggers and expertise-signaling frameworks.',
    platforms: ['LinkedIn', 'Facebook'],
    icon: TrendingUp,
    color: 'from-brand-green to-brand-lime',
    price: 247,
    scienceNote: 'Based on E-E-A-T content principles',
  },
  {
    title: 'Content → Lead Engine',
    description: 'Strategic lead magnet campaigns using behavioral psychology and conversion optimization science.',
    platforms: ['LinkedIn', 'Facebook', 'Instagram'],
    icon: Users,
    color: 'from-brand-teal to-cyan-500',
    price: 297,
    scienceNote: 'Leverages reciprocity and commitment bias',
  },
  {
    title: 'Brand Momentum Engine',
    description: 'Pattern-interrupt content designed using attention science and virality prediction models.',
    platforms: ['All Platforms'],
    icon: Zap,
    color: 'from-brand-lime to-yellow-400',
    price: 197,
    scienceNote: 'Engineered for maximum share velocity',
  },
];

const features = [
  {
    icon: Brain,
    title: 'AI-Driven Intelligence',
    description: 'Neural content generation trained on millions of high-performing posts across industries.',
  },
  {
    icon: Shield,
    title: 'Platform-Safe Science',
    description: 'Algorithm-compliant posting cadences that protect accounts while maximizing reach.',
  },
  {
    icon: FlaskConical,
    title: '14 Proven Modules',
    description: 'Scientifically-validated content frameworks tested across 50,000+ campaigns.',
  },
  {
    icon: LineChart,
    title: 'Predictive Analytics',
    description: 'Machine learning models that forecast engagement and optimize content timing.',
  },
];

const howItWorks = [
  {
    step: 1,
    title: 'Connect',
    subtitle: 'Data Synchronization',
    description: 'Link your accounts. Our AI analyzes your audience demographics, posting history, and engagement patterns.',
    icon: Database,
  },
  {
    step: 2,
    title: 'Configure',
    subtitle: 'Scientific Calibration',
    description: 'Select your objective. AI calibrates content modules, timing algorithms, and platform strategies.',
    icon: Atom,
  },
  {
    step: 3,
    title: 'Launch',
    subtitle: 'Automated Execution',
    description: 'Campaigns run on autopilot. AI continuously optimizes based on real-time performance data.',
    icon: Play,
  },
];

const scienceStats = [
  { value: '14', label: 'Content Modules', sublabel: 'Scientifically validated' },
  { value: '30', label: 'Day Campaigns', sublabel: 'Optimal momentum cycle' },
  { value: '4', label: 'Platforms', sublabel: 'Algorithm-optimized' },
  { value: '2026', label: 'AI Models', sublabel: 'Current year trained' },
];

const sciencePrinciples = [
  {
    icon: Brain,
    title: 'Cognitive Load Optimization',
    description: 'Content structured to match how the brain processes social media - hook within 3 seconds, value within 10, CTA within 30.',
  },
  {
    icon: Activity,
    title: 'Engagement Velocity Science',
    description: 'Posts timed to catch the critical first-hour window when algorithms decide viral potential.',
  },
  {
    icon: Binary,
    title: 'Algorithm Reverse Engineering',
    description: 'Content patterns derived from analyzing what each platform\'s 2026 algorithm actually rewards.',
  },
  {
    icon: Lightbulb,
    title: 'Psychological Trigger Mapping',
    description: 'Strategic use of curiosity gaps, social proof, authority signals, and reciprocity principles.',
  },
];

const faqItems = [
  {
    question: 'How is this different from random posting?',
    answer: 'Random posting is like throwing darts blindfolded. Social0n uses data science - analyzing optimal timing, content psychology, and platform algorithms to engineer posts that perform.',
  },
  {
    question: 'What does "scientifically-validated" mean?',
    answer: 'Our 14 content modules have been tested across 50,000+ campaigns. We measure engagement rates, conversion rates, and algorithmic reach to validate what works in 2026.',
  },
  {
    question: 'How do you stay current with algorithm changes?',
    answer: 'Our AI continuously monitors platform behavior and engagement patterns. Models are retrained monthly to reflect the latest algorithm updates.',
  },
  {
    question: 'Why 30-day campaigns specifically?',
    answer: 'Research shows 30 days is the optimal cycle for building momentum without audience fatigue. It\'s long enough to compound results, short enough to maintain novelty.',
  },
  {
    question: 'Do I need any technical knowledge?',
    answer: 'None. The science happens behind the scenes. You just approve content and watch results. We translate complex optimization into simple, actionable campaigns.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
        <div className="glass-header rounded-2xl md:rounded-full px-4 md:px-8 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Logo size="md" />
            </Link>

            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              <a href="#science" className="text-zinc-400 hover:text-white transition-colors text-sm">
                The Science
              </a>
              <a href="#campaigns" className="text-zinc-400 hover:text-white transition-colors text-sm">
                Campaigns
              </a>
              <a href="#how-it-works" className="text-zinc-400 hover:text-white transition-colors text-sm">
                How It Works
              </a>
              <a href="#faq" className="text-zinc-400 hover:text-white transition-colors text-sm">
                FAQ
              </a>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <Link
                href="/login"
                className="text-zinc-400 hover:text-white transition-colors text-sm hidden sm:block"
              >
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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 md:px-6 pt-28 md:pt-32 pb-16 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/5 via-transparent to-brand-green/5" />

        <div className="relative text-center max-w-5xl mx-auto px-2">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 glass-card rounded-full text-brand-teal text-xs md:text-sm mb-6 md:mb-10"
          >
            <Microscope className="w-3 h-3 md:w-4 md:h-4 animate-pulse" />
            <span>The Science of Social Content - 2026</span>
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand-green animate-pulse" />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 md:mb-8 leading-[1.1] tracking-tight"
          >
            Content Generation
            <br />
            <span className="text-gradient-brand">
              Is Now a Science
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-xl lg:text-2xl text-zinc-400 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            In 2026, guesswork is dead. Social0n uses
            <span className="text-white"> AI-driven behavioral science, </span>
            platform algorithm analysis, and
            <span className="text-white"> predictive engagement models </span>
            to generate content that performs.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-5"
          >
            <Link href="/signup" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-6 md:px-10 py-4 md:py-5 btn-gradient text-white rounded-xl md:rounded-2xl font-semibold text-base md:text-lg flex items-center justify-center gap-2 md:gap-3 shadow-glow-brand"
              >
                Launch Your First Campaign
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </motion.button>
            </Link>
            <a href="#science" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-6 md:px-10 py-4 md:py-5 glass-card text-white rounded-xl md:rounded-2xl font-medium text-base md:text-lg hover:bg-white/5 transition-all flex items-center justify-center gap-2"
              >
                <FlaskConical className="w-4 h-4 md:w-5 md:h-5" />
                Explore the Science
              </motion.button>
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-10 md:mt-16 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-zinc-500"
          >
            {[
              { icon: Check, text: 'Data-driven optimization' },
              { icon: Check, text: '2026 algorithm trained' },
              { icon: Check, text: 'Behavioral science backed' }
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
            className="mt-8 md:mt-12 flex items-center justify-center gap-3 md:gap-6"
          >
            {[
              { icon: Linkedin, name: 'LinkedIn' },
              { icon: Facebook, name: 'Facebook' },
              { icon: Instagram, name: 'Instagram' },
              { icon: Globe, name: 'Google Business' },
            ].map((platform) => (
              <div
                key={platform.name}
                className="w-10 h-10 md:w-12 md:h-12 glass-card rounded-lg md:rounded-xl flex items-center justify-center text-zinc-500 hover:text-brand-teal transition-colors"
                title={platform.name}
              >
                <platform.icon className="w-5 h-5 md:w-6 md:h-6" />
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

      {/* Science Stats Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {scienceStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-gradient-brand mb-1 md:mb-2">
                  {stat.value}
                </div>
                <div className="text-white font-medium text-sm md:text-base">{stat.label}</div>
                <div className="text-zinc-500 text-xs md:text-sm">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Science Section */}
      <section id="science" className="py-16 md:py-32 px-4 md:px-6 bg-gradient-to-b from-transparent via-brand-teal/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 md:px-4 py-2 glass-card rounded-full text-brand-teal text-xs md:text-sm mb-6 md:mb-8"
            >
              <Atom className="w-3 h-3 md:w-4 md:h-4" />
              <span>The Science Behind Social0n</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6"
            >
              Why 2026 Changes Everything
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-base md:text-xl text-zinc-400 max-w-3xl mx-auto"
            >
              Platform algorithms have evolved. Attention spans have shifted.
              <span className="text-white"> The old rules don&apos;t apply anymore.</span>
              {' '}Social0n is built on the new science of content that actually works.
            </motion.p>
          </div>

          {/* Science Principles Grid */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-12 md:mb-20">
            {sciencePrinciples.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl md:rounded-2xl p-5 md:p-8 border border-white/5 hover:border-brand-teal/30 transition-colors"
                >
                  <div className="flex items-start gap-3 md:gap-5">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-br from-brand-teal to-brand-green flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-xl font-semibold text-white mb-2 md:mb-3">{principle.title}</h3>
                      <p className="text-sm md:text-base text-zinc-400 leading-relaxed">{principle.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Science Explainer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-10 md:p-14 border border-brand-teal/20"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  From Art to Engineering
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                  In 2026, social media content generation has transformed from creative guesswork into a precise engineering discipline. Every post is optimized for:
                </p>
                <ul className="space-y-4">
                  {[
                    'Hook optimization - capturing attention in the first 1.3 seconds',
                    'Value density - maximum information per scroll-second',
                    'Emotional resonance mapping - triggering share impulses',
                    'Algorithm compliance - working with platforms, not against them',
                    'Conversion pathway design - natural CTAs that convert',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-300">
                      <Check className="w-5 h-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card rounded-2xl p-8 bg-gradient-to-br from-brand-teal/10 to-brand-green/5">
                <div className="text-center">
                  <Brain className="w-20 h-20 text-brand-teal mx-auto mb-6" />
                  <p className="text-2xl font-bold text-white mb-3">The 2026 Content Formula</p>
                  <p className="text-zinc-400">
                    Hook + Value + Emotion + Timing = Performance
                  </p>
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-sm text-zinc-500">
                      Our AI has analyzed 10M+ posts to derive the patterns that work today.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Campaign Types Section */}
      <section id="campaigns" className="py-16 md:py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full text-brand-teal text-sm mb-8"
            >
              <Target className="w-4 h-4" />
              <span>Scientifically-Designed Campaigns</span>
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
              Each campaign type is engineered for a specific outcome using
              <span className="text-white"> proven content science principles.</span>
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {campaignTypes.map((campaign, index) => {
              const Icon = campaign.icon;
              return (
                <motion.div
                  key={campaign.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="feature-card glass-card rounded-xl md:rounded-2xl p-5 md:p-8 border border-white/5"
                >
                  <div className="flex items-start justify-between mb-4 md:mb-6">
                    <div className={`w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br ${campaign.color} flex items-center justify-center shadow-glow-brand`}>
                      <Icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <span className="text-2xl md:text-3xl font-bold text-white">${campaign.price}</span>
                      <span className="text-zinc-500 text-xs md:text-sm block">per campaign</span>
                    </div>
                  </div>

                  <h3 className="text-lg md:text-2xl font-semibold text-white mb-2 md:mb-3">{campaign.title}</h3>
                  <p className="text-sm md:text-base text-zinc-400 mb-3 md:mb-4">{campaign.description}</p>

                  <div className="flex items-center gap-2 text-brand-teal text-xs md:text-sm mb-4 md:mb-6">
                    <FlaskConical className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{campaign.scienceNote}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {campaign.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="px-2 md:px-3 py-1 text-[10px] md:text-xs rounded-full bg-white/5 text-zinc-400 border border-white/10"
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
      <section id="how-it-works" className="py-16 md:py-32 px-4 md:px-6 bg-gradient-to-b from-transparent via-brand-teal/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6"
            >
              THE SCIENTIFIC PROCESS
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-base md:text-xl text-zinc-400"
            >
              Three steps backed by data science and behavioral research
            </motion.p>

            {/* Animated Flow Chart */}
            <SimpleFlowChart />
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            {howItWorks.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="glass-card rounded-xl md:rounded-2xl p-5 md:p-8 border border-white/5"
                >
                  <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-brand-teal to-brand-green flex items-center justify-center text-white font-bold text-base md:text-lg">
                      {item.step}
                    </div>
                    <h3 className="text-base md:text-xl font-semibold text-white">{item.title}</h3>
                  </div>

                  <div className="glass-card rounded-lg md:rounded-xl p-4 md:p-6 mb-4 md:mb-6 flex items-center justify-center">
                    <Icon className="w-8 h-8 md:w-12 md:h-12 text-brand-teal" />
                  </div>

                  <h4 className="text-base md:text-lg font-medium text-white mb-1 md:mb-2">{item.subtitle}</h4>
                  <p className="text-sm md:text-base text-zinc-400">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4"
            >
              Built on Content Science
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm md:text-base text-zinc-400 max-w-2xl mx-auto"
            >
              Every feature is designed using the latest research in platform algorithms, behavioral psychology, and engagement optimization.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/5"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-brand-teal/10 flex items-center justify-center mb-3 md:mb-4">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-brand-teal" />
                  </div>
                  <h3 className="text-sm md:text-lg font-semibold text-white mb-1 md:mb-2">{feature.title}</h3>
                  <p className="text-zinc-400 text-xs md:text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-32 px-4 md:px-6 bg-gradient-to-b from-transparent via-brand-teal/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm md:text-base text-zinc-400"
            >
              Understanding the science behind effective content
            </motion.p>
          </div>

          <div className="space-y-3 md:space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-lg md:rounded-xl p-4 md:p-6 border border-white/5"
              >
                <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3">{item.question}</h3>
                <p className="text-sm md:text-base text-zinc-400">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-32 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-8 md:p-16 glass-card rounded-2xl md:rounded-3xl border border-brand-teal/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/10 to-brand-green/5 rounded-2xl md:rounded-3xl" />

            <div className="relative">
              <motion.div
                className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-brand-teal to-brand-green rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-glow-brand animate-float"
              >
                <Microscope className="w-7 h-7 md:w-10 md:h-10 text-white" />
              </motion.div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                Ready to Apply the Science?
              </h2>

              <p className="text-base md:text-xl text-zinc-400 mb-8 md:mb-10 max-w-xl mx-auto">
                Stop guessing. Start using
                <span className="text-white"> data-driven content generation </span>
                built for 2026 algorithms.
              </p>

              <Link href="/signup" className="inline-block w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 btn-gradient text-white rounded-xl md:rounded-2xl font-semibold text-base md:text-lg inline-flex items-center justify-center gap-2 md:gap-3 shadow-glow-brand"
                >
                  Launch Your First Campaign
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </motion.button>
              </Link>

              <p className="mt-4 md:mt-6 text-zinc-500 text-xs md:text-sm">
                Starting at $197 per 30-day campaign | No contracts | Platform-safe
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 md:py-16 px-4 md:px-6 border-t border-zinc-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            <Logo size="md" />

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10 text-zinc-400">
              {['The Science', 'Campaigns', 'How It Works', 'FAQ', 'Login'].map((item) => (
                <Link
                  key={item}
                  href={item === 'Login' ? '/login' : `#${item.toLowerCase().replace(' ', '-').replace('the-', '')}`}
                  className="hover:text-white transition-colors text-xs md:text-sm"
                >
                  {item}
                </Link>
              ))}
            </div>

            <p className="text-zinc-600 text-sm">
              © {new Date().getFullYear()} Social0n | The Science of Social Content
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
