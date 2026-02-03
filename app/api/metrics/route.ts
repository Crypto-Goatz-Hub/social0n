import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// ============================================================
// Metrics API
// ============================================================
// Part of AI Federation ecosystem monitoring
// Returns key metrics for central analysis
// ============================================================

export async function GET(request: NextRequest) {
  // Verify internal API key for ecosystem monitoring
  const apiKey = request.headers.get('x-api-key');
  const ecosystemKey = process.env.ECOSYSTEM_API_KEY;

  // Allow if ecosystem key matches OR if no key is set (dev mode)
  if (ecosystemKey && apiKey !== ecosystemKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();
  const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  try {
    // Parallel queries for efficiency
    const [
      totalUsers,
      newUsers24h,
      newUsersWeek,
      totalCampaigns,
      activeCampaigns,
      newCampaigns24h,
      payments24h,
      paymentsWeek,
      paymentsMonth,
      totalPosts,
      publishedPosts,
      totalLeads,
    ] = await Promise.all([
      // Users
      supabaseAdmin.from('social0n_users').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('social0n_users').select('*', { count: 'exact', head: true }).gte('created_at', dayAgo.toISOString()),
      supabaseAdmin.from('social0n_users').select('*', { count: 'exact', head: true }).gte('created_at', weekAgo.toISOString()),

      // Campaigns
      supabaseAdmin.from('social0n_campaigns').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('social0n_campaigns').select('*', { count: 'exact', head: true }).eq('status', 'active'),
      supabaseAdmin.from('social0n_campaigns').select('*', { count: 'exact', head: true }).gte('created_at', dayAgo.toISOString()),

      // Payments
      supabaseAdmin.from('social0n_payments').select('amount').eq('status', 'succeeded').gte('created_at', dayAgo.toISOString()),
      supabaseAdmin.from('social0n_payments').select('amount').eq('status', 'succeeded').gte('created_at', weekAgo.toISOString()),
      supabaseAdmin.from('social0n_payments').select('amount').eq('status', 'succeeded').gte('created_at', monthAgo.toISOString()),

      // Posts
      supabaseAdmin.from('social0n_posts').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('social0n_posts').select('*', { count: 'exact', head: true }).eq('status', 'published'),

      // Leads
      supabaseAdmin.from('social0n_leads').select('*', { count: 'exact', head: true }),
    ]);

    // Calculate revenue
    const revenue24h = payments24h.data?.reduce((sum, p) => sum + (p.amount / 100), 0) || 0;
    const revenueWeek = paymentsWeek.data?.reduce((sum, p) => sum + (p.amount / 100), 0) || 0;
    const revenueMonth = paymentsMonth.data?.reduce((sum, p) => sum + (p.amount / 100), 0) || 0;

    return NextResponse.json({
      site_key: 'social0n',
      timestamp: now.toISOString(),
      metrics: {
        // Users
        total_users: totalUsers.count || 0,
        new_users_24h: newUsers24h.count || 0,
        new_users_7d: newUsersWeek.count || 0,

        // Campaigns
        total_campaigns: totalCampaigns.count || 0,
        active_campaigns: activeCampaigns.count || 0,
        new_campaigns_24h: newCampaigns24h.count || 0,

        // Revenue
        revenue_24h: revenue24h,
        revenue_7d: revenueWeek,
        revenue_30d: revenueMonth,
        transactions_24h: payments24h.data?.length || 0,

        // Content
        total_posts: totalPosts.count || 0,
        published_posts: publishedPosts.count || 0,
        total_leads: totalLeads.count || 0,

        // Calculated
        campaign_conversion_rate: totalUsers.count
          ? ((totalCampaigns.count || 0) / totalUsers.count * 100).toFixed(2)
          : '0.00',
        avg_revenue_per_user: totalUsers.count
          ? (revenueMonth / totalUsers.count).toFixed(2)
          : '0.00',
      },
    });
  } catch (error) {
    console.error('Metrics error:', error);
    return NextResponse.json(
      { error: 'Failed to collect metrics' },
      { status: 500 }
    );
  }
}
