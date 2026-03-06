## 1. Footer Accessibility (Critical)
- [x] 1.1 Add `--color-footer-text` CSS variable (#999999, ratio ~4.93:1 on #1a1a1a) to `global.css`
- [x] 1.2 Update `PostLayout.astro` footer: `.footer p` use new footer text color
- [x] 1.3 Update `index.astro` footer: `.footer-bottom p`, `.footer-tagline`, `.footer-heading` use new footer text color
- [x] 1.4 Verify contrast ratio of all footer text elements ≥4.5:1

## 2. 404 Navigation (High)
- [x] 2.1 Change `404.astro` to use `PostLayout` instead of `BaseLayout`
- [x] 2.2 Verify 404 page renders with header, nav, and footer
- [x] 2.3 Verify all nav links work from 404 page

## 3. Mobile Tap Targets (High)
- [x] 3.1 Add padding to `.nav-link` in `PostLayout.astro` for 44px min tap area
- [x] 3.2 Add padding to `.nav-link` in `index.astro` header for 44px min tap area
- [x] 3.3 Ensure `.nav-cta` has min-height 44px in both layouts
- [x] 3.4 Verify visual spacing remains clean after padding changes

## 4. Testimonials Scroll (Medium)
- [x] 4.1 Add `scroll-snap-type: x mandatory` to `.testimonials-scroll`
- [x] 4.2 Add `scroll-snap-align: center` to `.testimonial` cards
- [x] 4.3 Hide scrollbar with `scrollbar-width: none` and `::-webkit-scrollbar { display: none }`
- [x] 4.4 Add `align-items: center` to `.testimonials-dots` to fix dot alignment

## 5. Hero Title Line Breaks (Medium)
- [x] 5.1 Remove `<br>` tags from hero title in `index.astro`
- [x] 5.2 Add CSS to control line breaks on desktop (`<span class="hero-line">` with `display: block` at ≥1024px)
- [x] 5.3 Verify title wraps naturally on 320px-375px viewports

## 6. Article Prose Layout (Medium)
- [x] 6.1 Add `margin: 0 auto` to `.prose` in `[slug].astro`
- [x] 6.2 Add `overflow-wrap: break-word` to `.prose`
- [x] 6.3 Verify centering on desktop and full-width on mobile

## 7. ImageWide Breakout (Medium)
- [x] 7.1 Add negative margin (-80px) breakout at ≥1200px to `ImageWide.astro`
- [x] 7.2 `.image-wrap` already has `overflow: hidden` — no horizontal scroll risk
- [x] 7.3 Breakout activates only at 1200px+ where container has enough space

## 8. Homepage Cleanup (Low)
- [x] 8.1 Remove `min-height: 450px` from `.writing-grid` media query in `index.astro`
- [x] 8.2 Replace inline `style` on contact button with CSS class `.btn-inline`
- [x] 8.3 Build project and verify no regressions — 106 pages, 0 errors
