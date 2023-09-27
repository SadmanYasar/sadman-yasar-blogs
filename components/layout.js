import Starfield from "@/components/starfield";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";

export const siteTitle = "Sadman Yasar Sayem Blogs";
const data = {
  name: "Sadman Yasar Sayem",
  profile: "https://avatars.githubusercontent.com/u/67522140?v=4",
  urls: [
    {
      iconPath: "/upwork.svg",
      url: "https://www.upwork.com/freelancers/~01cfd344d945d1f282?viewMode=1",
    },
    {
      iconPath: "/linkedin.svg",
      url: "https://www.linkedin.com/in/Sadman-Yasar-Sayem/",
    },
    { iconPath: "/github.svg", url: "https://github.com/SadmanYasar" },
    { iconPath: "/behance.svg", url: "https://www.behance.net/sadmanyasar" },
  ],
};

export default function Layout({ children, home }) {
  return (
    <>
      <div className="max-w-2xl w-full min-h-screen mx-auto px-4">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Sadman Yasar Sayem personal website using Next.js"
          />
          <meta property="og:image" content={data.profile} />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <header className="flex flex-col self-center">
          {home ? (
            <>
              <div className="relative rounded-full mx-auto mt-8">
                <img
                  src={data.profile}
                  className="rounded-full hover:shadow-purple-500 transition ease-in-out duration-100 shadow-lg h-36 w-36 object-cover border-1 border-purple-500"
                  alt={data.name}
                />
              </div>

              <h1 className="text-2xl leading-1.3 font-extrabold tracking-wide my-8 mx-auto">
                {data.name}
              </h1>
              <div className="w-full mx-auto mb-4 flex items-center justify-center space-x-6">
                {data.urls.map((url, index) => (
                  <a href={url.url} key={index} target="_blank">
                    <img
                      src={url.iconPath}
                      className="w-12 h-12 rounded-lg object-cover p-2 hover:shadow-lg hover:shadow-purple-500 transition duration-100"
                    />{" "}
                  </a>
                ))}
              </div>
            </>
          ) : (
            <>
              <Link legacyBehavior href="/">
                <a>
                  <img
                    src={data.profile}
                    className="rounded-full h-24 w-24 object-cover mt-8 transition hover:border-4 border-purple-500 border-opacity-20 ease-in-out duration-100"
                    alt={data.name}
                  />
                </a>
              </Link>
              <h2 className="text-lg leading-1.4 my-4">
                <Link legacyBehavior href="/">
                  <a className="text-current">{data.name}</a>
                </Link>
              </h2>
            </>
          )}
        </header>
        <main>{children}</main>
        {!home && (
          <div className="my-12">
            <Link legacyBehavior href="/">
              <a className="hover:text-purple-500 selection:text-white">
                ← Back to home
              </a>
            </Link>
          </div>
        )}
      </div>
      <Starfield />
    </>
  );
}
