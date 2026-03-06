## ADDED Requirements

### Requirement: Routing
The system SHALL provide the following routes:

- `/` — Homepage
- `/blog/` — Blog listing (all non-draft posts, sorted by date descending)
- `/[slug]/` — Individual post page (root-level URLs)
- `/tags/[tag]/` — Posts filtered by tag
- `/rss.xml` — RSS feed
- `/404` — Error page

#### Scenario: Post accessible at root URL
- **WHEN** a post with slug "my-article" exists
- **THEN** it SHALL be accessible at `/my-article/`

#### Scenario: Blog listing shows all posts
- **WHEN** user visits `/blog/`
- **THEN** all non-draft posts SHALL be listed sorted by date descending

### Requirement: Layouts
The system SHALL provide two layouts:

1. `BaseLayout.astro` — root HTML with meta tags, fonts, CSS variables
2. `PostLayout.astro` — extends BaseLayout with blog-specific header/footer

#### Scenario: Base layout provides SEO meta
- **WHEN** a page renders with BaseLayout
- **THEN** title, description, OG tags, and canonical URL SHALL be present

### Requirement: RSS Feed
The system SHALL generate an RSS feed at `/rss.xml` with all non-draft posts.

#### Scenario: RSS contains all published posts
- **WHEN** `/rss.xml` is requested
- **THEN** all non-draft posts SHALL be included with title, date, description, and link

### Requirement: Single Dev Server
The system SHALL run with a single `npm run dev` command (Astro only, no Tina server).

#### Scenario: Development startup
- **WHEN** `npm run dev` is executed
- **THEN** the site SHALL be available at localhost without additional processes
