import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

test('Astro defines an explicit /admin route so it does not fall through to [slug]', async () => {
  const routeUrl = new URL('../src/pages/admin/index.astro', import.meta.url);

  await access(routeUrl);

  const routeSource = await readFile(routeUrl, 'utf8');
  assert.match(routeSource, /Astro\.redirect\('\/admin\/index\.html'\)/);
});
