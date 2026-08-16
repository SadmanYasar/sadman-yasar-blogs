import type { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/utils/mdx-utils';
import { siteConfig } from 'data/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl;
  const posts = getSortedPostsData();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => {
    const slug = post.filePath.replace(/\.mdx?$/, '');
    return {
      url: `${baseUrl}/posts/${slug}`,
      lastModified: post.data.date ? new Date(post.data.date) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...postEntries,
  ];
}
