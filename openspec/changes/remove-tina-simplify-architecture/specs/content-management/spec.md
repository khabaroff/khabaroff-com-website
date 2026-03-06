## ADDED Requirements

### Requirement: Content Schema
The system SHALL use Astro Content Collections with a simplified schema for blog posts.

Post frontmatter fields:
- `title` (string, required)
- `date` (Date, required)
- `description` (string, required)
- `type` (enum: статья | заметка | проект | рецензия, required)
- `tags` (string[], default [])
- `draft` (boolean, default false)
- `cover` (string, optional)
- `coverAlt` (string, optional)
- `rating` (number 1-5, optional, for рецензия)
- `projectUrl` (string, optional, for проект)

#### Scenario: Valid post with minimal fields
- **WHEN** a post has title, date, description, and type
- **THEN** the post SHALL be included in the collection

#### Scenario: Draft post excluded from listing
- **WHEN** a post has `draft: true`
- **THEN** the post SHALL NOT appear in blog listing or RSS feed

### Requirement: MDX Components
The system SHALL provide 6 Astro-based MDX components for rich content:

1. `Callout.astro` — info/warning/success alert blocks
2. `ImageWide.astro` — wide images with captions
3. `VideoEmbed.astro` — YouTube/Vimeo embeds
4. `TwoColumns.astro` — two-column layout
5. `QuoteBlock.astro` — styled quotes with author attribution
6. `BookCard.astro` — book review cards with rating

All components SHALL be Astro components (not React) and ship zero client-side JavaScript.

#### Scenario: Callout renders with type
- **WHEN** `<Callout type="warning">Text</Callout>` is used in MDX
- **THEN** a styled alert block with warning styling SHALL render

#### Scenario: VideoEmbed handles YouTube URL
- **WHEN** `<VideoEmbed url="https://youtube.com/watch?v=abc" />` is used
- **THEN** an embedded YouTube player SHALL render

### Requirement: Tag System
The system SHALL support Cyrillic tags with Latin URL slugs via transliteration.

#### Scenario: Cyrillic tag generates URL slug
- **WHEN** a post has tag "продуктивность"
- **THEN** the tag page URL SHALL be `/tags/produktivnost/`
