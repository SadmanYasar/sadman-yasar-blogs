import type { MetadataRoute } from 'next';
import { postFilePaths } from '@/utils/mdx-utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sadman-yasar-sayem-blogs.vercel.app';

  const posts = postFilePaths.map((filePath) => {
    const slug = filePath.replace(/\.mdx?$/, '');
    return {
      url: `${baseUrl}/posts/${slug}`,
      lastModified: new Date(),
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
    ...posts,
  ];
}
