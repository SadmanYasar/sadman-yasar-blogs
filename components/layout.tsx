'use client';

import React from "react";
import Image from "next/image";
import { profileData } from "data/profile";
import { siteConfig } from "data/config";
import Link from "@/components/link";
import { sendGTMEvent } from '@next/third-parties/google';

export const siteTitle = siteConfig.title;

interface LayoutProps {
  children: React.ReactNode;
  home?: boolean;
}

export default function Layout({ children, home = false }: LayoutProps) {
  return (
    <div className="w-full max-w-2xl min-h-screen px-4 mx-auto">
      <header className="flex flex-col self-center">
        {home ? (
          <>
            <div className="relative mx-auto mt-8 rounded-full">
              <Image
                src={profileData.profile}
                width={144}
                height={144}
                priority
                style={{ viewTransitionName: "profile-avatar" }}
                className="object-cover transition duration-100 ease-in-out border-purple-500 rounded-full shadow-lg hover:shadow-purple-500 h-36 w-36 border-1"
                alt={profileData.name}
              />
            </div>

            <h1 className="text-2xl leading-1.3 font-extrabold tracking-wide my-8 mx-auto text-center">
              <span style={{ viewTransitionName: "profile-name" }} className="inline-block">
                {profileData.name}
              </span>
            </h1>
            <div className="flex items-center justify-center w-full mx-auto mb-4 space-x-6">
              {profileData.urls.map((url, index) => (
                <a href={url.url} key={index} target="_blank" rel="noopener noreferrer" aria-label={url.alt}>
                  <Image
                    src={url.iconPath}
                    width={48}
                    height={48}
                    className="object-cover w-12 h-12 p-2 transition duration-100 rounded-lg hover:shadow-lg hover:shadow-purple-500"
                    alt={url.alt}
                  />
                </a>
              ))}
            </div>
          </>
        ) : (
          <>
            <Link
              href="/"
              onClick={() => sendGTMEvent({
                event: 'profile_image_click',
                category: 'engagement',
                label: 'Profile image clicked from subpage'
              })}
              aria-label="Sadman Yasar Sayem profile picture"
            >
              <Image
                src={profileData.profile}
                width={96}
                height={96}
                priority
                style={{ viewTransitionName: "profile-avatar" }}
                className="object-cover w-24 h-24 mt-8 transition duration-100 ease-in-out border-purple-500 rounded-full hover:border-4 border-opacity-20"
                alt={profileData.name}
              />
            </Link>
            <h2 className="text-lg leading-1.4 my-4">
              <Link href="/" className="text-current" aria-label="Sadman Yasar Sayem">
                <span style={{ viewTransitionName: "profile-name" }} className="inline-block">
                  {profileData.name}
                </span>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className="my-12" style={{ viewTransitionName: "back-nav" }}>
          <Link
            href="/"
            className="hover:text-purple-500 selection:text-white"
            aria-label="Back to home"
          >
            ← Back to home
          </Link>
        </div>
      )}
      <footer className="mt-16 pb-12 pt-8 border-t border-white/10 text-center text-xs text-gray-400">
        <p className="flex flex-wrap items-center justify-center gap-2">
          <span>© {new Date().getFullYear()} {profileData.name}. All rights reserved.</span>
          <span>•</span>
          <a
            href="/llms.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition-colors"
          >
            llms.txt
          </a>
          <span>•</span>
          <a
            href="/sitemap.md"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition-colors"
          >
            sitemap.md
          </a>
        </p>
      </footer>
    </div>
  );
}
