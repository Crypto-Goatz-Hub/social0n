import { NextRequest, NextResponse } from 'next/server';
import { syncRecentEngagement } from '@/lib/campaigns/publisher';

// Daily analytics sync (post engagement + campaign stats)

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const results = await syncRecentEngagement(30);

    return NextResponse.json({
      success: true,
      synced_posts: results.synced,
      updated_campaigns: results.campaigns,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Cron analytics error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to sync analytics' },
      { status: 500 }
    );
  }
}
