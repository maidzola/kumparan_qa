import { test, expect } from '../../fixtures';

test('homepage renders and top-level navigation works on desktop', async ({ app, page, isMobile }) => {
  test.skip(isMobile, 'This scenario covers the desktop navigation layout.');

  await app.goHome();

  await expect(page).toHaveTitle(/kumparan/i);
  await expect(page.getByRole('link', { name: 'Kumparan Logo' })).toBeVisible();
  await expect(page.getByTestId('input-search')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Masuk', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Buat Tulisan', exact: true })).toBeVisible();

  const mainMenu = page.getByTestId('main-menu');
  const newsLink = mainMenu.getByRole('link', { name: 'News', exact: true });
  await expect(newsLink).toBeVisible();
  await newsLink.click();

  await expect(page).toHaveURL(/\/channel\/news\/?$/);
  await expect(page.getByRole('heading', { name: 'News', exact: true })).toBeVisible();

  await page.getByTestId('hd-home').click();
  await expect(page).toHaveURL('https://kumparan.com/');
  await expect(page).toHaveTitle(/kumparan/i);
});