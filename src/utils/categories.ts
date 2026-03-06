export const categoryMap = {
  'обучение': 'learning',
  'технологии': 'tech',
  'продуктивность': 'productivity',
  'дизайн': 'design',
  'бизнес': 'business',
} as const;

export const categoryNames = {
  'learning': 'Обучение',
  'tech': 'Технологии',
  'productivity': 'Продуктивность',
  'design': 'Дизайн',
  'business': 'Бизнес',
} as const;

export function getCategorySlug(category: string): string {
  return categoryMap[category as keyof typeof categoryMap] || category;
}

export function getCategoryName(slug: string): string {
  return categoryNames[slug as keyof typeof categoryNames] || slug;
}
