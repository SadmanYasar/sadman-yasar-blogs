import DateDisplay from "@/components/date";
import { getSortedPostsData } from "@/utils/mdxUtils";
import { motion } from "motion/react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import { FadeUp } from "@/components/TextReveal";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Blog({ allPostsData }) {
  return (
    <>
      <Head>
        <title>Blog | Sadman Yasar Sayem</title>
        <meta name="description" content="Thoughts on software engineering, web development, and technology." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-stone-950 text-white min-h-screen">
        <ScrollProgress />
        <Navbar />

        <main className="pt-32 pb-20">
          <div className="container-custom">
            {/* Header */}
            <FadeUp>
              <div className="text-center mb-16">
                <h1 className="heading2Xl mb-4">
                  <span className="gradient-text">Blog</span>
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  Thoughts on software engineering, web development, and technology. 
                  Here you'll find my insights and tutorials on topics I'm passionate about.
                </p>
              </div>
            </FadeUp>

            {/* Blog Grid */}
            <div className="grid gap-8 md:gap-12">
              {allPostsData.map((post, index) => (
                <motion.article
                  key={post.filePath}
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={`/posts/${post.filePath.replace(/\.mdx?$/, "")}`}
                    className="block"
                  >
                    <div className="glass rounded-2xl p-6 md:p-8 hover-glow transition-all duration-300 group-hover:border-purple-500/30">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                        <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                          {post.data.title}
                        </h2>
                        <span className="text-sm text-gray-500 shrink-0">
                          <DateDisplay dateString={post.data.date} />
                        </span>
                      </div>
                      
                      {post.data.description && (
                        <p className="text-gray-400 mb-4 line-clamp-2">
                          {post.data.description}
                        </p>
                      )}

                      <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
                        <span>Read more</span>
                        <motion.svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </motion.svg>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {/* Back to Home */}
            <FadeUp delay={0.3}>
              <div className="mt-16 text-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back to Portfolio</span>
                </Link>
              </div>
            </FadeUp>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 border-t border-white/5">
          <div className="container-custom text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Sadman Yasar Sayem. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
