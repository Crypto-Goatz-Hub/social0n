import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseOAuthClient } from '@/lib/supabase-oauth';
import { supabaseAdmin } from '@/lib/supabase';
import { createSession, setSessionCookie, hashPassword } from '@/lib/auth';
import crypto from 'crypto';

function deriveName(user: any): string {
  return (
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.user_metadata?.display_name ||
    (user?.email ? user.email.split('@')[0] : 'User')
  );
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const mode = url.searchParams.get('mode') || 'login';

    if (!code) {
      return NextResponse.redirect(`${url.origin}/login?error=oauth_missing_code`);
    }

    const supabase = createSupabaseOAuthClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error || !data?.user) {
      console.error('OAuth exchange error:', error);
      return NextResponse.redirect(`${url.origin}/login?error=oauth_failed`);
    }

    const email = data.user.email?.toLowerCase();
    if (!email) {
      return NextResponse.redirect(`${url.origin}/login?error=oauth_missing_email`);
    }

    const { data: existing } = await supabaseAdmin
      .from('social0n_users')
      .select('id, name')
      .eq('email', email)
      .single();

    let userId = existing?.id;
    if (!userId) {
      const passwordSeed = crypto.randomBytes(24).toString('hex');
      const passwordHash = await hashPassword(passwordSeed);
      const name = deriveName(data.user);

      const { data: created, error: createError } = await supabaseAdmin
        .from('social0n_users')
        .insert({
          email,
          name,
          password_hash: passwordHash,
        })
        .select('id')
        .single();

      if (createError || !created) {
        console.error('OAuth user create error:', createError);
        return NextResponse.redirect(`${url.origin}/login?error=oauth_create_failed`);
      }

      userId = created.id;
    }

    const sessionToken = await createSession(userId);
    await setSessionCookie(sessionToken);

    const redirectPath = mode === 'signup' ? '/dashboard/campaigns/new' : '/dashboard';
    return NextResponse.redirect(`${url.origin}${redirectPath}`);
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(`${new URL(request.url).origin}/login?error=oauth_exception`);
  }
}
