import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('entire card opens its case study and retained projects have both diagrams', async ({ page }) => {
  await page.goto('/work');
  const artwork = page.locator('.work-card').first().locator('.work-art');
  await artwork.scrollIntoViewIfNeeded();
  const bounds = await artwork.boundingBox();
  if (!bounds) throw new Error('Project artwork is not rendered');
  await page.mouse.click(bounds.x + 20, bounds.y + 20);
  await expect(page).toHaveURL(/projects\/arbiter-ai$/);
  for (const slug of ['arbiter-ai', 'trustkit-ai', 'sentinelscope', 'ssh-honeypot', 'financial-rag', 'medai']) {
    await page.goto(`/projects/${slug}`);
    await expect(page.locator('.system-map')).toBeVisible();
    await expect(page.locator('.project-flow')).toBeVisible();
    if (['arbiter-ai', 'trustkit-ai', 'ssh-honeypot'].includes(slug)) await expect(page.locator('.deep-dive-chapter')).toHaveCount(4);
  }
});
const routes = ['/', '/work', '/projects/arbiter-ai', '/projects/trustkit-ai', '/projects/sentinelscope', '/projects/ssh-honeypot', '/projects/financial-rag', '/projects/medai', '/privacy'];
test('direct routes, accessibility, metadata, evidence and real 404', async ({ page }) => {
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main')).toBeVisible();
    expect(await page.locator('a[href="#"]').count()).toBe(0);
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    if (route.includes('/projects/') && !['/projects/clean-energy', '/projects/steganography'].includes(route)) await expect(page.locator('.evidence-list a').first()).toHaveAttribute('href', /github.com\/Haryshwa29\/.+\/blob\/[a-f0-9]{40}\//);
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
  await expect(page.locator('.hero-socials a[href="mailto:haryshwanair29@gmail.com"]')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Connect on LinkedIn' })).toHaveAttribute('href', 'https://www.linkedin.com/in/thaithe-haryshwa-nair/');
  const resumeLinks = page.getByRole('link', { name: 'Download Resume', exact: true });
  await expect(resumeLinks).toHaveCount(2);
  for (const link of await resumeLinks.all()) {
    await expect(link).toHaveAttribute('download', 'Haryshwa-Nair-Resume.pdf');
    await expect(link).toHaveAttribute('href', '/resume/Haryshwa-Nair-Resume.pdf');
  }
  const pdf = await page.request.get('/resume/Haryshwa-Nair-Resume.pdf');
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()['content-type']).toContain('application/pdf');
  expect((await pdf.body()).subarray(0, 5).toString()).toBe('%PDF-');
  await expect(page.locator('.hero-actions').getByRole('link', { name: 'View Projects' })).toHaveAttribute('href', '#work');
  await expect(page.locator('.hero-socials').getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/Haryshwa29');
  await page.getByRole('button', { name: 'Copy email' }).click();
  await expect(page.locator('.email-actions [role="status"]')).toHaveText('Email address copied.');
  await page.evaluate(() => { Object.defineProperty(navigator.clipboard, 'writeText', { value: async () => { throw new Error('Denied'); } }); });
  await page.getByRole('button', { name: 'Copy email' }).click();
  await expect(page.locator('.email-actions [role="status"]')).toContainText('Could not copy. Select and copy this address: haryshwanair29@gmail.com');
});
test('essential content and mobile navigation without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('.work-card')).toHaveCount(6);
  await page.getByLabel('Menu').click();
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  await page.getByRole('link', { name: 'Explore the case study' }).first().click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Arbiter AI');
  await context.close();
});

test('collection filters, search, pagination, project notes and volunteering', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.work-card')).toHaveCount(6);
  await expect(page.getByRole('button', { name: 'Next projects' })).toHaveCount(0);
  await page.getByRole('button', { name: /^Security/ }).click();
  await expect(page.locator('.work-card')).toHaveCount(3);
  await page.getByRole('button', { name: /^Applied AI/ }).click();
  await expect(page.locator('.work-card')).toHaveCount(3);
  await page.getByRole('button', { name: /^All work/ }).click();
  await page.getByRole('searchbox', { name: 'Search projects' }).fill('honeypot');
  await expect(page.locator('.work-card')).toHaveCount(1);
  await page.getByRole('link', { name: 'Explore the case study' }).click();
  await expect(page.locator('#limitations')).toContainText('Network isolation depends on explicit configuration');
  await page.goto('/');
  await page.getByRole('searchbox', { name: 'Search projects' }).fill('no-such-project');
  await expect(page.locator('.gallery-pagination [role="status"]')).toContainText('No matching projects');
  await page.locator('.journey-item').last().locator('summary').click();
  await expect(page.locator('.journey-item').last().locator('.journey-expanded')).toBeVisible();
  await expect(page.locator('.journey-item').last()).toContainText('Aug 2024 — Jan 2025');
  await expect(page.locator('.journey-item')).toHaveCount(3);
  await expect(page.locator('#hero-title')).toContainText('Haryshwa Nair');
  await expect(page.locator('.intro-location')).toContainText('Based in the NYC area · Open to relocation');
  await expect(page.locator('.journey-item').nth(1)).toContainText('Lead since June 2026');
});

test('pointer tracking responds and turns off for reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.locator('.gallery-tools')).toBeVisible();
  await page.mouse.move(720, 350);
  await expect(page.locator('.cursor-ring')).toHaveCSS('opacity', '1');
  expect(await page.locator('.cursor-ring').evaluate(el => getComputedStyle(el).transform)).not.toBe('none');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.cursor-ring')).toHaveCSS('display', 'none');
  await expect(page.locator('.portrait-frame')).toHaveCSS('transform', 'none');
});

test('gallery and introduction fit tablet and desktop widths', async ({ page }) => {
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.locator('.gallery-tools')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `width ${width}`).toBe(true);
    if (width === 375 || width === 1440) {
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `reports/portfolio-${width}.png` });
    }
    await page.getByRole('button', { name: /^Applied AI/ }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `page two width ${width}`).toBe(true);
  }
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




test('architecture playback, component inspection, reduced motion and source omissions', async ({ page }) => {
  for (const slug of ['arbiter-ai', 'trustkit-ai', 'sentinelscope', 'ssh-honeypot']) {
    await page.goto(`/projects/${slug}`);
    const map = page.locator('.system-map');
    await map.scrollIntoViewIfNeeded();
    await expect(map.getByRole('button', { name: 'Pause walkthrough' })).toBeVisible();
    await map.getByRole('button', { name: 'Pause walkthrough' }).click();
    await map.getByRole('button', { name: 'Reset', exact: true }).click();
    await map.getByRole('button', { name: 'Next stage' }).click();
    await expect(map.locator('.map-stage').nth(1)).toHaveAttribute('data-current', 'true');
    await map.locator('.map-node').last().click();
    await expect(map.locator('.map-node').last()).toHaveAttribute('aria-pressed', 'true');
    await expect(map.locator('.map-source')).toHaveAttribute('href', /blob\/[a-f0-9]{40}\//);
    await map.getByRole('button', { name: 'Play walkthrough' }).click();
    await expect(map.locator('.map-stage').first()).toHaveAttribute('data-current', 'true');
    await expect(map.locator('.map-stage').nth(1)).toHaveAttribute('data-current', 'true', { timeout: 5000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(map).toHaveAttribute('data-running', 'false');
    await expect(map.getByRole('button', { name: /Play walkthrough|Pause walkthrough/ })).toHaveCount(0);
    await map.getByRole('button', { name: 'Reset', exact: true }).click();
    await map.getByRole('button', { name: 'Next stage' }).click();
    await expect(map.locator('.map-stage').nth(1)).toHaveAttribute('data-current', 'true');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
  }
  for (const slug of ['navexis', 'clean-energy', 'steganography']) {
    const response = await page.goto(`/projects/${slug}`);
    expect(response?.status()).toBe(404);
    await expect(page.locator('body')).not.toContainText('Source unavailable');
  }
});

test('homepage decision scenarios are distinct and animate locally', async ({ page }) => {
  await page.goto('/');
  const demo = page.locator('.triage-demo');
  await demo.getByRole('button', { name: 'Ambiguous event', exact: true }).click();
  await expect(demo).toContainText('Local Ollama review');
  await demo.getByRole('button', { name: 'Animate this route' }).click();
  await expect(demo.locator('.demo-step').nth(1)).toHaveAttribute('data-active', 'true', { timeout: 3000 });
  await demo.getByRole('button', { name: 'Pause example' }).click();
  await demo.getByRole('button', { name: 'Clear rule match', exact: true }).click();
  await expect(demo).toContainText('Bypassed');
  await expect(demo.locator('.demo-step').first()).toHaveAttribute('data-active', 'true');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(demo.getByRole('button', { name: 'Animate this route' })).toHaveCount(0);
});


test('full introduction, contact arrow, clean labels and detailed flows', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#hero-title')).toContainText('Thaithe Kalathil Haryshwa Nair');
  await expect(page.getByRole('link', { name: 'Get in touch', exact: true })).toHaveCount(0);
  await expect(page.locator('.closing-quote blockquote')).toBeVisible();
  await expect(page.locator('.connection-quote')).toContainText('A thoughtful conversation');
  for (const route of ['/work', '/projects/financial-rag', '/projects/sentinelscope']) {
    await page.goto(route);
    await expect(page.locator('body')).not.toContainText(/source (available|unavailable)/i);
  }
  for (const slug of ['arbiter-ai', 'trustkit-ai', 'ssh-honeypot']) {
    await page.goto(`/projects/${slug}`);
    await expect(page.locator('.project-flow')).toBeVisible();
    await expect(page.locator('.flow-box')).toHaveCount(slug === 'arbiter-ai' ? 10 : slug === 'trustkit-ai' ? 14 : 11);
    await page.setViewportSize({ width: 375, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const region = page.locator('.flow-scroll');
    await region.focus();
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => region.evaluate(el => el.scrollLeft)).toBeGreaterThan(0);
  }
});


test('closing quote changes on reload and stays fixed during a visit', async ({ page }) => {
  await page.goto('/');
  await expect.poll(() => page.evaluate(() => sessionStorage.getItem('portfolio-quote'))).not.toBeNull();
  const previous = await page.locator('.closing-quote blockquote').innerText();
  await page.reload();
  await expect(page.locator('.closing-quote blockquote')).not.toHaveText(previous);
  const next = await page.locator('.closing-quote blockquote').innerText();
  await page.getByRole('button', { name: /^Security/ }).click();
  await expect(page.locator('.closing-quote blockquote')).toHaveText(next);
});
