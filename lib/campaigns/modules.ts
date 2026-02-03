import { StrategicModule, Platform, PostingRule } from './types';

// Platform-safe posting rules
export const PLATFORM_RULES: Record<Platform, PostingRule> = {
  facebook: {
    platform: 'facebook',
    maxPerDay: 2,
    minInterval: 4,
    bestTimes: ['9:00', '13:00', '16:00'],
    avoidTimes: ['23:00-06:00'],
    characterLimits: { post: 63206, hashtags: 30 },
  },
  instagram: {
    platform: 'instagram',
    maxPerDay: 3,
    minInterval: 3,
    bestTimes: ['11:00', '14:00', '19:00'],
    avoidTimes: ['00:00-07:00'],
    characterLimits: { post: 2200, hashtags: 30 },
  },
  linkedin: {
    platform: 'linkedin',
    maxPerDay: 2,
    minInterval: 6,
    bestTimes: ['8:00', '12:00', '17:00'],
    avoidTimes: ['20:00-07:00'],
    characterLimits: { post: 3000, hashtags: 5 },
  },
  twitter: {
    platform: 'twitter',
    maxPerDay: 5,
    minInterval: 2,
    bestTimes: ['9:00', '12:00', '15:00', '18:00'],
    avoidTimes: ['01:00-06:00'],
    characterLimits: { post: 280, hashtags: 3 },
  },
  tiktok: {
    platform: 'tiktok',
    maxPerDay: 3,
    minInterval: 4,
    bestTimes: ['12:00', '15:00', '21:00'],
    avoidTimes: ['02:00-08:00'],
    characterLimits: { post: 2200, hashtags: 5 },
  },
  gmb: {
    platform: 'gmb',
    maxPerDay: 1,
    minInterval: 24,
    bestTimes: ['10:00', '14:00'],
    avoidTimes: ['22:00-07:00'],
    characterLimits: { post: 1500, hashtags: 0 },
  },
};

// Strategic Content Modules
export const STRATEGIC_MODULES: Record<string, StrategicModule> = {
  local_seo: {
    id: 'local_seo',
    name: 'Local SEO Booster',
    description: 'Optimize content for local search visibility',
    contentPatterns: [
      {
        type: 'local_update',
        template: 'Share local news/events related to {industry} in {location}',
        frequency: '2x/week',
        bestTime: '10:00',
        platforms: ['facebook', 'gmb'],
      },
      {
        type: 'behind_scenes',
        template: 'Behind-the-scenes look at {businessName}',
        frequency: '1x/week',
        bestTime: '14:00',
        platforms: ['instagram', 'facebook'],
      },
      {
        type: 'team_spotlight',
        template: 'Meet our team member who specializes in {specialty}',
        frequency: '1x/week',
        bestTime: '12:00',
        platforms: ['facebook', 'linkedin'],
      },
    ],
    postingRules: [PLATFORM_RULES.facebook, PLATFORM_RULES.gmb, PLATFORM_RULES.instagram],
  },
  community_engagement: {
    id: 'community_engagement',
    name: 'Community Engagement',
    description: 'Build relationships with local community',
    contentPatterns: [
      {
        type: 'question',
        template: 'Ask audience about their {topic} preferences/challenges',
        frequency: '2x/week',
        bestTime: '15:00',
        platforms: ['facebook', 'instagram'],
      },
      {
        type: 'poll',
        template: 'Create poll about {industry_topic}',
        frequency: '1x/week',
        bestTime: '12:00',
        platforms: ['facebook', 'twitter'],
      },
      {
        type: 'user_generated',
        template: 'Feature customer story or testimonial',
        frequency: '1x/week',
        bestTime: '10:00',
        platforms: ['instagram', 'facebook'],
      },
    ],
    postingRules: [PLATFORM_RULES.facebook, PLATFORM_RULES.instagram, PLATFORM_RULES.twitter],
  },
  review_prompts: {
    id: 'review_prompts',
    name: 'Review Generation',
    description: 'Encourage and showcase customer reviews',
    contentPatterns: [
      {
        type: 'review_request',
        template: 'Soft CTA encouraging reviews with value-first content',
        frequency: '1x/week',
        bestTime: '11:00',
        platforms: ['facebook', 'gmb'],
      },
      {
        type: 'review_showcase',
        template: 'Share and celebrate positive customer feedback',
        frequency: '2x/week',
        bestTime: '14:00',
        platforms: ['facebook', 'instagram'],
      },
    ],
    postingRules: [PLATFORM_RULES.facebook, PLATFORM_RULES.gmb],
  },
  thought_leadership: {
    id: 'thought_leadership',
    name: 'Thought Leadership',
    description: 'Position as industry expert',
    contentPatterns: [
      {
        type: 'insight',
        template: 'Share unique perspective on {industry_trend}',
        frequency: '2x/week',
        bestTime: '8:00',
        platforms: ['linkedin', 'twitter'],
      },
      {
        type: 'prediction',
        template: 'Make informed prediction about {industry_future}',
        frequency: '1x/week',
        bestTime: '9:00',
        platforms: ['linkedin'],
      },
      {
        type: 'case_study',
        template: 'Share success story with lessons learned',
        frequency: '1x/week',
        bestTime: '10:00',
        platforms: ['linkedin', 'facebook'],
      },
    ],
    postingRules: [PLATFORM_RULES.linkedin, PLATFORM_RULES.twitter],
  },
  industry_insights: {
    id: 'industry_insights',
    name: 'Industry Insights',
    description: 'Share valuable industry knowledge',
    contentPatterns: [
      {
        type: 'news_commentary',
        template: 'Comment on recent {industry} news with expert take',
        frequency: '2x/week',
        bestTime: '9:00',
        platforms: ['linkedin', 'twitter'],
      },
      {
        type: 'tips',
        template: 'Share actionable tips for {target_audience}',
        frequency: '2x/week',
        bestTime: '12:00',
        platforms: ['linkedin', 'instagram'],
      },
      {
        type: 'myth_busting',
        template: 'Debunk common misconceptions in {industry}',
        frequency: '1x/week',
        bestTime: '14:00',
        platforms: ['linkedin', 'twitter'],
      },
    ],
    postingRules: [PLATFORM_RULES.linkedin, PLATFORM_RULES.twitter],
  },
  expert_positioning: {
    id: 'expert_positioning',
    name: 'Expert Positioning',
    description: 'Establish credibility and authority',
    contentPatterns: [
      {
        type: 'credentials',
        template: 'Share certifications, awards, or achievements',
        frequency: '1x/2weeks',
        bestTime: '10:00',
        platforms: ['linkedin'],
      },
      {
        type: 'speaking',
        template: 'Share speaking engagements or media appearances',
        frequency: '1x/week',
        bestTime: '11:00',
        platforms: ['linkedin', 'twitter'],
      },
      {
        type: 'methodology',
        template: 'Explain your unique approach or methodology',
        frequency: '1x/week',
        bestTime: '9:00',
        platforms: ['linkedin'],
      },
    ],
    postingRules: [PLATFORM_RULES.linkedin],
  },
  lead_magnets: {
    id: 'lead_magnets',
    name: 'Lead Magnet Promotion',
    description: 'Drive leads with valuable content offers',
    contentPatterns: [
      {
        type: 'freebie',
        template: 'Promote free resource: {lead_magnet_name}',
        frequency: '2x/week',
        bestTime: '10:00',
        platforms: ['facebook', 'linkedin', 'instagram'],
      },
      {
        type: 'teaser',
        template: 'Share snippet from lead magnet with CTA',
        frequency: '2x/week',
        bestTime: '14:00',
        platforms: ['instagram', 'facebook'],
      },
      {
        type: 'value_preview',
        template: 'Show results/outcomes from using the resource',
        frequency: '1x/week',
        bestTime: '12:00',
        platforms: ['linkedin', 'facebook'],
      },
    ],
    postingRules: [PLATFORM_RULES.facebook, PLATFORM_RULES.linkedin, PLATFORM_RULES.instagram],
  },
  cta_optimization: {
    id: 'cta_optimization',
    name: 'CTA Optimization',
    description: 'Strategic calls-to-action that convert',
    contentPatterns: [
      {
        type: 'soft_cta',
        template: 'Value-first content with subtle next step',
        frequency: '3x/week',
        bestTime: '11:00',
        platforms: ['facebook', 'instagram', 'linkedin'],
      },
      {
        type: 'direct_cta',
        template: 'Clear offer with specific action',
        frequency: '1x/week',
        bestTime: '10:00',
        platforms: ['facebook', 'linkedin'],
      },
      {
        type: 'urgency',
        template: 'Limited-time offer or deadline-driven CTA',
        frequency: '1x/2weeks',
        bestTime: '9:00',
        platforms: ['facebook', 'instagram'],
      },
    ],
    postingRules: [PLATFORM_RULES.facebook, PLATFORM_RULES.instagram, PLATFORM_RULES.linkedin],
  },
  funnel_posts: {
    id: 'funnel_posts',
    name: 'Funnel Posts',
    description: 'Content mapped to buyer journey stages',
    contentPatterns: [
      {
        type: 'awareness',
        template: 'Educational content about problem/need',
        frequency: '2x/week',
        bestTime: '12:00',
        platforms: ['facebook', 'linkedin'],
      },
      {
        type: 'consideration',
        template: 'Compare solutions, show your approach',
        frequency: '2x/week',
        bestTime: '14:00',
        platforms: ['linkedin', 'facebook'],
      },
      {
        type: 'decision',
        template: 'Social proof, testimonials, case studies',
        frequency: '1x/week',
        bestTime: '10:00',
        platforms: ['facebook', 'instagram'],
      },
    ],
    postingRules: [PLATFORM_RULES.facebook, PLATFORM_RULES.linkedin, PLATFORM_RULES.instagram],
  },
  retargeting_content: {
    id: 'retargeting_content',
    name: 'Retargeting Content',
    description: 'Content for warm audience re-engagement',
    contentPatterns: [
      {
        type: 'reminder',
        template: 'Remind about unclaimed offer/resource',
        frequency: '1x/week',
        bestTime: '15:00',
        platforms: ['facebook', 'instagram'],
      },
      {
        type: 'objection_handling',
        template: 'Address common concerns or questions',
        frequency: '1x/week',
        bestTime: '11:00',
        platforms: ['facebook', 'linkedin'],
      },
    ],
    postingRules: [PLATFORM_RULES.facebook, PLATFORM_RULES.instagram],
  },
  brand_consistency: {
    id: 'brand_consistency',
    name: 'Brand Consistency',
    description: 'Unified brand presence across platforms',
    contentPatterns: [
      {
        type: 'brand_story',
        template: 'Share company mission, values, or origin',
        frequency: '1x/week',
        bestTime: '10:00',
        platforms: ['facebook', 'linkedin', 'instagram'],
      },
      {
        type: 'brand_voice',
        template: 'Personality-driven content that shows brand character',
        frequency: '3x/week',
        bestTime: '12:00',
        platforms: ['instagram', 'twitter', 'tiktok'],
      },
      {
        type: 'visual_identity',
        template: 'Branded graphics with consistent style',
        frequency: '4x/week',
        bestTime: '14:00',
        platforms: ['instagram', 'facebook'],
      },
    ],
    postingRules: [PLATFORM_RULES.facebook, PLATFORM_RULES.instagram, PLATFORM_RULES.linkedin, PLATFORM_RULES.twitter],
  },
  content_calendar: {
    id: 'content_calendar',
    name: 'Content Calendar',
    description: 'Strategic content planning and themes',
    contentPatterns: [
      {
        type: 'themed_day',
        template: 'Weekly themed content (e.g., Tip Tuesday)',
        frequency: '1x/week',
        bestTime: '9:00',
        platforms: ['instagram', 'twitter', 'facebook'],
      },
      {
        type: 'series',
        template: 'Multi-part content series on {topic}',
        frequency: '2x/week',
        bestTime: '12:00',
        platforms: ['linkedin', 'instagram'],
      },
      {
        type: 'seasonal',
        template: 'Holiday or seasonal themed content',
        frequency: 'as_needed',
        bestTime: '10:00',
        platforms: ['facebook', 'instagram'],
      },
    ],
    postingRules: [PLATFORM_RULES.instagram, PLATFORM_RULES.facebook, PLATFORM_RULES.twitter],
  },
  engagement_loops: {
    id: 'engagement_loops',
    name: 'Engagement Loops',
    description: 'Content that drives interaction and shares',
    contentPatterns: [
      {
        type: 'question',
        template: 'Open-ended question to spark discussion',
        frequency: '2x/week',
        bestTime: '15:00',
        platforms: ['facebook', 'linkedin', 'twitter'],
      },
      {
        type: 'challenge',
        template: 'User participation challenge or trend',
        frequency: '1x/week',
        bestTime: '12:00',
        platforms: ['instagram', 'tiktok'],
      },
      {
        type: 'this_or_that',
        template: 'Binary choice that prompts engagement',
        frequency: '1x/week',
        bestTime: '14:00',
        platforms: ['instagram', 'twitter'],
      },
    ],
    postingRules: [PLATFORM_RULES.facebook, PLATFORM_RULES.instagram, PLATFORM_RULES.twitter, PLATFORM_RULES.tiktok],
  },
  viral_hooks: {
    id: 'viral_hooks',
    name: 'Viral Hooks',
    description: 'High-shareability content formats',
    contentPatterns: [
      {
        type: 'hot_take',
        template: 'Controversial but defensible industry opinion',
        frequency: '1x/week',
        bestTime: '9:00',
        platforms: ['twitter', 'linkedin'],
      },
      {
        type: 'relatable',
        template: 'Meme or relatable content for {industry}',
        frequency: '2x/week',
        bestTime: '12:00',
        platforms: ['twitter', 'instagram', 'tiktok'],
      },
      {
        type: 'trending',
        template: 'Capitalize on trending topics/hashtags',
        frequency: 'as_needed',
        bestTime: '10:00',
        platforms: ['twitter', 'tiktok', 'instagram'],
      },
    ],
    postingRules: [PLATFORM_RULES.twitter, PLATFORM_RULES.instagram, PLATFORM_RULES.tiktok],
  },
};

export function getModulesForCampaign(moduleIds: string[]): StrategicModule[] {
  return moduleIds
    .map((id) => STRATEGIC_MODULES[id])
    .filter(Boolean);
}

export function getPlatformRules(platforms: Platform[]): PostingRule[] {
  return platforms.map((p) => PLATFORM_RULES[p]);
}
