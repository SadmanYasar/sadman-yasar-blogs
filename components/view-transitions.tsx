'use client';

import React, { createContext, useContext, useEffect, useLayoutEffect } from 'react';
import { useRouter as useNextRouter, usePathname, useSearchParams } from 'next/navigation';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

type FinishViewTransition = () => void;

interface ViewTransitionContextValue {
  navigate: (href: string) => void;
}

const ViewTransitionContext = createContext<ViewTransitionContextValue | null>(null);

let pendingTransitionResolve: FinishViewTransition | null = null;

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function ViewTransitionsProvider({ children }: { children: React.ReactNode }) {
  const router = useNextRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // When pathname or searchParams change, Next.js has committed the new route DOM
  useIsomorphicLayoutEffect(() => {
    if (pendingTransitionResolve) {
      pendingTransitionResolve();
      pendingTransitionResolve = null;
    }
  }, [pathname, searchParams]);

  const navigate = (href: string) => {
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      if (pendingTransitionResolve) {
        pendingTransitionResolve();
        pendingTransitionResolve = null;
      }

      (document as any).startViewTransition(() => {
        return new Promise<void>((resolve) => {
          pendingTransitionResolve = resolve;
          router.push(href);

          // Fallback timeout in case navigation doesn't change route or is canceled
          setTimeout(() => {
            if (pendingTransitionResolve === resolve) {
              pendingTransitionResolve();
              pendingTransitionResolve = null;
            }
          }, 1500);
        });
      });
    } else {
      router.push(href);
    }
  };

  return (
    <ViewTransitionContext.Provider value={{ navigate }}>
      {children}
    </ViewTransitionContext.Provider>
  );
}

export function useTransitionRouter() {
  const context = useContext(ViewTransitionContext);
  const nextRouter = useNextRouter();

  return {
    push: (href: string) => {
      if (context) {
        context.navigate(href);
      } else {
        nextRouter.push(href);
      }
    },
    replace: nextRouter.replace,
    back: nextRouter.back,
    forward: nextRouter.forward,
    refresh: nextRouter.refresh,
    prefetch: nextRouter.prefetch,
  };
}

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps>,
    NextLinkProps {
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export function Link({
  href,
  children,
  onClick,
  target,
  rel,
  ...rest
}: LinkProps) {
  const { push } = useTransitionRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      target === '_blank' ||
      e.metaKey ||
      e.ctrlKey ||
      e.altKey ||
      e.shiftKey
    ) {
      return;
    }

    const hrefString = typeof href === 'string' ? href : href.pathname || '/';
    const isInternal = hrefString.startsWith('/') && !hrefString.startsWith('//');

    if (isInternal) {
      e.preventDefault();
      push(hrefString);
    }
  };

  return (
    <NextLink
      href={href}
      target={target}
      rel={rel}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </NextLink>
  );
}
