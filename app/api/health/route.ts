import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// ============================================================
// Health Check API
// ============================================================
// Part of AI Federation ecosystem monitoring
// Called by central monitoring service
// ============================================================

export async function GET() {
  const startTime = Date.now();

  const checks: Record<string, boolean> = {
    database: false,
    stripe: false,
    ai: false,
    ghl: false,
  };

  const details: Record<string, string> = {};

  // Database check
  try {
    const { error } = await supabaseAdmin
      .from('social0n_users')
      .select('count')
      .limit(1);
    checks.database = !error;
    details.database = error ? error.message : 'Connected';
  } catch (e) {
    checks.database = false;
    details.database = 'Connection failed';
  }

  // Stripe check
  try {
    if (process.env.STRIPE_SECRET_KEY) {
      const Stripe = (await import('stripe')).default;
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      await stripe.balance.retrieve();
      checks.stripe = true;
      details.stripe = 'Connected';
    } else {
      details.stripe = 'Not configured';
    }
  } catch {
    checks.stripe = false;
    details.stripe = 'Connection failed';
  }

  // AI check
  checks.ai = !!process.env.ANTHROPIC_API_KEY;
  details.ai = checks.ai ? 'Configured' : 'Not configured';

  // GHL check
  checks.ghl = !!(process.env.GHL_LOCATION_PIT || process.env.GHL_CLIENT_ID);
  details.ghl = checks.ghl ? 'Configured' : 'Not configured';

  const allHealthy = Object.values(checks).every(Boolean);
  const responseTime = Date.now() - startTime;

  return NextResponse.json({
    status: allHealthy ? 'healthy' : 'degraded',
    site_key: 'social0n',
    checks,
    details,
    response_time_ms: responseTime,
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV,
  });
}
