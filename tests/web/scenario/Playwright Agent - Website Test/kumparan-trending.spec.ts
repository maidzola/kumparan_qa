import { test, expect } from '../../fixtures';

test('trending discovery page loads', async ({ app, page, isMobile }) => {
  await app.goHome();

  if (isMobile) {
    await page.goto('/trending');
  } else {
    await page.getByTestId('header-section').getByRole('link', { name: 'Trending', exact: true }).click();
  }

  await expect(page).toHaveURL(/\/trending\/?$/);
  if (isMobile) {
    await expect(page.getByRole('main').getByRole('link', { name: 'news-card-label-link' }).first()).toBeVisible();
  } else {
    await expect(page.getByRole('heading', { name: 'Trending', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Semua', exact: true })).toBeVisible();
  }
});