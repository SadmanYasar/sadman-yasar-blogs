import Starfield from "@/components/starfield";
import { profileData } from "data/profile";
import Head from "next/head";
import Link from "next/link";
import ScrollToTop from "react-scroll-to-top";
import ScrollToTopIcon from "./scrollToTop";

export const siteTitle = "Sadman Yasar Sayem Blogs";

export default function Layout({ children, home }) {
  return (
    <>
      <div className="w-full max-w-2xl min-h-screen px-4 mx-auto">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Sadman Yasar Sayem personal website using Next.js"
          />
          <meta property="og:image" content={profileData.profile} />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />

        </Head>
        <header className="flex flex-col self-center">
          {home ? (
            <>
              <div className="relative mx-auto mt-8 rounded-full">
                <img
                  src={profileData.profile}
                  className="object-cover transition duration-100 ease-in-out border-purple-500 rounded-full shadow-lg hover:shadow-purple-500 h-36 w-36 border-1"
                  alt={profileData.name}
                />
              </div>

              <h1 className="text-2xl leading-1.3 font-extrabold tracking-wide my-8 mx-auto">
                {profileData.name}
              </h1>
              <div className="flex items-center justify-center w-full mx-auto mb-4 space-x-6">
                {profileData.urls.map((url, index) => (
                  <a href={url.url} key={index} target="_blank" aria-label={`${profileData.urls[index].alt}`}>
                    <img
                      src={url.iconPath}
                      className="object-cover w-12 h-12 p-2 transition duration-100 rounded-lg hover:shadow-lg hover:shadow-purple-500"
                      alt={url.alt}
                    />
                  </a>
                ))}
              </div>
            </>
          ) : (
            <>
              <Link legacyBehavior href="/">
                <a aria-label="Sadman Yasar Sayem profile picture">
                  <img
                    src={profileData.profile}
                    className="object-cover w-24 h-24 mt-8 transition duration-100 ease-in-out border-purple-500 rounded-full hover:border-4 border-opacity-20"
                    alt={profileData.name}
                  />
                </a>
              </Link>
              <h2 className="text-lg leading-1.4 my-4">
                <Link legacyBehavior href="/">
                  <a className="text-current" aria-label="Sadman Yasar Sayem">{profileData.name}</a>
                </Link>
              </h2>
            </>
          )}
        </header>
        <main>{children}</main>
        {!home && (
          <div className="my-12">
            <Link legacyBehavior href="/">
              <a className="hover:text-purple-500 selection:text-white" aria-label="Back to home">
                ← Back to home
              </a>
            </Link>
          </div>
        )}
      </div>
      <Starfield />
      <ScrollToTop smooth component={<ScrollToTopIcon />} style={{ backgroundColor: "transparent", boxShadow: "none", border: "none" }} />
    </>
  );
}
