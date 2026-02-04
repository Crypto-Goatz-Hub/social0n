import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    // Dynamic imports to avoid build-time issues
    const Stripe = (await import('stripe')).default;
    const { startCampaign } = await import('@/lib/campaigns/engine');

    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any;
        const { campaignId, userId } = session.metadata || {};

        if (!campaignId || !userId) {
          console.error('Missing metadata in checkout session');
          break;
        }

        // Record payment
        await supabaseAdmin.from('social0n_payments').insert({
          user_id: userId,
          campaign_id: campaignId,
          stripe_payment_id: session.payment_intent as string,
          stripe_customer_id: session.customer as string,
          amount: session.amount_total || 0,
          currency: session.currency || 'usd',
          status: 'succeeded',
          metadata: {
            checkout_session_id: session.id,
          },
        });

        // Start the campaign automatically
        await startCampaign(campaignId);

        console.log(`Payment successful for campaign ${campaignId}`);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as any;
        console.error('Payment failed:', paymentIntent.id);
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
