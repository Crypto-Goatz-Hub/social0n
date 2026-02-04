import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { startCampaign } from '@/lib/campaigns/engine';
import { isVipUser } from '@/lib/access';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id: campaignId } = await params;

    // Verify ownership and status
    const { data: campaign } = await supabaseAdmin
      .from('social0n_campaigns')
      .select('id, status, user_id')
      .eq('id', campaignId)
      .eq('user_id', session.user.id)
      .single();

    if (!campaign) {
      return NextResponse.json({ success: false, error: 'Campaign not found' }, { status: 404 });
    }

    if (campaign.status !== 'draft') {
      return NextResponse.json(
        { success: false, error: 'Campaign can only be started from draft status' },
        { status: 400 }
      );
    }

    // Check if campaign is paid for
    const isVip = isVipUser(session.user);
    const { data: payment } = isVip ? { data: { id: 'vip' } } : await supabaseAdmin
      .from('social0n_payments')
      .select('id')
      .eq('campaign_id', campaignId)
      .eq('status', 'succeeded')
      .single();

    if (!payment) {
      return NextResponse.json(
        { success: false, error: 'Campaign must be paid for before starting', requiresPayment: true },
        { status: 402 }
      );
    }

    // Start the campaign
    const success = await startCampaign(campaignId);

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Failed to start campaign' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Start campaign error:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
