import { test, expect } from '../../fixtures';
import { L } from '../../locators';

// ───────────── Home & navigation ─────────────
test.describe('Home & navigation', () => {
  test('TC-WEB-001 home page loads with header and article list', async ({ app, page }) => {
    await app.goHome();
    await expect(page).toHaveTitle(/kumparan/i);
    await expect(page.locator('header').first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'news-card-label-link' }).first()).toBeVisible();
  });

  test('TC-WEB-002 login entry is reachable on desktop and mobile', async ({ app, page, isMobile }) => {
    await app.goHome();
    if (isMobile) {
      await expect(L.menuButton(page)).toBeVisible();   // mobile: hamburger ada
      await L.menuButton(page).click();                 // login ada di dalam menu
    }
    await expect(L.loginButton(page)).toBeVisible();    // desktop: langsung terlihat di header
  });
});

// ───────────── Search ─────────────
test.describe('Search', () => {
  test('TC-WEB-003 valid keyword returns results', async ({ app, page }) => {
    await app.goHome();
    await app.search('jakarta');
    await expect(page).toHaveURL(/search|q=|jakarta/i);
    await expect(L.searchPage(page)).toBeVisible();
    await expect(L.searchResults(page).filter({ hasText: /jakarta/i }).first()).toBeVisible();
  });

  test('TC-WEB-004 nonsense keyword shows empty state, no crash', async ({ app, page }) => {
    await app.goHome();
    await app.search('zzqxjvkw' + Date.now());
    await expect(L.searchEmpty(page)).toBeVisible();
  });

  test('TC-WEB-005 boundary: very long keyword (1000 chars) is handled gracefully', async ({ app, page }) => {
    await app.goHome();
    await app.search('a'.repeat(1000));
    await expect(L.searchPage(page)).toBeVisible();
  });
});