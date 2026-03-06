## 1. Preparation
- [ ] 1.1 Create archive branch `archive/with-tina` from current state
- [ ] 1.2 Audit MDX posts for usage of components being removed (StatsGrid, LinkList, Calendar, HeroImage)

## 2. Remove Tina CMS
- [ ] 2.1 Delete `tina/` directory entirely
- [ ] 2.2 Delete `src/lib/tina.ts`
- [ ] 2.3 Delete `public/admin/` directory
- [ ] 2.4 Remove Tina-specific components: TinaEdit.tsx, PostEditor.tsx
- [ ] 2.5 Remove tinacms and @tinacms/cli from package.json
- [ ] 2.6 Remove concurrently from package.json
- [ ] 2.7 Update npm scripts (remove tinacms, cms commands; simplify dev)

## 3. Remove React
- [ ] 3.1 Remove @astrojs/react, react, react-dom from package.json
- [ ] 3.2 Remove React integration from astro.config.mjs

## 4. Remove Tailwind, Add Scoped CSS
- [ ] 4.1 Remove tailwindcss, @tailwindcss/vite from package.json
- [ ] 4.2 Delete tailwind.config.js
- [ ] 4.3 Remove Tailwind vite plugin from astro.config.mjs
- [ ] 4.4 Download Inter and Lora WOFF2 fonts to public/fonts/
- [ ] 4.5 Create src/styles/base.css with CSS variables, font-face, reset
- [ ] 4.6 Delete old src/styles/global.css

## 5. Rewrite Components (React → Astro)
- [ ] 5.1 Rewrite Callout.tsx → Callout.astro
- [ ] 5.2 Rewrite ImageWide.tsx → ImageWide.astro
- [ ] 5.3 Rewrite VideoEmbed.tsx → VideoEmbed.astro
- [ ] 5.4 Rewrite TwoColumns.tsx → TwoColumns.astro
- [ ] 5.5 Rewrite QuoteBlock.tsx → QuoteBlock.astro
- [ ] 5.6 Rewrite BookCard.tsx → BookCard.astro
- [ ] 5.7 Delete removed components: HeroImage.tsx, Calendar.tsx, StatsGrid.tsx, LinkList.tsx, RelatedPosts.astro, PostHeader.tsx
- [ ] 5.8 Delete old .tsx files for rewritten components

## 6. Simplify Content Schema
- [ ] 6.1 Rewrite src/content/config.ts with new simplified schema
- [ ] 6.2 Update frontmatter in all 45 MDX posts (remove category, update type, remove heroLayout, remove relatedPosts)
- [ ] 6.3 Remove src/utils/categories.ts (no longer needed)

## 7. Rebuild Pages and Layouts
- [ ] 7.1 Update BaseLayout.astro (remove Tailwind classes, use scoped CSS, local fonts)
- [ ] 7.2 Create PostLayout.astro
- [ ] 7.3 Update index.astro homepage (Tailwind → scoped CSS)
- [ ] 7.4 Rewrite [slug].astro post page (simplify, remove Tina/React refs, scoped CSS)
- [ ] 7.5 Rewrite blog/index.astro listing page (scoped CSS)
- [ ] 7.6 Rewrite tags/[tag].astro page (scoped CSS)
- [ ] 7.7 Add 404.astro page
- [ ] 7.8 Add rss.xml.ts RSS feed

## 8. Configuration
- [ ] 8.1 Simplify astro.config.mjs (MDX + sitemap + rss + typograf only)
- [ ] 8.2 Add @astrojs/rss, @astrojs/sitemap, @mavrin/remark-typograf to package.json
- [ ] 8.3 Remove astro-posthog from package.json
- [ ] 8.4 Update CLAUDE.md to reflect new architecture
- [ ] 8.5 npm install and verify clean dependency tree

## 9. Cleanup and Verification
- [ ] 9.1 Delete unused files: public/preview-button.js, public/preview.html, test-preview.html, tina-preview.user.js, GUIDE.md, AGENTS.md (root)
- [ ] 9.2 Clean up .gitignore (remove Tina entries)
- [ ] 9.3 Run `npm run build` — verify successful static build
- [ ] 9.4 Run `npm run dev` — verify site works with single server
- [ ] 9.5 Spot-check: homepage renders correctly
- [ ] 9.6 Spot-check: blog listing shows posts
- [ ] 9.7 Spot-check: individual post renders with MDX components
- [ ] 9.8 Commit all changes
