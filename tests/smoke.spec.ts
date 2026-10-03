import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const routes = ['/', '/projects/arbiter-ai', '/projects/trustkit-ai', '/projects/sentinelscope', '/privacy'];
test('direct routes, accessibility, metadata, evidence and real 404', async ({ page }) => {
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main')).toBeVisible();
    expect(await page.locator('a[href="#"]').count()).toBe(0);
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    if (route.includes('/projects/')) await expect(page.locator('.evidence-list a').first()).toHaveAttribute('href', /github.com\/Haryshwa29\/.+\/blob\/[a-f0-9]{40}\//);
  }
  const missing = await page.goto('/projects/not-a-project');
  expect(missing?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: /out of scope/ })).toBeVisible();
});
test('320px layout, menu, keyboard and reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const route of routes) {
    await page.goto(route);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.getByLabel('Menu').click();
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Work', exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
  expect(await page.locator('html').evaluate(el => getComputedStyle(el).scrollBehavior)).toBe('auto');
  expect(await page.locator('.hero-copy').evaluate(el => getComputedStyle(el).animationName)).toBe('none');
});
test('contact links, clipboard success and failure', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  await expect(page.locator('a[href="mailto:haryshwanair29@gmail.com"]')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Connect on LinkedIn' })).toHaveAttribute('href', 'https://www.linkedin.com/in/thaithe-haryshwa-nair/');
  await expect(page.getByRole('link', { name: /resume/i })).toHaveCount(0);
  await page.getByRole('button', { name: 'Copy email' }).click();
  await expect(page.getByRole('status')).toHaveText('Email address copied.');
  await page.evaluate(() => { Object.defineProperty(navigator.clipboard, 'writeText', { value: async () => { throw new Error('Denied'); } }); });
  await page.getByRole('button', { name: 'Copy email' }).click();
  await expect(page.getByRole('status')).toContainText('Could not copy. Select and copy this address: haryshwanair29@gmail.com');
});
test('essential content and mobile navigation without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByLabel('Menu').click();
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  await page.getByRole('link', { name: 'Explore the case study' }).first().click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Arbiter AI');
  await context.close();
});
test('all local actions resolve, sharing asset is correctly sized, no third-party requests', async ({ page, request }) => {
  const external: string[] = [];
  page.on('request', req => { if (!req.url().startsWith('http://127.0.0.1:3000')) external.push(req.url()); });
  await page.goto('/');
  const links = await page.locator('a').evaluateAll(nodes => nodes.map(a => a.getAttribute('href')!).filter(h => h.startsWith('/')));
  for (const href of [...new Set(links)]) {
    const [path, hash] = href.split('#');
    const response = await request.get(path || '/');
    expect(response.status()).toBe(200);
    if (hash) expect(await response.text()).toContain(`id="${hash}"`);
  }
  expect(external).toEqual([]);
  const image = await request.get('/opengraph-image.png');
  expect(image.status()).toBe(200);
  const png = await image.body();
  expect(png.readUInt32BE(16)).toBe(1200); expect(png.readUInt32BE(20)).toBe(630);
  expect((await request.get('/robots.txt')).status()).toBe(200);
  expect((await request.get('/sitemap.xml')).status()).toBe(200);
});

