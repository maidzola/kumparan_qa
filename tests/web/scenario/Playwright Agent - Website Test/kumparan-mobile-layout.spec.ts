import { test, expect } from '../../fixtures';

test('mobile navigation, search, and audio story are usable', async ({ app, page, isMobile }) => {
  test.skip(!isMobile, 'This scenario covers the mobile layout.');

  await app.goHome();

  const menuButton = page.getByTestId('burger-menu');
  const searchButton = page.getByTestId('hd-search');
  await expect(menuButton).toBeVisible();
  await expect(searchButton).toBeVisible();
  await expect(page.getByRole('img', { name: 'Kumparan Logo' })).toBeVisible();

  await menuButton.click();
  const sideNavigation = page.getByRole('region', { name: 'navigation side' });
  await expect(sideNavigation).toBeVisible();
  await sideNavigation.getByRole('button', { name: 'close' }).click();

  await page.getByRole('banner').getByRole('link', { name: 'News', exact: true }).click();
  await expect(page).toHaveURL(/\/channel\/news\/?$/);
  await expect(page.getByRole('main').getByRole('link', { name: 'news-card-label-link' }).first()).toBeVisible();

  await searchButton.click();
  const searchInput = page.getByTestId('input-search');
  await expect(searchInput).toBeVisible();
  await searchInput.fill('Prabowo');

  const suggestion = page.getByRole('button', { name: 'Prabowo', exact: true });
  await expect(suggestion).toBeVisible();
  await suggestion.click();
  await expect(page).toHaveURL(/\/search\/Prabowo\/?$/);
  await expect(page.getByRole('button', { name: 'Konten', exact: true })).toBeVisible();

  await menuButton.click();
  await page.getByTestId('label-list-item-audio story').click();
  await expect(page).toHaveURL(/\/audio-story\/?$/);

  const firstAudioStory = page.locator('main').getByRole('link', { name: /^\d{2}:\d{2}/ }).first();
  await expect(firstAudioStory).toBeVisible();
  await firstAudioStory.click();

  await expect(page).toHaveURL(/\/audio-story\/\d+$/);
  await expect(page.getByRole('button', { name: 'Tampilkan lebih banyak' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'backward-5s' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'forward-5s' })).toBeVisible();
});