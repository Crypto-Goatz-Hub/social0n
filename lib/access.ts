import { User } from './auth';

const DEFAULT_VIP_EMAILS = ['mike@rocketopp.com'];

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function getVipEmails(): string[] {
  const raw = process.env.VIP_EMAILS;
  const envList = raw
    ? raw.split(',').map((email) => normalizeEmail(email)).filter(Boolean)
    : [];

  const merged = new Set<string>([...DEFAULT_VIP_EMAILS.map(normalizeEmail), ...envList]);
  return Array.from(merged);
}

export function isVipUser(user: Pick<User, 'email'> | null | undefined): boolean {
  if (!user?.email) return false;
  const email = normalizeEmail(user.email);
  return getVipEmails().includes(email);
}

export function hasActiveSubscription(
  user: Pick<User, 'subscription_status' | 'email'> | null | undefined
): boolean {
  if (!user) return false;
  if (isVipUser(user)) return true;
  return user.subscription_status === 'active' || user.subscription_status === 'trialing';
}

export function hasCRMAccess(
  user: Pick<User, 'crm_location_id' | 'onboarding_completed' | 'subscription_status' | 'email'> | null | undefined
): boolean {
  if (!user) return false;
  if (isVipUser(user)) return true;
  return !!user.crm_location_id && !!user.onboarding_completed && hasActiveSubscription(user);
}
