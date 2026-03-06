## ADDED Requirements

### Requirement: Writing Grid Natural Height
The writing grid section on the homepage SHALL size based on content height without artificial minimum height constraints.

#### Scenario: Writing cards size to content
- **WHEN** the writing grid is displayed on viewports ≥768px
- **THEN** the grid SHALL NOT have a `min-height` that forces empty space below card content

### Requirement: Contact Button Styling
The contact section CTA button SHALL use class-based styling without inline styles for maintainability.

#### Scenario: Button uses CSS class only
- **WHEN** the contact "Написать" button is rendered
- **THEN** the button SHALL achieve its layout (inline-block, fit-content width) through a CSS class, not inline `style` attribute
