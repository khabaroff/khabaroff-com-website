## 1. Footer Accessibility (Critical)
- [ ] 1.1 Add `--color-footer-text` CSS variable (~#999 or #a0a0a0, ratio ≥4.5:1 on #1a1a1a) to `global.css`
- [ ] 1.2 Update `PostLayout.astro` footer: `.footer p` use new footer text color
- [ ] 1.3 Update `index.astro` footer: `.footer-bottom p`, `.footer-tagline`, `.footer-heading` use new footer text color
- [ ] 1.4 Verify contrast ratio of all footer text elements ≥4.5:1

## 2. 404 Navigation (High)
- [ ] 2.1 Change `404.astro` to use `PostLayout` instead of `BaseLayout`
- [ ] 2.2 Verify 404 page renders with header, nav, and footer
- [ ] 2.3 Verify all nav links work from 404 page

## 3. Mobile Tap Targets (High)
- [ ] 3.1 Add padding to `.nav-link` in `PostLayout.astro` for 44px min tap area
- [ ] 3.2 Add padding to `.nav-link` in `index.astro` header for 44px min tap area
- [ ] 3.3 Ensure `.nav-cta` has min-height 44px in both layouts
- [ ] 3.4 Verify visual spacing remains clean after padding changes

## 4. Testimonials Scroll (Medium)
- [ ] 4.1 Add `scroll-snap-type: x mandatory` to `.testimonials-scroll`
- [ ] 4.2 Add `scroll-snap-align: center` to `.testimonial` cards
- [ ] 4.3 Hide scrollbar with `scrollbar-width: none` and `::-webkit-scrollbar { display: none }`
- [ ] 4.4 Add `align-items: center` to `.testimonials-dots` to fix dot alignment

## 5. Hero Title Line Breaks (Medium)
- [ ] 5.1 Remove `<br>` tags from hero title in `index.astro`
- [ ] 5.2 Add CSS to control line breaks on desktop (e.g., `max-width` or `<span>` with `display: block` at breakpoint)
- [ ] 5.3 Verify title wraps naturally on 320px-375px viewports

## 6. Article Prose Layout (Medium)
- [ ] 6.1 Add `margin: 0 auto` to `.prose` in `[slug].astro`
- [ ] 6.2 Add `overflow-wrap: break-word` to `.prose`
- [ ] 6.3 Verify centering on desktop and full-width on mobile

## 7. ImageWide Breakout (Medium)
- [ ] 7.1 Add negative margin + calc-based width to `ImageWide.astro` for breakout effect
- [ ] 7.2 Add `overflow: hidden` safeguard to prevent horizontal scroll
- [ ] 7.3 Verify breakout looks correct within `.prose` container on desktop and mobile

## 8. Homepage Cleanup (Low)
- [ ] 8.1 Remove `min-height: 450px` from `.writing-grid` media query in `index.astro`
- [ ] 8.2 Replace inline `style` on contact button with CSS class `.btn-inline`
- [ ] 8.3 Build project and verify no regressions
