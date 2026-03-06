# Tasks: Initialize Blog Project

## Overview

Задачи организованы в последовательность с учётом зависимостей. Каждая задача включает критерии приёмки и может быть выполнена независимо после завершения блокирующих задач.

## Task List

### 1. Initialize Astro Project

**Capability:** `astro-project-setup`

**Description:**
Создать базовый Astro 5 проект с TypeScript, MDX и React поддержкой.

**Steps:**
1. Выполнить `npm create astro@latest .` с опциями:
   - Template: Empty
   - TypeScript: Yes (strict)
   - Install dependencies: Yes
2. Установить интеграции: `npx astro add mdx react`
3. Настроить `astro.config.mjs` с MDX и React
4. Настроить `tsconfig.json` с path aliases (@/)
5. Создать базовую структуру директорий:
   - `src/content/posts/`
   - `src/components/`
   - `src/layouts/`
   - `src/pages/`
   - `src/styles/`

**Validation:**
- [x] `npm run dev` запускается без ошибок
- [x] Сайт доступен на localhost:4321
- [x] TypeScript компилируется без ошибок
- [x] HMR работает при изменении файлов

**Blocks:** Tasks 2, 3, 4, 5

**Estimated complexity:** Medium

---

### 2. Define Content Schema

**Capability:** `content-schema`

**Description:**
Определить Astro Content Collections schema для постов с валидацией полей.

**Steps:**
1. Создать `src/content/config.ts`
2. Определить Zod schema для posts collection:
   - title: string (required)
   - date: date (required)
   - tags: array of strings (optional, default [])
   - description: string (optional)
   - draft: boolean (optional, default false)
3. Экспортировать collections
4. Создать 2 примера MDX файлов в `src/content/posts/` с валидным frontmatter

**Validation:**
- [x] TypeScript распознаёт типы из schema
- [x] `getCollection('posts')` возвращает посты с типами
- [x] Ошибка валидации при невалидном frontmatter
- [x] Примеры постов загружаются без ошибок

**Depends on:** Task 1

**Blocks:** Tasks 3, 4, 5

**Estimated complexity:** Low

---

### 3. Create MDX Components

**Capability:** `mdx-components`

**Description:**
Реализовать 3 кастомных React компонента для использования в MDX.

**Steps:**
1. Создать `src/components/TwoColumns.tsx`:
   - Props: left, right (ReactNode)
   - CSS Grid layout (2 columns)
   - Responsive (stack на mobile)
2. Создать `src/components/ImageWide.tsx`:
   - Props: src, alt, caption (optional)
   - `<figure>` wrapper
   - Full-width image
   - Caption в `<figcaption>`
3. Создать `src/components/Callout.tsx`:
   - Props: type (info/warning/success), children
   - Border-left accent
   - Background color по типу
   - Default type: info
4. Зарегистрировать компоненты в `astro.config.mjs` для глобального использования в MDX
5. Добавить базовые стили в `src/styles/global.css`

**Validation:**
- [x] Компоненты компилируются без ошибок TypeScript
- [x] Можно использовать в MDX без import
- [x] TwoColumns отображает 2 колонки на desktop
- [x] ImageWide показывает изображение и caption
- [x] Callout меняет стиль в зависимости от type

**Depends on:** Task 1

**Blocks:** Tasks 4, 5

**Can parallelize with:** Task 2

**Estimated complexity:** Medium

---

### 4. Setup Tina CMS

**Capability:** `tina-cms-integration`

**Description:**
Настроить Tina CMS в локальном режиме с блочным редактором.

**Steps:**
1. Установить dependencies: `npm install tinacms @tinacms/cli`
2. Инициализировать Tina: `npx @tinacms/cli init`
3. Создать/настроить `tina/config.ts`:
   - Local backend configuration
   - Posts collection schema (синхронизировать с Astro schema)
   - Определить custom blocks для MDX компонентов:
     - TwoColumns block (left/right rich-text fields)
     - ImageWide block (src, alt, caption fields)
     - Callout block (type select, content rich-text)
4. Добавить `.tina` в `.gitignore` (для __generated__)
5. Настроить admin route в Astro

**Validation:**
- [x] `npx tinacms dev` запускается без ошибок
- [x] Админка доступна на /admin
- [x] Можно создать новый пост
- [x] Можно отредактировать существующий пост
- [x] Можно добавить кастомные блоки (TwoColumns, ImageWide, Callout)
- [x] Изменения сохраняются в .mdx файлы
- [x] Preview в Tina работает

**Depends on:** Tasks 2, 3

**Blocks:** None (можно работать над Task 5 параллельно)

**Estimated complexity:** High

---

### 5. Build Content Pages

**Capability:** `content-pages`

**Description:**
Создать 3 страницы: главная, страница поста, страница тега.

**Steps:**
1. Создать `src/layouts/BaseLayout.astro`:
   - HTML boilerplate
   - Meta tags (charset, viewport)
   - Global CSS import
   - Header с навигацией
   - Footer
2. Создать `src/pages/index.astro` (главная):
   - Получить все посты через getCollection
   - Фильтровать drafts
   - Сортировать по дате (новые первыми)
   - Отобразить список постов (title, date, tags)
   - Ссылки на страницы постов и тегов
3. Создать `src/pages/posts/[slug].astro`:
   - getStaticPaths для всех постов
   - Рендер полного MDX контента
   - Отображение metadata (title, date, tags)
   - SEO meta tags
4. Создать `src/pages/tags/[tag].astro`:
   - getStaticPaths для всех уникальных тегов
   - Фильтровать посты по выбранному тегу
   - Отобразить список постов с этим тегом
5. Добавить базовые стили в `src/styles/global.css`:
   - Typography
   - Layout (max-width, centering)
   - Post list styling
   - Tag badges
   - Basic responsive design

**Validation:**
- [x] Главная показывает список всех постов
- [x] Клик по посту ведёт на страницу поста
- [x] Страница поста корректно рендерит MDX
- [x] MDX компоненты работают на странице поста
- [x] Клик по тегу ведёт на страницу тега
- [x] Страница тега показывает только посты с этим тегом
- [x] `npm run build` проходит успешно
- [x] Все страницы генерируются статически

**Depends on:** Tasks 2, 3

**Can parallelize with:** Task 4

**Estimated complexity:** Medium

---

### 6. Create Sample Content

**Capability:** Multiple (content demonstration)

**Description:**
Создать 2-3 примера постов, демонстрирующих все возможности системы.

**Steps:**
1. Создать `src/content/posts/first-post.mdx`:
   - Использовать все MDX компоненты
   - Разные теги
   - Полноценный контент
2. Создать `src/content/posts/second-post.mdx`:
   - Другой набор тегов (для демонстрации tag filtering)
   - TwoColumns и Callout примеры
3. Создать `src/content/posts/third-post.mdx`:
   - ImageWide примеры
   - Разные типы Callout
4. Добавить пример изображения в `public/images/`
5. Опционально: создать 1 draft пост для демонстрации фильтрации

**Validation:**
- [x] Все посты отображаются на главной
- [x] Каждый пост использует минимум 2 кастомных компонента
- [x] Теги работают корректно
- [x] Изображения загружаются
- [x] Draft пост не показывается в production build

**Depends on:** Tasks 3, 5

**Estimated complexity:** Low

---

### 7. Write Documentation

**Capability:** Documentation

**Description:**
Создать README с инструкциями по установке и использованию.

**Steps:**
1. Создать/обновить `README.md`:
   - Описание проекта
   - Требования (Node.js версия)
   - Инструкции установки
   - Команды запуска (dev, build, preview)
   - Как запустить Tina (2 терминала)
   - Структура проекта
   - Как добавить новый MDX компонент
   - Как синхронизировать Astro и Tina схемы
2. Добавить комментарии в ключевых файлах:
   - `tina/config.ts` (объяснение schema)
   - `src/content/config.ts` (валидация)
   - `astro.config.mjs` (интеграции)

**Validation:**
- [x] README содержит все необходимые инструкции
- [x] Новый разработчик может запустить проект, следуя README
- [x] Документированы обе команды (Astro + Tina)
- [x] Есть troubleshooting секция

**Depends on:** All previous tasks (requires complete implementation)

**Estimated complexity:** Low

---

## Task Dependencies Graph

```
Task 1: Initialize Astro Project
   ├─> Task 2: Define Content Schema
   │      ├─> Task 5: Build Content Pages
   │      └─> Task 4: Setup Tina CMS
   │             └─> Task 6: Create Sample Content
   └─> Task 3: Create MDX Components
          ├─> Task 5: Build Content Pages
          │      └─> Task 6: Create Sample Content
          └─> Task 4: Setup Tina CMS
                 └─> Task 6: Create Sample Content

Task 7: Write Documentation (depends on all)
```

## Parallel Execution Opportunities

**Phase 1:** Task 1 only

**Phase 2:** Tasks 2 and 3 can be done in parallel

**Phase 3:** Tasks 4 and 5 can be done in parallel (both depend on 2 & 3)

**Phase 4:** Task 6 (depends on 3, 4, 5)

**Phase 5:** Task 7 (final documentation)

## Total Estimated Time

- **Small project:** ~4-6 hours for experienced developer
- **Learning curve:** Add 2-4 hours if new to Astro or Tina

## Success Metrics

At completion, all criteria must be met:

1. ✅ `npm install` успешно устанавливает dependencies
2. ✅ `npm run dev` запускает Astro dev сервер
3. ✅ `npx tinacms dev` запускает Tina admin
4. ✅ Сайт доступен на localhost:4321
5. ✅ Админка доступна на localhost:4321/admin
6. ✅ Можно создать/редактировать посты в Tina
7. ✅ Изменения в Tina сохраняются в .mdx файлы
8. ✅ Посты отображаются на сайте
9. ✅ Все 3 MDX компонента работают
10. ✅ Фильтрация по тегам работает
11. ✅ `npm run build` создаёт production build
12. ✅ README содержит инструкции запуска
