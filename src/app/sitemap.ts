import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

// Static export — this runs once at build time and is written to sitemap.xml.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/portfolio', '/pricing', '/contact', '/faq'];
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
  }));
}
