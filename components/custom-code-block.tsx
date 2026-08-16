'use client';

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CustomCodeBlockProps {
  className?: string;
  copy?: boolean;
  children?: any;
}

export default function CustomCodeBlock({
  className,
  copy = true,
  children,
}: CustomCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const match = className?.match(/(?<=language-)(\w.*?)\b/);
  const language = match ? match[0] : 'javascript';
  const text = typeof children === 'string' ? children.trim() : String(children || '').trim();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  return (
    <div className="relative my-6 rounded-xl overflow-hidden border border-white/10 bg-[#282a36] shadow-xl group">
      <div className="flex items-center justify-between px-4 py-2 bg-stone-900/80 border-b border-white/10 text-xs text-gray-400 font-mono">
        <span className="uppercase tracking-wider font-semibold text-purple-400">{language}</span>
        {copy && (
          <button
            onClick={handleCopy}
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 hover:text-white transition-colors cursor-pointer text-xs"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-emerald-400"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-emerald-400 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
        )}
      </div>
      <div className="overflow-x-auto text-sm p-4">
        <SyntaxHighlighter
          language={language}
          style={dracula}
          customStyle={{
            margin: 0,
            padding: 0,
            background: 'transparent',
            fontSize: '0.9rem',
            lineHeight: '1.6',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            },
          }}
        >
          {text}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
