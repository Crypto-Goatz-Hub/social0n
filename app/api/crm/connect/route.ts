import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getAuthorizationUrl, generateState } from '@/lib/crm-oauth';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'));
    }

    // If already onboarded, redirect to dashboard
    if (session.user.onboarding_completed && session.user.crm_location_id) {
      return NextResponse.redirect(new URL('/dashboard', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'));
    }

    // Generate CSRF state with user ID
    const state = generateState(session.user.id);

    // Build CRM OAuth URL and redirect
    const authUrl = getAuthorizationUrl(state);
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('CRM connect error:', error);
    return NextResponse.redirect(
      new URL('/onboarding?error=connect_failed', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001')
    );
  }
}
