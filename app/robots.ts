import type { MetadataRoute } from 'next';
import { siteConfig } from 'data/config';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.siteUrl;
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
