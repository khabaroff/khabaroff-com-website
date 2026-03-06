# Spec: MDX Components

## ADDED Requirements

### Requirement: TwoColumns Component

The system SHALL provide a two-column layout component.

#### Scenario: Render two columns layout

```gherkin
GIVEN существует MDX файл с <TwoColumns> компонентом
AND компонент содержит left и right слоты с контентом
WHEN страница рендерится в браузере
THEN контент отображается в две колонки
AND колонки имеют равную ширину (50%/50%)
AND на desktop разрешении колонки расположены горизонтально
```

#### Scenario: Responsive behavior (basic)

```gherkin
GIVEN TwoColumns компонент на странице
WHEN viewport меньше 768px
THEN колонки стекаются вертикально (column layout)
AND левая колонка отображается первой
AND правая колонка отображается второй
```

#### Scenario: Nested markdown rendering

```gherkin
GIVEN левая колонка содержит Markdown: **bold** и _italic_
AND правая колонка содержит список
WHEN компонент рендерится
THEN Markdown в обеих колонках обрабатывается корректно
AND форматирование применяется
```

### Requirement: ImageWide Component

The system SHALL provide a wide image component with optional caption support.

#### Scenario: Display wide image

```gherkin
GIVEN <ImageWide src="/images/photo.jpg" alt="Description" />
WHEN компонент рендерится
THEN изображение отображается на всю ширину контейнера
AND применяется alt текст для accessibility
AND изображение загружается из public/ директории
```

#### Scenario: Display image with caption

```gherkin
GIVEN <ImageWide src="/images/photo.jpg" alt="Desc" caption="Photo caption" />
WHEN компонент рендерится
THEN под изображением отображается caption
AND caption имеет отличающийся стиль (меньший размер, centered)
```

#### Scenario: Missing image handling

```gherkin
GIVEN src указывает на несуществующий файл
WHEN компонент рендерится
THEN браузер показывает broken image icon
AND alt текст отображается как fallback
```

### Requirement: Callout Component

The system SHALL provide a callout component for highlighted text blocks (notes, warnings, success messages).

#### Scenario: Render info callout

```gherkin
GIVEN <Callout type="info">Important note</Callout>
WHEN компонент рендерится
THEN блок отображается с info стилем (синий фон/иконка)
AND контент внутри читаемый
AND блок визуально отделён от основного текста
```

#### Scenario: Render warning callout

```gherkin
GIVEN <Callout type="warning">Be careful</Callout>
WHEN компонент рендерится
THEN блок отображается с warning стилем (жёлтый/оранжевый фон)
AND визуально отличается от info типа
```

#### Scenario: Render success callout

```gherkin
GIVEN <Callout type="success">Well done!</Callout>
WHEN компонент рендерится
THEN блок отображается с success стилем (зелёный фон/иконка)
```

#### Scenario: Default type fallback

```gherkin
GIVEN <Callout>Text without type</Callout>
WHEN компонент рендерится
THEN использует type="info" по умолчанию
```

### Requirement: Component Registration

All MDX components SHALL be globally available in MDX files without explicit imports.

#### Scenario: Components available in MDX

```gherkin
GIVEN MDX файл НЕ содержит import для TwoColumns
AND MDX содержит <TwoColumns> компонент
WHEN файл обрабатывается Astro
THEN компонент распознаётся и рендерится
AND не возникает ошибка "Component not found"
```

#### Scenario: TypeScript types for components

```gherkin
GIVEN разработчик редактирует .tsx файл компонента в IDE
WHEN пишет props для компонента
THEN TypeScript предоставляет autocomplete
AND показывает ошибки для неверных props
```

## Component Specifications

### TwoColumns

**Type Definition:**
```typescript
interface TwoColumnsProps {
  left: React.ReactNode;
  right: React.ReactNode;
}
```

**Rendering:**
- CSS Grid layout: `display: grid; grid-template-columns: 1fr 1fr;`
- Gap между колонками: 2rem
- Mobile breakpoint: 768px

### ImageWide

**Type Definition:**
```typescript
interface ImageWideProps {
  src: string;
  alt: string;
  caption?: string;
}
```

**Rendering:**
- `<img>` tag with full width
- `max-width: 100%;` для responsive
- Caption в `<figcaption>` если указан
- Обёртка в `<figure>` tag

### Callout

**Type Definition:**
```typescript
interface CalloutProps {
  type?: 'info' | 'warning' | 'success';
  children: React.ReactNode;
}
```

**Rendering:**
- Border-left accent (4px solid)
- Padding: 1rem
- Background color зависит от type:
  - info: light blue (#e3f2fd)
  - warning: light orange (#fff3e0)
  - success: light green (#e8f5e9)

## Dependencies

**External:**
- `react` - для React компонентов
- `@astrojs/react` - интеграция React в Astro

**Internal:**
- Зависит от `astro-project-setup` (React integration)
- Используется в `tina-cms-integration` (Tina blocks)

## Configuration

**Required:**

1. `astro.config.mjs` - регистрация компонентов в MDX
   ```js
   mdx: {
     components: {
       TwoColumns: './src/components/TwoColumns',
       ImageWide: './src/components/ImageWide',
       Callout: './src/components/Callout',
     }
   }
   ```

2. Component files location: `src/components/`
   - `TwoColumns.tsx`
   - `ImageWide.tsx`
   - `Callout.tsx`

## Styling

**Approach:** Inline styles или CSS modules

**Not using:**
- Tailwind CSS
- Styled-components
- Emotion

**Basic CSS classes:**
- `.two-columns` - grid container
- `.image-wide` - figure wrapper
- `.callout` - callout base
- `.callout-info`, `.callout-warning`, `.callout-success` - type variants
