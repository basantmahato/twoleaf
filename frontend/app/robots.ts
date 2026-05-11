import { MetadataRoute } from 'next';

/**
 * Generates robots.txt for the TwoLeaf Agency website.
 * This file tells search engine crawlers which pages they can or cannot visit.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard/',    // Private dashboard routes
        '/login',         // Authentication page
        '/unauthorized',  // Error page
        '/_next/',        // Next.js internal files
      ],
    },
    sitemap: 'https://twoleaf.agency/sitemap.xml',
  };
}
