<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Guidelines & Agent Execution Checklist

For every prompt and task execution in this repository, follow these mandatory steps and conventions:

## 1. Quality & Verification Checklist (Run on Every Change)
- **Type Checking & Build**: Always run `npm run build` (or verify via Next.js compiler) to ensure zero TypeScript errors, valid App Router layouts/pages, and successful static page generation.
- **React 19 & Compiler Rules**:
  - Keep components and render functions pure (no `Math.random()`, non-deterministic dates, or direct state mutations inside render/useMemo).
  - Avoid cascading re-renders in `useEffect` (use `useSyncExternalStore` for client-side mounting/hydration checks).
  - Do not pass non-standard boolean or custom attributes directly to DOM elements.
- **Console & IDE Warnings**: Ensure no unhandled warnings or lint errors are introduced.

## 2. Naming & File Conventions
- **Kebab-Case Only**: All filenames in `components/`, `utils/`, `app/`, etc. **MUST** strictly follow `kebab-case` (e.g., `custom-code-block.tsx`, `post-list.tsx`, `view-transitions.tsx`, `mdx-utils.ts`).
- **100% TypeScript**: Use `.ts` and `.tsx` across all project files.
- **Clean Imports**: Use path aliases defined in `tsconfig.json` (`@/components/*`, `@/utils/*`, `@/styles/*`).

## 3. SEO, Machine Discovery & Sitemaps
Whenever a new post, page, route, or metadata change is introduced:
- **`app/sitemap.ts` & `app/robots.ts`**: Verify and update dynamic sitemap entries and robots rules.
- **`public/llms.txt`**: Ensure the curated Markdown summary of the site and articles stays up to date.
- **`public/sitemap.md`**: Keep human/agent readable site maps synchronized with the latest content.
- **Dynamic Metadata & OG**: Ensure all routes have proper metadata titles, descriptions, and OpenGraph/Twitter card tags.

## 4. View Transitions Architecture
- Always use the centralized `Link` component from `@/components/link` (which connects to `@/components/view-transitions`).
- Ensure shared element transitions (like `profile-avatar`, `profile-name`, and `back-nav`) use tight inline-block bounding boxes and `priority` images to maintain smooth bidirectional animations between routes.
