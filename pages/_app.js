import "../styles/global.css";

import localFont from "next/font/local";

import Script from "next/script";
import { GoogleTagManager } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import Head from "next/head";

const satoshi = localFont({
  src: "../styles/fonts/Satoshi.woff2",
  variable: "--font-satoshi",
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <main className={`${satoshi.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
      <GoogleTagManager gtmId="G-P43MJLFWMN" />
      <Analytics />
      <SpeedInsights />
      <Script src="https://cdn.userway.org/widget.js" data-account="6iC0LiBYmw" />
    </>
  );
}
