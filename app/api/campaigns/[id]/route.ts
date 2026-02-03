import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { CAMPAIGN_TYPES, CampaignType } from '@/lib/campaigns/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const { data: campaign, error } = await supabaseAdmin
      .from('social0n_campaigns')
      .select('*')
      .eq('id', id)
      .eq('user_id', session.user.id)
      .single();

    if (error || !campaign) {
      return NextResponse.json({ success: false, error: 'Campaign not found' }, { status: 404 });
    }

    // Get posts for this campaign
    const { data: posts } = await supabaseAdmin
      .from('social0n_posts')
      .select('*')
      .eq('campaign_id', id)
      .order('scheduled_for', { ascending: true });

    return NextResponse.json({
      success: true,
      campaign: {
        ...campaign,
        type_label: CAMPAIGN_TYPES[campaign.type as CampaignType]?.name || campaign.type,
        type_config: CAMPAIGN_TYPES[campaign.type as CampaignType],
      },
      posts: posts || [],
    });
  } catch (error) {
    console.error('Get campaign error:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    // Verify ownership
    const { data: existing } = await supabaseAdmin
      .from('social0n_campaigns')
      .select('id')
      .eq('id', id)
      .eq('user_id', session.user.id)
      .single();

    if (!existing) {
      return NextResponse.json({ success: false, error: 'Campaign not found' }, { status: 404 });
    }

    const { data: campaign, error } = await supabaseAdmin
      .from('social0n_campaigns')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating campaign:', error);
      return NextResponse.json({ success: false, error: 'Failed to update campaign' }, { status: 500 });
    }

    return NextResponse.json({ success: true, campaign });
  } catch (error) {
    console.error('Update campaign error:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Verify ownership
    const { data: existing } = await supabaseAdmin
      .from('social0n_campaigns')
      .select('id')
      .eq('id', id)
      .eq('user_id', session.user.id)
      .single();

    if (!existing) {
      return NextResponse.json({ success: false, error: 'Campaign not found' }, { status: 404 });
    }

    // Delete posts first
    await supabaseAdmin.from('social0n_posts').delete().eq('campaign_id', id);

    // Delete campaign
    const { error } = await supabaseAdmin.from('social0n_campaigns').delete().eq('id', id);

    if (error) {
      console.error('Error deleting campaign:', error);
      return NextResponse.json({ success: false, error: 'Failed to delete campaign' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete campaign error:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}
