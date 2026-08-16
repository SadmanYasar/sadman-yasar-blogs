"use client";

import Giscus from "@giscus/react";

interface CommentsProps {
  title?: string;
}

export default function Comments({ title }: CommentsProps) {
  const repo = (process.env.NEXT_PUBLIC_COMMENTS_REPO ||
    "SadmanYasar/sadman-yasar-blogs") as `${string}/${string}`;
  const repoId = process.env.NEXT_PUBLIC_COMMENTS_REPO_ID || "R_kgDOHuGvkQ";
  const category = process.env.NEXT_PUBLIC_COMMENTS_REPO_CATEGORY || "Announcements";
  const categoryId = process.env.NEXT_PUBLIC_COMMENTS_CATEGORY_ID || "DIC_kwDOHuGvkc4CZpcR";

  return (
    <section
      className="mt-12 pt-8 border-t border-white/10"
      aria-label="Comments"
    >
      <Giscus
        repo={repo}
        repoId={repoId}
        category={category}
        categoryId={categoryId}
        mapping={title ? "specific" : "og:title"}
        term={title}
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="dark"
        lang="en"
        loading="lazy"
      />
    </section>
  );
}
