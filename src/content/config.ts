import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    type: z.enum(['статья', 'заметка', 'проект', 'рецензия']).default('статья'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    rating: z.number().min(1).max(5).optional(),
    projectUrl: z.string().optional(),
  }),
});

export const collections = { posts };
