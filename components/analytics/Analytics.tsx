'use client';

// ============================================================
// Analytics Tracking Component
// ============================================================
// Drop-in component for GA4 + CRO9 tracking
// Template system for all RocketOpp SaaS sites
// ============================================================

import { useEffect } from 'react';
import Script from 'next/script';
import { analytics } from '@/lib/analytics';

interface AnalyticsProviderProps {
  ga4MeasurementId?: string;
  cro9SiteId?: string;
  children: React.ReactNode;
}

export function AnalyticsProvider({
  ga4MeasurementId,
  cro9SiteId,
  children,
}: AnalyticsProviderProps) {
  useEffect(() => {
    // Initialize analytics library
    analytics.init({
      ga4MeasurementId,
      cro9SiteId,
    });
  }, [ga4MeasurementId, cro9SiteId]);

  return (
    <>
      {/* Google Analytics 4 */}
      {ga4MeasurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4MeasurementId}', {
                page_path: window.location.pathname,
                send_page_view: true,
              });
            `}
          </Script>
        </>
      )}

      {/* CRO9 Tracking Script */}
      {cro9SiteId && (
        <Script id="cro9-init" strategy="afterInteractive">
          {`
            (function() {
              var c = document.createElement('script');
              c.src = 'https://cro9.com/embed.js';
              c.async = true;
              c.dataset.siteId = '${cro9SiteId}';
              document.head.appendChild(c);
            })();
          `}
        </Script>
      )}

      {children}
    </>
  );
}

// ============================================================
// Page Tracker Component (Client-side)
// ============================================================
export function PageTracker() {
  useEffect(() => {
    // Track page view
    analytics.pageView({
      url: window.location.href,
      title: document.title,
      referrer: document.referrer,
    });

    // Track scroll depth
    let maxScroll = 0;
    const trackScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);
      const threshold = Math.floor(scrollPercent / 25) * 25;

      if (threshold > maxScroll && threshold <= 100) {
        maxScroll = threshold;
        analytics.scrollDepth(threshold);
      }
    };

    window.addEventListener('scroll', trackScroll, { passive: true });

    // Track time on page
    const startTime = Date.now();
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      analytics.timeOnPage(timeSpent);
    };

    window.addEventListener('beforeunload', trackTimeOnPage);

    return () => {
      window.removeEventListener('scroll', trackScroll);
      window.removeEventListener('beforeunload', trackTimeOnPage);
    };
  }, []);

  return null;
}

// ============================================================
// Event Tracking Hooks
// ============================================================
export function useTrackEvent() {
  return (eventName: string, properties?: Record<string, unknown>) => {
    analytics.track(eventName, properties);
  };
}

export function useTrackCTA() {
  return (ctaName: string, location: string) => {
    analytics.ctaClick(ctaName, location);
  };
}

export function useTrackConversion() {
  return (conversionName: string, value?: number) => {
    analytics.conversion(conversionName, value);
  };
}

// ============================================================
// Tracking Button Component
// ============================================================
interface TrackedButtonProps {
  children: React.ReactNode;
  eventName: string;
  eventProperties?: Record<string, unknown>;
  className?: string;
  onClick?: () => void;
}

export function TrackedButton({
  children,
  eventName,
  eventProperties,
  className,
  onClick,
}: TrackedButtonProps) {
  const handleClick = () => {
    analytics.track(eventName, eventProperties);
    onClick?.();
  };

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
}

// ============================================================
// Tracking Link Component
// ============================================================
interface TrackedLinkProps {
  href: string;
  children: React.ReactNode;
  eventName: string;
  eventProperties?: Record<string, unknown>;
  className?: string;
}

export function TrackedLink({
  href,
  children,
  eventName,
  eventProperties,
  className,
}: TrackedLinkProps) {
  const handleClick = () => {
    analytics.track(eventName, eventProperties);
  };

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
