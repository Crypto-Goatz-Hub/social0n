-- ================================================
-- SOCIAL0N: CRM SaaS Integration Migration
-- Adds CRM linkage columns to social0n_users
-- ================================================

-- CRM account linkage
ALTER TABLE social0n_users
  ADD COLUMN IF NOT EXISTS crm_location_id TEXT,
  ADD COLUMN IF NOT EXISTS crm_company_id TEXT,
  ADD COLUMN IF NOT EXISTS crm_access_token TEXT,
  ADD COLUMN IF NOT EXISTS crm_refresh_token TEXT,
  ADD COLUMN IF NOT EXISTS crm_token_expires_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS crm_user_id TEXT;

-- Subscription tracking
ALTER TABLE social0n_users
  ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'none',
  ADD COLUMN IF NOT EXISTS subscription_plan TEXT,
  ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;

-- Add check constraint for subscription_status
ALTER TABLE social0n_users
  ADD CONSTRAINT chk_social0n_users_subscription_status
  CHECK (subscription_status IN ('none', 'active', 'past_due', 'cancelled', 'trialing'));

-- Indexes for common lookups
CREATE INDEX IF NOT EXISTS idx_social0n_users_crm_location
  ON social0n_users(crm_location_id);
CREATE INDEX IF NOT EXISTS idx_social0n_users_subscription
  ON social0n_users(subscription_status);
CREATE INDEX IF NOT EXISTS idx_social0n_users_onboarding
  ON social0n_users(onboarding_completed) WHERE onboarding_completed = FALSE;
