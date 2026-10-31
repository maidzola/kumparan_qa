import { Page, Locator } from '@playwright/test';

/**
 * SINGLE place for selectors.
 * Strategy: prefer [data-qa-id]; fall back to role/text (the `.or()` chain).
 * Ids in QA are placeholders until verified with `npm run discover:qa-ids` / codegen.
 */
export const QA = {
  searchInput: 'search-input',
  loginButton: 'login-button',
  menuButton: 'menu-button',          // mobile hamburger
  searchResultItem: 'search-result-item',
  searchEmptyState: 'search-empty-state',
} as const;

export const qa = (page: Page, id: string): Locator => page.locator(`[data-qa-id="${id}"]`);

export const L = {
  // ---- navigation ----
  menuButton: (p: Page) =>
    qa(p, QA.menuButton)
      .or(p.getByRole('button', { name: 'hamburger-menu' }))   // mobile
      .first(),

  loginButton: (p: Page) =>
    qa(p, QA.loginButton)
      .or(p.getByRole('button', { name: 'Masuk' }))            // desktop: tombol di header
      .or(p.locator('a').filter({ hasText: /^\s*Masuk\s*$/ })) // mobile: link di dalam menu
      .first(),

  // ---- search ----
  searchInput: (p: Page) =>
    qa(p, QA.searchInput)
      .or(p.getByPlaceholder('Cari di sini...'))               // sama di desktop & mobile
      .first(),

  searchResults: (p: Page) =>
    qa(p, QA.searchResultItem)
      .or(p.getByRole('link', { name: 'news-card-label-link' })),

  // penanda "kita ada di halaman hasil pencarian" (ada di desktop & mobile)
  searchPage: (p: Page) => p.getByRole('button', { name: 'Konten', exact: true }),

  searchEmpty: (p: Page) =>
    qa(p, QA.searchEmptyState)
      .or(p.getByText(/tidak ditemukan|tidak ada hasil|no results/i))
      .first(),
};