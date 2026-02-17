import { NextRequest, NextResponse } from 'next/server';
import { validateState, exchangeCodeForTokens, storeTokensToUser } from '@/lib/crm-oauth';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Handle OAuth errors
    if (error) {
      console.error('CRM OAuth error:', error);
      return NextResponse.redirect(new URL(`/onboarding?error=${error}`, APP_URL));
    }

    if (!code || !state) {
      return NextResponse.redirect(new URL('/onboarding?error=missing_params', APP_URL));
    }

    // Validate CSRF state and get user ID
    const userId = validateState(state);
    if (!userId) {
      return NextResponse.redirect(new URL('/onboarding?error=invalid_state', APP_URL));
    }

    // Exchange code for tokens
    const tokens = await exchangeCodeForTokens(code);

    if (!tokens.locationId) {
      return NextResponse.redirect(new URL('/onboarding?error=no_location', APP_URL));
    }

    // Store tokens on user — marks onboarding as complete
    await storeTokensToUser(userId, tokens);

    // Redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard?onboarded=true', APP_URL));
  } catch (error) {
    console.error('CRM callback error:', error);
    return NextResponse.redirect(new URL('/onboarding?error=callback_failed', APP_URL));
  }
}
