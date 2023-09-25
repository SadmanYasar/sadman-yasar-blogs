import fs from 'fs'
import utilStyles from '../../styles/utils.module.css'
import Date from '../../components/date'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import path from 'path'
import Layout from '../../components/layout'
import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils'
import { motion, useScroll, useSpring } from 'framer-motion'

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
    // a: CustomLink,

    // It also works with dynamically-imported components, which is especially
    // useful for conditionally loading components for certain routes.
    // See the notes in README.md for more details.
    // TestComponent: dynamic(() => import('../../components/TestComponent')),

    // Head,
}

export default function Post({ source, frontMatter }) {
    return (
        <>
            <ScrollBar />
            <Layout>
                <Head>
                    <title>{frontMatter.title}</title>
                </Head>
                {/* <article>
                    <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                    <div className={utilStyles.lightText}>
                        <Date dateString={postData.date} />
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
                </article> */}
                <div className="post-header">
                    <h1>{frontMatter.title}</h1>
                </div>

                <main>
                    <MDXRemote {...source} components={components} />
                </main>

                <style jsx>{`
                    .post-header h1 {
                    margin-bottom: 0;
                    }

                    .post-header {
                    margin-bottom: 2rem;
                    }
                    .description {
                    opacity: 0.6;
                    }
                `}</style>
            </Layout>
        </>
    )
}

function ScrollBar() {
    const { scrollYProgress } = useScroll()

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className='fixed top-0 left-0 right-0 h-1 bg-purple-500 transform origin-left'
            style={{
                scaleX
            }}
        />
    )
}

// export async function getStaticPaths() {
//     const paths = getAllPostIds()
//     return {
//         paths,
//         fallback: false
//     }
// }

// export async function getStaticProps({ params }) {
//     const postData = await getPostData(params.id)
//     return {
//         props: {
//             postData
//         }
//     }
// }

export const getStaticProps = async ({ params }) => {
    const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`)
    const source = fs.readFileSync(postFilePath)

    const { content, data } = matter(source)

    const mdxSource = await serialize(content, {
        // Optionally pass remark/rehype plugins
        mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
        },
        scope: data,
    })

    return {
        props: {
            source: mdxSource,
            frontMatter: data,
        },
    }
}

export const getStaticPaths = async () => {
    const paths = postFilePaths
        // Remove file extensions for page paths
        .map((path) => path.replace(/\.mdx?$/, ''))
        // Map the path into the static paths object required by Next.js
        .map((slug) => ({ params: { slug } }))

    return {
        paths,
        fallback: false,
    }
}