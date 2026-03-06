# Initialize Blog Project

## Summary

Инициализация локального блог-проекта на базе Astro 5 и Tina CMS с поддержкой визуального редактирования MDX контента и кастомных компонентов.

## Motivation

Создать минимальный рабочий прототип для:
- Тестирования Git-based workflow Tina CMS
- Проверки визуального редактора и превью контента
- Экспериментов с кастомными MDX компонентами (блочная вёрстка)
- Понимания связки Tina schema ↔ Astro Content Collections

Это демонстрационный проект для изучения интеграции современного SSG с headless CMS.

## Scope

**В scope:**
- Инициализация Astro 5 проекта с MDX поддержкой
- Настройка Tina CMS в локальном режиме
- Создание базовой схемы контента (posts с полями: title, date, tags, body)
- Реализация 3 кастомных MDX компонентов: TwoColumns, ImageWide, Callout
- Создание 3 страниц: главная (список постов), страница поста, страница тега
- Базовые стили для читаемости контента
- README с инструкциями запуска
- 2-3 примера постов с использованием кастомных компонентов

**Вне scope:**
- Deployment и hosting
- Authentification/Authorization
- Поиск по контенту
- Комментарии
- RSS/Sitemap
- Pagination
- SEO оптимизация (кроме базовых meta tags)
- Адаптивная вёрстка (только desktop-first)
- Dark mode
- Internationalization

## Success Criteria

1. ✅ Запускается `npm run dev` - сайт доступен на localhost:4321
2. ✅ Запускается `npx tinacms dev` - админка доступна на localhost:4321/admin
3. ✅ В Tina можно:
   - Создать новый пост
   - Отредактировать существующий пост
   - Добавить кастомные блоки (TwoColumns, ImageWide, Callout)
   - Увидеть превью изменений
4. ✅ Изменения в Tina сохраняются в .mdx файлы
5. ✅ На сайте отображаются:
   - Список всех постов на главной
   - Полный контент поста с кастомными компонентами
   - Список постов по выбранному тегу
6. ✅ README содержит понятные инструкции запуска

## Relationships

**Depends on:** None (initial setup)

**Blocks:** None

**Related capabilities:**
- `astro-project-setup` - инициализация Astro с MDX
- `tina-cms-integration` - настройка Tina CMS
- `mdx-components` - кастомные MDX компоненты
- `content-pages` - страницы блога
- `content-schema` - схема контента

## Open Questions

None. Требования четко определены в задаче.
