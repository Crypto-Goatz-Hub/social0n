// ============================================================
// SXO (Search Experience Optimization) Core Library
// ============================================================
// Template system for all RocketOpp SaaS sites
// ============================================================

export interface SXOConfig {
  siteName: string;
  siteUrl: string;
  organization: OrganizationSchema;
  product?: ProductSchema;
  faq?: FAQItem[];
  features?: FeatureSchema[];
  testimonials?: TestimonialSchema[];
  pricing?: PricingSchema[];
}

// Schema.org Types
export interface OrganizationSchema {
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs?: string[];
  contactPoint?: {
    telephone?: string;
    email?: string;
    contactType: string;
  };
}

export interface ProductSchema {
  name: string;
  description: string;
  image?: string;
  brand: string;
  offers?: {
    price: number;
    priceCurrency: string;
    availability: 'InStock' | 'OutOfStock' | 'PreOrder';
    url?: string;
  }[];
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FeatureSchema {
  name: string;
  description: string;
  icon?: string;
  benefit?: string;
}

export interface TestimonialSchema {
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
  content: string;
  rating?: number;
}

export interface PricingSchema {
  name: string;
  price: number;
  currency: string;
  interval?: 'month' | 'year' | 'one-time';
  features: string[];
  highlighted?: boolean;
  ctaText?: string;
  ctaUrl?: string;
}

// ============================================================
// E-E-A-T Content Guidelines
// ============================================================
export const EEAT_GUIDELINES = {
  experience: {
    description: 'First-hand experience with the topic',
    signals: [
      'Case studies with real data',
      'Before/after comparisons',
      'Screenshots and proof',
      'Specific metrics and results',
      'Customer success stories',
    ],
  },
  expertise: {
    description: 'Depth of knowledge in the subject area',
    signals: [
      'Technical accuracy',
      'Industry-specific terminology',
      'Comprehensive coverage',
      'Original research or insights',
      'Author credentials display',
    ],
  },
  authoritativeness: {
    description: 'Recognition as a go-to source',
    signals: [
      'Brand mentions and citations',
      'Backlinks from authority sites',
      'Industry awards/recognition',
      'Media coverage',
      'Expert contributions',
    ],
  },
  trustworthiness: {
    description: 'Accuracy and reliability',
    signals: [
      'Transparent pricing',
      'Clear contact information',
      'Privacy policy and terms',
      'Secure checkout (HTTPS)',
      'Customer reviews/testimonials',
      'Money-back guarantees',
    ],
  },
};

// ============================================================
// SXO Content Structure
// ============================================================
export interface SXOPageContent {
  // Core SEO
  title: string;
  metaDescription: string;
  canonicalUrl?: string;
  ogImage?: string;

  // Content Sections
  hero: {
    headline: string;
    subheadline: string;
    ctas: { text: string; url: string; primary?: boolean }[];
    trustIndicators?: string[];
  };

  // Problem-Agitation-Solution
  problem?: {
    headline: string;
    painPoints: string[];
    agitation: string;
  };

  solution?: {
    headline: string;
    benefits: { title: string; description: string; icon?: string }[];
  };

  // Social Proof
  socialProof?: {
    stats?: { value: string; label: string }[];
    logos?: { name: string; src: string }[];
    testimonials?: TestimonialSchema[];
  };

  // Features
  features?: {
    headline: string;
    subheadline?: string;
    items: FeatureSchema[];
  };

  // How It Works
  howItWorks?: {
    headline: string;
    steps: { step: number; title: string; description: string; icon?: string }[];
  };

  // Pricing
  pricing?: {
    headline: string;
    subheadline?: string;
    plans: PricingSchema[];
  };

  // FAQ
  faq?: {
    headline: string;
    items: FAQItem[];
  };

  // Final CTA
  finalCta?: {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaUrl: string;
  };
}

// ============================================================
// Schema.org JSON-LD Generators
// ============================================================
export function generateOrganizationSchema(org: OrganizationSchema): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    url: org.url,
    logo: org.logo,
    description: org.description,
    sameAs: org.sameAs || [],
    ...(org.contactPoint && {
      contactPoint: {
        '@type': 'ContactPoint',
        ...org.contactPoint,
      },
    }),
  };
}

export function generateProductSchema(product: ProductSchema): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    ...(product.offers && {
      offers: product.offers.map((offer) => ({
        '@type': 'Offer',
        price: offer.price,
        priceCurrency: offer.priceCurrency,
        availability: `https://schema.org/${offer.availability}`,
        url: offer.url,
      })),
    }),
    ...(product.aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.aggregateRating.ratingValue,
        reviewCount: product.aggregateRating.reviewCount,
      },
    }),
  };
}

export function generateFAQSchema(items: FAQItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function generateSoftwareApplicationSchema(config: {
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem: string;
  offers: { price: number; currency: string }[];
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: config.name,
    description: config.description,
    applicationCategory: config.applicationCategory,
    operatingSystem: config.operatingSystem,
    offers: config.offers.map((offer) => ({
      '@type': 'Offer',
      price: offer.price,
      priceCurrency: offer.currency,
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ============================================================
// SXO Content Quality Scoring
// ============================================================
export function scoreSXOContent(content: SXOPageContent): {
  score: number;
  maxScore: number;
  breakdown: { category: string; score: number; max: number; tips: string[] }[];
} {
  const breakdown: { category: string; score: number; max: number; tips: string[] }[] = [];

  // Title optimization (20 points)
  const titleScore = {
    category: 'Title',
    score: 0,
    max: 20,
    tips: [] as string[],
  };
  if (content.title.length >= 30 && content.title.length <= 60) titleScore.score += 10;
  else titleScore.tips.push('Title should be 30-60 characters');
  if (content.title.includes('|') || content.title.includes('-')) titleScore.score += 5;
  else titleScore.tips.push('Consider adding brand separator (| or -)');
  if (/[0-9]/.test(content.title)) titleScore.score += 5;
  else titleScore.tips.push('Numbers in titles increase CTR');
  breakdown.push(titleScore);

  // Meta description (15 points)
  const metaScore = {
    category: 'Meta Description',
    score: 0,
    max: 15,
    tips: [] as string[],
  };
  if (content.metaDescription.length >= 120 && content.metaDescription.length <= 160) metaScore.score += 10;
  else metaScore.tips.push('Meta description should be 120-160 characters');
  if (content.metaDescription.includes('—') || content.metaDescription.toLowerCase().includes('learn')) metaScore.score += 5;
  else metaScore.tips.push('Add a compelling call-to-action');
  breakdown.push(metaScore);

  // Content depth (25 points)
  const contentScore = {
    category: 'Content Depth',
    score: 0,
    max: 25,
    tips: [] as string[],
  };
  if (content.features && content.features.items.length >= 4) contentScore.score += 5;
  else contentScore.tips.push('Add at least 4 features');
  if (content.howItWorks && content.howItWorks.steps.length >= 3) contentScore.score += 5;
  else contentScore.tips.push('Add how-it-works section with 3+ steps');
  if (content.faq && content.faq.items.length >= 5) contentScore.score += 10;
  else contentScore.tips.push('Add 5+ FAQ items for rich snippets');
  if (content.problem && content.solution) contentScore.score += 5;
  else contentScore.tips.push('Add problem/solution narrative');
  breakdown.push(contentScore);

  // Social proof (20 points)
  const socialScore = {
    category: 'Social Proof',
    score: 0,
    max: 20,
    tips: [] as string[],
  };
  if (content.socialProof?.testimonials && content.socialProof.testimonials.length >= 3) socialScore.score += 10;
  else socialScore.tips.push('Add at least 3 testimonials');
  if (content.socialProof?.stats && content.socialProof.stats.length >= 3) socialScore.score += 5;
  else socialScore.tips.push('Add key statistics/metrics');
  if (content.socialProof?.logos && content.socialProof.logos.length >= 4) socialScore.score += 5;
  else socialScore.tips.push('Add client/partner logos');
  breakdown.push(socialScore);

  // CTA optimization (20 points)
  const ctaScore = {
    category: 'CTA Optimization',
    score: 0,
    max: 20,
    tips: [] as string[],
  };
  if (content.hero.ctas.length >= 2) ctaScore.score += 5;
  else ctaScore.tips.push('Add primary and secondary CTAs');
  if (content.hero.trustIndicators && content.hero.trustIndicators.length >= 2) ctaScore.score += 5;
  else ctaScore.tips.push('Add trust indicators near CTAs');
  if (content.finalCta) ctaScore.score += 5;
  else ctaScore.tips.push('Add a final CTA section');
  if (content.pricing && content.pricing.plans.some((p) => p.highlighted)) ctaScore.score += 5;
  else ctaScore.tips.push('Highlight recommended pricing tier');
  breakdown.push(ctaScore);

  const totalScore = breakdown.reduce((sum, b) => sum + b.score, 0);
  const maxScore = breakdown.reduce((sum, b) => sum + b.max, 0);

  return { score: totalScore, maxScore, breakdown };
}

// ============================================================
// Default Social0n SXO Configuration
// ============================================================
export const SOCIAL0N_SXO_CONFIG: SXOConfig = {
  siteName: 'Social0n',
  siteUrl: 'https://social0n.com',
  organization: {
    name: 'Social0n',
    url: 'https://social0n.com',
    logo: 'https://social0n.com/logo.png',
    description: 'Campaign-as-a-Service platform for outcome-driven social media automation. AI-orchestrated campaigns that deliver real business results.',
    sameAs: [
      'https://twitter.com/social0n',
      'https://linkedin.com/company/social0n',
    ],
  },
  product: {
    name: 'Social0n Campaign Platform',
    description: 'AI-powered social media campaign automation that delivers leads, builds authority, and grows your brand with platform-safe posting.',
    brand: 'Social0n',
    offers: [
      { price: 197, priceCurrency: 'USD', availability: 'InStock' },
      { price: 247, priceCurrency: 'USD', availability: 'InStock' },
      { price: 297, priceCurrency: 'USD', availability: 'InStock' },
      { price: 497, priceCurrency: 'USD', availability: 'InStock' },
    ],
  },
  faq: [
    {
      question: 'What is Social0n?',
      answer: 'Social0n is a Campaign-as-a-Service platform that automates your social media marketing with AI-powered, outcome-driven campaigns. Instead of random posting, you get strategic 30-day campaigns designed to achieve specific business objectives.',
    },
    {
      question: 'How long does a campaign last?',
      answer: 'Each campaign runs for 30 days with a defined posting schedule and clear objectives. This time-boxed approach ensures focused execution and measurable results.',
    },
    {
      question: 'Which social platforms are supported?',
      answer: 'Social0n supports LinkedIn, Facebook, Instagram, and Google Business Profile. Our platform-safe posting rules ensure your accounts stay in good standing while maximizing reach.',
    },
    {
      question: 'Do I need to create content myself?',
      answer: 'No. Our AI generates all content based on your business information and campaign objectives. You simply review and approve posts before they go live.',
    },
    {
      question: 'Is there a long-term contract?',
      answer: 'No contracts. You pay per campaign. Run one campaign or many - it\'s entirely up to you. Each campaign is a one-time purchase.',
    },
    {
      question: 'How does the AI ensure content quality?',
      answer: 'Our AI is trained on 14 strategic content modules proven to drive engagement and conversions. Content is tailored to your industry, audience, and campaign objectives.',
    },
    {
      question: 'What happens if I\'m not satisfied?',
      answer: 'We offer a satisfaction guarantee. If you\'re not happy with your campaign results, contact us and we\'ll work to make it right.',
    },
    {
      question: 'Can I pause a campaign?',
      answer: 'Yes. You can pause and resume campaigns at any time from your dashboard. Your remaining posts will be rescheduled automatically.',
    },
  ],
};
