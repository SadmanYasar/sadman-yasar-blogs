import Layout from "@/components/layout";
import PostList from "@/components/post-list";
import { getSortedPostsData } from "@/utils/mdx-utils";

export default function HomePage() {
  const allPostsData = getSortedPostsData();

  return (
    <Layout home>
      <section className="my-8 text-base leading-relaxed text-gray-300 text-justify space-y-4">
        <p>
          I am a Computer Science graduate with extensive experience in full-stack development and a proven track record of building scalable, user-focused applications. Previously a freelance developer, I consulted and collaborated with startup founders to ship web and mobile apps using modern tech stacks such as MERN, Flutter, GraphQL, Directus, n8n, and React Native.
        </p>
        <p>
          In my free time, I contribute to open source projects, tinker around with three.js, and play electric guitar. 🎸
        </p>
      </section>

      <section className="headingMd padding1px">
        <div className="flex flex-row gap-2">
          <h2 className="headingLg">Featured Writing</h2>
        </div>
        <PostList posts={allPostsData} />
      </section>
    </Layout>
  );
}
