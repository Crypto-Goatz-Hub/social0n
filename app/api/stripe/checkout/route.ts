import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { CAMPAIGN_TYPES, CampaignType } from '@/lib/campaigns/types';
import { isVipUser } from '@/lib/access';

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { success: false, error: 'Stripe is not configured' },
        { status: 500 }
      );
    }
    if (!process.env.NEXT_PUBLIC_APP_URL) {
      return NextResponse.json(
        { success: false, error: 'App URL is not configured' },
        { status: 500 }
      );
    }

    // Dynamic import to avoid build-time issues
    const Stripe = (await import('stripe')).default;
    // Use Stripe's default API version to avoid invalid/unsupported version errors
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { campaignId } = await request.json();

    if (!campaignId) {
      return NextResponse.json(
        { success: false, error: 'Campaign ID is required' },
        { status: 400 }
      );
    }

    // Get campaign
    const { data: campaign } = await supabaseAdmin
      .from('social0n_campaigns')
      .select('*')
      .eq('id', campaignId)
      .eq('user_id', session.user.id)
      .single();

    if (!campaign) {
      return NextResponse.json(
        { success: false, error: 'Campaign not found' },
        { status: 404 }
      );
    }

    const campaignType = CAMPAIGN_TYPES[campaign.type as CampaignType];
    if (!campaignType) {
      return NextResponse.json(
        { success: false, error: 'Invalid campaign type' },
        { status: 400 }
      );
    }

    // Check if already paid (or VIP)
    const isVip = isVipUser(session.user);
    const { data: existingPayment } = await supabaseAdmin
      .from('social0n_payments')
      .select('id')
      .eq('campaign_id', campaignId)
      .eq('status', 'succeeded')
      .single();

    if (existingPayment || isVip) {
      if (isVip && !existingPayment) {
        await supabaseAdmin.from('social0n_payments').insert({
          user_id: session.user.id,
          campaign_id: campaignId,
          amount: 0,
          currency: 'usd',
          status: 'succeeded',
          metadata: { vip: true },
          created_at: new Date().toISOString(),
        });
      }
      return NextResponse.json(
        {
          success: true,
          url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/campaigns/${campaignId}?payment=vip`,
        }
      );
    }

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${campaignType.name} Campaign`,
              description: `${campaignType.duration} | ${campaignType.totalPosts} posts | ${campaign.name}`,
            },
            unit_amount: campaignType.price * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/campaigns/${campaignId}?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/campaigns/${campaignId}?payment=cancelled`,
      metadata: {
        campaignId,
        userId: session.user.id,
        campaignType: campaign.type,
      },
      customer_email: session.user.email,
    });

    return NextResponse.json({
      success: true,
      url: checkoutSession.url,
    });
  } catch (error) {
    const err = error as { message?: string; type?: string; code?: string };
    console.error('Checkout error:', {
      message: err?.message,
      type: err?.type,
      code: err?.code,
    });
    return NextResponse.json(
      { success: false, error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
