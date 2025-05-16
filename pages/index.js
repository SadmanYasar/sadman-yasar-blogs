import Date from "@/components/date";
import Layout, { siteTitle } from "@/components/layout";
import { getSortedPostsData } from "@/utils/mdxUtils";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="headingMd">
        <p>
          Hi! I am a Computer Science undergraduate student at UTM. Here, you
          will find my thoughts and anything that I find interesting to write
          on, mostly tech-related. 👨‍💻
        </p>
      </section>
      <section className="headingMd padding1px">
        <div className="flex flex-row gap-2">
          <h2 className="headingLg">Blog</h2>
        </div>
        <ul className="list">
          {allPostsData.map((post, index) => (
            <motion.li
              className="listItem"
              aria-label={post.data.title}
              key={post.filePath}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: index * 0.2, duration: 0.5 },
              }}
            >
              <Link
                legacyBehavior
                as={`/posts/${post.filePath.replace(/\.mdx?$/, "")}`}
                href={`/posts/[slug]`}
              >
                <a>{post.data.title}</a>
              </Link>
              <br />
              <small className="lightText">
                <Date dateString={post.data.date} />
              </small>
            </motion.li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
