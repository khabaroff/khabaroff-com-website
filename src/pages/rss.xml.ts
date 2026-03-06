import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts');
  const publishedPosts = posts
    .filter(post => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Сергей Хабаров — Блог',
    description: 'Лонгриды о системах, мышлении и работе',
    site: context.site!,
    items: publishedPosts.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description || '',
      link: `/${post.slug}/`,
    })),
    customData: '<language>ru</language>',
  });
}
