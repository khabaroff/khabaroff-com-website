import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

function extractOptions(configSource, fieldName) {
  const fieldPattern = new RegExp(
    `name:\\s*'${fieldName}'[\\s\\S]*?options:\\s*\\[([\\s\\S]*?)\\]`,
    'm',
  );
  const match = configSource.match(fieldPattern);

  assert.ok(match, `Could not find options for Tina field "${fieldName}"`);

  return [...match[1].matchAll(/'([^']+)'/g)].map(([, value]) => value);
}

async function readPostFrontmatterValues(fieldName) {
  const postsDir = new URL('../src/content/posts', import.meta.url);
  const entries = await readdir(postsDir);
  const values = new Set();

  for (const entry of entries) {
    if (!entry.endsWith('.mdx')) continue;

    const source = await readFile(path.join(postsDir.pathname, entry), 'utf8');
    const match = source.match(new RegExp(`^${fieldName}:\\s*(.+)$`, 'm'));
    if (!match) continue;

    values.add(match[1].trim().replace(/^['"]|['"]$/g, ''));
  }

  return values;
}

test('Tina category options cover every existing post category', async () => {
  const tinaConfig = await readFile(new URL('../tina/config.ts', import.meta.url), 'utf8');
  const categories = extractOptions(tinaConfig, 'category');
  const usedCategories = await readPostFrontmatterValues('category');

  for (const category of usedCategories) {
    assert.ok(
      categories.includes(category),
      `Missing Tina category option for "${category}"`,
    );
  }
});

test('Tina type options cover every existing post type', async () => {
  const tinaConfig = await readFile(new URL('../tina/config.ts', import.meta.url), 'utf8');
  const types = extractOptions(tinaConfig, 'type');
  const usedTypes = await readPostFrontmatterValues('type');

  for (const postType of usedTypes) {
    assert.ok(types.includes(postType), `Missing Tina type option for "${postType}"`);
  }
});

test('Tina schema includes frontmatter fields used by posts', async () => {
  const tinaConfig = await readFile(new URL('../tina/config.ts', import.meta.url), 'utf8');

  assert.match(tinaConfig, /name:\s*'heroLayout'/);
  assert.match(tinaConfig, /name:\s*'rating'/);
});

test('Tina rich-text templates cover every custom MDX component used in posts', async () => {
  const tinaConfig = await readFile(new URL('../tina/config.ts', import.meta.url), 'utf8');
  const postsDir = new URL('../src/content/posts', import.meta.url);
  const componentsDir = new URL('../src/components', import.meta.url);
  const entries = await readdir(postsDir);
  const componentEntries = await readdir(componentsDir);
  const usedComponents = new Set();
  const availableComponents = new Set(
    componentEntries
      .filter((entry) => /\.(astro|tsx|jsx|ts|js)$/.test(entry))
      .map((entry) => entry.replace(/\.(astro|tsx|jsx|ts|js)$/, '')),
  );

  for (const entry of entries) {
    if (!entry.endsWith('.mdx')) continue;

    const source = await readFile(path.join(postsDir.pathname, entry), 'utf8');
    const matches = source.matchAll(/<([A-Z][A-Za-z0-9]*)\b/g);

    for (const [, componentName] of matches) {
      if (!availableComponents.has(componentName)) continue;
      usedComponents.add(componentName);
    }
  }

  const declaredTemplates = new Set(
    [...tinaConfig.matchAll(/name:\s*'([A-Z][A-Za-z0-9]*)'/g)].map(([, name]) => name),
  );

  for (const componentName of usedComponents) {
    assert.ok(
      declaredTemplates.has(componentName),
      `Missing Tina rich-text template for "${componentName}"`,
    );
  }
});
