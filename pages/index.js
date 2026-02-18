import Date from "@/components/date";
import Layout, { siteTitle } from "@/components/layout";
import { getSortedPostsData } from "@/utils/mdxUtils";
import { motion } from "motion/react"
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
                transition: { delay: index * 0.1, duration: 0.3 },
              }}
            >
              <Link
                as={`/posts/${post.filePath.replace(/\.mdx?$/, "")}`}
                href={`/posts/[slug]`}>
                {post.data.title}
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
