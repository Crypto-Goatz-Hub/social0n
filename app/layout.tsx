import type { Metadata } from 'next';
import './globals.css';
import { AnalyticsProvider, PageTracker } from '@/components/analytics/Analytics';
import { Social0nSchemas } from '@/components/sxo/SchemaMarkup';

// ============================================================
// SXO-Optimized Metadata
// ============================================================
export const metadata: Metadata = {
  title: {
    default: 'Social0n - AI-Powered Social Media Campaign Automation',
    template: '%s | Social0n',
  },
  description: 'Launch outcome-driven social campaigns in minutes. AI-generated content, platform-safe posting, and real business results. No contracts, pay per campaign.',
  keywords: [
    'social media automation',
    'campaign management',
    'AI marketing',
    'social posting',
    'lead generation',
    'social media campaign',
    'content automation',
    'LinkedIn automation',
    'Facebook marketing',
    'Instagram automation',
    'Google Business Profile',
    'social media strategy',
  ],
  authors: [{ name: 'Social0n' }],
  creator: 'Social0n',
  publisher: 'Social0n',

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://social0n.com',
    siteName: 'Social0n',
    title: 'Social0n - AI-Powered Social Media Campaign Automation',
    description: 'Launch outcome-driven social campaigns in minutes. AI-generated content, platform-safe posting, and real business results.',
    images: [
      {
        url: 'https://social0n.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Social0n - Campaign-as-a-Service Platform',
      },
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Social0n - AI-Powered Social Media Campaign Automation',
    description: 'Launch outcome-driven social campaigns in minutes. AI-generated content, platform-safe posting, and real business results.',
    images: ['https://social0n.com/og-image.png'],
    creator: '@social0n',
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Verification
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },

  // Canonical
  alternates: {
    canonical: 'https://social0n.com',
  },

  // Category
  category: 'technology',
};

// ============================================================
// Root Layout
// ============================================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#0a0a0a" />

        {/* Schema.org Structured Data */}
        <Social0nSchemas />
      </head>
      <body className="font-sans antialiased">
        <AnalyticsProvider
          ga4MeasurementId={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}
          cro9SiteId={process.env.NEXT_PUBLIC_CRO9_SITE_ID}
        >
          <PageTracker />
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  );
}
