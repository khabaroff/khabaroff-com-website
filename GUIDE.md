# Гайд по использованию блога

## 1. Категории с английскими слагами

Категории теперь используют английские URL, но отображаются по-русски:

```
/categories/learning      → Обучение
/categories/tech          → Технологии
/categories/productivity  → Продуктивность
/categories/design        → Дизайн
/categories/business      → Бизнес
```

## 2. Как добавить картинку в шапку статьи (на всю ширину)

В frontmatter статьи добавьте поля `heroImage` и `heroAlt`:

```yaml
---
title: "Заголовок статьи"
heroImage: "https://images.unsplash.com/photo-123456?w=1600&h=600&fit=crop"
heroAlt: "Описание картинки"
---
```

**Важно:**
- Картинка растянется на всю ширину браузера
- Рекомендуемый размер: 1600x600px
- Можно использовать Unsplash, добавляя параметры `?w=1600&h=600&fit=crop`

**Пример:**
```
heroImage: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&h=600&fit=crop"
```

## 3. Как делать ссылки на другие статьи

### Способ 1: Прямая ссылка

```markdown
Читайте мою статью про [GTD систему](/posts/gtd-system).
```

### Способ 2: Через relatedPosts (автоматические карточки внизу)

В frontmatter:

```yaml
---
relatedPosts: ["gtd-system", "workspace-setup", "note-taking-apps"]
---
```

Это добавит блок "Читайте также" внизу статьи с карточками связанных постов.

## 4. Примеры ссылок в тексте

**На статью:**
```markdown
Подробнее в статье [Настройка рабочего пространства](/posts/workspace-setup).
```

**На категорию:**
```markdown
Смотрите все статьи в категории [Дизайн](/categories/design).
```

**На тег:**
```markdown
Все посты про [React](/tags/react).
```

## 5. Структура ссылок

```
/                          → Главная (список всех постов)
/posts/[slug]              → Страница поста
/categories/[category]     → Посты категории
/tags/[tag]                → Посты по тегу
```

## 6. Пример полного frontmatter

```yaml
---
title: "Инструменты для удаленной работы"
date: 2026-01-06T10:00:00.000Z
tags: ["remote", "инструменты", "команда"]
category: "бизнес"
type: "обзор"
description: "Полный набор инструментов для эффективной удаленной работы"
draft: false
heroImage: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&h=600&fit=crop"
heroAlt: "Удаленная работа за ноутбуком"
relatedPosts: ["workspace-setup", "gtd-system"]
---
```

## 7. Автообновление при изменении MDX

**Да, все изменения автоматически обновляются!**

В режиме разработки (`npm run dev`):
- Изменили MDX файл → браузер автоматически перезагрузится
- Изменили через Tina CMS → файл сохранится → браузер обновится

**Hot Module Reload (HMR)** работает для:
- MDX контента
- Компонентов
- Стилей
- Конфигурации

## 8. Как создать новый пост

### Через Tina CMS:

1. `npm run dev` (терминал 1)
2. `npx tinacms dev` (терминал 2)
3. Откройте http://localhost:4001
4. Создайте новый пост

### Вручную:

Создайте файл `src/content/posts/my-post.mdx`:

```mdx
---
title: "Мой новый пост"
date: 2026-01-25T10:00:00.000Z
tags: ["тег1", "тег2"]
category: "технологии"
type: "статья"
description: "Короткое описание"
draft: false
---

# Заголовок

Текст поста...
```

## 9. Сборка в статические HTML

```bash
npm run build
```

Результат будет в папке `dist/`:
```
dist/
├── index.html
├── posts/
│   ├── my-post/index.html
│   └── ...
├── categories/
│   ├── tech/index.html
│   └── ...
└── tags/
    └── ...
```

Эти файлы можно деплоить на любой хостинг (Vercel, Netlify, GitHub Pages).

## 10. Полезные ссылки

- Astro: https://astro.build
- Tina CMS: https://tina.io
- Unsplash (картинки): https://unsplash.com
- MDX синтаксис: https://mdxjs.com
