import "../styles/global.css";

import localFont from "next/font/local";

import Script from "next/script";
import { GoogleTagManager } from '@next/third-parties/google'

const satoshi = localFont({
  src: "../styles/fonts/Satoshi.woff2",
  variable: "--font-satoshi",
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <main className={`${satoshi.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
      <Script src="https://cdn.userway.org/widget.js" data-account="6iC0LiBYmw" />
      <GoogleTagManager gtmId="G-P43MJLFWMN" />
    </>
  );
}
