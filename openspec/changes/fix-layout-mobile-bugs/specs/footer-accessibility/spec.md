## ADDED Requirements

### Requirement: Footer Text Contrast
Footer text on dark background (`--color-dark: #1a1a1a`) SHALL have a contrast ratio of at least 4.5:1 per WCAG 2.1 AA standard for normal text.

All footer text elements — copyright, location, tagline, headings, and links — MUST use colors that meet this threshold against the dark background.

#### Scenario: PostLayout footer text is readable
- **WHEN** a user views any page using PostLayout (blog, tags, article)
- **THEN** footer text (`<p>` elements) SHALL use a color with contrast ratio ≥4.5:1 against `--color-dark`

#### Scenario: Homepage footer text is readable
- **WHEN** a user views the homepage
- **THEN** all footer text (`.footer-bottom p`, `.footer-tagline`, `.footer-heading`) SHALL use a color with contrast ratio ≥4.5:1 against `--color-dark`

#### Scenario: Footer links are distinguishable
- **WHEN** a user views footer links (`.footer-link`)
- **THEN** link color SHALL have contrast ratio ≥4.5:1 against `--color-dark` in both default and hover states
