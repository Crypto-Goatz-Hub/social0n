'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Brain, Atom, FlaskConical, Microscope, LineChart, Binary,
  Activity, Lightbulb, Target, Clock, Zap, ArrowRight,
  Check, BookOpen, Beaker, Dna, Gauge, TrendingUp
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { AnimatedFlowChart } from '@/components/ui/AnimatedFlowChart';

const researchAreas = [
  {
    icon: Brain,
    title: 'Cognitive Science',
    description: 'Understanding how the brain processes social content',
    findings: [
      'Attention capture occurs in 1.3 seconds or not at all',
      'Emotional triggers drive 70% of share decisions',
      'Pattern interrupts increase scroll-stop rate by 340%',
      'Value density determines save/bookmark behavior',
    ],
  },
  {
    icon: Binary,
    title: 'Algorithm Analysis',
    description: 'Reverse-engineering platform recommendation systems',
    findings: [
      '2026 algorithms prioritize "dwell time" over likes',
      'Comment depth signals content quality to AI',
      'Share-to-view ratio is the new viral metric',
      'Consistency beats frequency in feed ranking',
    ],
  },
  {
    icon: Activity,
    title: 'Behavioral Psychology',
    description: 'Leveraging decision-making patterns for engagement',
    findings: [
      'Social proof multiplies conversion by 4.2x',
      'Reciprocity drives 60% of follow-backs',
      'Scarcity language increases click-through 280%',
      'Authority signals boost trust metrics 3.5x',
    ],
  },
  {
    icon: LineChart,
    title: 'Data Analytics',
    description: 'Mining engagement patterns across platforms',
    findings: [
      'Optimal posting windows vary by industry',
      'Tuesday-Thursday shows 23% higher B2B engagement',
      'Story-to-feed ratio affects algorithmic reach',
      'Cross-platform timing requires 4-hour offsets',
    ],
  },
];

const contentModules = [
  { name: 'Hook Optimizer', description: 'First-line engineering for attention capture' },
  { name: 'Value Stacker', description: 'Information density optimization' },
  { name: 'Emotion Mapper', description: 'Psychological trigger integration' },
  { name: 'CTA Architect', description: 'Conversion pathway design' },
  { name: 'Story Weaver', description: 'Narrative arc construction' },
  { name: 'Authority Builder', description: 'Expertise signal injection' },
  { name: 'Social Proof Engine', description: 'Trust indicator placement' },
  { name: 'Curiosity Generator', description: 'Information gap creation' },
  { name: 'Pattern Interruptor', description: 'Scroll-stop mechanics' },
  { name: 'Hashtag Strategist', description: 'Discovery optimization' },
  { name: 'Platform Adapter', description: 'Cross-platform reformatting' },
  { name: 'Timing Calculator', description: 'Optimal schedule computation' },
  { name: 'Engagement Predictor', description: 'Performance forecasting' },
  { name: 'A/B Variant Creator', description: 'Testing framework generation' },
];

const timeline = [
  { year: '2020', event: 'Random posting era', status: 'outdated' },
  { year: '2022', event: 'Basic scheduling tools', status: 'outdated' },
  { year: '2024', event: 'AI-assisted drafting', status: 'outdated' },
  { year: '2026', event: 'Scientific content engineering', status: 'current' },
];

export default function SciencePage() {
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
              <Link href="/#campaigns" className="text-zinc-400 hover:text-white transition-colors text-sm">
                Campaigns
              </Link>
              <Link href="/methodology" className="text-zinc-400 hover:text-white transition-colors text-sm">
                Methodology
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
            <Microscope className="w-4 h-4" />
            <span>Research & Development</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
          >
            The Science Behind
            <br />
            <span className="text-gradient-brand">Content That Converts</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
          >
            Social0n isn&apos;t built on opinions. It&apos;s built on cognitive science, behavioral psychology,
            algorithm analysis, and data from millions of high-performing posts.
          </motion.p>
        </div>
      </section>

      {/* Evolution Timeline */}
      <section className="py-20 px-6 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white text-center mb-12"
          >
            The Evolution of Social Content
          </motion.h2>
          <div className="flex justify-between items-center">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center flex-1"
              >
                <div className={`text-3xl font-bold mb-2 ${item.status === 'current' ? 'text-gradient-brand' : 'text-zinc-600'}`}>
                  {item.year}
                </div>
                <div className={`text-sm ${item.status === 'current' ? 'text-white' : 'text-zinc-500 line-through'}`}>
                  {item.event}
                </div>
                {item.status === 'current' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="mt-3 inline-flex items-center gap-1 px-3 py-1 bg-brand-teal/20 rounded-full text-brand-teal text-xs"
                  >
                    <Zap className="w-3 h-3" />
                    You are here
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Four Pillars of Content Science
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-zinc-400 max-w-2xl mx-auto"
            >
              Our AI is trained on research from multiple scientific disciplines
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {researchAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-8 border border-white/5 hover:border-brand-teal/30 transition-all"
                >
                  <div className="flex items-start gap-5 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-brand-teal to-brand-green flex items-center justify-center flex-shrink-0">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{area.title}</h3>
                      <p className="text-zinc-400">{area.description}</p>
                    </div>
                  </div>
                  <div className="space-y-3 pl-4 border-l-2 border-brand-teal/30">
                    {area.findings.map((finding, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="text-sm text-zinc-300"
                      >
                        {finding}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Flow Chart Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent via-brand-teal/5 to-transparent">
        <AnimatedFlowChart />
      </section>

      {/* Content Modules */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full text-brand-teal text-sm mb-8"
            >
              <FlaskConical className="w-4 h-4" />
              <span>14 Validated Modules</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              The Content Generation Engine
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-zinc-400 max-w-2xl mx-auto"
            >
              Each module has been tested across 50,000+ campaigns and optimized for maximum performance
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {contentModules.map((module, index) => (
              <motion.div
                key={module.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -3 }}
                className="glass-card rounded-xl p-5 border border-white/5 hover:border-brand-teal/30 transition-all cursor-default"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-teal/10 flex items-center justify-center mb-3">
                  <Beaker className="w-4 h-4 text-brand-teal" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">{module.name}</h3>
                <p className="text-xs text-zinc-500">{module.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Metrics Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-transparent via-brand-teal/5 to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              The Numbers Don&apos;t Lie
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: '10M+', label: 'Posts Analyzed', icon: BookOpen },
              { value: '50K+', label: 'Campaigns Run', icon: Target },
              { value: '340%', label: 'Avg. Engagement Lift', icon: TrendingUp },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="glass-card rounded-2xl p-8 border border-white/5 text-center"
                >
                  <Icon className="w-12 h-12 text-brand-teal mx-auto mb-4" />
                  <div className="text-5xl font-bold text-gradient-brand mb-2">{stat.value}</div>
                  <div className="text-zinc-400">{stat.label}</div>
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
            <Atom className="w-16 h-16 text-brand-teal mx-auto mb-8" />
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Apply the Science?
            </h2>
            <p className="text-xl text-zinc-400 mb-10 max-w-xl mx-auto">
              Stop guessing. Start generating content based on data, psychology, and algorithm intelligence.
            </p>
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-5 btn-gradient text-white rounded-2xl font-semibold text-lg inline-flex items-center gap-3"
              >
                Launch Your Campaign
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
            <Link href="/methodology" className="hover:text-white transition-colors text-sm">Methodology</Link>
            <Link href="/pricing" className="hover:text-white transition-colors text-sm">Pricing</Link>
            <Link href="/login" className="hover:text-white transition-colors text-sm">Login</Link>
          </div>
          <p className="text-zinc-600 text-sm">© {new Date().getFullYear()} Social0n</p>
        </div>
      </footer>
    </div>
  );
}
