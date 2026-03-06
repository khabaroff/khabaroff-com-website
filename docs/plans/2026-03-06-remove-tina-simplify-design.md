# Design: Remove Tina CMS & Simplify Architecture

**Date:** 2026-03-06
**Approach:** Surgical removal of Tina CMS from existing repo
**Reference:** studio-website architecture patterns

## Problem

Project has grown too complex. Tina CMS doesn't work, architecture is hard to understand.
Goal: simplify to a maintainable personal blog + pages site.

## Decisions

### What We Keep
- Homepage layout (index.astro) — already done
- 45 MDX posts (convert frontmatter, remove Tina-specific blocks)
- 6 MDX components: Callout, ImageWide, VideoEmbed, TwoColumns, QuoteBlock, BookCard
- Color scheme: primary #2F4760, accent-green #A6BDA3, accent-yellow #F7D174
- Fonts: Lora (display) + Inter (body)
- Tags system with Cyrillic transliteration

### What We Remove
- Tina CMS entirely (tina/, src/lib/tina.ts, public/admin/)
- Dependencies: tinacms, @tinacms/cli, @astrojs/react, react, react-dom
- Tailwind CSS (tailwindcss, @tailwindcss/vite, tailwind.config.js)
- concurrently, astro-posthog
- Components: TinaEdit, PostEditor, HeroImage, Calendar, StatsGrid, LinkList, RelatedPosts
- OpenSpec workflow files

### What Changes
- React components -> Astro components (no JS shipped to client)
- Tailwind utility classes -> scoped CSS + CSS variables (like studio-website)
- 11 categories + 8 types -> 4 types: statya, zametka, proekt, retsenziya
- Schema simplified (no heroLayout, no relatedPosts manual, no category)
- Dual server (Astro + Tina) -> single Astro server

## Target Architecture

```
/
├── src/
│   ├── components/          # 6 MDX components (Astro, not React)
│   │   ├── Callout.astro
│   │   ├── ImageWide.astro
│   │   ├── VideoEmbed.astro
│   │   ├── TwoColumns.astro
│   │   ├── QuoteBlock.astro
│   │   └── BookCard.astro
│   ├── content/
│   │   ├── posts/           # MDX posts (existing 45)
│   │   └── config.ts        # Simplified schema
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── PostLayout.astro
│   ├── pages/
│   │   ├── index.astro      # Homepage (preserved)
│   │   ├── blog/index.astro # Post listing
│   │   ├── [slug].astro     # Post page (root level)
│   │   ├── tags/[tag].astro
│   │   ├── 404.astro
│   │   └── rss.xml.ts
│   ├── data/
│   │   └── typograf.ts
│   ├── styles/
│   │   └── base.css         # CSS variables, fonts, reset
│   └── utils/
│       └── tags.ts          # Cyrillic transliteration
├── public/
│   ├── fonts/               # Local WOFF2 fonts
│   └── images/
├── astro.config.mjs         # Astro + MDX only
├── package.json             # Minimal dependencies
└── tsconfig.json
```

## Content Schema

```typescript
{
  title: string
  date: Date
  description: string
  type: 'статья' | 'заметка' | 'проект' | 'рецензия'
  tags: string[]
  draft: boolean
  cover?: string
  coverAlt?: string
  rating?: number      // for рецензия
  projectUrl?: string  // for проект
}
```

## Routes

- `/` — Homepage
- `/blog/` — All posts listing
- `/[slug]/` — Post page (root level)
- `/tags/[tag]/` — Posts filtered by tag
- `/rss.xml` — RSS feed

## Style System

- CSS variables in `styles/base.css` for colors, fonts, spacing
- Scoped `<style>` blocks in every .astro component
- Local fonts from /public/fonts/ (WOFF2)
- No CSS framework, no utility classes

## Dependencies (target)

- astro
- @astrojs/mdx
- @astrojs/rss
- @astrojs/sitemap
- @mavrin/remark-typograf
