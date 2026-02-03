# Social0n

**Campaign-as-a-Service Platform for AI-Powered Social Media Automation**

Live at: [https://social0n.com](https://social0n.com)

---

## Overview

Social0n automates social media marketing with AI-powered, outcome-driven campaigns. Instead of random posting, users get strategic 30-day campaigns designed to achieve specific business objectives.

## Features

- **4 Campaign Types**: Local Visibility, Authority Builder, Content → Lead, Brand Momentum
- **AI Content Generation**: Claude-powered content from 14 strategic modules
- **Multi-Platform**: LinkedIn, Facebook, Instagram, Google Business Profile
- **Platform-Safe Posting**: Built-in limits protect accounts
- **Stripe Payments**: Pay per campaign, no subscriptions
- **Lead Capture**: CRM integration for lead tracking

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe
- **AI**: Anthropic Claude
- **Deployment**: Vercel

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

```
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
ANTHROPIC_API_KEY=
SESSION_SECRET=
CRON_SECRET=
NEXT_PUBLIC_GA4_MEASUREMENT_ID=
NEXT_PUBLIC_CRO9_SITE_ID=
```

## Project Structure

```
social0n/
├── app/
│   ├── api/           # API routes
│   ├── dashboard/     # Dashboard pages
│   ├── login/         # Auth pages
│   └── page.tsx       # Landing page
├── components/
│   ├── analytics/     # Tracking components
│   └── sxo/           # Schema.org components
├── lib/
│   ├── ai/            # AI content generation
│   ├── analytics/     # Analytics library
│   ├── campaigns/     # Campaign logic
│   ├── ghl/           # GHL API client
│   └── sxo/           # SXO optimization
└── public/            # Static assets
```

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/health` | Health check for monitoring |
| `/api/metrics` | Metrics for ecosystem analysis |
| `/api/campaigns` | Campaign CRUD |
| `/api/stripe/checkout` | Payment initiation |
| `/api/stripe/webhook` | Payment webhooks |
| `/api/cron/publish` | Post publishing cron |
| `/api/sxo/generate` | AI content generation |

## SXO Template System

This project includes a reusable SXO (Search Experience Optimization) system:

- Schema.org structured data (Organization, SoftwareApplication, FAQ)
- Dynamic OG images
- E-E-A-T content guidelines
- AI content generation
- Analytics integration (GA4 + CRO9)

See `DEPLOYMENT_CHECKLIST.md` for full deployment guide.

## Part of RocketOpp Ecosystem

Social0n is part of the RocketOpp product family:

- [Rocket+](https://rocketadd.com) - CRM enhancements
- [MCPFED](https://mcpfed.com) - MCP server directory
- [CRO9](https://cro9.com) - Conversion optimization
- [RocketOpp](https://rocketopp.com) - AI marketplace

---

Built with Claude Code
