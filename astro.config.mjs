// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import posthog from 'astro-posthog';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  server: {
    port: 4444
  },
  integrations: [
    mdx({
      remarkPlugins: [],
      rehypePlugins: [],
    }),
    react(),
    posthog({
      // Замените на ваш ключ PostHog
      posthogKey: import.meta.env.PUBLIC_POSTHOG_KEY || '',
      api_host: import.meta.env.PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
      defaults: '2025-05-24',
      person_profiles: 'identified_only'
    })
  ]
});