# SaaS Template Deployment Checklist

## Complete step-by-step guide for deploying RocketOpp SaaS sites with SXO, analytics, and all integrations.

---

## Phase 1: Pre-Deployment Setup

### 1.1 Environment Variables
Create `.env.local` with all required variables:

```bash
# ============================================
# REQUIRED ENVIRONMENT VARIABLES
# ============================================

# App Configuration
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Supabase (Shared RocketOpp Instance)
NEXT_PUBLIC_SUPABASE_URL=https://rtwtaisjtvdajrdyivkn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe Payments
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# AI Content Generation
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx

# Session Management
SESSION_SECRET=your-random-32-char-secret

# Cron Jobs (Vercel)
CRON_SECRET=your-cron-secret

# GHL Integration (if needed)
GHL_CLIENT_ID=xxxxx
GHL_CLIENT_SECRET=xxxxx
GHL_AGENCY_PIT=pit-xxxxx
GHL_LOCATION_PIT=pit-xxxxx

# ============================================
# OPTIONAL: ANALYTICS
# ============================================

# Google Analytics 4
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# CRO9 Tracking
NEXT_PUBLIC_CRO9_SITE_ID=your_site_id

# Google Search Console Verification
GOOGLE_SITE_VERIFICATION=xxxxx
```

### 1.2 Database Tables
Run migrations in Supabase SQL editor:

```sql
-- Example: social0n tables
-- Adjust table prefix for your product (e.g., cro9_, rocketpost_, etc.)

CREATE TABLE IF NOT EXISTS social0n_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  business_name TEXT,
  industry TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS social0n_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES social0n_users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add your product-specific tables here
-- See /database/schema.sql for full schema
```

### 1.3 Stripe Products
Create products and prices in Stripe Dashboard:

1. Go to https://dashboard.stripe.com/products
2. Create each product tier
3. Copy price IDs to your codebase
4. Update `lib/campaigns/types.ts` (or equivalent)

---

## Phase 2: Code Preparation

### 2.1 SXO Content Library
Ensure these files exist:

- [ ] `lib/sxo/index.ts` - Core SXO types and schema generators
- [ ] `lib/sxo/content-generator.ts` - AI content generation
- [ ] `components/sxo/SchemaMarkup.tsx` - JSON-LD components

### 2.2 Analytics Integration
Ensure these files exist:

- [ ] `lib/analytics/index.ts` - Analytics tracking library
- [ ] `components/analytics/Analytics.tsx` - Tracking components

### 2.3 Layout Configuration
Update `app/layout.tsx`:

- [ ] SXO-optimized metadata
- [ ] Schema.org structured data
- [ ] Analytics provider wrapper
- [ ] Page tracker component
- [ ] Open Graph tags
- [ ] Twitter card tags

### 2.4 Build Verification
Run locally before deploying:

```bash
cd /path/to/project

# Install dependencies
npm install

# Check for TypeScript errors
npx tsc --noEmit

# Run development build
npm run dev

# Run production build
npm run build
```

---

## Phase 3: Vercel Deployment

### 3.1 Initial Deploy

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Navigate to project
cd /path/to/project

# Deploy to Vercel
vercel

# Follow prompts:
# - Link to existing project or create new
# - Select scope (team/personal)
# - Confirm settings
```

### 3.2 Environment Variables on Vercel

**Option A: CLI (Recommended)**
```bash
# Add each variable
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add STRIPE_SECRET_KEY production
vercel env add STRIPE_WEBHOOK_SECRET production
vercel env add ANTHROPIC_API_KEY production
vercel env add SESSION_SECRET production
vercel env add CRON_SECRET production
vercel env add NEXT_PUBLIC_APP_URL production

# Analytics (optional)
vercel env add NEXT_PUBLIC_GA4_MEASUREMENT_ID production
vercel env add NEXT_PUBLIC_CRO9_SITE_ID production
```

**Option B: Dashboard**
1. Go to https://vercel.com/[team]/[project]/settings/environment-variables
2. Add each variable for Production environment
3. Redeploy after adding variables

### 3.3 Custom Domain

1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add your domain (e.g., `social0n.com`)
3. Configure DNS:
   - **A Record**: `@` → `76.76.21.21`
   - **CNAME**: `www` → `cname.vercel-dns.com`
4. Wait for SSL certificate (automatic, ~1-5 minutes)

### 3.4 Production Deploy

```bash
# Deploy to production
vercel --prod
```

---

## Phase 4: Stripe Webhook Setup

### 4.1 Create Webhook in Stripe

1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Enter URL: `https://yourdomain.com/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
   - `customer.subscription.updated` (if subscriptions)
   - `customer.subscription.deleted` (if subscriptions)
   - `invoice.paid` (if subscriptions)
5. Click "Add endpoint"
6. Copy the signing secret (`whsec_xxxxx`)

### 4.2 Update Webhook Secret

```bash
# Update on Vercel
vercel env rm STRIPE_WEBHOOK_SECRET production
vercel env add STRIPE_WEBHOOK_SECRET production
# Paste the new whsec_ secret

# Redeploy
vercel --prod
```

---

## Phase 5: Analytics Setup

### 5.1 Google Analytics 4

1. Go to https://analytics.google.com
2. Create property for your domain
3. Get Measurement ID (G-XXXXXXXXXX)
4. Add to Vercel environment variables:
   ```bash
   vercel env add NEXT_PUBLIC_GA4_MEASUREMENT_ID production
   ```

### 5.2 Google Search Console

1. Go to https://search.google.com/search-console
2. Add property → URL prefix → Enter domain
3. Verify via HTML tag
4. Copy verification code
5. Add to `GOOGLE_SITE_VERIFICATION` env var
6. Submit sitemap: `https://yourdomain.com/sitemap.xml`

### 5.3 CRO9 Integration (Optional)

1. Create site in CRO9 dashboard
2. Get Site ID
3. Add to Vercel:
   ```bash
   vercel env add NEXT_PUBLIC_CRO9_SITE_ID production
   ```

---

## Phase 6: Post-Deployment Verification

### 6.1 Functional Tests

- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Login/signup flow works
- [ ] Password reset works
- [ ] Dashboard accessible after login
- [ ] Stripe checkout creates session
- [ ] Webhook receives events
- [ ] Cron job executes (check Vercel logs)

### 6.2 SXO Verification

**Schema Markup Test:**
1. Go to https://search.google.com/test/rich-results
2. Enter your URL
3. Verify Organization, FAQ, and SoftwareApplication schemas are detected

**Open Graph Test:**
1. Go to https://developers.facebook.com/tools/debug/
2. Enter your URL
3. Verify og:title, og:description, og:image appear

**Twitter Card Test:**
1. Go to https://cards-dev.twitter.com/validator
2. Enter your URL
3. Verify card preview appears

### 6.3 Analytics Verification

**GA4:**
1. Open site in browser
2. Open GA4 Realtime report
3. Verify pageview appears
4. Click around, verify events tracked

**CRO9:**
1. Open site in browser
2. Check CRO9 dashboard
3. Verify events flowing

### 6.4 Performance Check

1. Go to https://pagespeed.insights.google.com
2. Test mobile and desktop
3. Target scores:
   - Performance: 90+
   - Accessibility: 90+
   - Best Practices: 90+
   - SEO: 90+

---

## Phase 7: Multi-Site Dashboard Setup (Optional)

### 7.1 Create Dashboard Tables

```sql
-- Analytics aggregation table for all sites
CREATE TABLE IF NOT EXISTS rocket_site_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id TEXT NOT NULL,
  site_name TEXT NOT NULL,
  site_url TEXT NOT NULL,
  date DATE NOT NULL,
  pageviews INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  sessions INTEGER DEFAULT 0,
  avg_session_duration INTEGER DEFAULT 0,
  bounce_rate DECIMAL(5,2) DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  revenue DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(site_id, date)
);

-- Site registry
CREATE TABLE IF NOT EXISTS rocket_sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  domain TEXT NOT NULL,
  ga4_property_id TEXT,
  cro9_site_id TEXT,
  stripe_account_id TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 7.2 Daily Analytics Sync Cron

Add to `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/publish",
      "schedule": "*/5 * * * *"
    },
    {
      "path": "/api/cron/sync-analytics",
      "schedule": "0 2 * * *"
    }
  ]
}
```

Create `/api/cron/sync-analytics/route.ts` to pull GA4 data via MCP.

---

## Quick Reference Commands

### Deploy Commands
```bash
# Development
npm run dev

# Build check
npm run build

# Deploy preview
vercel

# Deploy production
vercel --prod

# Check deployment logs
vercel logs
```

### Environment Variable Commands
```bash
# List variables
vercel env ls

# Add variable
vercel env add VARIABLE_NAME production

# Remove variable
vercel env rm VARIABLE_NAME production

# Pull to local
vercel env pull
```

### Troubleshooting
```bash
# Check build logs
vercel logs --follow

# Check function logs
vercel logs --scope=functions

# Force redeploy
vercel --prod --force
```

---

## Template Reuse Checklist

When creating a new SaaS site from this template:

1. [ ] Copy project structure
2. [ ] Update `package.json` name
3. [ ] Update table prefixes in database
4. [ ] Update metadata in `app/layout.tsx`
5. [ ] Update Schema.org data in `SchemaMarkup.tsx`
6. [ ] Update SXO config in `lib/sxo/index.ts`
7. [ ] Create new Stripe products
8. [ ] Create new Vercel project
9. [ ] Add all environment variables
10. [ ] Setup custom domain
11. [ ] Create Stripe webhook
12. [ ] Setup GA4 property
13. [ ] Submit to Search Console
14. [ ] Run all verification tests

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

*Last updated: February 2026*
*Template version: 1.0.0*
