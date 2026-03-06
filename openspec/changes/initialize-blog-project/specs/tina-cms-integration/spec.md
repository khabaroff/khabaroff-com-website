# Spec: Tina CMS Integration

## ADDED Requirements

### Requirement: Local Tina Server

Tina CMS SHALL operate in local mode for visual content editing.

#### Scenario: Tina admin UI is accessible

```gherkin
GIVEN Astro dev сервер запущен на localhost:4321
AND Tina dev сервер запущен через npx tinacms dev
WHEN пользователь открывает http://localhost:4321/admin
THEN загружается Tina admin интерфейс
AND видна структура контента (Posts collection)
AND можно выбрать существующий пост для редактирования
```

#### Scenario: Create new post in Tina

```gherkin
GIVEN пользователь находится в Tina admin /admin
WHEN нажимает кнопку "Create New" для Posts collection
AND заполняет поля: title, date, tags
AND добавляет контент в body
AND нажимает "Save"
THEN создаётся новый .mdx файл в src/content/posts/
AND файл содержит корректный frontmatter
AND файл содержит введённый контент
```

#### Scenario: Edit existing post in Tina

```gherkin
GIVEN существует файл src/content/posts/example.mdx
AND пользователь открыл его в Tina редакторе
WHEN изменяет поле title на "New Title"
AND нажимает "Save"
THEN файл src/content/posts/example.mdx обновляется
AND frontmatter содержит title: "New Title"
AND изменения видны в Git diff
```

### Requirement: Visual Content Editor

Tina SHALL provide a visual editor with preview for MDX content.

#### Scenario: WYSIWYG editing

```gherkin
GIVEN пользователь редактирует пост в Tina
WHEN добавляет текст в body field
THEN видит визуальное отображение Markdown
AND может использовать toolbar для форматирования (bold, italic, links)
AND может добавлять списки и заголовки
```

#### Scenario: Live preview of changes

```gherkin
GIVEN пост открыт в Tina редакторе
WHEN пользователь изменяет контент
THEN preview панель обновляется в реальном времени
AND отображает актуальное состояние контента
```

### Requirement: Custom Block Support

Tina SHALL support adding custom MDX components through a block editor.

#### Scenario: Add TwoColumns block

```gherkin
GIVEN пользователь редактирует пост в Tina
WHEN нажимает "Add Block" в body редакторе
AND выбирает "TwoColumns" из списка блоков
AND заполняет left и right поля контентом
THEN в MDX файл добавляется <TwoColumns> компонент
AND компонент корректно отображается в preview
```

#### Scenario: Add ImageWide block

```gherkin
GIVEN пользователь редактирует пост в Tina
WHEN добавляет ImageWide блок
AND указывает src путь к изображению
AND заполняет alt текст
AND добавляет опциональный caption
THEN в MDX файл добавляется <ImageWide> компонент с указанными props
```

#### Scenario: Add Callout block

```gherkin
GIVEN пользователь редактирует пост в Tina
WHEN добавляет Callout блок
AND выбирает type (info/warning/success)
AND добавляет текст контента
THEN в MDX файл добавляется <Callout> компонент
AND компонент отображается с соответствующим стилем
```

### Requirement: Schema Definition

Tina schema SHALL define the content structure and available fields.

#### Scenario: Schema validation

```gherkin
GIVEN определена Tina schema для Posts collection
AND schema требует обязательные поля: title, date
WHEN пользователь пытается сохранить пост без title
THEN Tina показывает ошибку валидации
AND пост не сохраняется до исправления
```

#### Scenario: Field types enforcement

```gherkin
GIVEN поле date имеет тип datetime в schema
WHEN пользователь редактирует это поле
THEN Tina показывает datetime picker
AND сохраняет значение в ISO 8601 формате
```

## Dependencies

**External:**
- `tinacms` - core CMS библиотека
- `@tinacms/cli` - CLI для dev сервера

**Internal:**
- Зависит от `astro-project-setup` (нужен запущенный Astro dev сервер)
- Зависит от `content-schema` (schema должна совпадать)
- Зависит от `mdx-components` (блоки используют компоненты)

## Configuration Files

**Required:**

1. `tina/config.ts` - главная конфигурация Tina
   - Schema определение для Posts collection
   - Custom blocks definition (TwoColumns, ImageWide, Callout)
   - Local backend configuration

2. `.tina/__generated__/` - автогенерируемые типы (gitignore)

## File System Behavior

**Write behavior:**
- Tina записывает изменения напрямую в файловую систему
- Формат файлов: MDX с YAML frontmatter
- Файлы создаются в `src/content/posts/[slug].mdx`
- Slug генерируется из title (kebab-case)

**Git workflow:**
- Изменения автоматически появляются в Git working directory
- Разработчик делает commit вручную
- Нет auto-commit (user control)
