import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), 'posts');

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths: string[] = fs.existsSync(POSTS_PATH)
  ? fs.readdirSync(POSTS_PATH).filter((filePath) => /\.mdx?$/.test(filePath))
  : [];

export interface PostData {
  content: string;
  data: {
    title?: string;
    date?: string;
    description?: string;
    status?: string;
    tags?: string[];
    image?: string;
    keywords?: string;
    twitter?: string;
    [key: string]: any;
  };
  filePath: string;
}

export function getSortedPostsData(): PostData[] {
  if (!fs.existsSync(POSTS_PATH)) return [];

  // Get file names under /posts
  const posts: PostData[] = postFilePaths.map((filePath) => {
    const fullPath = path.join(POSTS_PATH, filePath);
    const source = fs.readFileSync(fullPath, 'utf8');
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  // Filter to only include published posts
  const publishedPosts = posts.filter((post) => post.data.status === 'published');

  // Sort posts by date descending
  return publishedPosts.sort((a, b) => {
    if ((a.data.date || '') < (b.data.date || '')) {
      return 1;
    } else if ((a.data.date || '') > (b.data.date || '')) {
      return -1;
    } else {
      return 0;
    }
  });
}
