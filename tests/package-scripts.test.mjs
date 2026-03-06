import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('dev script starts Tina and Astro together on the expected local port', async () => {
  const packageJson = JSON.parse(
    await readFile(new URL('../package.json', import.meta.url), 'utf8'),
  );

  assert.equal(
    packageJson.scripts.dev,
    'tinacms dev -c "astro dev --port 4444"',
  );
});
