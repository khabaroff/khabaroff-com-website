# Change: Fix layout and mobile responsiveness bugs

## Why

Аудит вёрстки выявил 10 проблем: критический провал контраста в футере (WCAG AA fail), отсутствие навигации на 404, слишком маленькие tap targets на мобильных, сломанный scroll UX в отзывах, нецентрированный контент статей и другие дефекты. Проблемы затрагивают accessibility, мобильную юзабельность и визуальную аккуратность на десктопе.

## What Changes

### Критические
- Исправить контраст текста в футере: `--color-text-secondary` (#666) на `--color-dark` (#1a1a1a) фоне — ratio 2.6:1, нужно ≥4.5:1
- Добавить header/footer навигацию на страницу 404

### Высокий приоритет
- Увеличить tap targets для навигационных ссылок на мобильных (минимум 44px)

### Средний приоритет
- Testimonials: добавить scroll-snap, скрыть scrollbar, выровнять dots
- Убрать `<br>` из hero-заголовка, заменить на CSS-управление переносами
- ImageWide: добавить breakout-механизм для выхода за `.prose` max-width
- Центрировать `.prose` контент на страницах статей (`margin: 0 auto`)

### Низкий приоритет
- Добавить `overflow-wrap: break-word` в `.prose`
- Убрать `min-height: 450px` с `.writing-grid`
- Заменить inline style на класс в секции контакта

## Impact
- Affected specs: footer-accessibility, navigation-404, mobile-ux, article-layout, homepage-layout
- Affected code:
  - `src/layouts/PostLayout.astro` — футер, nav tap targets
  - `src/pages/index.astro` — hero, testimonials, writing-grid, contact, footer
  - `src/pages/[slug].astro` — prose centering, overflow-wrap
  - `src/pages/404.astro` — добавить PostLayout
  - `src/components/ImageWide.astro` — breakout styling
  - `src/styles/global.css` — возможно новые CSS variables для footer
