import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Starfield from "@/components/starfield";
import ScrollToTopWrapper from "@/components/scroll-to-top-wrapper";
import { ViewTransitionsProvider } from "@/components/view-transitions";
import { profileData } from "data/profile";
import "../styles/global.css";

const satoshi = localFont({
  src: "../styles/fonts/Satoshi.woff2",
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sadman-yasar-sayem-blogs.vercel.app"),
  title: {
    default: "Sadman Yasar Sayem Blogs",
    template: "%s | Sadman Yasar Sayem Blogs",
  },
  description: "Sadman Yasar Sayem personal website and engineering blogs",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Sadman Yasar Sayem Blogs",
    description: "Sadman Yasar Sayem personal website and engineering blogs",
    images: [{ url: profileData.profile }],
    siteName: "Sadman Yasar Sayem Blogs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sadman Yasar Sayem Blogs",
    description: "Sadman Yasar Sayem personal website and engineering blogs",
    images: [profileData.profile],
    creator: "@sadmanyasar_",
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
        <GoogleTagManager gtmId="G-P43MJLFWMN" />
        <Analytics />
        <SpeedInsights />
        <Script
          src="https://cdn.userway.org/widget.js"
          data-account="6iC0LiBYmw"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
