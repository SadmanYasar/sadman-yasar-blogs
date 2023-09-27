import Link from 'next/link'
import Date from '@/components/date'
import Head from 'next/head'
import Layout, { siteTitle } from '@/components/layout'
import { getSortedPostsData } from '@/utils/mdxUtils'
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

export default function Home({ allPostsData }) {

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className='headingMd'>
        <p>Hi! I am a Computer Science undergraduate student at UTM. Here, you will find my thoughts and anything that I find interesting to write on, mostly tech-related. 👨‍💻</p>
      </section>
      <section className='headingMd padding1px'>
        <h2 className='headingLg'>Blog</h2>
        <ul className='list'>
          {allPostsData.map((post, index) => (
            <motion.li className='listItem' key={post.filePath} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: index * 0.5, duration: 1 } }}>
              <Link as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`} href={`/posts/[slug]`}>
                <a>{post.data.title}</a>
              </Link>
              <br />
              <small className='lightText'>
                <Date dateString={post.data.date} />
              </small>
            </motion.li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
