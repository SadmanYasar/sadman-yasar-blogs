import React from 'react';
import Link from '@/components/link';

interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  as?: string;
  href?: string;
  children?: React.ReactNode;
}

export default function CustomLink({
  href = '',
  children,
  ...otherProps
}: CustomLinkProps) {
  const isInternal = href.startsWith('/') || href.startsWith('#');

  if (isInternal) {
    return (
      <Link
        href={href}
        className="text-purple-400 hover:text-purple-300 selection:text-white"
        {...otherProps}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-purple-400 hover:text-purple-300 selection:text-white"
      {...otherProps}
    >
      {children}
    </a>
  );
}
