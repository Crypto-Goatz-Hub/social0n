import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import crypto from 'crypto';

// Verify CRM webhook signature
function verifySignature(payload: string, signature: string, secret: string): boolean {
  const computed = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(signature));
}

export async function POST(request: NextRequest) {
  try {
    const webhookSecret = process.env.CRM_WEBHOOK_SECRET;
    const body = await request.text();

    // Verify signature if secret is configured
    if (webhookSecret) {
      const signature = request.headers.get('x-webhook-signature') || '';
      if (!verifySignature(body, signature, webhookSecret)) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const event = JSON.parse(body);
    const eventType = event.type || event.event;
    const locationId = event.locationId || event.location_id || event.data?.locationId;

    if (!locationId) {
      return NextResponse.json({ error: 'No location ID in event' }, { status: 400 });
    }

    // Find user by CRM location
    const { data: user } = await supabaseAdmin
      .from('social0n_users')
      .select('id')
      .eq('crm_location_id', locationId)
      .single();

    if (!user) {
      return NextResponse.json({ received: true, matched: false });
    }

    // Handle subscription events
    let subscriptionStatus: string | null = null;

    switch (eventType) {
      case 'subscription.created':
      case 'subscription.activated':
      case 'payment.succeeded':
        subscriptionStatus = 'active';
        break;
      case 'subscription.cancelled':
      case 'subscription.deleted':
        subscriptionStatus = 'cancelled';
        break;
      case 'payment.failed':
      case 'subscription.past_due':
        subscriptionStatus = 'past_due';
        break;
      case 'subscription.trialing':
        subscriptionStatus = 'trialing';
        break;
    }

    if (subscriptionStatus) {
      await supabaseAdmin
        .from('social0n_users')
        .update({
          subscription_status: subscriptionStatus,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      // If cancelled, pause all active campaigns
      if (subscriptionStatus === 'cancelled' || subscriptionStatus === 'past_due') {
        await supabaseAdmin
          .from('social0n_campaigns')
          .update({ status: 'paused', updated_at: new Date().toISOString() })
          .eq('user_id', user.id)
          .eq('status', 'active');
      }
    }

    return NextResponse.json({ received: true, matched: true, action: subscriptionStatus });
  } catch (error) {
    console.error('CRM webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
