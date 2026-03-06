# Spec: Content Pages

## ADDED Requirements

### Requirement: Home Page (Post List)

The home page SHALL display a list of all published posts.

#### Scenario: Display all posts

```gherkin
GIVEN существует 3 поста в src/content/posts/
AND посты имеют разные даты публикации
WHEN пользователь открывает http://localhost:4321/
THEN отображается список всех 3 постов
AND посты отсортированы по дате (новые первыми)
AND для каждого поста показаны: title, date, tags
```

#### Scenario: Link to post page

```gherkin
GIVEN главная страница отображает список постов
WHEN пользователь кликает на title поста
THEN переходит на страницу этого поста
AND URL формата /posts/[slug]
```

#### Scenario: Display tags as links

```gherkin
GIVEN пост имеет теги ["astro", "tina"]
WHEN пост отображается на главной
THEN теги показаны как кликабельные ссылки
AND клик по тегу ведёт на /tags/[tag]
```

#### Scenario: Empty state

```gherkin
GIVEN в src/content/posts/ нет файлов
WHEN пользователь открывает главную
THEN отображается сообщение "No posts yet"
AND нет ошибок рендеринга
```

### Requirement: Post Page

The system SHALL provide individual post pages with full content and MDX components rendering.

#### Scenario: Render post content

```gherkin
GIVEN существует пост с slug "first-post"
AND пост содержит Markdown и MDX компоненты
WHEN пользователь открывает /posts/first-post
THEN отображается полный контент поста
AND Markdown рендерится в HTML
AND MDX компоненты (TwoColumns, ImageWide, Callout) работают
```

#### Scenario: Display post metadata

```gherkin
GIVEN пост имеет title, date, tags в frontmatter
WHEN пост отображается
THEN title показан как h1 заголовок
AND date отображается в читаемом формате
AND теги показаны как ссылки на страницы тегов
```

#### Scenario: 404 for non-existent post

```gherkin
GIVEN slug "non-existent" не существует
WHEN пользователь открывает /posts/non-existent
THEN отображается 404 страница
AND код ответа 404
```

#### Scenario: Draft posts handling

```gherkin
GIVEN пост имеет draft: true в frontmatter
WHEN Astro генерирует страницы
THEN этот пост НЕ включается в сборку
AND страница /posts/[slug] для него не создаётся
AND пост НЕ показывается на главной
```

### Requirement: Tag Page

The system SHALL provide tag pages for filtering posts by tag.

#### Scenario: Display posts with specific tag

```gherkin
GIVEN есть 2 поста с тегом "astro"
AND 1 пост с тегом "react"
WHEN пользователь открывает /tags/astro
THEN отображаются только 2 поста с тегом "astro"
AND пост с тегом "react" НЕ отображается
```

#### Scenario: Tag page title

```gherkin
GIVEN пользователь на странице /tags/astro
WHEN страница рендерится
THEN заголовок страницы "Posts tagged: astro"
AND тег отображается в page title (browser tab)
```

#### Scenario: Empty tag page

```gherkin
GIVEN нет постов с тегом "empty-tag"
WHEN пользователь открывает /tags/empty-tag
THEN отображается сообщение "No posts with this tag"
AND не происходит ошибки
```

#### Scenario: Static paths generation

```gherkin
GIVEN в контенте используются теги: "astro", "tina", "react"
WHEN выполняется npm run build
THEN создаются страницы для всех уникальных тегов
AND страницы доступны по /tags/[tag]
```

### Requirement: Base Layout

All pages SHALL use a common base layout for consistency.

#### Scenario: Consistent header

```gherkin
GIVEN пользователь на любой странице (home, post, tag)
WHEN страница рендерится
THEN отображается общий header
AND header содержит название сайта
AND header содержит ссылку на главную
```

#### Scenario: Responsive viewport

```gherkin
GIVEN любая страница сайта
WHEN страница загружается
THEN viewport meta tag настроен для mobile
AND контент не выходит за границы экрана на mobile
```

#### Scenario: Basic SEO tags

```gherkin
GIVEN пост с title "My Post" и description в frontmatter
WHEN страница поста рендерится
THEN <title> содержит "My Post | Site Name"
AND <meta name="description"> содержит description поста
AND <meta charset="utf-8"> присутствует
```

## Page Routing

**Static Routes:**
- `/` - Home page (index.astro)

**Dynamic Routes:**
- `/posts/[slug]` - Post page (posts/[slug].astro)
- `/tags/[tag]` - Tag page (tags/[tag].astro)

**Generation:**
- Все страницы генерируются статически при build
- `getStaticPaths()` для dynamic routes

## Data Fetching

**Content Collections API:**
```typescript
import { getCollection } from 'astro:content';

// Получить все посты
const posts = await getCollection('posts');

// Фильтровать черновики
const publishedPosts = posts.filter(p => !p.data.draft);

// Сортировка по дате
posts.sort((a, b) => b.data.date - a.data.date);
```

## Dependencies

**External:**
- Astro Content Collections API

**Internal:**
- Зависит от `content-schema` (структура frontmatter)
- Зависит от `mdx-components` (рендеринг компонентов в постах)
- Зависит от `astro-project-setup` (базовая настройка)

## File Structure

```
src/pages/
├── index.astro          # Home page
├── posts/
│   └── [slug].astro     # Post page
└── tags/
    └── [tag].astro      # Tag page

src/layouts/
└── BaseLayout.astro     # Base HTML layout
```

## Styling

**Global styles:** `src/styles/global.css`

**Basic components:**
- Post list item styling
- Post content typography
- Tag badges styling
- Responsive grid/flex layouts

**Typography:**
- Headings: system font stack
- Body: readable line-height (1.6)
- Code blocks: monospace font
- Max content width: 800px для читаемости
