// Campaign Types
export type CampaignType =
  | 'local_visibility'
  | 'authority_builder'
  | 'content_to_lead'
  | 'brand_momentum';

export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed';

export type Platform = 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'gmb';

export interface CampaignTypeConfig {
  id: CampaignType;
  name: string;
  description: string;
  duration: string;
  postsPerWeek: number;
  totalPosts: number;
  price: number;
  platforms: Platform[];
  modules: string[];
  outcomes: string[];
}

export const CAMPAIGN_TYPES: Record<CampaignType, CampaignTypeConfig> = {
  local_visibility: {
    id: 'local_visibility',
    name: 'Local Visibility',
    description: 'Dominate local search with Google Business and Facebook presence',
    duration: '30 days',
    postsPerWeek: 5,
    totalPosts: 20,
    price: 197,
    platforms: ['facebook', 'instagram', 'gmb'],
    modules: ['local_seo', 'community_engagement', 'review_prompts'],
    outcomes: [
      'Increased local search visibility',
      'More Google reviews',
      'Local community engagement',
      'Foot traffic driver posts',
    ],
  },
  authority_builder: {
    id: 'authority_builder',
    name: 'Authority Builder',
    description: 'Establish thought leadership with educational content series',
    duration: '60 days',
    postsPerWeek: 4,
    totalPosts: 35,
    price: 297,
    platforms: ['linkedin', 'twitter', 'facebook'],
    modules: ['thought_leadership', 'industry_insights', 'expert_positioning'],
    outcomes: [
      'Industry expert positioning',
      'Professional network growth',
      'Inbound lead magnetism',
      'Media and speaking opportunities',
    ],
  },
  content_to_lead: {
    id: 'content_to_lead',
    name: 'Content → Lead',
    description: 'Turn social posts into qualified leads with strategic CTAs',
    duration: '45 days',
    postsPerWeek: 6,
    totalPosts: 40,
    price: 247,
    platforms: ['facebook', 'instagram', 'linkedin'],
    modules: ['lead_magnets', 'cta_optimization', 'funnel_posts', 'retargeting_content'],
    outcomes: [
      'Lead generation system',
      'Email list growth',
      'Qualified prospect pipeline',
      'Conversion-optimized content',
    ],
  },
  brand_momentum: {
    id: 'brand_momentum',
    name: 'Brand Momentum',
    description: 'Build consistent brand presence across all platforms',
    duration: '90 days',
    postsPerWeek: 7,
    totalPosts: 90,
    price: 497,
    platforms: ['facebook', 'instagram', 'linkedin', 'twitter', 'tiktok'],
    modules: ['brand_consistency', 'content_calendar', 'engagement_loops', 'viral_hooks'],
    outcomes: [
      'Brand recognition growth',
      'Cross-platform consistency',
      'Engagement rate improvement',
      'Sustainable content system',
    ],
  },
};

// Strategic Module Types
export interface StrategicModule {
  id: string;
  name: string;
  description: string;
  contentPatterns: ContentPattern[];
  postingRules: PostingRule[];
}

export interface ContentPattern {
  type: string;
  template: string;
  frequency: string;
  bestTime: string;
  platforms: Platform[];
}

export interface PostingRule {
  platform: Platform;
  maxPerDay: number;
  minInterval: number; // hours
  bestTimes: string[];
  avoidTimes: string[];
  characterLimits: {
    post: number;
    hashtags: number;
  };
}

// Campaign Data Types
export interface Campaign {
  id: string;
  user_id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  platforms: Platform[];
  modules: string[];
  business_context: BusinessContext;
  schedule_config: ScheduleConfig;
  posts_published: number;
  posts_remaining: number;
  leads_generated: number;
  engagement_rate: number;
  started_at: string | null;
  ends_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BusinessContext {
  businessName: string;
  industry: string;
  targetAudience: string;
  uniqueValue: string;
  tone: 'professional' | 'casual' | 'friendly' | 'authoritative';
  keywords: string[];
  competitors: string[];
  location?: string;
}

export interface ScheduleConfig {
  timezone: string;
  preferredTimes: string[];
  excludeDays: number[]; // 0-6 (Sun-Sat)
  startDate: string;
}

export interface ScheduledPost {
  id: string;
  campaign_id: string;
  platform: Platform;
  content: string;
  media_urls: string[];
  scheduled_for: string;
  published_at: string | null;
  status: 'scheduled' | 'published' | 'failed' | 'cancelled';
  ghl_post_id: string | null;
  engagement_data: EngagementData | null;
  created_at: string;
}

export interface EngagementData {
  likes: number;
  comments: number;
  shares: number;
  clicks: number;
  impressions: number;
  reach: number;
}
