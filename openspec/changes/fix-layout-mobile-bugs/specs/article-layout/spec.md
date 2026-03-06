## ADDED Requirements

### Requirement: Prose Content Centering
The article prose content (`.prose`, max-width: 720px) on post pages SHALL be horizontally centered within the container, not left-aligned.

#### Scenario: Prose is centered on desktop
- **WHEN** a user views an article on a viewport wider than 1024px
- **THEN** the `.prose` block SHALL be horizontally centered with equal margins on both sides

#### Scenario: Prose fills width on mobile
- **WHEN** a user views an article on a viewport narrower than 768px
- **THEN** the `.prose` block SHALL fill the available container width (minus padding)

### Requirement: Prose Overflow Protection
The article prose content SHALL prevent horizontal page scroll caused by long unbreakable strings (URLs, code, filenames).

#### Scenario: Long words wrap instead of overflowing
- **WHEN** an article contains a long unbreakable string (URL, filename, inline code)
- **THEN** the string SHALL wrap to the next line rather than causing horizontal scroll on the page

### Requirement: ImageWide Breakout
The `ImageWide` component SHALL visually extend beyond the prose max-width to create a wider visual impact, justifying its name.

#### Scenario: ImageWide is wider than prose text
- **WHEN** an `ImageWide` component is rendered inside an article
- **THEN** the image SHALL extend beyond the `.prose` max-width boundaries using negative margins or viewport-relative sizing

#### Scenario: ImageWide does not cause horizontal scroll
- **WHEN** an `ImageWide` component is rendered on any viewport
- **THEN** the image SHALL NOT cause horizontal page scrolling
