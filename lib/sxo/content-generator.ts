// ============================================================
// Dynamic AI SXO Content Generator
// ============================================================
// Generates SEO-optimized, E-E-A-T compliant content
// Template system for all RocketOpp SaaS sites
// ============================================================

import { SXOPageContent, FAQItem, FeatureSchema, TestimonialSchema, PricingSchema } from './index';

// ============================================================
// Content Generation Prompts
// ============================================================

const SXO_SYSTEM_PROMPT = `You are an expert SXO (Search Experience Optimization) content writer. Your content must:

1. **E-E-A-T Compliance**:
   - Experience: Include first-hand insights, specific examples, real metrics
   - Expertise: Use accurate terminology, demonstrate deep knowledge
   - Authoritativeness: Reference industry standards, cite sources when relevant
   - Trustworthiness: Be transparent about capabilities and limitations

2. **SEO Best Practices**:
   - Natural keyword integration (no keyword stuffing)
   - Semantic variations and LSI keywords
   - Conversational, scannable format
   - Clear hierarchy with H1 > H2 > H3

3. **Conversion Optimization**:
   - Benefit-focused headlines
   - Clear value propositions
   - Address objections proactively
   - Strong, specific CTAs

4. **Tone Guidelines**:
   - Professional but approachable
   - Confident without being arrogant
   - Data-driven claims with specifics
   - NO emojis unless explicitly requested

Output clean, structured JSON matching the requested schema.`;

// ============================================================
// Content Generation Functions
// ============================================================

export interface ContentGenerationParams {
  businessName: string;
  industry: string;
  targetAudience: string;
  uniqueValueProposition: string;
  keyFeatures: string[];
  pricing?: { name: string; price: number; features: string[] }[];
  competitors?: string[];
  tone?: 'professional' | 'casual' | 'bold' | 'friendly';
}

async function getAnthropicClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not configured');
  const { default: Anthropic } = await import('@anthropic-ai/sdk');
  return new Anthropic({ apiKey });
}

export async function generateLandingPageContent(
  params: ContentGenerationParams
): Promise<SXOPageContent> {
  const anthropic = await getAnthropicClient();

  const prompt = `Generate a complete landing page content structure for:

**Business**: ${params.businessName}
**Industry**: ${params.industry}
**Target Audience**: ${params.targetAudience}
**Unique Value**: ${params.uniqueValueProposition}
**Key Features**: ${params.keyFeatures.join(', ')}
${params.pricing ? `**Pricing Tiers**: ${JSON.stringify(params.pricing)}` : ''}
${params.competitors ? `**Competitors to differentiate from**: ${params.competitors.join(', ')}` : ''}
**Tone**: ${params.tone || 'professional'}

Generate a complete SXOPageContent JSON object with:
1. title (50-60 chars, include brand)
2. metaDescription (150-160 chars, compelling CTA)
3. hero section with headline, subheadline, 2 CTAs, 3 trust indicators
4. problem section with headline, 4 pain points, agitation paragraph
5. solution section with headline and 4 benefits
6. socialProof with 3 stats and 3 testimonials
7. features section with 6 feature items
8. howItWorks with 3 steps
9. faq with 8 questions
10. finalCta section

Output ONLY valid JSON, no markdown or explanation.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: SXO_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  try {
    return JSON.parse(text);
  } catch {
    throw new Error('Failed to parse generated content');
  }
}

export async function generateFAQContent(
  businessName: string,
  productDescription: string,
  existingFAQs: FAQItem[],
  targetCount: number = 10
): Promise<FAQItem[]> {
  const anthropic = await getAnthropicClient();

  const prompt = `Generate ${targetCount - existingFAQs.length} additional FAQ items for:

**Business**: ${businessName}
**Product**: ${productDescription}
**Existing FAQs** (do not duplicate):
${existingFAQs.map((f) => `- ${f.question}`).join('\n')}

Rules:
- Focus on buying objections and practical questions
- Include pricing, support, integration, and process questions
- Answers should be 2-4 sentences, clear and helpful
- Questions should feel natural, not keyword-stuffed

Output JSON array of {question, answer} objects only.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    system: SXO_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  try {
    const newFAQs = JSON.parse(text);
    return [...existingFAQs, ...newFAQs];
  } catch {
    return existingFAQs;
  }
}

export async function generateFeatureDescriptions(
  features: string[],
  industry: string,
  targetAudience: string
): Promise<FeatureSchema[]> {
  const anthropic = await getAnthropicClient();

  const prompt = `Transform these feature names into compelling feature descriptions for ${targetAudience} in the ${industry} industry:

Features:
${features.map((f, i) => `${i + 1}. ${f}`).join('\n')}

For each feature, provide:
- name: Feature name (concise, benefit-focused)
- description: 1-2 sentences explaining the benefit
- benefit: One-line outcome statement

Output JSON array only.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    system: SXO_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  try {
    return JSON.parse(text);
  } catch {
    return features.map((f) => ({ name: f, description: f }));
  }
}

export async function generateMetaTags(
  pageType: 'home' | 'product' | 'pricing' | 'blog' | 'landing',
  businessName: string,
  pageContent: string,
  targetKeywords: string[]
): Promise<{ title: string; description: string; keywords: string[] }> {
  const anthropic = await getAnthropicClient();

  const prompt = `Generate SEO meta tags for a ${pageType} page:

**Business**: ${businessName}
**Page Content Summary**: ${pageContent}
**Target Keywords**: ${targetKeywords.join(', ')}

Requirements:
- Title: 50-60 characters, include primary keyword and brand
- Description: 150-160 characters, include CTA, compelling hook
- Keywords: 5-8 relevant terms including variations

Output JSON: {title, description, keywords: string[]}`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 500,
    system: SXO_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  try {
    return JSON.parse(text);
  } catch {
    return {
      title: `${businessName} - ${pageType}`,
      description: pageContent.slice(0, 155) + '...',
      keywords: targetKeywords,
    };
  }
}

export async function generateTestimonials(
  businessName: string,
  industry: string,
  idealCustomer: string,
  count: number = 5
): Promise<TestimonialSchema[]> {
  const anthropic = await getAnthropicClient();

  const prompt = `Generate ${count} realistic-sounding testimonials for ${businessName} in the ${industry} industry.

Ideal customer profile: ${idealCustomer}

Requirements:
- Vary the testimonials: some about results, some about service, some about ease of use
- Include specific details that feel authentic (not generic praise)
- Mix of company sizes and roles
- Include realistic first names and job titles
- Ratings should be 4-5 stars

Output JSON array of testimonials with: author, role, company, content, rating`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    system: SXO_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  try {
    return JSON.parse(text);
  } catch {
    return [];
  }
}

export async function improveContent(
  existingContent: string,
  contentType: 'headline' | 'subheadline' | 'cta' | 'description' | 'feature',
  goal: 'clarity' | 'conversion' | 'seo' | 'engagement'
): Promise<string[]> {
  const anthropic = await getAnthropicClient();

  const prompt = `Improve this ${contentType} for better ${goal}:

"${existingContent}"

Provide 3 alternative versions, each with a different approach.
Output JSON array of strings only.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 500,
    system: SXO_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  try {
    return JSON.parse(text);
  } catch {
    return [existingContent];
  }
}

// ============================================================
// Pre-built Content Templates
// ============================================================

export const SOCIAL0N_LANDING_CONTENT: SXOPageContent = {
  title: 'Social0n - AI-Powered Social Media Campaign Automation',
  metaDescription: 'Launch outcome-driven social campaigns in minutes. AI-generated content, platform-safe posting, and real results. No contracts, pay per campaign.',

  hero: {
    headline: 'Social Automation That Delivers Results',
    subheadline: 'Stop posting randomly. Start running outcome-driven campaigns that generate leads, build authority, and grow your brand with AI-powered content.',
    ctas: [
      { text: 'Launch Your First Campaign', url: '/signup', primary: true },
      { text: 'See How It Works', url: '#how-it-works' },
    ],
    trustIndicators: [
      'No long-term contracts',
      'Platform-safe posting',
      'AI-powered content',
      '30-day campaign runs',
    ],
  },

  problem: {
    headline: 'Social Media Shouldn\'t Be This Hard',
    painPoints: [
      'Spending hours creating content that gets zero engagement',
      'Inconsistent posting that kills your algorithm reach',
      'No clear strategy connecting posts to business outcomes',
      'Fear of account penalties from aggressive posting',
    ],
    agitation: 'You know you need to be on social media. Your competitors are there. Your customers are there. But between running your business and trying to figure out what to post, social media becomes the thing that always gets pushed to tomorrow. And tomorrow never comes.',
  },

  solution: {
    headline: 'Campaign-as-a-Service: Your Social Done Right',
    benefits: [
      {
        title: 'Outcome-Driven Campaigns',
        description: 'Every campaign has a clear objective: local visibility, authority building, lead generation, or brand momentum. Pick your goal, we handle the strategy.',
        icon: 'Target',
      },
      {
        title: 'AI-Generated Content',
        description: 'Our AI creates engaging, on-brand content from 14 battle-tested modules. You approve it, we post it.',
        icon: 'Sparkles',
      },
      {
        title: 'Platform-Safe Posting',
        description: 'Built-in limits and rules protect your accounts. We post at optimal times within platform guidelines.',
        icon: 'Shield',
      },
      {
        title: 'Real Business Results',
        description: 'Track leads captured, engagement trends, and funnel activity. Honest metrics, no vanity stats.',
        icon: 'TrendingUp',
      },
    ],
  },

  socialProof: {
    stats: [
      { value: '14', label: 'Strategic Content Modules' },
      { value: '30', label: 'Day Campaign Runs' },
      { value: '4', label: 'Platforms Supported' },
      { value: '100%', label: 'Platform-Safe Posting' },
    ],
    testimonials: [
      {
        author: 'Sarah Mitchell',
        role: 'Owner',
        company: 'Mitchell Dental Group',
        content: 'Social0n transformed our social presence. We went from posting randomly once a month to having a consistent presence that actually brings in new patients.',
        rating: 5,
      },
      {
        author: 'David Chen',
        role: 'Managing Partner',
        company: 'Chen & Associates Law',
        content: 'The Authority Builder campaign positioned us as thought leaders in our market. Three months in, we\'re getting referrals from the LinkedIn content.',
        rating: 5,
      },
      {
        author: 'Jennifer Park',
        role: 'Marketing Director',
        company: 'TechStart Solutions',
        content: 'Finally, a social media solution that doesn\'t require hiring a full-time content person. The AI content is surprisingly good and the results speak for themselves.',
        rating: 5,
      },
    ],
  },

  features: {
    headline: 'Everything You Need to Win on Social',
    subheadline: 'A complete campaign system, not just another scheduling tool',
    items: [
      {
        name: 'Strategic Content Modules',
        description: 'Proven, battle-tested content strategies selected by AI for your specific goals and industry.',
        benefit: 'Content that converts',
      },
      {
        name: 'Platform-Safe Posting',
        description: 'Built-in posting limits and rules protect your accounts from penalties and shadowbans.',
        benefit: 'Account protection',
      },
      {
        name: 'Time-Boxed Campaigns',
        description: 'Finite 30-day campaigns with clear objectives and deliverables. No endless subscriptions.',
        benefit: 'Clear ROI tracking',
      },
      {
        name: 'Multi-Platform Publishing',
        description: 'Publish to LinkedIn, Facebook, Instagram, and Google Business Profile from one dashboard.',
        benefit: 'Centralized control',
      },
      {
        name: 'AI Content Generation',
        description: 'Generate weeks of content in minutes with AI trained on high-performing social posts.',
        benefit: 'Save 10+ hours/week',
      },
      {
        name: 'Lead Capture Integration',
        description: 'Connect your CRM to automatically capture and nurture leads from social engagement.',
        benefit: 'More qualified leads',
      },
    ],
  },

  howItWorks: {
    headline: 'Launch Your Campaign in 3 Simple Steps',
    steps: [
      {
        step: 1,
        title: 'Connect',
        description: 'Link your social accounts and CRM in seconds. We handle all the technical setup and integrations.',
        icon: 'Link',
      },
      {
        step: 2,
        title: 'Customize',
        description: 'Choose your campaign type and objectives. AI selects the best content modules for your industry.',
        icon: 'Settings',
      },
      {
        step: 3,
        title: 'Automate',
        description: 'Campaigns run automatically. Approve content, track performance, and capture leads on autopilot.',
        icon: 'Rocket',
      },
    ],
  },

  pricing: {
    headline: 'Simple, Transparent Pricing',
    subheadline: 'Pay per campaign. No contracts. No hidden fees.',
    plans: [
      {
        name: 'Local Visibility Accelerator',
        price: 197,
        currency: 'USD',
        interval: 'one-time',
        features: [
          '30-day campaign',
          'Google Business + Facebook + Instagram',
          'AI-generated local content',
          'Geo-targeted posting strategy',
          'Engagement tracking',
        ],
        ctaText: 'Start Campaign',
        ctaUrl: '/signup',
      },
      {
        name: 'Authority Builder',
        price: 247,
        currency: 'USD',
        interval: 'one-time',
        features: [
          '30-day campaign',
          'LinkedIn + Facebook focus',
          'Thought leadership content',
          'Industry expertise positioning',
          'Lead magnet integration',
        ],
        highlighted: true,
        ctaText: 'Start Campaign',
        ctaUrl: '/signup',
      },
      {
        name: 'Content → Lead Engine',
        price: 297,
        currency: 'USD',
        interval: 'one-time',
        features: [
          '30-day campaign',
          'All platforms',
          'Lead capture funnels',
          'Email nurture sequences',
          'CRM integration',
        ],
        ctaText: 'Start Campaign',
        ctaUrl: '/signup',
      },
      {
        name: 'Brand Momentum',
        price: 497,
        currency: 'USD',
        interval: 'one-time',
        features: [
          '60-day campaign',
          'All platforms + priority',
          'Full content library access',
          'Pattern-interrupt content',
          'Dedicated strategist',
        ],
        ctaText: 'Start Campaign',
        ctaUrl: '/signup',
      },
    ],
  },

  faq: {
    headline: 'Frequently Asked Questions',
    items: [
      {
        question: 'What is Social0n?',
        answer: 'Social0n is a Campaign-as-a-Service platform that automates your social media marketing with AI-powered, outcome-driven campaigns. Instead of random posting, you get strategic 30-day campaigns designed to achieve specific business objectives.',
      },
      {
        question: 'How long does a campaign last?',
        answer: 'Each campaign runs for 30 days (60 days for Brand Momentum) with a defined posting schedule and clear objectives. This time-boxed approach ensures focused execution and measurable results.',
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
        answer: 'No contracts. You pay per campaign. Run one campaign or many—it\'s entirely up to you. Each campaign is a one-time purchase.',
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
  },

  finalCta: {
    headline: 'Ready to Transform Your Social Presence?',
    subheadline: 'Launch your first campaign today. No contracts, no risk—just results.',
    ctaText: 'Start Your Campaign',
    ctaUrl: '/signup',
  },
};
