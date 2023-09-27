import Giscus from "@giscus/react";

export default function Comments() {
  const repo = process.env.NEXT_PUBLIC_COMMENTS_REPO;
  const repoId = process.env.NEXT_PUBLIC_COMMENTS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_COMMENTS_REPO_CATEGORY;
  const categoryId = process.env.NEXT_PUBLIC_COMMENTS_CATEGORY_ID;

  return (
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
  );
}
