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

Локальный блог на базе Astro 5 с Git-based CMS Tina для визуального редактирования контента. Проект демонстрирует интеграцию визуального редактора Tina с современным SSG Astro и поддержкой кастомных MDX-компонентов для гибкой вёрстки контента.

## OpenSpec Workflow

This project uses OpenSpec for spec-driven development. Always check `@/openspec/AGENTS.md` when working with proposals, specs, or planning changes.

### Key Commands

```bash
# View active changes and specs
openspec list                  # List active change proposals
openspec list --specs          # List all specifications
openspec show [item]           # View change or spec details

# Create and validate proposals
openspec validate [change] --strict --no-interactive  # Validate changes
openspec archive <change-id> --yes  # Archive completed change

# Project context
# Edit openspec/project.md to add project-specific context
```

### When to Create Proposals

Create OpenSpec change proposal for:

- New features or capabilities
- Breaking changes (API, schema, architecture)
- Performance/security work that changes behavior

Skip proposals for:

- Bug fixes (restoring intended behavior)
- Typos, formatting, comments
- Dependency updates (non-breaking)

See `openspec/AGENTS.md` for complete workflow details.

## Development Commands

### Setup

```bash
npm install -g @fission-ai/openspec@latest
npm install
```

### Build & Run

```bash
# Запуск Astro dev сервера
npm run dev

# Запуск Tina CMS в отдельном терминале
npx tinacms dev

# После запуска обоих серверов:
# - Сайт доступен на http://localhost:4321
# - Tina админ панель на http://localhost:4321/admin
```

### Build

```bash
# Сборка для продакшена
npm run build

# Превью продакшен сборки
npm run preview
```

## Architecture

### Git-based CMS Workflow

Tina CMS работает напрямую с файловой системой:

1. **Редактирование**: Tina предоставляет визуальный редактор на `/admin`
2. **Сохранение**: Изменения записываются в `.mdx` файлы в `src/content/posts/`
3. **Рендеринг**: Astro читает эти файлы и генерирует HTML
4. **Git**: Все изменения коммитятся в репозиторий (Git-based workflow)

### Content Collections

Проект использует Astro Content Collections для типизированного контента:

- Схема контента определяется в `src/content/config.ts`
- Tina схема в `tina/config.ts` должна соответствовать Astro схеме
- MDX файлы валидируются на соответствие схеме при сборке

### MDX Components

Кастомные компоненты импортируются глобально через `mdx.config.js`:

- `<TwoColumns>` - двухколоночная вёрстка
- `<ImageWide>` - широкие изображения
- `<Callout>` - выделенные блоки текста

Компоненты доступны в Tina через блочный редактор (blocks).

### Key Patterns

**Tina Schema ↔ Astro Schema Sync**: Схемы контента в Tina и Astro должны быть синхронизированы. Изменения в одной требуют обновления другой.

**MDX Component Registration**: Все MDX компоненты должны быть:
1. Зарегистрированы в `mdx.config.js`
2. Добавлены в Tina schema как блоки
3. Типизированы в Astro content config

**Local-First Development**: Проект работает полностью локально без внешних сервисов. Tina в локальном режиме, контент в файлах.

### Directory Structure

```
/
├── src/
│   ├── content/
│   │   ├── posts/          # MDX файлы постов (редактируются через Tina)
│   │   └── config.ts       # Схема контента для Astro
│   ├── components/         # React компоненты для MDX
│   ├── pages/
│   │   ├── index.astro     # Главная со списком постов
│   │   ├── posts/[slug].astro  # Страница поста
│   │   └── tags/[tag].astro    # Страница тега
│   └── layouts/            # Layouts для страниц
├── tina/
│   └── config.ts           # Конфигурация и схема Tina CMS
└── public/                 # Статические файлы (изображения)
```

## Important Notes

### Запуск двух серверов

Для полноценной работы нужно запустить **два процесса одновременно**:
1. `npm run dev` - Astro dev сервер
2. `npx tinacms dev` - Tina CMS сервер

Без второго процесса админ панель `/admin` не будет работать.

### Фронтматтер и Tina

Все поля в фронтматтере MDX файлов должны быть определены в Tina schema. Ручное редактирование фронтматтера возможно, но Tina может его перезаписать.

### Типы и валидация

- Astro валидирует контент при импорте через `getCollection()`
- Tina валидирует при редактировании в админке
- TypeScript типы генерируются Tina автоматически при запуске `tinacms dev`
