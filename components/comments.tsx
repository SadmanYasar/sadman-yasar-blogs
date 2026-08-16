"use client";

import Giscus from "@giscus/react";

export default function Comments() {
  const repo = (process.env.NEXT_PUBLIC_COMMENTS_REPO ||
    "SadmanYasar/sadman-yasar-blogs") as `${string}/${string}`;
  const repoId = process.env.NEXT_PUBLIC_COMMENTS_REPO_ID || "";
  const category = process.env.NEXT_PUBLIC_COMMENTS_REPO_CATEGORY || "";
  const categoryId = process.env.NEXT_PUBLIC_COMMENTS_CATEGORY_ID || "";

  if (!repo || !repoId) {
    return null;
  }

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
        mapping="title"
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
