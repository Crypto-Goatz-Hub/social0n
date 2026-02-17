import { supabaseAdmin } from './supabase';

// CRM OAuth Constants
const CRM_AUTH_URL = 'https://marketplace.leadconnectorhq.com/oauth/chooselocation';
const CRM_TOKEN_URL = 'https://services.leadconnectorhq.com/oauth/token';

export interface CRMOAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export interface CRMTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  userType: string;
  locationId?: string;
  companyId?: string;
  userId?: string;
}

export function getOAuthConfig(): CRMOAuthConfig {
  const clientId = process.env.CRM_CLIENT_ID;
  const clientSecret = process.env.CRM_CLIENT_SECRET;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/crm/callback`;

  if (!clientId || !clientSecret) {
    throw new Error('CRM OAuth credentials not configured');
  }

  return { clientId, clientSecret, redirectUri };
}

// Restricted scopes for social0n — social media features only
export const SOCIAL0N_SCOPES = [
  'socialplanner/post.readonly', 'socialplanner/post.write',
  'contacts.readonly', 'contacts.write',
  'medias.readonly', 'medias.write',
  'locations.readonly',
  'users.readonly',
  'saas/location.read',
];

export function getAuthorizationUrl(state: string, scopes: string[] = SOCIAL0N_SCOPES): string {
  const config = getOAuthConfig();
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: 'code',
    scope: scopes.join(' '),
    state,
  });
  return `${CRM_AUTH_URL}?${params.toString()}`;
}

export async function exchangeCodeForTokens(code: string): Promise<CRMTokenResponse> {
  const config = getOAuthConfig();
  const response = await fetch(CRM_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      grant_type: 'authorization_code',
      code,
      redirect_uri: config.redirectUri,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to exchange code for tokens: ${error}`);
  }

  return response.json();
}

export async function refreshAccessToken(refreshToken: string): Promise<CRMTokenResponse> {
  const config = getOAuthConfig();
  const response = await fetch(CRM_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to refresh token: ${error}`);
  }

  return response.json();
}

// Store tokens to social0n_users
export async function storeTokensToUser(userId: string, tokens: CRMTokenResponse) {
  const expiresAt = new Date(Date.now() + tokens.expires_in * 1000).toISOString();

  const { error } = await supabaseAdmin
    .from('social0n_users')
    .update({
      crm_access_token: tokens.access_token,
      crm_refresh_token: tokens.refresh_token,
      crm_location_id: tokens.locationId || null,
      crm_company_id: tokens.companyId || null,
      crm_user_id: tokens.userId || null,
      crm_token_expires_at: expiresAt,
      onboarding_completed: true,
      subscription_status: 'active',
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);

  if (error) throw error;
}

// Get valid access token with auto-refresh (5-minute buffer)
export async function getValidAccessToken(userId: string): Promise<string | null> {
  const { data: user } = await supabaseAdmin
    .from('social0n_users')
    .select('crm_access_token, crm_refresh_token, crm_token_expires_at')
    .eq('id', userId)
    .single();

  if (!user?.crm_access_token) return null;

  const expiresAt = new Date(user.crm_token_expires_at);
  const bufferMs = 5 * 60 * 1000;

  if (expiresAt.getTime() - Date.now() < bufferMs) {
    try {
      const newTokens = await refreshAccessToken(user.crm_refresh_token);
      await storeTokensToUser(userId, newTokens);
      return newTokens.access_token;
    } catch {
      return null;
    }
  }

  return user.crm_access_token;
}

// CSRF state management
const stateStore = new Map<string, { userId: string; expiresAt: number }>();

export function generateState(userId: string): string {
  const state = crypto.randomUUID();
  stateStore.set(state, { userId, expiresAt: Date.now() + 10 * 60 * 1000 });

  // Clean expired states
  for (const [key, value] of stateStore.entries()) {
    if (value.expiresAt < Date.now()) stateStore.delete(key);
  }

  return state;
}

export function validateState(state: string): string | null {
  const stored = stateStore.get(state);
  if (!stored || stored.expiresAt < Date.now()) {
    stateStore.delete(state);
    return null;
  }
  stateStore.delete(state);
  return stored.userId;
}
