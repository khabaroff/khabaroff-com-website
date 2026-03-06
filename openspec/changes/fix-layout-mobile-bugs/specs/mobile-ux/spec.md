## ADDED Requirements

### Requirement: Navigation Tap Targets
All interactive navigation elements (links, buttons) in the site header SHALL have a minimum tap target size of 44x44px on viewports below 768px, per Apple HIG and Google Material guidelines.

#### Scenario: Nav links have adequate tap area on mobile
- **WHEN** a user views the site on a mobile device (viewport < 768px)
- **THEN** each `.nav-link` element SHALL have a minimum tappable area of 44x44px achieved through padding

#### Scenario: Nav CTA button has adequate tap area
- **WHEN** a user views the site on a mobile device
- **THEN** the `.nav-cta` button SHALL have a minimum height of 44px

### Requirement: Testimonials Scroll Behavior
The testimonials horizontal scroll section on the homepage SHALL provide a polished touch scrolling experience on mobile devices.

#### Scenario: Cards snap to position
- **WHEN** a user swipes horizontally through testimonials on a touch device
- **THEN** the scroll SHALL snap to align each card cleanly (using CSS scroll-snap)

#### Scenario: Scrollbar is hidden
- **WHEN** testimonials section is displayed on any device
- **THEN** the native scrollbar SHALL be visually hidden while scroll functionality is preserved

#### Scenario: Dot indicators are visually aligned
- **WHEN** the testimonial dots are displayed
- **THEN** all dots (active and inactive) SHALL be vertically centered with each other

### Requirement: Hero Title Responsive Line Breaks
The hero section title on the homepage SHALL adapt line breaks to viewport width rather than using hardcoded `<br>` tags that cause uneven lines on narrow screens.

#### Scenario: Hero title wraps naturally on mobile
- **WHEN** a user views the homepage on a viewport narrower than 768px
- **THEN** the hero title SHALL wrap naturally based on available width without forced `<br>` breaks

#### Scenario: Hero title preserves intended breaks on desktop
- **WHEN** a user views the homepage on a viewport wider than 1024px
- **THEN** the hero title MAY display with the intended line breaks for visual effect
