import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { createGHLClient } from '@/lib/ghl/client';

function normalizePlatform(raw: string) {
  const value = raw.toLowerCase();
  if (value.includes('facebook')) return 'facebook';
  if (value.includes('instagram')) return 'instagram';
  if (value.includes('linkedin')) return 'linkedin';
  if (value.includes('twitter') || value.includes('x')) return 'twitter';
  if (value.includes('tiktok')) return 'tiktok';
  if (value.includes('google') || value.includes('gmb') || value.includes('business')) return 'gmb';
  return '';
}

function pickAccountId(account: Record<string, any>) {
  return account.id || account.accountId || account.account_id || account.pageId || account.page_id || '';
}

function pickAccountName(account: Record<string, any>) {
  return (
    account.name ||
    account.accountName ||
    account.account_name ||
    account.username ||
    account.pageName ||
    account.page_name ||
    'Account'
  );
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ platform: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { platform } = await params;
    const targetPlatform = normalizePlatform(platform);
    if (!targetPlatform) {
      return NextResponse.json({ success: false, error: 'Unsupported platform' }, { status: 400 });
    }

    const accessToken = process.env.GHL_LOCATION_PIT;
    const locationId = process.env.GHL_LOCATION_ID;

    if (!accessToken || !locationId) {
      return NextResponse.json(
        { success: false, error: 'GHL is not configured' },
        { status: 500 }
      );
    }

    const ghl = createGHLClient(accessToken, locationId);
    const accountsResponse = await ghl.getSocialMediaAccounts();
    const accounts = accountsResponse?.accounts || [];

    const matching = accounts.filter((account: Record<string, any>) => {
      const platformValue =
        account.platform ||
        account.type ||
        account.provider ||
        account.network ||
        account.socialType ||
        account.social_type ||
        '';
      return normalizePlatform(String(platformValue)) === targetPlatform;
    });

    if (!matching.length) {
      return NextResponse.json(
        { success: false, error: `No ${platform} accounts found in GHL` },
        { status: 404 }
      );
    }

    const upserts = matching.map((account: Record<string, any>) => ({
      user_id: session.user.id,
      platform: targetPlatform,
      account_id: String(pickAccountId(account)),
      account_name: pickAccountName(account),
      access_token: accessToken,
      status: 'active',
      metadata: {
        location_id: locationId,
        ghl_account: account,
      },
      updated_at: new Date().toISOString(),
    }));

    await supabaseAdmin
      .from('social0n_connections')
      .upsert(upserts, { onConflict: 'user_id,platform,account_id' });

    const redirectBase = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;
    return NextResponse.redirect(`${redirectBase}/dashboard/connections?connected=1`);
  } catch (error) {
    console.error('Connection auth error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to connect account' },
      { status: 500 }
    );
  }
}
