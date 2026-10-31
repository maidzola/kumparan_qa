/**
 * Dumps every [data-qa-id] found on key pages (desktop + mobile) so that
 * tests/web/locators.ts can be filled with REAL ids instead of guesses.
 * Run: npm run discover:qa-ids
 */
import { chromium, devices } from '@playwright/test';
import { writeFileSync } from 'fs';
import 'dotenv/config';

const base = process.env.KUMPARAN_BASE_URL ?? 'https://kumparan.com';

(async () => {
  const browser = await chromium.launch();
  const result: Record<string, Record<string, string[]>> = {};
  const profiles = { desktop: devices['Desktop Chrome'], mobile: devices['Pixel 7'] };
  for (const [label, device] of Object.entries(profiles)) {
    const ctx = await browser.newContext({ ...device, locale: 'id-ID' });
    const page = await ctx.newPage();
    result[label] = {};
    const visit = async (name: string, url: string) => {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('networkidle').catch(() => {});
      result[label][name] = await page.$$eval('[data-qa-id]', els => [
        ...new Set(els.map(e => `${e.tagName.toLowerCase()}[data-qa-id="${e.getAttribute('data-qa-id')}"]`)),
      ]);
    };
    await visit('home', base);
    await visit('search', `${base}/search?q=jakarta`);
    await page.goto(base, { waitUntil: 'domcontentloaded' });
    const href = await page.$$eval('a[href]', as =>
      as.map(a => a.getAttribute('href') ?? '').find(h => /^\/[^/]+\/[^/]+/.test(h)) ?? '');
    if (href) await visit('article', new URL(href, base).toString());
    await ctx.close();
  }
  writeFileSync('discovered-qa-ids.json', JSON.stringify(result, null, 2));
  console.log('Saved discovered-qa-ids.json');
  await browser.close();
})();
