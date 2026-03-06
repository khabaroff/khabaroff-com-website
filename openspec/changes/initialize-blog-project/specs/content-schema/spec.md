# Spec: Content Schema

## ADDED Requirements

### Requirement: Post Schema Definition

Post content SHALL have a clearly defined structure with validation.

#### Scenario: Valid post frontmatter

```gherkin
GIVEN MDX файл с frontmatter:
  """
  title: "My Post"
  date: 2026-01-24T12:00:00.000Z
  tags: ["astro", "blog"]
  description: "Post description"
  draft: false
  """
WHEN Astro валидирует контент
THEN валидация проходит успешно
AND пост доступен через getCollection('posts')
```

#### Scenario: Missing required field

```gherkin
GIVEN MDX файл без поля title в frontmatter
WHEN Astro пытается обработать файл
THEN возникает ошибка валидации
AND build/dev процесс останавливается
AND показывается сообщение о missing required field
```

#### Scenario: Invalid date format

```gherkin
GIVEN frontmatter с date: "not-a-date"
WHEN Astro валидирует контент
THEN возникает ошибка валидации
AND указывается что date должна быть в ISO 8601 формате
```

#### Scenario: Optional fields

```gherkin
GIVEN frontmatter без поля description
WHEN Astro валидирует контент
THEN валидация проходит (description опциональное)
AND getCollection возвращает post с description = undefined
```

### Requirement: Schema Synchronization

Astro Content Collections schema and Tina schema SHALL be synchronized.

#### Scenario: Field types match

```gherkin
GIVEN Astro schema определяет date как z.date()
AND Tina schema определяет date как type: 'datetime'
WHEN пост создаётся через Tina
THEN date сохраняется в ISO 8601 формате
AND Astro корректно парсит это значение
```

#### Scenario: Required fields consistency

```gherkin
GIVEN в Astro schema title является required (z.string())
AND в Tina schema title имеет required: true
WHEN пользователь пытается сохранить пост без title в Tina
THEN Tina показывает ошибку валидации
AND файл не сохраняется
```

### Requirement: TypeScript Types Generation

TypeScript types for content SHALL be generated automatically.

#### Scenario: Content collection types available

```gherkin
GIVEN определена schema для posts collection
WHEN разработчик импортирует getCollection в .astro файле
THEN TypeScript знает структуру возвращаемых posts
AND предоставляет autocomplete для post.data.title
AND показывает ошибку при обращении к несуществующему полю
```

#### Scenario: Tina types generation

```gherkin
GIVEN запущен npx tinacms dev
WHEN Tina обрабатывает конфигурацию
THEN генерируются типы в .tina/__generated__/types.ts
AND типы доступны для import в tina/config.ts
```

### Requirement: Content Validation in Development

Validation errors SHALL be visible during development.

#### Scenario: Dev server validation

```gherkin
GIVEN запущен npm run dev
AND разработчик редактирует MDX файл
AND добавляет невалидное поле в frontmatter
WHEN сохраняет файл
THEN в терминале отображается ошибка валидации
AND browser dev tools показывают ошибку
AND указан конкретный файл с проблемой
```

## Schema Specification

### Astro Content Collections Schema

**Location:** `src/content/config.ts`

**Schema:**
```typescript
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).default([]),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
```

### Tina CMS Schema

**Location:** `tina/config.ts`

**Schema:**
```typescript
{
  name: 'post',
  label: 'Posts',
  path: 'src/content/posts',
  format: 'mdx',
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Title',
      required: true,
    },
    {
      type: 'datetime',
      name: 'date',
      label: 'Date',
      required: true,
    },
    {
      type: 'string',
      name: 'tags',
      label: 'Tags',
      list: true,
    },
    {
      type: 'string',
      name: 'description',
      label: 'Description',
      ui: {
        component: 'textarea',
      },
    },
    {
      type: 'boolean',
      name: 'draft',
      label: 'Draft',
    },
    {
      type: 'rich-text',
      name: 'body',
      label: 'Body',
      isBody: true,
      templates: [
        // Custom blocks: TwoColumns, ImageWide, Callout
      ],
    },
  ],
}
```

## Field Specifications

### title

- **Type:** string
- **Required:** yes
- **Purpose:** Заголовок поста
- **Validation:** Min 1 character
- **Used in:** Page title, post list, SEO

### date

- **Type:** datetime
- **Required:** yes
- **Format:** ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)
- **Purpose:** Дата публикации
- **Used in:** Sorting, display formatting

### tags

- **Type:** string[]
- **Required:** no
- **Default:** []
- **Purpose:** Категоризация постов
- **Used in:** Tag filtering, tag pages
- **Constraints:** Lowercase, kebab-case preferred

### description

- **Type:** string
- **Required:** no
- **Purpose:** Краткое описание для превью и SEO
- **Used in:** Meta description, post list preview
- **Max length:** 160 characters (recommended)

### draft

- **Type:** boolean
- **Required:** no
- **Default:** false
- **Purpose:** Скрыть пост из production
- **Used in:** Build filtering, conditional rendering

### body

- **Type:** rich-text (MDX)
- **Required:** yes (by Tina)
- **Purpose:** Основной контент поста
- **Supports:** Markdown, custom MDX components

## Type Mapping

**Astro → Tina:**

| Astro Type | Tina Type | Notes |
|------------|-----------|-------|
| z.string() | 'string' | Direct mapping |
| z.date() | 'datetime' | ISO format |
| z.array(z.string()) | list: true | Array handling |
| z.boolean() | 'boolean' | Direct mapping |
| z.optional() | required: false | Implicit |
| .default(val) | default: val | Default values |

## Dependencies

**External:**
- `astro:content` - Content Collections API
- `zod` - Schema validation (built into Astro)

**Internal:**
- Используется в `content-pages` (data fetching)
- Используется в `tina-cms-integration` (schema definition)

## Validation Error Messages

**Clear error format:**
```
[Content Collections] Error in src/content/posts/example.mdx:
  - title: Required
  - date: Expected ISO 8601 date, received "invalid"
```

## Sample Post File

```mdx
---
title: "Как интегрировать Tina CMS с Astro"
date: 2026-01-24T12:00:00.000Z
tags: ["astro", "tina", "cms"]
description: "Пошаговое руководство по настройке Tina CMS с Astro 5"
draft: false
---

# Введение

Это пример поста с кастомными компонентами.

<Callout type="info">
Важная информация для читателя
</Callout>

## Двухколоночная вёрстка

<TwoColumns>
  <div slot="left">
    Левая колонка с текстом
  </div>
  <div slot="right">
    Правая колонка с текстом
  </div>
</TwoColumns>

<ImageWide
  src="/images/example.jpg"
  alt="Пример изображения"
  caption="Подпись к изображению"
/>
```
