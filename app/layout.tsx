import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Social0n - Social Automation Delivers Results',
  description: 'Campaign-as-a-Service platform for outcome-driven social media campaigns. AI-orchestrated, platform-safe, results-focused.',
  keywords: ['social media automation', 'campaign management', 'AI marketing', 'social posting', 'lead generation'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
