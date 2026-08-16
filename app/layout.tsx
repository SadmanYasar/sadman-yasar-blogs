import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Starfield from "@/components/starfield";
import ScrollToTopWrapper from "@/components/scroll-to-top-wrapper";
import { ViewTransitionsProvider } from "@/components/view-transitions";
import { siteConfig } from "data/config";
import { profileData } from "data/profile";
import "../styles/global.css";

const satoshi = localFont({
  src: "../styles/fonts/Satoshi.woff2",
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: profileData.profile }],
    siteName: siteConfig.title,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [profileData.profile],
    creator: siteConfig.twitterHandle,
  },
};

export const viewport: Viewport = {
  themeColor: "#1c1917",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={satoshi.variable}>
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Context" />
      </head>
      <body className="font-sans antialiased bg-stone-900 text-purple-50/90 selection:bg-purple-800">
        <ViewTransitionsProvider>
          <Starfield />
          {children}
          <ScrollToTopWrapper />
        </ViewTransitionsProvider>
        <GoogleTagManager gtmId={siteConfig.gtmId} />
        <Analytics />
        <SpeedInsights />
        <Script
          src="https://cdn.userway.org/widget.js"
          data-account={siteConfig.userwayAccount}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
