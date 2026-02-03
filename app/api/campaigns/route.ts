import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { CAMPAIGN_TYPES, CampaignType, Platform } from '@/lib/campaigns/types';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { data: campaigns, error } = await supabaseAdmin
      .from('social0n_campaigns')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching campaigns:', error);
      return NextResponse.json({ success: false, error: 'Failed to fetch campaigns' }, { status: 500 });
    }

    // Add type labels
    const campaignsWithLabels = campaigns.map((c) => ({
      ...c,
      type_label: CAMPAIGN_TYPES[c.type as CampaignType]?.name || c.type,
    }));

    return NextResponse.json({ success: true, campaigns: campaignsWithLabels });
  } catch (error) {
    console.error('Campaigns error:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, type, platforms, businessContext, scheduleConfig } = body;

    if (!name || !type || !platforms?.length) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const campaignType = CAMPAIGN_TYPES[type as CampaignType];
    if (!campaignType) {
      return NextResponse.json(
        { success: false, error: 'Invalid campaign type' },
        { status: 400 }
      );
    }

    const { data: campaign, error } = await supabaseAdmin
      .from('social0n_campaigns')
      .insert({
        user_id: session.user.id,
        name,
        type,
        status: 'draft',
        platforms,
        modules: campaignType.modules,
        business_context: businessContext,
        schedule_config: scheduleConfig,
        posts_published: 0,
        posts_remaining: campaignType.totalPosts,
        leads_generated: 0,
        engagement_rate: 0,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating campaign:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create campaign' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, campaign });
  } catch (error) {
    console.error('Create campaign error:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}
