import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { CAMPAIGN_TYPES, CampaignType } from '@/lib/campaigns/types';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Get campaigns
    const { data: campaigns, error } = await supabaseAdmin
      .from('social0n_campaigns')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Error fetching campaigns:', error);
      return NextResponse.json({ success: false, error: 'Failed to fetch dashboard' }, { status: 500 });
    }

    // Calculate stats
    const activeCampaigns = campaigns?.filter((c) => c.status === 'active').length || 0;
    const totalPosts = campaigns?.reduce((sum, c) => sum + (c.posts_published || 0), 0) || 0;
    const totalLeads = campaigns?.reduce((sum, c) => sum + (c.leads_generated || 0), 0) || 0;
    const avgEngagement = campaigns?.length
      ? Math.round(campaigns.reduce((sum, c) => sum + (c.engagement_rate || 0), 0) / campaigns.length * 10) / 10
      : 0;

    // Add type labels
    const campaignsWithLabels = campaigns?.map((c) => ({
      ...c,
      type_label: CAMPAIGN_TYPES[c.type as CampaignType]?.name || c.type,
    }));

    return NextResponse.json({
      success: true,
      campaigns: campaignsWithLabels || [],
      stats: {
        active_campaigns: activeCampaigns,
        total_posts: totalPosts,
        total_leads: totalLeads,
        avg_engagement: avgEngagement,
      },
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}
