import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseOAuthClient } from '@/lib/supabase-oauth';

const ALLOWED_PROVIDERS = new Set(['google', 'linkedin', 'linkedin_oidc']);

function resolveProvider(provider: string) {
  if (provider === 'linkedin') return 'linkedin_oidc';
  return provider;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  try {
    const { provider } = await params;
    if (!ALLOWED_PROVIDERS.has(provider)) {
      return NextResponse.json({ success: false, error: 'Unsupported provider' }, { status: 400 });
    }

    const url = new URL(request.url);
    const mode = url.searchParams.get('mode') || 'login';
    const supabase = createSupabaseOAuthClient();
    const resolvedProvider = resolveProvider(provider);

    const redirectBase = process.env.NEXT_PUBLIC_APP_URL || url.origin;
    const redirectTo = `${redirectBase}/api/auth/oauth/callback?mode=${encodeURIComponent(mode)}`;

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: resolvedProvider as 'google' | 'linkedin_oidc' | 'linkedin',
      options: { redirectTo },
    });

    if (error || !data?.url) {
      console.error('OAuth start error:', error);
      return NextResponse.json({ success: false, error: 'Failed to start OAuth' }, { status: 500 });
    }

    return NextResponse.redirect(data.url);
  } catch (error) {
    console.error('OAuth error:', error);
    return NextResponse.json({ success: false, error: 'OAuth unavailable' }, { status: 500 });
  }
}
