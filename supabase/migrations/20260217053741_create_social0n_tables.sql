-- Migration: create_social0n_tables
-- Description: Creates all social0n tables with indexes and RLS policies
-- Author: supabase-db-manager
-- Date: 2026-02-17

-- ================================================
-- SOCIAL0N DATABASE SCHEMA
-- Supabase PostgreSQL
-- ================================================

-- Helper function for auto-updating updated_at timestamps
CREATE OR REPLACE FUNCTION update_social0n_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ------------------------------------------------
-- 1. Users table
-- ------------------------------------------------
CREATE TABLE IF NOT EXISTS social0n_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  company TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_social0n_users_email ON social0n_users(email);

CREATE TRIGGER trg_social0n_users_updated_at
  BEFORE UPDATE ON social0n_users
  FOR EACH ROW EXECUTE FUNCTION update_social0n_updated_at();

COMMENT ON TABLE social0n_users IS 'Social0n application users with custom auth (not Supabase Auth)';

-- ------------------------------------------------
-- 2. Sessions table
-- ------------------------------------------------
CREATE TABLE IF NOT EXISTS social0n_sessions (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES social0n_users(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_social0n_sessions_user ON social0n_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_social0n_sessions_expires ON social0n_sessions(expires_at);

COMMENT ON TABLE social0n_sessions IS 'User login sessions with expiration tracking';

-- ------------------------------------------------
-- 3. Campaigns table
-- ------------------------------------------------
CREATE TABLE IF NOT EXISTS social0n_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES social0n_users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  platforms JSONB NOT NULL DEFAULT '[]',
  modules JSONB NOT NULL DEFAULT '[]',
  business_context JSONB NOT NULL DEFAULT '{}',
  schedule_config JSONB NOT NULL DEFAULT '{}',
  posts_published INTEGER DEFAULT 0,
  posts_remaining INTEGER DEFAULT 0,
  leads_generated INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5,2) DEFAULT 0,
  started_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT chk_campaign_type CHECK (type IN ('local_visibility', 'authority_builder', 'content_to_lead', 'brand_momentum')),
  CONSTRAINT chk_campaign_status CHECK (status IN ('draft', 'active', 'paused', 'completed'))
);

CREATE INDEX IF NOT EXISTS idx_social0n_campaigns_user ON social0n_campaigns(user_id);
CREATE INDEX IF NOT EXISTS idx_social0n_campaigns_status ON social0n_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_social0n_campaigns_user_status ON social0n_campaigns(user_id, status);

CREATE TRIGGER trg_social0n_campaigns_updated_at
  BEFORE UPDATE ON social0n_campaigns
  FOR EACH ROW EXECUTE FUNCTION update_social0n_updated_at();

COMMENT ON TABLE social0n_campaigns IS 'Social media campaigns with type, platform config, and performance metrics';

-- ------------------------------------------------
-- 4. Posts table
-- ------------------------------------------------
CREATE TABLE IF NOT EXISTS social0n_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES social0n_campaigns(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  content TEXT,
  content_type TEXT,
  template TEXT,
  module_id TEXT,
  media_urls JSONB DEFAULT '[]',
  scheduled_for TIMESTAMPTZ NOT NULL,
  published_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'scheduled',
  ghl_post_id TEXT,
  engagement_data JSONB,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT chk_post_status CHECK (status IN ('scheduled', 'published', 'failed', 'cancelled'))
);

CREATE INDEX IF NOT EXISTS idx_social0n_posts_campaign ON social0n_posts(campaign_id);
CREATE INDEX IF NOT EXISTS idx_social0n_posts_status ON social0n_posts(status);
CREATE INDEX IF NOT EXISTS idx_social0n_posts_scheduled ON social0n_posts(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_social0n_posts_campaign_status ON social0n_posts(campaign_id, status);

CREATE TRIGGER trg_social0n_posts_updated_at
  BEFORE UPDATE ON social0n_posts
  FOR EACH ROW EXECUTE FUNCTION update_social0n_updated_at();

COMMENT ON TABLE social0n_posts IS 'Individual social media posts belonging to campaigns';

-- ------------------------------------------------
-- 5. Connections table (social media accounts)
-- ------------------------------------------------
CREATE TABLE IF NOT EXISTS social0n_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES social0n_users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  account_name TEXT NOT NULL,
  account_id TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'active',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, platform, account_id),
  CONSTRAINT chk_connection_status CHECK (status IN ('active', 'expired', 'error'))
);

CREATE INDEX IF NOT EXISTS idx_social0n_connections_user ON social0n_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_social0n_connections_platform ON social0n_connections(platform);

CREATE TRIGGER trg_social0n_connections_updated_at
  BEFORE UPDATE ON social0n_connections
  FOR EACH ROW EXECUTE FUNCTION update_social0n_updated_at();

COMMENT ON TABLE social0n_connections IS 'OAuth connections to social media platforms per user';

-- ------------------------------------------------
-- 6. Leads table (captured from campaigns)
-- ------------------------------------------------
CREATE TABLE IF NOT EXISTS social0n_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES social0n_campaigns(id) ON DELETE SET NULL,
  user_id UUID REFERENCES social0n_users(id) ON DELETE CASCADE,
  source_platform TEXT,
  source_post_id UUID REFERENCES social0n_posts(id) ON DELETE SET NULL,
  name TEXT,
  email TEXT,
  phone TEXT,
  metadata JSONB DEFAULT '{}',
  ghl_contact_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_social0n_leads_campaign ON social0n_leads(campaign_id);
CREATE INDEX IF NOT EXISTS idx_social0n_leads_user ON social0n_leads(user_id);
CREATE INDEX IF NOT EXISTS idx_social0n_leads_email ON social0n_leads(email);

COMMENT ON TABLE social0n_leads IS 'Leads captured from social media campaigns';

-- ------------------------------------------------
-- 7. Payments table (campaign purchases)
-- ------------------------------------------------
CREATE TABLE IF NOT EXISTS social0n_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES social0n_users(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES social0n_campaigns(id) ON DELETE SET NULL,
  stripe_payment_id TEXT,
  stripe_customer_id TEXT,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT chk_payment_status CHECK (status IN ('succeeded', 'pending', 'failed')),
  CONSTRAINT chk_payment_amount CHECK (amount >= 0)
);

CREATE INDEX IF NOT EXISTS idx_social0n_payments_user ON social0n_payments(user_id);
CREATE INDEX IF NOT EXISTS idx_social0n_payments_stripe ON social0n_payments(stripe_payment_id);

COMMENT ON TABLE social0n_payments IS 'Stripe payment records for campaign purchases';

-- ------------------------------------------------
-- 8. Analytics events table
-- ------------------------------------------------
CREATE TABLE IF NOT EXISTS social0n_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES social0n_users(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES social0n_campaigns(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  platform TEXT,
  post_id UUID REFERENCES social0n_posts(id) ON DELETE SET NULL,
  data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT chk_analytics_event_type CHECK (event_type IN ('impression', 'click', 'engagement', 'conversion'))
);

CREATE INDEX IF NOT EXISTS idx_social0n_analytics_campaign ON social0n_analytics(campaign_id);
CREATE INDEX IF NOT EXISTS idx_social0n_analytics_type ON social0n_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_social0n_analytics_created ON social0n_analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_social0n_analytics_campaign_type ON social0n_analytics(campaign_id, event_type);

COMMENT ON TABLE social0n_analytics IS 'Analytics events for campaign performance tracking';

-- ================================================
-- ROW LEVEL SECURITY
-- ================================================

-- Enable RLS on all tables
ALTER TABLE social0n_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE social0n_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE social0n_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE social0n_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE social0n_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE social0n_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE social0n_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE social0n_analytics ENABLE ROW LEVEL SECURITY;

-- NOTE: social0n uses custom auth (not Supabase Auth), so all data access
-- goes through the service_role key from API routes. The service_role
-- bypasses RLS entirely by default in Supabase, so no explicit policies
-- are needed for service_role access.
--
-- With RLS enabled and NO policies defined, the anon and authenticated
-- roles are denied all access. This is the most secure configuration
-- for an API-route-only access pattern where service_role handles everything.
--
-- If direct client access is ever needed, add scoped policies like:
-- CREATE POLICY "Users can read own data" ON social0n_users
--   FOR SELECT TO authenticated USING (id = auth.uid());
