import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cbctrack.com';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/_next/',
          '/private/',
          '/draft/',
          '/preview/',
          '*.json$',
          '/404',
          '/500',
          '/search?*',
          '/thank-you',
        ],
      },
      // Specific rules for search engines
      {
        userAgent: 'Googlebot',
        allow: [
          '/blog/',
          '/features/',
          '/gallery/',
          '/about',
          '/contact',
          '/demo-request',
          '/404',
          '/500',
          '/search?*',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: [
          '/blog/',
          '/features/',
          '/gallery/',
          '/about',
          '/contact',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
        ],
      },
      // Block AI training crawlers
      {
        userAgent: [
          'ChatGPT-User',
          'GPTBot',
          'Claude-Web',
          'anthropic-ai',
          'AI2Bot',
        ],
        disallow: '/',
      },
      // Block common bad bots
      {
        userAgent: [
          'SemrushBot',
          'AhrefsBot',
          'MJ12bot',
          'DotBot',
        ],
        disallow: '/',
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/blog/sitemap.xml`,
    ],
    host: baseUrl.replace(/^https?:\/\//, ''),
  };
}