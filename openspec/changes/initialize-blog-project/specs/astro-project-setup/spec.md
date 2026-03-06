# Spec: Astro Project Setup

## ADDED Requirements

### Requirement: Astro 5 Project Initialization

The project SHALL be initialized with Astro 5 and MDX support for content pages.

#### Scenario: Developer runs npm run dev

```gherkin
GIVEN проект склонирован из репозитория
AND зависимости установлены через npm install
WHEN разработчик выполняет npm run dev
THEN Astro dev сервер запускается на порту 4321
AND сайт доступен по адресу http://localhost:4321
AND hot module replacement (HMR) работает для .astro и .tsx файлов
```

#### Scenario: MDX files are processed

```gherkin
GIVEN существует файл src/content/posts/example.mdx
AND файл содержит frontmatter с полями title и date
AND файл содержит Markdown контент
WHEN Astro обрабатывает этот файл
THEN frontmatter парсится корректно
AND Markdown рендерится в HTML
AND файл доступен через Content Collections API
```

### Requirement: React Integration

The project SHALL support React components in MDX for custom content blocks.

#### Scenario: React component renders in MDX

```gherkin
GIVEN существует React компонент src/components/Callout.tsx
AND компонент импортирован в MDX файле
WHEN MDX файл рендерится на странице
THEN React компонент успешно отображается
AND компонент является интерактивным (client:load directive)
```

### Requirement: TypeScript Support

The project SHALL use TypeScript for type safety.

#### Scenario: TypeScript compilation

```gherkin
GIVEN проект содержит .ts и .tsx файлы
WHEN разработчик запускает npm run dev
THEN TypeScript компилируется без ошибок
AND типы доступны в IDE (VS Code)
AND ошибки типов отображаются в терминале
```

### Requirement: Build Configuration

The project SHALL build successfully for production deployment.

#### Scenario: Production build

```gherkin
GIVEN проект настроен корректно
WHEN разработчик выполняет npm run build
THEN Astro создаёт оптимизированную сборку в директории dist/
AND все статические страницы сгенерированы
AND сборка проходит без ошибок
```

#### Scenario: Preview production build

```gherkin
GIVEN production сборка создана (dist/ существует)
WHEN разработчик выполняет npm run preview
THEN preview сервер запускается
AND можно проверить production сборку локально
```

## Dependencies

**External:**
- `astro@^5.0.0` - SSG framework
- `@astrojs/mdx` - MDX integration
- `@astrojs/react` - React integration
- `react` + `react-dom` - React runtime

**Internal:**
- None (базовая настройка проекта)

## Configuration Files

**Required:**

1. `astro.config.mjs` - главный конфиг Astro
   - MDX integration
   - React integration
   - Output directory

2. `tsconfig.json` - TypeScript конфигурация
   - Strict mode enabled
   - Path aliases (@/ для src/)

3. `package.json` - npm scripts и dependencies
   - `dev` script
   - `build` script
   - `preview` script
