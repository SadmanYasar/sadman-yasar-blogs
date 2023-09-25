import utilStyles from '../../styles/utils.module.css'
import Date from '../../components/date'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import { motion, useScroll, useSpring } from 'framer-motion'
/* import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import ReactMarkdown from 'react-markdown'

const CodeBlock = ({ language, value }) => {
    return <SyntaxHighlighter language={language}>{value}</SyntaxHighlighter>;
}; */

export default function Post({ postData }) {
    return (
        <>
            <ScrollBar />
            <Layout>
                <Head>
                    <title>{postData.title}</title>
                </Head>
                <article>
                    <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                    <div className={utilStyles.lightText}>
                        <Date dateString={postData.date} />
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
                    {/* <ReactMarkdown
                    escapeHtml={false}
                    children={postData.contentHtml}
                    renderers={{ code: CodeBlock }}
                /> */}
                </article>
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

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}