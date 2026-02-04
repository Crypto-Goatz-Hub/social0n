'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Zap, Target, Users, TrendingUp, Check, ArrowRight,
  Sparkles, Shield, Clock, Star, Crown, Rocket,
  MessageSquare, BarChart3, Calendar, Globe
} from 'lucide-react';
import { Logo } from '@/components/Logo';

const pricingPlans = [
  {
    name: 'Local Visibility Accelerator',
    price: 197,
    description: 'Drive local traffic, calls, and foot traffic with geo-targeted social campaigns.',
    icon: Target,
    color: 'from-brand-teal to-brand-green',
    popular: false,
    features: [
      '30-day campaign duration',
      'Google Business Profile optimization',
      'Facebook local targeting',
      'Instagram geo-tags',
      '60+ pieces of content',
      'Location-based hashtags',
      'Local SEO signals',
      'Performance dashboard',
    ],
    bestFor: 'Local businesses, restaurants, service providers',
  },
  {
    name: 'Authority Builder',
    price: 247,
    description: 'Position yourself as an industry thought leader with expertise-driven content.',
    icon: TrendingUp,
    color: 'from-brand-green to-brand-lime',
    popular: false,
    features: [
      '30-day campaign duration',
      'LinkedIn thought leadership',
      'Facebook professional content',
      '80+ pieces of content',
      'Industry-specific insights',
      'Expertise signaling',
      'E-E-A-T optimized',
      'Engagement analytics',
    ],
    bestFor: 'Consultants, coaches, B2B professionals',
  },
  {
    name: 'Content → Lead Engine',
    price: 297,
    description: 'Convert followers into leads with strategic nurture campaigns.',
    icon: Users,
    color: 'from-brand-teal to-cyan-500',
    popular: true,
    features: [
      '30-day campaign duration',
      'LinkedIn lead generation',
      'Facebook lead ads support',
      'Instagram conversion content',
      '100+ pieces of content',
      'Lead magnet promotion',
      'CRM integration',
      'Conversion tracking',
      'A/B testing variants',
    ],
    bestFor: 'Agencies, SaaS, coaches wanting leads',
  },
  {
    name: 'Brand Momentum Engine',
    price: 197,
    description: 'Build brand awareness and engagement with viral-optimized content.',
    icon: Zap,
    color: 'from-brand-lime to-yellow-400',
    popular: false,
    features: [
      '30-day campaign duration',
      'All 4 platforms included',
      '120+ pieces of content',
      'Pattern-interrupt hooks',
      'Viral optimization',
      'Trend integration',
      'Share-worthy formatting',
      'Brand voice consistency',
    ],
    bestFor: 'New brands, product launches, awareness campaigns',
  },
];

const comparisons = [
  { feature: 'AI Content Generation', social0n: true, diy: false, agency: true },
  { feature: 'Platform Algorithm Optimization', social0n: true, diy: false, agency: 'Maybe' },
  { feature: 'Scientific Content Framework', social0n: true, diy: false, agency: false },
  { feature: 'Real-time Performance Tracking', social0n: true, diy: 'Manual', agency: true },
  { feature: 'Platform-Safe Posting', social0n: true, diy: 'Risk', agency: 'Maybe' },
  { feature: 'Cost per Month', social0n: '$197-297', diy: '$0 (time)', agency: '$2,000+' },
  { feature: 'Time Investment', social0n: '1 hr/week', diy: '20+ hrs/week', agency: '2 hrs/week' },
  { feature: 'Long-term Contract', social0n: false, diy: 'N/A', agency: 'Usually' },
];

const guarantees = [
  {
    icon: Shield,
    title: 'Platform Safety Guarantee',
    description: 'Your accounts will never be at risk. We follow all platform guidelines.',
  },
  {
    icon: Star,
    title: 'Quality Guarantee',
    description: 'If you\'re not satisfied with content quality, we\'ll regenerate at no cost.',
  },
  {
    icon: Clock,
    title: 'Delivery Guarantee',
    description: 'Your campaign launches within 48 hours of purchase, guaranteed.',
  },
];

const faqs = [
  {
    q: 'What happens after 30 days?',
    a: 'Your campaign ends. You can purchase another campaign to continue, but there\'s no automatic renewal or subscription.',
  },
  {
    q: 'Can I customize the content?',
    a: 'Yes! You review and approve all content before it goes live. Request edits anytime.',
  },
  {
    q: 'Do I need to connect my social accounts?',
    a: 'Yes, via secure OAuth. We never store your passwords. You can revoke access anytime.',
  },
  {
    q: 'What if I want to run multiple campaigns?',
    a: 'You can run campaigns simultaneously or stack them back-to-back. Volume discounts available.',
  },
  {
    q: 'Is there a refund policy?',
    a: 'Yes. If you\'re unsatisfied within the first 7 days, we\'ll refund your purchase.',
  },
];

export default function PricingPage() {
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
              <Link href="/methodology" className="text-zinc-400 hover:text-white transition-colors text-sm">
                Methodology
              </Link>
              <Link href="/#campaigns" className="text-zinc-400 hover:text-white transition-colors text-sm">
                Campaigns
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
            <Sparkles className="w-4 h-4" />
            <span>Simple, Transparent Pricing</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
          >
            One Campaign.
            <br />
            <span className="text-gradient-brand">One Price. Real Results.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
          >
            No subscriptions. No contracts. No hidden fees. Pay once per 30-day campaign
            and get scientifically-optimized content that performs.
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative glass-card rounded-2xl p-6 border ${
                    plan.popular ? 'border-brand-teal/50' : 'border-white/5'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 bg-gradient-to-r from-brand-teal to-brand-green rounded-full text-white text-xs font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-5`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-sm text-zinc-400 mb-4">{plan.description}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                    <span className="text-zinc-500 text-sm">/campaign</span>
                  </div>

                  <Link href="/signup">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 rounded-xl font-medium mb-6 ${
                        plan.popular
                          ? 'btn-gradient text-white'
                          : 'bg-white/5 text-white hover:bg-white/10 transition-colors'
                      }`}
                    >
                      Get Started
                    </motion.button>
                  </Link>

                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-brand-green mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <span className="text-xs text-zinc-500">Best for:</span>
                    <p className="text-sm text-zinc-400">{plan.bestFor}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-32 px-6 bg-gradient-to-b from-transparent via-brand-teal/5 to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Why Social0n?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-zinc-400"
            >
              Compare the options
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl overflow-hidden border border-white/5"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-6 text-zinc-400 font-medium">Feature</th>
                    <th className="p-6 text-center">
                      <div className="flex flex-col items-center">
                        <Rocket className="w-8 h-8 text-brand-teal mb-2" />
                        <span className="text-white font-bold">Social0n</span>
                      </div>
                    </th>
                    <th className="p-6 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-3xl mb-2">🧑‍💻</span>
                        <span className="text-zinc-400">DIY</span>
                      </div>
                    </th>
                    <th className="p-6 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-3xl mb-2">🏢</span>
                        <span className="text-zinc-400">Agency</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row, index) => (
                    <tr key={row.feature} className={index !== comparisons.length - 1 ? 'border-b border-white/5' : ''}>
                      <td className="p-6 text-zinc-300">{row.feature}</td>
                      <td className="p-6 text-center">
                        {typeof row.social0n === 'boolean' ? (
                          row.social0n ? (
                            <Check className="w-5 h-5 text-brand-green mx-auto" />
                          ) : (
                            <span className="text-zinc-600">—</span>
                          )
                        ) : (
                          <span className="text-brand-teal font-medium">{row.social0n}</span>
                        )}
                      </td>
                      <td className="p-6 text-center">
                        {typeof row.diy === 'boolean' ? (
                          row.diy ? (
                            <Check className="w-5 h-5 text-brand-green mx-auto" />
                          ) : (
                            <span className="text-zinc-600">—</span>
                          )
                        ) : (
                          <span className="text-zinc-400">{row.diy}</span>
                        )}
                      </td>
                      <td className="p-6 text-center">
                        {typeof row.agency === 'boolean' ? (
                          row.agency ? (
                            <Check className="w-5 h-5 text-brand-green mx-auto" />
                          ) : (
                            <span className="text-zinc-600">—</span>
                          )
                        ) : (
                          <span className="text-zinc-400">{row.agency}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Our Guarantees
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {guarantees.map((guarantee, index) => {
              const Icon = guarantee.icon;
              return (
                <motion.div
                  key={guarantee.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-8 border border-white/5 text-center"
                >
                  <div className="w-16 h-16 rounded-xl bg-brand-teal/10 flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-brand-teal" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{guarantee.title}</h3>
                  <p className="text-zinc-400">{guarantee.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-6 bg-gradient-to-b from-transparent via-brand-teal/5 to-transparent">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Questions?
            </motion.h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-xl p-6 border border-white/5"
              >
                <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-zinc-400">{faq.a}</p>
              </motion.div>
            ))}
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
            <Crown className="w-16 h-16 text-brand-teal mx-auto mb-8" />
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start?
            </h2>
            <p className="text-xl text-zinc-400 mb-10 max-w-xl mx-auto">
              Choose your campaign type and launch within 48 hours.
              No commitment, no subscription, just results.
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
            <p className="mt-6 text-zinc-500 text-sm">
              Starting at $197 | 7-day satisfaction guarantee
            </p>
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
            <Link href="/methodology" className="hover:text-white transition-colors text-sm">Methodology</Link>
            <Link href="/login" className="hover:text-white transition-colors text-sm">Login</Link>
          </div>
          <p className="text-zinc-600 text-sm">© {new Date().getFullYear()} Social0n</p>
        </div>
      </footer>
    </div>
  );
}
