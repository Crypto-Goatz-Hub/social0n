-- ================================================
-- SOCIAL0N DATABASE SCHEMA
-- Supabase PostgreSQL
-- ================================================

-- Users table
CREATE TABLE IF NOT EXISTS social0n_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  company TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_social0n_users_email ON social0n_users(email);

-- Sessions table
CREATE TABLE IF NOT EXISTS social0n_sessions (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES social0n_users(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_social0n_sessions_user ON social0n_sessions(user_id);
CREATE INDEX idx_social0n_sessions_expires ON social0n_sessions(expires_at);

-- Campaigns table
CREATE TABLE IF NOT EXISTS social0n_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES social0n_users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- local_visibility, authority_builder, content_to_lead, brand_momentum
  status TEXT NOT NULL DEFAULT 'draft', -- draft, active, paused, completed
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
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_social0n_campaigns_user ON social0n_campaigns(user_id);
CREATE INDEX idx_social0n_campaigns_status ON social0n_campaigns(status);

-- Posts table
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
  status TEXT NOT NULL DEFAULT 'scheduled', -- scheduled, published, failed, cancelled
  ghl_post_id TEXT,
  engagement_data JSONB,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_social0n_posts_campaign ON social0n_posts(campaign_id);
CREATE INDEX idx_social0n_posts_status ON social0n_posts(status);
CREATE INDEX idx_social0n_posts_scheduled ON social0n_posts(scheduled_for);

-- Connections table (social media accounts)
CREATE TABLE IF NOT EXISTS social0n_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES social0n_users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  account_name TEXT NOT NULL,
  account_id TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'active', -- active, expired, error
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, platform, account_id)
);

CREATE INDEX idx_social0n_connections_user ON social0n_connections(user_id);
CREATE INDEX idx_social0n_connections_platform ON social0n_connections(platform);

-- Leads table (captured from campaigns)
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

CREATE INDEX idx_social0n_leads_campaign ON social0n_leads(campaign_id);
CREATE INDEX idx_social0n_leads_user ON social0n_leads(user_id);

-- Payments table (campaign purchases)
CREATE TABLE IF NOT EXISTS social0n_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES social0n_users(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES social0n_campaigns(id) ON DELETE SET NULL,
  stripe_payment_id TEXT,
  stripe_customer_id TEXT,
  amount INTEGER NOT NULL, -- in cents
  currency TEXT DEFAULT 'usd',
  status TEXT NOT NULL, -- succeeded, pending, failed
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_social0n_payments_user ON social0n_payments(user_id);
CREATE INDEX idx_social0n_payments_stripe ON social0n_payments(stripe_payment_id);

-- Analytics events table
CREATE TABLE IF NOT EXISTS social0n_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES social0n_users(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES social0n_campaigns(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL, -- impression, click, engagement, conversion
  platform TEXT,
  post_id UUID REFERENCES social0n_posts(id) ON DELETE SET NULL,
  data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_social0n_analytics_campaign ON social0n_analytics(campaign_id);
CREATE INDEX idx_social0n_analytics_type ON social0n_analytics(event_type);
CREATE INDEX idx_social0n_analytics_created ON social0n_analytics(created_at);

-- RLS Policies (optional but recommended for Supabase)
-- Enable RLS
ALTER TABLE social0n_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE social0n_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE social0n_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE social0n_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE social0n_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE social0n_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE social0n_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE social0n_analytics ENABLE ROW LEVEL SECURITY;

-- Service role has full access (for API routes)
-- These policies allow the service role to do everything
CREATE POLICY "Service role full access" ON social0n_users FOR ALL USING (true);
CREATE POLICY "Service role full access" ON social0n_sessions FOR ALL USING (true);
CREATE POLICY "Service role full access" ON social0n_campaigns FOR ALL USING (true);
CREATE POLICY "Service role full access" ON social0n_posts FOR ALL USING (true);
CREATE POLICY "Service role full access" ON social0n_connections FOR ALL USING (true);
CREATE POLICY "Service role full access" ON social0n_leads FOR ALL USING (true);
CREATE POLICY "Service role full access" ON social0n_payments FOR ALL USING (true);
CREATE POLICY "Service role full access" ON social0n_analytics FOR ALL USING (true);
