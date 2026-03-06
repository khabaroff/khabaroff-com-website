<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Персональный сайт и блог на Astro 5 с MDX-контентом, scoped CSS и локальными шрифтами. Нет CMS, нет React, нет Tailwind, нет клиентского JS. Один dev-сервер, минимум зависимостей (4 пакета).

## Development Commands

```bash
npm install          # Установка зависимостей
npm run dev          # Dev-сервер на http://localhost:4321
npm run build        # Production сборка
npm run preview      # Превью сборки
```

## Architecture

### Content Collections

- Схема в `src/content/config.ts` (Zod validation)
- 4 типа постов: статья, заметка, проект, рецензия
- MDX файлы в `src/content/posts/`
- Валидация при сборке через `getCollection('posts')`

### Layouts

- `BaseLayout.astro` — минимальный layout (head, slot). Используется на главной
- `PostLayout.astro` — layout с header и footer. Используется на страницах блога

### MDX Components

6 Astro-компонентов в `src/components/`:

- `Callout.astro` — info/warning/success блоки
- `ImageWide.astro` — широкие изображения с подписью
- `VideoEmbed.astro` — YouTube/Vimeo embed
- `TwoColumns.astro` — двухколоночная вёрстка
- `QuoteBlock.astro` — цитаты (default/large/pullout)
- `BookCard.astro` — карточка книги с рейтингом

Компоненты передаются в MDX через `<Content components={...} />` в `src/pages/[slug].astro`.

### Styling

- **Scoped CSS** в каждом `.astro` файле через `<style>`
- **CSS custom properties** в `src/styles/global.css` (цвета, шрифты, отступы)
- **Локальные WOFF2 шрифты**: Inter (400/500/600), Lora (400/500) в `public/fonts/`
- Импорт глобальных стилей: `<style is:global>@import '../styles/global.css';</style>` в layouts

### Routes

- `/` — главная (`src/pages/index.astro`)
- `/blog/` — список постов (`src/pages/blog/index.astro`)
- `/[slug]/` — страница поста (`src/pages/[slug].astro`)
- `/tags/[tag]/` — фильтр по тегу (`src/pages/tags/[tag].astro`)
- `/rss.xml` — RSS фид
- `/404` — страница ошибки

### Key Patterns

**Кириллические теги**: `src/utils/tags.ts` транслитерирует русские теги в URL-safe слаги (управление → upravlenie).

**Фильтрация черновиков**: Посты с `draft: true` исключаются из списков и RSS. Фильтр: `posts.filter(p => !p.data.draft)`.

**Сортировка**: По дате, от новых к старым: `.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())`.

### Directory Structure

```
src/
├── content/
│   ├── posts/           # MDX файлы постов
│   └── config.ts        # Zod-схема контента
├── components/          # 6 Astro MDX-компонентов
├── layouts/             # BaseLayout, PostLayout
├── pages/               # Роуты (index, [slug], blog, tags, rss, 404)
├── styles/
│   └── global.css       # CSS variables, @font-face, reset
└── utils/
    └── tags.ts          # Транслитерация тегов
public/
├── fonts/               # WOFF2 (Inter, Lora)
└── images/              # Статика
```

## OpenSpec Workflow

This project uses OpenSpec for spec-driven development. See `openspec/AGENTS.md` for details.

```bash
openspec list                  # Активные proposals
openspec list --specs          # Все спецификации
openspec validate [change] --strict --no-interactive
```

Create proposals for new features, breaking changes, architecture shifts. Skip for bug fixes, typos, dependency updates.

## Important Notes

- Нет CMS — контент редактируется напрямую в MDX файлах
- Нет клиентского JS — все компоненты серверные (Astro)
- Один процесс для разработки: `npm run dev`
- Шрифты локальные, не CDN — preload в layouts
