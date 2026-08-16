import type { Metadata } from "next";
import Layout from "@/components/layout";
import PostList from "@/components/post-list";
import { getSortedPostsData } from "@/utils/mdx-utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on software engineering, web development, and technology.",
};

export default function BlogPage() {
  const allPostsData = getSortedPostsData();

  return (
    <Layout>
      <section className="headingMd padding1px">
        <div className="flex flex-row gap-2">
          <h2 className="headingLg">Blog</h2>
        </div>
        <PostList posts={allPostsData} />
      </section>
    </Layout>
  );
}
