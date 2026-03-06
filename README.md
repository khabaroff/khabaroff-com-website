# Блог на Astro 5 + Tina CMS

Локальный демонстрационный блог с визуальным редактированием контента через Tina CMS и кастомными MDX компонентами.

## 📋 Возможности

- **Astro 5** - современный SSG с отличной производительностью
- **Tina CMS** - Git-based headless CMS с визуальным редактором
- **MDX** - Markdown с поддержкой React компонентов
- **Кастомные компоненты**:
  - `TwoColumns` - двухколоночная вёрстка
  - `ImageWide` - широкие изображения с подписями
  - `Callout` - выделенные блоки (info/warning/success)
- **Type-safe контент** - валидация схемы через Zod
- **Тегирование** - организация постов по тегам

## 🚀 Быстрый старт

### Требования

- Node.js 18+
- npm или yarn

### Установка

```bash
# Клонируйте репозиторий
git clone <url>
cd khabaroff-tina

# Установите зависимости
npm install
```

### Запуск

**Важно:** Для полноценной работы нужно запустить **два процесса одновременно** в разных терминалах:

#### Терминал 1: Astro dev сервер

```bash
npm run dev
```

Сайт будет доступен на [http://localhost:4444](http://localhost:4444)

#### Терминал 2: Tina CMS сервер

```bash
npx tinacms dev
```

Админ панель будет доступна на [http://localhost:4444/admin](http://localhost:4444/admin)

### Production сборка

```bash
# Создать production build
npm run build

# Превью production build
npm run preview
```

## 📁 Структура проекта

```
/
├── public/
│   └── images/           # Статические изображения
├── src/
│   ├── content/
│   │   ├── config.ts     # Astro Content Collections schema
│   │   └── posts/        # MDX файлы постов
│   ├── components/       # React компоненты для MDX
│   │   ├── TwoColumns.tsx
│   │   ├── ImageWide.tsx
│   │   └── Callout.tsx
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro   # Главная страница
│   │   ├── posts/
│   │   │   └── [slug].astro
│   │   └── tags/
│   │       └── [tag].astro
│   └── styles/
│       └── global.css
├── tina/
│   └── config.ts         # Tina CMS schema и конфигурация
├── astro.config.mjs      # Конфигурация Astro
└── package.json
```

## ✍️ Работа с контентом

### Создание нового поста

#### Через Tina CMS (рекомендуется)

1. Откройте [http://localhost:4444/admin](http://localhost:4444/admin)
2. Нажмите "Posts" → "Create New"
3. Заполните поля:
   - **Title** (обязательно)
   - **Date** (обязательно)
   - **Tags** (опционально)
   - **Description** (опционально)
   - **Body** - основной контент
4. Нажмите "Save"

#### Вручную

Создайте файл `src/content/posts/your-post.mdx`:

```mdx
---
title: "Заголовок поста"
date: 2026-01-25T12:00:00.000Z
tags: ["astro", "blog"]
description: "Краткое описание"
draft: false
---

# Ваш контент

Обычный Markdown текст...

<Callout type="info">
Важная информация!
</Callout>
```

### Использование MDX компонентов

#### TwoColumns

```mdx
<TwoColumns>
  <div>
    Левая колонка
  </div>
  <div>
    Правая колонка
  </div>
</TwoColumns>
```

#### ImageWide

```mdx
<ImageWide
  src="/images/example.svg"
  alt="Описание"
  caption="Подпись к изображению"
/>
```

#### Callout

```mdx
<Callout type="info">
Информационный блок
</Callout>

<Callout type="warning">
Предупреждение
</Callout>

<Callout type="success">
Успешное сообщение
</Callout>
```

## 🔧 Добавление нового MDX компонента

1. **Создайте React компонент** в `src/components/`:

```tsx
// src/components/MyComponent.tsx
interface MyComponentProps {
  text: string;
}

export default function MyComponent({ text }: MyComponentProps) {
  return <div className="my-component">{text}</div>;
}
```

2. **Зарегистрируйте в Tina** (`tina/config.ts`):

```ts
{
  type: 'rich-text',
  name: 'body',
  templates: [
    // ... существующие компоненты
    {
      name: 'MyComponent',
      label: 'My Component',
      fields: [
        {
          name: 'text',
          label: 'Text',
          type: 'string',
        },
      ],
    },
  ],
}
```

3. **Импортируйте в `[slug].astro`**:

```astro
import MyComponent from '../../components/MyComponent';

<Content components={{ TwoColumns, ImageWide, Callout, MyComponent }} />
```

## ⚙️ Синхронизация схем

**Важно:** Astro Content Collections schema и Tina schema должны быть синхронизированы!

При изменении полей контента:

1. Обновите `src/content/config.ts` (Astro schema)
2. Обновите `tina/config.ts` (Tina schema)
3. Используйте одинаковые имена полей

### Соответствие типов

| Astro (Zod) | Tina |
|-------------|------|
| `z.string()` | `type: 'string'` |
| `z.date()` | `type: 'datetime'` |
| `z.array(z.string())` | `list: true` |
| `z.boolean()` | `type: 'boolean'` |

## 🎨 Стилизация

Глобальные стили находятся в `src/styles/global.css`.

Основные CSS переменные:

```css
:root {
  --max-width: 800px;
  --color-info: #e3f2fd;
  --color-warning: #fff3e0;
  --color-success: #e8f5e9;
}
```

## 🐛 Troubleshooting

### Tina admin не открывается

- Убедитесь, что запущен `npx tinacms dev`
- Проверьте, что Astro dev сервер работает на порту 4444
- Очистите кеш браузера

### Компоненты не отображаются в постах

- Убедитесь, что компоненты импортированы в `[slug].astro`
- Проверьте консоль браузера на наличие ошибок
- Проверьте, что React интеграция настроена в `astro.config.mjs`

### Ошибки валидации контента

- Проверьте, что frontmatter соответствует schema в `src/content/config.ts`
- Убедитесь, что обязательные поля (`title`, `date`) заполнены
- Проверьте формат даты (должен быть ISO 8601)

## 📚 Документация

- [Astro Documentation](https://docs.astro.build)
- [Tina CMS Documentation](https://tina.io/docs/)
- [MDX Documentation](https://mdxjs.com/)

## 📄 Лицензия

MIT
