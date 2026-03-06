## ADDED Requirements

### Requirement: 404 Page Navigation
The 404 error page SHALL include site header with logo and navigation links, and site footer, consistent with other inner pages (PostLayout).

Users who land on a non-existent URL MUST be able to navigate to any main section of the site without relying solely on browser back button.

#### Scenario: 404 page has header navigation
- **WHEN** a user navigates to a non-existent URL
- **THEN** the page SHALL display the site header with logo ("Сергей Хабаров"), navigation links ("Главная", "Блог"), and CTA button ("Написать")

#### Scenario: 404 page has footer
- **WHEN** a user views the 404 page
- **THEN** the page SHALL display the site footer with copyright, location, and navigation links, matching PostLayout footer
