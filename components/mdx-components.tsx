import React from "react";
import CustomLink from "@/components/custom-link";
import CustomCodeBlock from "@/components/custom-code-block";

export const mdxComponents = {
  a: CustomLink,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-8 text-lg text-justify" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props} className="my-6 not-prose" />
  ),
  code: (props: React.HTMLAttributes<HTMLElement> & { className?: string }) => {
    const isInlineCode = !props.className;
    if (isInlineCode) {
      return (
        <code
          className="bg-purple-800 text-white py-0.5 px-1 rounded font-mono text-sm"
          {...props}
        />
      );
    }
    return <CustomCodeBlock {...props} copy={true} />;
  },
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="pl-8 mb-8 list-disc" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="pl-8 mb-8 list-decimal" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="mb-2 text-lg" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-10 mb-6 text-2xl font-extrabold tracking-wide"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-8 mb-4 text-xl font-bold tracking-wide"
      {...props}
    />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="mt-6 mb-3 text-lg font-bold tracking-wide"
      {...props}
    />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="pl-4 my-6 italic text-gray-700 border-l-4 border-gray-300"
      {...props}
    />
  ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-8 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300" {...props} />
    </div>
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="px-4 py-3 font-semibold text-left bg-gray-100"
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="px-4 py-2 border-t border-gray-200"
      {...props}
    />
  ),
};
