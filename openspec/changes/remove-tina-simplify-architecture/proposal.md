# Change: Remove Tina CMS and Simplify Architecture

## Why

Tina CMS doesn't work and adds significant complexity: dual schemas (Tina + Astro), dual servers, React dependency, 14 components instead of 6 needed. The project became hard to understand and maintain. Need to simplify to a pattern similar to studio-website (pure Astro + Markdown + scoped CSS).

## What Changes

- **BREAKING**: Remove Tina CMS entirely (tina/, src/lib/tina.ts, public/admin/)
- **BREAKING**: Remove React dependency — rewrite 6 MDX components from React (.tsx) to Astro (.astro)
- **BREAKING**: Remove Tailwind CSS — replace with scoped CSS + CSS variables
- **BREAKING**: Simplify content schema — from 11 categories + 8 types to 4 types (статья, заметка, проект, рецензия)
- Remove unused components: TinaEdit, PostEditor, HeroImage, Calendar, StatsGrid, LinkList, RelatedPosts
- Remove dependencies: tinacms, @tinacms/cli, @astrojs/react, react, react-dom, tailwindcss, @tailwindcss/vite, concurrently, astro-posthog
- Add dependencies: @astrojs/rss, @astrojs/sitemap, @mavrin/remark-typograf
- Preserve: homepage layout, 45 MDX posts (with updated frontmatter), color scheme, fonts

## Impact

- Affected specs: content-management (new), blog-architecture (new), styling-system (new)
- Affected code: All source files — this is a full architecture simplification
- Key files: astro.config.mjs, package.json, src/content/config.ts, all components, all pages, all styles
