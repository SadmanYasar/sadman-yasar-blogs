import Layout from "@/components/layout";
import PostList from "@/components/post-list";
import { getSortedPostsData } from "@/utils/mdx-utils";

export default function HomePage() {
  const allPostsData = getSortedPostsData();

  return (
    <Layout home>
      <section className="headingMd padding1px">
        <div className="flex flex-row gap-2">
          <h2 className="headingLg">Featured Writing</h2>
        </div>
        <PostList posts={allPostsData} />
      </section>
    </Layout>
  );
}
