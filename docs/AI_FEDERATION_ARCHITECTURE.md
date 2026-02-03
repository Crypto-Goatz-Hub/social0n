# AI Federation Architecture

## Vision: Dominant AI Ecosystem Monitoring

A centralized AI operations center that continuously monitors, analyzes, and optimizes all RocketOpp products.

---

## Current State: Fragmented

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   Rocket+   │  │   Social0n  │  │    CRO9     │
│  (manual)   │  │  (manual)   │  │  (manual)   │
└─────────────┘  └─────────────┘  └─────────────┘
       │                │                │
       └────────────────┴────────────────┘
                        │
              ┌─────────────────┐
              │    Supabase     │
              │  (shared data)  │
              └─────────────────┘
```

**Problems:**
- No automated monitoring
- No cross-product intelligence
- Manual optimization only
- No proactive alerts
- AI used ad-hoc, not systematically

---

## Target State: AI Federation

```
                    ┌─────────────────────────────────────┐
                    │         AI OPERATIONS CENTER        │
                    │   (Claude + MCP + Scheduled Jobs)   │
                    ├─────────────────────────────────────┤
                    │  • Performance Monitor              │
                    │  • Anomaly Detection                │
                    │  • Optimization Engine              │
                    │  • Code Quality Scanner             │
                    │  • Security Auditor                 │
                    │  • Cost Optimizer                   │
                    └───────────────┬─────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
        ▼                           ▼                           ▼
┌───────────────┐          ┌───────────────┐          ┌───────────────┐
│   Rocket+     │          │   Social0n    │          │     CRO9      │
│  rocketadd    │          │  social0n     │          │   cro9.com    │
├───────────────┤          ├───────────────┤          ├───────────────┤
│ • Health API  │          │ • Health API  │          │ • Health API  │
│ • Metrics API │          │ • Metrics API │          │ • Metrics API │
│ • Logs API    │          │ • Logs API    │          │ • Logs API    │
└───────┬───────┘          └───────┬───────┘          └───────┬───────┘
        │                           │                           │
        └───────────────────────────┴───────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │          SUPABASE             │
                    ├───────────────────────────────┤
                    │ rocket_ecosystem_metrics      │
                    │ rocket_ecosystem_alerts       │
                    │ rocket_ecosystem_optimizations│
                    │ rocket_ai_recommendations     │
                    └───────────────────────────────┘
```

---

## Implementation Plan

### Phase 1: Ecosystem Metrics Collection

#### 1.1 Create Central Metrics Tables

```sql
-- Ecosystem-wide metrics collection
CREATE TABLE rocket_ecosystem_sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_key TEXT UNIQUE NOT NULL, -- e.g., 'social0n', 'cro9', 'rocket_plus'
  name TEXT NOT NULL,
  domain TEXT NOT NULL,
  repo_path TEXT,
  vercel_project_id TEXT,
  ga4_property_id TEXT,
  stripe_account_id TEXT,
  status TEXT DEFAULT 'active',
  last_health_check TIMESTAMPTZ,
  health_status TEXT DEFAULT 'unknown',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hourly metrics snapshots
CREATE TABLE rocket_ecosystem_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_key TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Traffic
  pageviews INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  sessions INTEGER DEFAULT 0,
  bounce_rate DECIMAL(5,2),

  -- Revenue
  revenue DECIMAL(10,2) DEFAULT 0,
  transactions INTEGER DEFAULT 0,
  mrr DECIMAL(10,2) DEFAULT 0,

  -- Performance
  avg_response_time_ms INTEGER,
  error_rate DECIMAL(5,2),
  uptime_percent DECIMAL(5,2),

  -- Engagement
  signups INTEGER DEFAULT 0,
  active_users INTEGER DEFAULT 0,
  churn_count INTEGER DEFAULT 0,

  -- Cost
  vercel_cost DECIMAL(10,2),
  supabase_cost DECIMAL(10,2),
  stripe_fees DECIMAL(10,2),
  ai_cost DECIMAL(10,2),

  UNIQUE(site_key, timestamp)
);

-- AI-generated alerts and recommendations
CREATE TABLE rocket_ai_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_key TEXT,
  severity TEXT NOT NULL, -- critical, warning, info
  category TEXT NOT NULL, -- performance, security, cost, opportunity
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  recommendation TEXT,
  auto_fixable BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'open', -- open, acknowledged, resolved, ignored
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- AI optimization history
CREATE TABLE rocket_ai_optimizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_key TEXT,
  optimization_type TEXT NOT NULL,
  description TEXT NOT NULL,
  before_state JSONB,
  after_state JSONB,
  impact_metrics JSONB,
  applied_by TEXT, -- 'ai_auto' or 'human'
  applied_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 1.2 Health Check API (Add to Each Product)

```typescript
// app/api/health/route.ts - Add to EVERY product
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  const checks = {
    database: false,
    stripe: false,
    ai: false,
  };

  // Database check
  try {
    const { error } = await supabaseAdmin.from('social0n_users').select('count').limit(1);
    checks.database = !error;
  } catch { checks.database = false; }

  // Stripe check
  try {
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
    await stripe.balance.retrieve();
    checks.stripe = true;
  } catch { checks.stripe = false; }

  // AI check
  checks.ai = !!process.env.ANTHROPIC_API_KEY;

  const allHealthy = Object.values(checks).every(Boolean);

  return NextResponse.json({
    status: allHealthy ? 'healthy' : 'degraded',
    checks,
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
  });
}
```

#### 1.3 Metrics API (Add to Each Product)

```typescript
// app/api/metrics/route.ts - Add to EVERY product
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  // Verify internal API key
  const apiKey = request.headers.get('x-api-key');
  if (apiKey !== process.env.ECOSYSTEM_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();
  const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  // Collect metrics
  const [users, campaigns, payments] = await Promise.all([
    supabaseAdmin.from('social0n_users').select('count').single(),
    supabaseAdmin.from('social0n_campaigns').select('count').gte('created_at', dayAgo.toISOString()).single(),
    supabaseAdmin.from('social0n_payments').select('amount').eq('status', 'succeeded').gte('created_at', dayAgo.toISOString()),
  ]);

  const revenue = payments.data?.reduce((sum, p) => sum + (p.amount / 100), 0) || 0;

  return NextResponse.json({
    site_key: 'social0n',
    timestamp: now.toISOString(),
    metrics: {
      total_users: users.data?.count || 0,
      new_campaigns_24h: campaigns.data?.count || 0,
      revenue_24h: revenue,
      // Add more metrics as needed
    },
  });
}
```

---

### Phase 2: AI Operations Center

#### 2.1 Central Monitoring Cron (In Rocket+ or dedicated service)

```typescript
// app/api/cron/ecosystem-monitor/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const SITES = [
  { key: 'social0n', url: 'https://social0n.com' },
  { key: 'cro9', url: 'https://cro9.com' },
  { key: 'rocket_plus', url: 'https://rocketadd.com' },
  { key: 'mcpfed', url: 'https://mcpfed.com' },
  { key: 'rocketopp', url: 'https://rocketopp.com' },
];

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results = [];

  for (const site of SITES) {
    try {
      // Health check
      const healthRes = await fetch(`${site.url}/api/health`, {
        headers: { 'x-api-key': process.env.ECOSYSTEM_API_KEY || '' },
      });
      const health = await healthRes.json();

      // Metrics collection
      const metricsRes = await fetch(`${site.url}/api/metrics`, {
        headers: { 'x-api-key': process.env.ECOSYSTEM_API_KEY || '' },
      });
      const metrics = metricsRes.ok ? await metricsRes.json() : null;

      // Update site health
      await supabaseAdmin.from('rocket_ecosystem_sites').upsert({
        site_key: site.key,
        name: site.key,
        domain: site.url,
        last_health_check: new Date().toISOString(),
        health_status: health.status,
      });

      // Store metrics
      if (metrics) {
        await supabaseAdmin.from('rocket_ecosystem_metrics').insert({
          site_key: site.key,
          ...metrics.metrics,
        });
      }

      results.push({ site: site.key, status: 'ok', health: health.status });
    } catch (error) {
      // Log alert for failed health check
      await supabaseAdmin.from('rocket_ai_alerts').insert({
        site_key: site.key,
        severity: 'critical',
        category: 'performance',
        title: `Health check failed for ${site.key}`,
        description: `Unable to reach ${site.url}/api/health`,
        recommendation: 'Check Vercel deployment status and logs',
      });

      results.push({ site: site.key, status: 'error' });
    }
  }

  return NextResponse.json({ monitored: results.length, results });
}
```

#### 2.2 AI Analysis Cron (Daily)

```typescript
// app/api/cron/ai-analyze/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get last 7 days of metrics
  const { data: metrics } = await supabaseAdmin
    .from('rocket_ecosystem_metrics')
    .select('*')
    .gte('timestamp', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
    .order('timestamp', { ascending: false });

  // Get open alerts
  const { data: alerts } = await supabaseAdmin
    .from('rocket_ai_alerts')
    .select('*')
    .eq('status', 'open');

  // Call Claude for analysis
  const { default: Anthropic } = await import('@anthropic-ai/sdk');
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const analysis = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: `You are an AI operations analyst for the RocketOpp product ecosystem.
Analyze metrics and generate actionable insights. Output JSON only.`,
    messages: [{
      role: 'user',
      content: `Analyze this ecosystem data and provide recommendations:

METRICS (last 7 days):
${JSON.stringify(metrics, null, 2)}

OPEN ALERTS:
${JSON.stringify(alerts, null, 2)}

Provide JSON with:
1. summary: Overall ecosystem health summary
2. alerts: New alerts to create (array of {site_key, severity, category, title, description, recommendation})
3. optimizations: Suggested optimizations (array of {site_key, type, description, priority})
4. trends: Key trends observed
5. action_items: Immediate action items for the team`,
    }],
  });

  const text = analysis.content[0].type === 'text' ? analysis.content[0].text : '';

  try {
    const insights = JSON.parse(text);

    // Create new alerts
    if (insights.alerts?.length) {
      await supabaseAdmin.from('rocket_ai_alerts').insert(insights.alerts);
    }

    // Store analysis
    await supabaseAdmin.from('rocket_ai_optimizations').insert({
      optimization_type: 'daily_analysis',
      description: insights.summary,
      before_state: { metrics_count: metrics?.length, alerts_count: alerts?.length },
      after_state: insights,
      applied_by: 'ai_auto',
    });

    return NextResponse.json({ success: true, insights });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to parse AI response' });
  }
}
```

---

### Phase 3: AI Operations Dashboard

Create a unified dashboard (could be in Rocket+ superadmin or dedicated) that shows:

1. **Ecosystem Health** - All sites' status at a glance
2. **Revenue Dashboard** - Combined MRR, transactions, growth
3. **Alert Center** - AI-generated alerts and recommendations
4. **Optimization Queue** - Suggested improvements
5. **Cost Analysis** - Infrastructure costs by product
6. **Trend Analysis** - Cross-product patterns

---

## Cron Schedule

Add to `vercel.json` (in central monitoring service):

```json
{
  "crons": [
    {
      "path": "/api/cron/ecosystem-monitor",
      "schedule": "*/15 * * * *"
    },
    {
      "path": "/api/cron/ai-analyze",
      "schedule": "0 6 * * *"
    }
  ]
}
```

---

## MCP Integration

The Rocket+ MCP server already has tools for many operations. Extend it with:

```typescript
// New MCP tools for ecosystem monitoring
- ecosystem_health: Get health status of all products
- ecosystem_metrics: Get aggregated metrics
- ecosystem_alerts: List/manage AI-generated alerts
- ecosystem_optimize: Trigger optimization analysis
```

---

## Implementation Priority

1. **Week 1**: Add health + metrics APIs to all products
2. **Week 2**: Create ecosystem tables in Supabase
3. **Week 3**: Build monitoring cron jobs
4. **Week 4**: Build AI analysis cron
5. **Week 5**: Build operations dashboard

---

## Benefits

- **Proactive monitoring** - Know about issues before users report them
- **Cross-product intelligence** - See patterns across the ecosystem
- **Cost optimization** - AI identifies waste and savings opportunities
- **Security scanning** - Automated vulnerability detection
- **Growth opportunities** - AI spots expansion potential
- **Automated fixes** - Some issues resolved without human intervention

---

*This is the architecture for AI-dominant ecosystem federation. Currently NOT implemented.*
