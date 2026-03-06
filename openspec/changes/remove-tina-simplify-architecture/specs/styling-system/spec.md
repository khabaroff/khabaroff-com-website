## ADDED Requirements

### Requirement: CSS Architecture
The system SHALL use scoped CSS with CSS custom properties. No CSS framework (Tailwind, etc.) SHALL be used.

- Global `base.css` provides CSS variables, font-face declarations, and reset
- Each `.astro` component uses scoped `<style>` blocks
- No utility classes

#### Scenario: Component styles are scoped
- **WHEN** a component defines styles in its `<style>` block
- **THEN** styles SHALL not leak to other components

#### Scenario: CSS variables available globally
- **WHEN** any component references `var(--color-primary)`
- **THEN** the value `#2F4760` SHALL be applied

### Requirement: Design Tokens
The system SHALL define the following CSS custom properties in `base.css`:

Colors:
- `--color-primary`: #2F4760
- `--color-accent-green`: #A6BDA3
- `--color-accent-yellow`: #F7D174
- `--color-text`: #1a1a1a
- `--color-text-secondary`: #444444
- `--color-text-muted`: #777777
- `--color-border`: #e5e5e5
- `--color-background`: #fafafa

Fonts:
- `--font-display`: 'Lora', serif
- `--font-body`: 'Inter', sans-serif

Spacing:
- `--space-xs` through `--space-xl`

#### Scenario: Consistent theming
- **WHEN** the color scheme needs to change
- **THEN** updating CSS variables in `base.css` SHALL propagate to all components

### Requirement: Local Fonts
The system SHALL load fonts from `/public/fonts/` as WOFF2 files. No external font CDN calls.

#### Scenario: Fonts load without external requests
- **WHEN** a page loads
- **THEN** Inter and Lora fonts SHALL load from local WOFF2 files
