import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    category: z.enum([
      'обучение', 'технологии', 'продуктивность', 'дизайн', 'бизнес',
      'образование', 'рассылка', 'проекты', 'книги', 'музыка', 'социология'
    ]).default('технологии'),
    type: z.enum([
      'статья', 'гайд', 'заметка', 'обзор', 'исследование', 'рассылка', 
      'проект', 'рецензия'
    ]).default('статья'),
    description: z.string().optional(),
    draft: z.boolean().default(false),
    relatedPosts: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    heroLayout: z.enum(['fullscreen', 'regular']).optional(),
    rating: z.number().min(1).max(5).optional(),
  }),
});

export const collections = { posts };
