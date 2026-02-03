// ============================================================
// Analytics Integration Library
// ============================================================
// Unified analytics for GA4, CRO9, and custom tracking
// Template system for all RocketOpp SaaS sites
// ============================================================

export interface AnalyticsConfig {
  ga4MeasurementId?: string;
  cro9SiteId?: string;
  supabaseProjectId?: string;
  enableHeatmaps?: boolean;
  enableSessionRecording?: boolean;
}

export interface TrackingEvent {
  name: string;
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  properties?: Record<string, unknown>;
}

export interface PageViewData {
  url: string;
  title: string;
  referrer?: string;
  campaign?: {
    source?: string;
    medium?: string;
    name?: string;
    term?: string;
    content?: string;
  };
}

// ============================================================
// Analytics Singleton
// ============================================================
class Analytics {
  private config: AnalyticsConfig = {};
  private initialized = false;
  private eventQueue: TrackingEvent[] = [];

  init(config: AnalyticsConfig) {
    this.config = config;
    this.initialized = true;

    // Process queued events
    this.eventQueue.forEach((event) => this.track(event.name, event.properties));
    this.eventQueue = [];
  }

  // Track custom events
  track(eventName: string, properties?: Record<string, unknown>) {
    if (!this.initialized) {
      this.eventQueue.push({ name: eventName, properties });
      return;
    }

    // Send to GA4
    if (this.config.ga4MeasurementId && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, properties);
    }

    // Send to CRO9
    if (this.config.cro9SiteId && typeof window !== 'undefined' && (window as any).cro9) {
      (window as any).cro9.track(eventName, properties);
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', eventName, properties);
    }
  }

  // Track page views
  pageView(data: PageViewData) {
    this.track('page_view', {
      page_location: data.url,
      page_title: data.title,
      page_referrer: data.referrer,
      ...data.campaign,
    });
  }

  // Track conversions
  conversion(conversionName: string, value?: number, currency = 'USD') {
    this.track('conversion', {
      conversion_name: conversionName,
      value,
      currency,
    });
  }

  // Track user signup
  signup(method: string, userId?: string) {
    this.track('sign_up', {
      method,
      user_id: userId,
    });
  }

  // Track purchase
  purchase(transactionId: string, value: number, items: any[], currency = 'USD') {
    this.track('purchase', {
      transaction_id: transactionId,
      value,
      currency,
      items,
    });
  }

  // Track campaign creation
  createCampaign(campaignType: string, campaignId: string) {
    this.track('create_campaign', {
      campaign_type: campaignType,
      campaign_id: campaignId,
    });
  }

  // Track campaign start
  startCampaign(campaignType: string, campaignId: string, value: number) {
    this.track('begin_checkout', {
      campaign_type: campaignType,
      campaign_id: campaignId,
      value,
      currency: 'USD',
    });
  }

  // Track CTA clicks
  ctaClick(ctaName: string, location: string) {
    this.track('cta_click', {
      cta_name: ctaName,
      location,
    });
  }

  // Track scroll depth
  scrollDepth(percentage: number) {
    this.track('scroll', {
      percent_scrolled: percentage,
    });
  }

  // Track time on page
  timeOnPage(seconds: number) {
    this.track('engagement_time', {
      engagement_time_msec: seconds * 1000,
    });
  }

  // Identify user
  identify(userId: string, traits?: Record<string, unknown>) {
    if (this.config.ga4MeasurementId && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('set', 'user_id', userId);
      if (traits) {
        (window as any).gtag('set', 'user_properties', traits);
      }
    }

    if (this.config.cro9SiteId && typeof window !== 'undefined' && (window as any).cro9) {
      (window as any).cro9.identify(userId, traits);
    }
  }
}

export const analytics = new Analytics();

// ============================================================
// React Hooks for Analytics
// ============================================================
export function usePageTracking() {
  if (typeof window === 'undefined') return;

  // Track initial page view
  analytics.pageView({
    url: window.location.href,
    title: document.title,
    referrer: document.referrer,
    campaign: getUTMParams(),
  });

  // Track scroll depth
  let maxScroll = 0;
  const trackScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );
    if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
      maxScroll = scrollPercent;
      analytics.scrollDepth(scrollPercent);
    }
  };

  window.addEventListener('scroll', trackScroll, { passive: true });

  // Track time on page
  const startTime = Date.now();
  const trackTime = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    analytics.timeOnPage(timeSpent);
  };

  window.addEventListener('beforeunload', trackTime);

  return () => {
    window.removeEventListener('scroll', trackScroll);
    window.removeEventListener('beforeunload', trackTime);
  };
}

// ============================================================
// UTM Parameter Extraction
// ============================================================
export function getUTMParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};

  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((param) => {
    const value = params.get(param);
    if (value) utm[param.replace('utm_', '')] = value;
  });

  return utm;
}

// ============================================================
// Server-Side Analytics (for API routes)
// ============================================================
export async function trackServerEvent(
  eventName: string,
  properties: Record<string, unknown>,
  userId?: string
) {
  // In production, send to analytics API
  // For now, just log
  console.log('[Server Analytics]', eventName, properties, userId);
}

// ============================================================
// Dashboard Analytics Data Types
// ============================================================
export interface AnalyticsSummary {
  totalPageViews: number;
  uniqueVisitors: number;
  avgSessionDuration: number;
  bounceRate: number;
  topPages: { path: string; views: number }[];
  topReferrers: { source: string; visits: number }[];
  deviceBreakdown: { device: string; percentage: number }[];
  conversionRate: number;
}

export interface CampaignAnalytics {
  campaignId: string;
  impressions: number;
  engagements: number;
  clicks: number;
  leads: number;
  engagementRate: number;
  clickRate: number;
  conversionRate: number;
}

// ============================================================
// GA4 Data Fetching (via MCP)
// ============================================================
export interface GA4QueryParams {
  dimensions: string[];
  metrics: string[];
  dateRangeStart: string;
  dateRangeEnd: string;
  limit?: number;
}

// This would be called server-side to fetch GA4 data
export async function fetchGA4Data(params: GA4QueryParams): Promise<any> {
  // Use MCP ga4-analytics tool server-side
  // For now, return mock data structure
  return {
    rows: [],
    rowCount: 0,
  };
}
