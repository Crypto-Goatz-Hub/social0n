import { cookies } from 'next/headers';
import { supabaseAdmin } from './supabase';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const SESSION_COOKIE = 'social0n_session';
const SESSION_EXPIRY_DAYS = 30;

export interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  created_at: string;
}

export interface Session {
  id: string;
  user_id: string;
  expires_at: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function createSession(userId: string): Promise<string> {
  const token = generateSessionToken();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_EXPIRY_DAYS);

  await supabaseAdmin.from('social0n_sessions').insert({
    id: token,
    user_id: userId,
    expires_at: expiresAt.toISOString(),
  });

  return token;
}

export async function getSession(): Promise<{ user: User; session: Session } | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE)?.value;

  if (!sessionToken) {
    return null;
  }

  const { data: session } = await supabaseAdmin
    .from('social0n_sessions')
    .select('*')
    .eq('id', sessionToken)
    .single();

  if (!session || new Date(session.expires_at) < new Date()) {
    return null;
  }

  const { data: user } = await supabaseAdmin
    .from('social0n_users')
    .select('id, email, name, company, created_at')
    .eq('id', session.user_id)
    .single();

  if (!user) {
    return null;
  }

  return { user, session };
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_EXPIRY_DAYS * 24 * 60 * 60,
    path: '/',
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE)?.value;

  if (sessionToken) {
    await supabaseAdmin.from('social0n_sessions').delete().eq('id', sessionToken);
  }

  cookieStore.delete(SESSION_COOKIE);
}
