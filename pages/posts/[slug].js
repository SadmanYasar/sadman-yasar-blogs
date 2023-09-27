import Comments from "@/components/comments";
import CustomCodeBlock from "@/components/customCodeBlock";
import CustomLink from "@/components/customLink";
import Date from "@/components/date";
import Layout from "@/components/layout";
import ScrollBar from "@/components/scrollBar";
import {postFilePaths, POSTS_PATH} from "@/utils/mdxUtils";
import fs from "fs";
import matter from "gray-matter";
import {MDXRemote} from "next-mdx-remote";
import {serialize} from "next-mdx-remote/serialize";
import Head from "next/head";
import path from "path";

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  a: CustomLink,
  p: (props) => <p className="mb-8 text-lg" {
  ...props} />,
  code: (props) => <CustomCodeBlock {...props} copy={true} />,
  li: (props) => <li className="mb-4 text-lg" {
  ...props} />,
  h2: (props) => (
    <h2 className="text-2xl font-extrabold tracking-wide my-4" {...props} />
  ),
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  // TestComponent: dynamic(() => import('../../components/TestComponent')),

  // Head,
};

export default function Post({source, frontMatter}) {
  return (
      <><ScrollBar /><Layout><Head>
      <title>{frontMatter.title}</title>
        </Head>

      <main><div className = "post-header">
      <h1 className = "text-2xl leading-1.3 font-extrabold tracking-wide my-4">{
          frontMatter
              .title}</h1>
            <Date dateString={frontMatter.date} />
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
    </>);
}

export const getStaticProps = async ({params}) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const {content, data} = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions : {
      remarkPlugins : [],
      rehypePlugins : [],
    },
    scope : data,
  });

  return {
    props : {
      source : mdxSource,
      frontMatter : data,
    },
  };
};

export const getStaticPaths = async () => {
  const paths =
      postFilePaths
          // Remove file extensions for page paths
          .map((path) => path.replace(/\.mdx?$/, ""))
          // Map the path into the static paths object required by Next.js
          .map((slug) => ({params : {slug}}));

  return {paths, fallback : false};
};
