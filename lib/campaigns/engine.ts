import {
  Campaign,
  CampaignType,
  Platform,
  ScheduledPost,
  BusinessContext,
  ScheduleConfig,
  CAMPAIGN_TYPES,
} from './types';
import { STRATEGIC_MODULES, PLATFORM_RULES, getModulesForCampaign } from './modules';
import { supabaseAdmin } from '../supabase';

interface GenerateScheduleOptions {
  campaign: Campaign;
  businessContext: BusinessContext;
  scheduleConfig: ScheduleConfig;
}

interface ContentSlot {
  date: Date;
  time: string;
  platform: Platform;
  moduleId: string;
  contentType: string;
  template: string;
}

export async function generateCampaignSchedule(
  options: GenerateScheduleOptions
): Promise<ContentSlot[]> {
  const { campaign, scheduleConfig } = options;
  const campaignType = CAMPAIGN_TYPES[campaign.type];
  const modules = getModulesForCampaign(campaign.modules);

  const slots: ContentSlot[] = [];
  const startDate = new Date(scheduleConfig.startDate);
  const daysInCampaign = parseInt(campaignType.duration);
  const postsPerDay = campaignType.postsPerWeek / 7;

  // Track posts per platform per day
  const platformPostCounts: Map<string, number> = new Map();

  for (let day = 0; day < daysInCampaign; day++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + day);

    // Skip excluded days
    if (scheduleConfig.excludeDays.includes(currentDate.getDay())) {
      continue;
    }

    // Reset daily counts
    platformPostCounts.clear();

    // Calculate posts for this day
    const postsToday = Math.floor(postsPerDay) + (Math.random() < (postsPerDay % 1) ? 1 : 0);

    for (let post = 0; post < postsToday; post++) {
      // Select a module (rotate through)
      const moduleIndex = (day * postsToday + post) % modules.length;
      const module = modules[moduleIndex];

      if (!module || !module.contentPatterns.length) continue;

      // Select content pattern (rotate through)
      const patternIndex = (day * postsToday + post) % module.contentPatterns.length;
      const pattern = module.contentPatterns[patternIndex];

      // Select platform (prioritize those with capacity)
      const availablePlatforms = pattern.platforms.filter((p) => {
        const key = `${currentDate.toDateString()}-${p}`;
        const count = platformPostCounts.get(key) || 0;
        return count < PLATFORM_RULES[p].maxPerDay;
      });

      if (availablePlatforms.length === 0) continue;

      const platform = availablePlatforms[
        Math.floor(Math.random() * availablePlatforms.length)
      ];

      // Increment platform count
      const key = `${currentDate.toDateString()}-${platform}`;
      platformPostCounts.set(key, (platformPostCounts.get(key) || 0) + 1);

      // Select time (prefer best times, then preferred times)
      const platformRules = PLATFORM_RULES[platform];
      const possibleTimes = [
        pattern.bestTime,
        ...platformRules.bestTimes,
        ...scheduleConfig.preferredTimes,
      ].filter(Boolean);
      const time = possibleTimes[post % possibleTimes.length] || '12:00';

      slots.push({
        date: new Date(currentDate),
        time,
        platform,
        moduleId: module.id,
        contentType: pattern.type,
        template: pattern.template,
      });
    }
  }

  return slots;
}

export async function createCampaign(
  userId: string,
  data: {
    name: string;
    type: CampaignType;
    platforms: Platform[];
    businessContext: BusinessContext;
    scheduleConfig: ScheduleConfig;
  }
): Promise<Campaign | null> {
  const campaignType = CAMPAIGN_TYPES[data.type];

  const { data: campaign, error } = await supabaseAdmin
    .from('social0n_campaigns')
    .insert({
      user_id: userId,
      name: data.name,
      type: data.type,
      status: 'draft',
      platforms: data.platforms,
      modules: campaignType.modules,
      business_context: data.businessContext,
      schedule_config: data.scheduleConfig,
      posts_published: 0,
      posts_remaining: campaignType.totalPosts,
      leads_generated: 0,
      engagement_rate: 0,
      started_at: null,
      ends_at: null,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating campaign:', error);
    return null;
  }

  return campaign;
}

export async function startCampaign(campaignId: string): Promise<boolean> {
  const { data: campaign } = await supabaseAdmin
    .from('social0n_campaigns')
    .select('*')
    .eq('id', campaignId)
    .single();

  if (!campaign) return false;

  const campaignType = CAMPAIGN_TYPES[campaign.type as CampaignType];
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + parseInt(campaignType.duration));

  // Generate content schedule
  const slots = await generateCampaignSchedule({
    campaign,
    businessContext: campaign.business_context,
    scheduleConfig: {
      ...campaign.schedule_config,
      startDate: startDate.toISOString(),
    },
  });

  // Create scheduled posts
  const posts = slots.map((slot) => ({
    campaign_id: campaignId,
    platform: slot.platform,
    content: '', // Will be generated by AI later
    content_type: slot.contentType,
    template: slot.template,
    module_id: slot.moduleId,
    media_urls: [],
    scheduled_for: new Date(
      slot.date.getFullYear(),
      slot.date.getMonth(),
      slot.date.getDate(),
      parseInt(slot.time.split(':')[0]),
      parseInt(slot.time.split(':')[1])
    ).toISOString(),
    status: 'scheduled',
    ghl_post_id: null,
    engagement_data: null,
  }));

  const { error: postsError } = await supabaseAdmin
    .from('social0n_posts')
    .insert(posts);

  if (postsError) {
    console.error('Error creating posts:', postsError);
    return false;
  }

  // Update campaign status
  const { error: updateError } = await supabaseAdmin
    .from('social0n_campaigns')
    .update({
      status: 'active',
      started_at: startDate.toISOString(),
      ends_at: endDate.toISOString(),
      posts_remaining: posts.length,
    })
    .eq('id', campaignId);

  return !updateError;
}

export async function pauseCampaign(campaignId: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from('social0n_campaigns')
    .update({ status: 'paused' })
    .eq('id', campaignId);

  return !error;
}

export async function resumeCampaign(campaignId: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from('social0n_campaigns')
    .update({ status: 'active' })
    .eq('id', campaignId);

  return !error;
}

export async function completeCampaign(campaignId: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from('social0n_campaigns')
    .update({ status: 'completed' })
    .eq('id', campaignId);

  return !error;
}

export async function getCampaignStats(campaignId: string) {
  const { data: posts } = await supabaseAdmin
    .from('social0n_posts')
    .select('status, engagement_data')
    .eq('campaign_id', campaignId);

  if (!posts) return null;

  const published = posts.filter((p) => p.status === 'published');
  const totalEngagement = published.reduce((sum, p) => {
    if (!p.engagement_data) return sum;
    return sum + (p.engagement_data.likes || 0) + (p.engagement_data.comments || 0) + (p.engagement_data.shares || 0);
  }, 0);
  const totalImpressions = published.reduce((sum, p) => {
    return sum + (p.engagement_data?.impressions || 0);
  }, 0);

  return {
    posts_published: published.length,
    posts_scheduled: posts.filter((p) => p.status === 'scheduled').length,
    posts_failed: posts.filter((p) => p.status === 'failed').length,
    total_engagement: totalEngagement,
    total_impressions: totalImpressions,
    engagement_rate: totalImpressions > 0
      ? Math.round((totalEngagement / totalImpressions) * 100 * 10) / 10
      : 0,
  };
}
