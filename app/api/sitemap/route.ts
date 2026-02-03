import { NextResponse } from 'next/server';

// ============================================================
// Dynamic Sitemap Generator
// ============================================================
// Generates XML sitemap for SEO
// ============================================================

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://social0n.com';

export async function GET() {
  const pages = [
    { url: '/', priority: 1.0, changefreq: 'weekly' },
    { url: '/login', priority: 0.5, changefreq: 'monthly' },
    { url: '/signup', priority: 0.8, changefreq: 'monthly' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
