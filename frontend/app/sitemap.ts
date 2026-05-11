import { MetadataRoute } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

/**
 * Generates a dynamic sitemap for the TwoLeaf Agency website.
 * This function fetches blog posts from the API to include dynamic blog routes.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://twoleafservices.com';

  // Fetch blogs from API for dynamic routes
  let blogs = [];
  try {
    const response = await fetch(`${API_URL}/blogs`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (response.ok) {
      const data = await response.json();
      blogs = data.data || [];
    }
  } catch (error) {
    console.error('Failed to fetch blogs for sitemap:', error);
  }

  // Public static routes that should be indexed
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/blog',
    '/contact',
    '/testimonials',
    '/start-project',
    '/status',
    '/privacy',
    '/terms',
  ];

  const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Map blog posts to sitemap entries
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.date || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...blogRoutes];
}
