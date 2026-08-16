import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Layout from "@/components/layout";
import ScrollBar from "@/components/scroll-bar";
import DateRenderer from "@/components/date";
import Comments from "@/components/comments";
import { mdxComponents } from "@/components/mdx-components";
import { POSTS_PATH, postFilePaths } from "@/utils/mdx-utils";
import { siteConfig } from "data/config";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return postFilePaths.map((filePath) => ({
    slug: filePath.replace(/\.mdx?$/, ""),
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const postFilePath = path.join(POSTS_PATH, `${slug}.mdx`);

  if (!fs.existsSync(postFilePath)) {
    return {
      title: "Post Not Found",
    };
  }

  const source = fs.readFileSync(postFilePath, "utf8");
  const { data } = matter(source);
  const canonicalUrl = `${siteConfig.siteUrl}/posts/${slug}`;

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords || (data.tags ? data.tags.join(", ") : undefined),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: canonicalUrl,
      type: "article",
      publishedTime: data.date ? new Date(data.date).toISOString() : undefined,
      tags: data.tags,
      images: data.image ? [{ url: data.image }] : undefined,
      siteName: siteConfig.title,
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: data.image ? [data.image] : undefined,
      creator: siteConfig.twitterHandle,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const postFilePath = path.join(POSTS_PATH, `${slug}.mdx`);

  if (!fs.existsSync(postFilePath)) {
    notFound();
  }

  const source = fs.readFileSync(postFilePath, "utf8");
  const { content, data } = matter(source);

  return (
    <>
      <ScrollBar />
      <Layout>
        <main>
          <div className="post-header mb-8">
            <h1 className="text-2xl leading-1.3 font-extrabold tracking-wide my-4">
              {data.title}
            </h1>
            <DateRenderer dateString={data.date} />
          </div>
          <article className="prose-container">
            <MDXRemote source={content} components={mdxComponents} />
          </article>
          <Comments title={data.title} />
        </main>
      </Layout>
    </>
  );
}
