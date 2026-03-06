## Context

Personal blog site built on Astro 5 with Tina CMS that has become unmaintainable. Reference architecture: studio-website (pure Astro, scoped CSS, minimal dependencies). Goal: achieve similar simplicity while preserving existing content and homepage.

## Goals / Non-Goals

- Goals:
  - Remove all Tina CMS code and dependencies
  - Replace Tailwind with scoped CSS + CSS variables
  - Rewrite React components as Astro components (zero JS shipped)
  - Simplify content schema to 4 post types
  - Single dev server (`npm run dev`)
  - Codebase understandable at a glance

- Non-Goals:
  - Redesigning the homepage (keep current layout)
  - Migrating to a different SSG
  - Adding analytics or external services
  - Creating new internal pages (future work)

## Decisions

- **Astro components over React**: MDX components (Callout, ImageWide, etc.) will be Astro components, not React. This eliminates React dependency entirely and ships zero client-side JS. Trade-off: no interactive components, but none of the 6 components need interactivity.

- **Scoped CSS over Tailwind**: Each `.astro` component uses `<style>` block (auto-scoped by Astro). Global `base.css` provides CSS variables for colors, fonts, spacing. Pattern proven in studio-website.

- **Flat post types over categories**: Replace 11 categories + 8 types with 4 types (статья, заметка, проект, рецензия). Tags handle cross-cutting concerns. Simpler schema, easier to maintain.

- **Root-level post URLs**: Posts at `/[slug]/` (not `/blog/[slug]/`). Blog listing at `/blog/`. Consistent with current behavior.

- **Local fonts**: Download Inter and Lora as WOFF2 to `/public/fonts/`. No external font CDN calls.

## Risks / Trade-offs

- **Content migration**: 45 MDX posts need frontmatter updates (remove category, update type enum, remove Tina-specific fields). Risk: some posts use removed components (StatsGrid, LinkList). Mitigation: audit posts before removing components, convert or simplify affected content.

- **No CMS**: Content editing only via text editor + git. Risk: friction for non-technical editors. Mitigation: this is a personal site, author is technical.

- **No React**: Cannot add interactive components without re-adding React. Mitigation: can add `@astrojs/react` later if needed for specific islands.

## Migration Plan

1. Archive current state in git branch `archive/with-tina`
2. Remove Tina (code, config, dependencies)
3. Remove Tailwind, add scoped CSS system
4. Rewrite components (React → Astro)
5. Simplify content schema and update posts
6. Rebuild blog pages and layouts
7. Clean up unused files
8. Verify build succeeds

## Open Questions

- None — all decisions confirmed during brainstorming session.
