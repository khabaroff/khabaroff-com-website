# Design: Initialize Blog Project

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                  User Browser                    │
└──────────────┬──────────────────┬───────────────┘
               │                  │
               │ View             │ Edit
               ↓                  ↓
┌──────────────────────┐  ┌─────────────────────┐
│   Astro Frontend     │  │   Tina Admin UI     │
│   (localhost:4321)   │  │   (/admin route)    │
└──────────┬───────────┘  └──────────┬──────────┘
           │                         │
           │ Read                    │ Write
           ↓                         ↓
    ┌──────────────────────────────────────┐
    │      MDX Files (File System)         │
    │      src/content/posts/*.mdx         │
    └──────────────────────────────────────┘
                     ↑
                     │ Schema Validation
                     │
         ┌───────────┴───────────┐
         │                       │
    ┌────▼────────┐    ┌────────▼─────┐
    │ Astro       │    │ Tina Schema  │
    │ Content     │    │ (tina/       │
    │ Collections │    │  config.ts)  │
    └─────────────┘    └──────────────┘
```

## Key Design Decisions

### 1. Local-First Development

**Decision:** Использовать Tina в локальном режиме без backend

**Rationale:**
- Проект демонстрационный, не требует production deployment
- Упрощает setup - не нужны API keys, database, cloud services
- Быстрее итерация - изменения сразу видны в Git
- Прозрачность - всё в файловой системе

**Trade-offs:**
- ❌ Нет multi-user collaboration в реальном времени
- ❌ Нет media management (загрузка картинок через Tina)
- ✅ Простота запуска
- ✅ Git workflow из коробки

### 2. Content Collections vs Page-based Routing

**Decision:** Использовать Astro Content Collections для постов

**Rationale:**
- Type safety из коробки (Zod schema)
- Централизованная валидация контента
- Лучшая производительность (content caching)
- Стандартный подход для контент-сайтов на Astro

**Implementation:**
```
src/
  content/
    config.ts          # Zod schema
    posts/
      post-1.mdx
      post-2.mdx
```

### 3. MDX Components as React Components

**Decision:** Писать MDX компоненты на React (не Astro)

**Rationale:**
- Tina визуальный редактор работает с React компонентами
- Необходимо для интеграции в Tina blocks
- React в MDX поддерживается Astro из коробки (@astrojs/react)

**Trade-offs:**
- ❌ Дополнительный runtime (React) в браузере
- ✅ Полная интеграция с Tina редактором
- ✅ Переиспользование компонентов в будущем

### 4. Schema Synchronization Strategy

**Problem:** Tina schema и Astro Content Collections используют разные форматы

**Solution:** Дублирование схемы с manual sync

```typescript
// src/content/config.ts (Astro)
const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
  }),
});

// tina/config.ts (Tina)
{
  name: 'post',
  fields: [
    { name: 'title', type: 'string', required: true },
    { name: 'date', type: 'datetime', required: true },
    { name: 'tags', type: 'string', list: true },
  ]
}
```

**Trade-offs:**
- ❌ Manual sync при изменении схемы
- ❌ Нет единого источника истины
- ✅ Каждая система использует native подход
- ✅ Простота понимания (нет сложных трансформаций)

### 5. Styling Approach

**Decision:** Минимальные CSS классы, без фреймворков

**Rationale:**
- Проект демонстрационный - фокус на функциональности
- Базовая читаемость > сложный дизайн
- Меньше dependencies

**Implementation:**
- Один глобальный CSS файл (`src/styles/global.css`)
- Простые утилитарные классы
- CSS Grid для TwoColumns
- Базовая типографика

### 6. File Structure

```
/
├── src/
│   ├── content/
│   │   ├── config.ts              # Astro schema
│   │   └── posts/                 # MDX files
│   │       ├── first-post.mdx
│   │       ├── second-post.mdx
│   │       └── third-post.mdx
│   ├── components/
│   │   ├── TwoColumns.tsx         # MDX components
│   │   ├── ImageWide.tsx
│   │   └── Callout.tsx
│   ├── layouts/
│   │   └── BaseLayout.astro       # Base HTML layout
│   ├── pages/
│   │   ├── index.astro            # Home page
│   │   ├── posts/
│   │   │   └── [slug].astro       # Post page
│   │   └── tags/
│   │       └── [tag].astro        # Tag page
│   └── styles/
│       └── global.css
├── tina/
│   └── config.ts                   # Tina schema + config
├── public/                         # Static assets
├── astro.config.mjs                # Astro config
├── package.json
└── README.md
```

## Component Specifications

### TwoColumns

**Purpose:** Двухколоночная вёрстка контента

**Props:**
```typescript
interface TwoColumnsProps {
  children: React.ReactNode;
}
```

**Tina Block Schema:**
```typescript
{
  type: 'object',
  name: 'TwoColumns',
  fields: [
    { name: 'left', type: 'rich-text' },
    { name: 'right', type: 'rich-text' }
  ]
}
```

### ImageWide

**Purpose:** Широкие изображения (full-bleed или расширенные)

**Props:**
```typescript
interface ImageWideProps {
  src: string;
  alt: string;
  caption?: string;
}
```

**Tina Block Schema:**
```typescript
{
  type: 'object',
  name: 'ImageWide',
  fields: [
    { name: 'src', type: 'image' },
    { name: 'alt', type: 'string', required: true },
    { name: 'caption', type: 'string' }
  ]
}
```

### Callout

**Purpose:** Выделенные блоки текста (примечания, предупреждения)

**Props:**
```typescript
interface CalloutProps {
  type?: 'info' | 'warning' | 'success';
  children: React.ReactNode;
}
```

**Tina Block Schema:**
```typescript
{
  type: 'object',
  name: 'Callout',
  fields: [
    {
      name: 'type',
      type: 'string',
      options: ['info', 'warning', 'success']
    },
    { name: 'content', type: 'rich-text' }
  ]
}
```

## Content Schema

### Post Frontmatter

```yaml
title: string          # required
date: datetime         # required, ISO format
tags: string[]         # optional, список тегов
description: string    # optional, для meta description
draft: boolean         # optional, default false
```

### Sample Post Structure

```mdx
---
title: "Мой первый пост"
date: 2026-01-24T12:00:00.000Z
tags: ["astro", "tina", "mdx"]
description: "Описание поста"
draft: false
---

# Заголовок поста

Обычный текст параграфа.

<TwoColumns>
  <div slot="left">
    Контент левой колонки
  </div>
  <div slot="right">
    Контент правой колонки
  </div>
</TwoColumns>

<ImageWide
  src="/images/wide-image.jpg"
  alt="Описание изображения"
  caption="Подпись к изображению"
/>

<Callout type="info">
  Важное примечание для читателя
</Callout>
```

## Development Workflow

### Development Mode

1. Terminal 1: `npm run dev` → Astro dev server (HMR для .astro/.tsx)
2. Terminal 2: `npx tinacms dev` → Tina local server

**Port allocation:**
- `localhost:4321` - Astro site
- `localhost:4321/admin` - Tina admin UI
- Tina backend - используует встроенный local filesystem API

### Content Editing Flow

```
1. Open /admin in browser
2. Tina visual editor loads
3. Edit content (title, body, add blocks)
4. Click "Save" → writes to .mdx file
5. Astro HMR picks up change → browser refreshes
6. See updated content on site
```

### Adding New MDX Component

1. Create React component in `src/components/`
2. Add to `mdx.config.js` components map
3. Add Tina block schema in `tina/config.ts`
4. Use in Tina editor via "Add Block" button
5. Component renders on site

## Risk Mitigation

### Risk: Schema Drift

**Problem:** Tina schema и Astro schema могут разойтись

**Mitigation:**
- Document sync requirement in README
- Use same field names in both schemas
- Manual validation step при изменениях

### Risk: React в MDX не работает

**Problem:** Astro может не корректно обрабатывать React в MDX

**Mitigation:**
- Explicit configuration в `astro.config.mjs`
- Test React components early
- Fallback: использовать Astro components (потребует перестройки Tina blocks)

### Risk: Tina local mode ограничения

**Problem:** Некоторые фичи Tina могут требовать backend

**Mitigation:**
- Document known limitations (media upload)
- Use public/ folder for images (manual copy)
- Accept trade-off для demo проекта

## Performance Considerations

**Not optimized in this iteration:**
- Image optimization (можно добавить `@astrojs/image` позже)
- Code splitting
- Bundle size
- Lazy loading

**Acceptable because:**
- Demo project с 2-3 постами
- Local development только
- Focus на functionality, not performance

## Future Enhancements

**Возможные улучшения после initial setup:**
1. Image optimization with Astro Image
2. Tina Cloud backend для collaboration
3. Дополнительные MDX компоненты (видео, code blocks с highlight)
4. Search functionality
5. RSS feed
6. Sitemap generation
7. Production deployment (Netlify/Vercel)

**Не планируется (вне scope проекта):**
- Authentication
- Comments system
- Analytics
- Newsletter integration
