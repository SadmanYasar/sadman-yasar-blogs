import Comments from "@/components/comments";
import CustomCodeBlock from "@/components/customCodeBlock";
import CustomLink from "@/components/customLink";
import DateRenderer from "@/components/date";
import Layout from "@/components/layout";
import ScrollBar from "@/components/scrollBar";
import { postFilePaths, POSTS_PATH } from "@/utils/mdxUtils";
import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import path from "path";
import { useRouter } from "next/router";
import { config } from "data/config";

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  a: CustomLink,
  p: (props) => <p className="mb-8 text-lg text-justify" {...props} />,
  // Handle block code (multi-line code blocks)
  pre: (props) => <div {...props} className="my-6 not-prose" />,
  code: (props) => {
    // This is important: we only want to use CustomCodeBlock for multi-line code blocks
    // which are wrapped in a <pre> tag by the MDX processor
    const isInlineCode = !props.className;
    if (isInlineCode) {
      return <code className="bg-purple-800 text-white py-0.5 px-1 rounded font-mono text-sm" {...props} />;
    }
    return <CustomCodeBlock {...props} copy={true} />;
  },
  // Improve list items styling
  ul: (props) => <ul className="pl-8 mb-8 list-disc" {...props} />,
  ol: (props) => <ol className="pl-8 mb-8 list-decimal" {...props} />,
  li: (props) => <li className="mb-2 text-lg" {...props} />,
  // Improve headings
  h2: (props) => (
    <h2 className="mt-10 mb-6 text-2xl font-extrabold tracking-wide" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-8 mb-4 text-xl font-bold tracking-wide" {...props} />
  ),
  h4: (props) => (
    <h4 className="mt-6 mb-3 text-lg font-bold tracking-wide" {...props} />
  ),
  // Add blockquote styling
  blockquote: (props) => (
    <blockquote className="pl-4 my-6 italic text-gray-700 border-l-4 border-gray-300" {...props} />
  ),
  // Add table styling
  table: (props) => (
    <div className="my-8 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300" {...props} />
    </div>
  ),
  th: (props) => <th className="px-4 py-3 font-semibold text-left bg-gray-100" {...props} />,
  td: (props) => <td className="px-4 py-2 border-t border-gray-200" {...props} />,
};

export default function Post({ source, frontMatter }) {
  const router = useRouter();
  const siteUrl = config.siteUrl;
  const canonicalUrl = `${siteUrl}${router.asPath}`;
  const keywords = frontMatter.keywords || (frontMatter.tags ? frontMatter.tags.join(", ") : "");
  return (
    <>
      <ScrollBar />
      <Layout>
        <Head>
          <title>{frontMatter.title}</title>
          <meta name="description" content={frontMatter.description} />
          <meta name="keywords" content={keywords} />
          {frontMatter.twitter && <meta name="author" content={'sadmanyasar_'} />}
          <link rel="canonical" href={canonicalUrl} />

          {/* Open Graph Meta Tags */}
          <meta property="og:title" content={frontMatter.title} />
          <meta property="og:description" content={frontMatter.description} />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:type" content="article" />
          {frontMatter.image && <meta property="og:image" content={frontMatter.image} />}
          <meta property="og:site_name" content="Sadman Yasar Sayem Blogs" />
          <meta property="article:published_time" content={new Date(frontMatter.date).toISOString()} />
          {frontMatter.twitter && <meta property="article:author" content={`https://twitter.com/sadmanyasar_}`} />}
          {frontMatter.tags && frontMatter.tags.map(tag => (
            <meta property="article:tag" content={tag} key={tag} />
          ))}

          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          {frontMatter.twitter && <meta name="twitter:site" content={`@sadmanyasar_}`} />}
          {frontMatter.twitter && <meta name="twitter:creator" content={`@sadmanyasar_}`} />}
          <meta name="twitter:title" content={frontMatter.title} />
          <meta name="twitter:description" content={frontMatter.description} />
          {frontMatter.image && <meta name="twitter:image" content={frontMatter.image} />}
        </Head>

        <main>
          <div className="post-header">
            <h1 className="text-2xl leading-1.3 font-extrabold tracking-wide my-4">
              {frontMatter.title}
            </h1>
            <DateRenderer dateString={frontMatter.date} />
          </div>
          <MDXRemote {...source} components={components} />
          <Comments />
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
  );
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return { paths, fallback: false };
};
