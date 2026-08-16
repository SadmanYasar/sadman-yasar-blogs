'use client';

import { motion } from "motion/react";
import Link from "@/components/link";
import Date from "@/components/date";

export interface PostItem {
  filePath: string;
  data: {
    title?: string;
    date?: string;
    description?: string;
    status?: string;
    [key: string]: any;
  };
}

export default function PostList({ posts }: { posts: PostItem[] }) {
  return (
    <ul className="list">
      {posts.map((post, index) => (
        <motion.li
          className="listItem"
          aria-label={post.data.title}
          key={post.filePath}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: index * 0.1, duration: 0.3 },
          }}
        >
          <Link href={`/posts/${post.filePath.replace(/\.mdx?$/, "")}`}>
            {post.data.title}
          </Link>
          <br />
          <small className="lightText">
            <Date dateString={post.data.date} />
          </small>
        </motion.li>
      ))}
    </ul>
  );
}
