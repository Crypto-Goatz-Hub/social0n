import { supabaseAdmin } from '../supabase';
import { createGHLClient } from '../ghl/client';
import { Platform } from './types';
import { getCampaignStats } from './engine';

interface PublishResult {
  success: boolean;
  postId: string;
  ghlPostId?: string;
  error?: string;
}

interface ConnectionInfo {
  accessToken: string;
  accountId: string;
  locationId: string;
}

async function getConnectionForPlatform(
  userId: string,
  platform: Platform
): Promise<ConnectionInfo | null> {
  const { data: connection } = await supabaseAdmin
    .from('social0n_connections')
    .select('*')
    .eq('user_id', userId)
    .eq('platform', platform)
    .eq('status', 'active')
    .single();

  if (!connection) return null;

  return {
    accessToken: connection.access_token,
    accountId: connection.account_id,
    locationId: connection.metadata?.location_id || '',
  };
}

export async function publishPost(postId: string): Promise<PublishResult> {
  try {
    // Get post with campaign info
    const { data: post } = await supabaseAdmin
      .from('social0n_posts')
      .select(`
        *,
        campaign:social0n_campaigns(user_id, business_context)
      `)
      .eq('id', postId)
      .single();

    if (!post || !post.content) {
      return { success: false, postId, error: 'Post not found or has no content' };
    }

    const platform = post.platform as Platform;
    const userId = post.campaign.user_id;

    // Get connection
    const connection = await getConnectionForPlatform(userId, platform);
    if (!connection) {
      return { success: false, postId, error: `No active ${platform} connection` };
    }

    // Create GHL client
    const ghl = createGHLClient(connection.accessToken, connection.locationId);

    // Publish based on platform
    let ghlPostId: string | undefined;

    if (platform === 'gmb') {
      const result = await ghl.createGMBPost({
        accountId: connection.accountId,
        content: post.content,
        mediaUrls: post.media_urls || [],
      });
      ghlPostId = result.post?.id;
    } else {
      const result = await ghl.createPost({
        accountIds: [connection.accountId],
        content: post.content,
        mediaUrls: post.media_urls || [],
      });
      ghlPostId = result.post?.id;
    }

    // Update post status
    await supabaseAdmin
      .from('social0n_posts')
      .update({
        status: 'published',
        published_at: new Date().toISOString(),
        ghl_post_id: ghlPostId,
        updated_at: new Date().toISOString(),
      })
      .eq('id', postId);

    // Update campaign stats
    await supabaseAdmin.rpc('increment_campaign_posts', {
      campaign_id: post.campaign_id,
    });

    return { success: true, postId, ghlPostId };
  } catch (error) {
    console.error(`Failed to publish post ${postId}:`, error);

    // Mark post as failed
    await supabaseAdmin
      .from('social0n_posts')
      .update({
        status: 'failed',
        error_message: error instanceof Error ? error.message : 'Unknown error',
        updated_at: new Date().toISOString(),
      })
      .eq('id', postId);

    return {
      success: false,
      postId,
      error: error instanceof Error ? error.message : 'Failed to publish',
    };
  }
}

export async function publishDuePosts(): Promise<{
  published: number;
  failed: number;
  results: PublishResult[];
}> {
  // Get posts that are due (scheduled time has passed)
  const { data: duePosts } = await supabaseAdmin
    .from('social0n_posts')
    .select('id, campaign:social0n_campaigns!inner(status)')
    .eq('status', 'scheduled')
    .lte('scheduled_for', new Date().toISOString())
    .eq('campaign.status', 'active')
    .limit(50);

  if (!duePosts || duePosts.length === 0) {
    return { published: 0, failed: 0, results: [] };
  }

  const results: PublishResult[] = [];

  for (const post of duePosts) {
    const result = await publishPost(post.id);
    results.push(result);

    // Small delay between posts to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  return {
    published: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length,
    results,
  };
}

export async function syncPostEngagement(postId: string): Promise<void> {
  const { data: post } = await supabaseAdmin
    .from('social0n_posts')
    .select(`
      *,
      campaign:social0n_campaigns(user_id)
    `)
    .eq('id', postId)
    .single();

  if (!post || !post.ghl_post_id) return;

  const platform = post.platform as Platform;
  const connection = await getConnectionForPlatform(post.campaign.user_id, platform);

  if (!connection) return;

  const ghl = createGHLClient(connection.accessToken, connection.locationId);

  try {
    const analytics = await ghl.getPostAnalytics(post.ghl_post_id);

    await supabaseAdmin
      .from('social0n_posts')
      .update({
        engagement_data: analytics.analytics,
        updated_at: new Date().toISOString(),
      })
      .eq('id', postId);
  } catch (error) {
    console.error(`Failed to sync engagement for post ${postId}:`, error);
  }
}

async function syncCampaignEngagement(campaignId: string) {
  const stats = await getCampaignStats(campaignId);
  if (!stats) return;

  await supabaseAdmin
    .from('social0n_campaigns')
    .update({
      posts_published: stats.posts_published,
      engagement_rate: stats.engagement_rate,
      updated_at: new Date().toISOString(),
    })
    .eq('id', campaignId);
}

export async function syncRecentEngagement(daysBack = 30) {
  const since = new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000).toISOString();

  const { data: posts } = await supabaseAdmin
    .from('social0n_posts')
    .select('id, campaign_id')
    .not('ghl_post_id', 'is', null)
    .eq('status', 'published')
    .gte('published_at', since)
    .limit(200);

  if (!posts || posts.length === 0) {
    return { synced: 0, campaigns: 0 };
  }

  const campaignIds = new Set<string>();

  for (const post of posts) {
    await syncPostEngagement(post.id);
    campaignIds.add(post.campaign_id);
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  for (const campaignId of campaignIds) {
    await syncCampaignEngagement(campaignId);
  }

  return { synced: posts.length, campaigns: campaignIds.size };
}
