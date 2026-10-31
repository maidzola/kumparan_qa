import { test, expect } from '../../fixtures';

test('search suggestions lead to filtered results', async ({ app, page, isMobile }) => {
  await app.goHome();

  if (isMobile) {
    await page.getByTestId('hd-search').click();
  }

  const searchInput = page.getByTestId('input-search');
  await expect(searchInput).toBeVisible();
  await searchInput.fill('Prabowo');

  const suggestion = page.getByRole('button', { name: 'Prabowo', exact: true });
  await expect(suggestion).toBeVisible();
  await suggestion.click();

  await expect(page).toHaveURL(/\/search\/Prabowo\/?$/);
  await expect(page.getByRole('button', { name: 'Konten', exact: true })).toBeVisible();
  const topicFilter = page.getByTestId('tab-topic');
  await expect(topicFilter).toBeVisible();

  if (!isMobile) {
    await expect(page.getByRole('heading', { name: 'Hasil Pencarian', exact: true })).toBeVisible();
  }

  await topicFilter.click();
  await expect(page).toHaveURL(/\/search\/Prabowo\/topik\/?$/);
  await expect(topicFilter).toBeVisible();
});