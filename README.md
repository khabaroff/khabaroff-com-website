# khabaroff.com

Персональный сайт и блог Сергея Хабарова. Astro 5, MDX, scoped CSS, локальные шрифты. Без CMS, без фреймворков, без клиентского JS.

## Стек

- **Astro 5** — SSG с Content Collections
- **MDX** — Markdown + Astro-компоненты
- **Scoped CSS** — CSS custom properties, без Tailwind
- **Локальные шрифты** — Inter + Lora (WOFF2)

## Быстрый старт

```bash
npm install
npm run dev
```

Сайт на [http://localhost:4321](http://localhost:4321).

```bash
npm run build    # Production сборка
npm run preview  # Превью сборки
```

## Структура

```
src/
├── content/
│   ├── posts/           # MDX файлы постов
│   └── config.ts        # Схема контента (Zod)
├── components/          # Astro-компоненты для MDX
│   ├── Callout.astro
│   ├── ImageWide.astro
│   ├── VideoEmbed.astro
│   ├── TwoColumns.astro
│   ├── QuoteBlock.astro
│   └── BookCard.astro
├── layouts/
│   ├── BaseLayout.astro # Базовый layout (главная)
│   └── PostLayout.astro # Layout для блога (header + footer)
├── pages/
│   ├── index.astro      # Главная
│   ├── [slug].astro     # Страница поста
│   ├── blog/index.astro # Список постов
│   ├── tags/[tag].astro # Фильтр по тегу
│   ├── rss.xml.ts       # RSS фид
│   └── 404.astro        # Страница ошибки
├── styles/
│   └── global.css       # CSS variables, шрифты, reset
└── utils/
    └── tags.ts          # Транслитерация тегов для URL
public/
├── fonts/               # WOFF2 шрифты (Inter, Lora)
└── images/              # Статические изображения
```

## Контент

### Типы постов

| Тип | Назначение |
|-----|-----------|
| `статья` | Лонгриды, гайды, обзоры |
| `заметка` | Короткие мысли, заметки |
| `проект` | Описание проектов |
| `рецензия` | Рецензии на книги |

### Frontmatter

```mdx
---
title: "Заголовок"
date: 2026-01-25
type: статья
tags: ["тег1", "тег2"]
description: "Описание"
draft: false
cover: "/images/cover.jpg"
coverAlt: "Описание обложки"
rating: 4          # Только для рецензий (1-5)
projectUrl: "..."  # Только для проектов
---
```

### MDX-компоненты

```mdx
<Callout type="info">Текст</Callout>          <!-- info | warning | success -->
<ImageWide src="/images/pic.jpg" alt="..." caption="Подпись" />
<VideoEmbed url="https://youtube.com/watch?v=..." />
<TwoColumns>
  <div>Левая</div>
  <div>Правая</div>
</TwoColumns>
<QuoteBlock variant="large" author="Автор">Цитата</QuoteBlock>
<BookCard title="Книга" author="Автор" rating={4} />
```

## Роуты

- `/` — главная
- `/blog/` — список постов
- `/[slug]/` — страница поста
- `/tags/[tag]/` — посты по тегу
- `/rss.xml` — RSS фид

## Добавление нового MDX-компонента

1. Создать `src/components/MyComponent.astro`
2. Импортировать в `src/pages/[slug].astro` и передать в `<Content components={...} />`

## Лицензия

MIT
