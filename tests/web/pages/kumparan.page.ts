import { expect, Page } from '@playwright/test';
import { L } from '../locators';

export class Kumparan {
  constructor(readonly page: Page, readonly isMobile: boolean) {}

  async goHome() {
    await this.page.goto('/');
    await expect(this.page).toHaveURL(/kumparan\.com/);
    await this.dismissNotificationPopup();
  }

  /** Popup "Nyalakan notifikasi..." (best effort, supaya tidak menutupi elemen). */
  private async dismissNotificationPopup() {
    const no = this.page.getByRole('button', { name: 'TIDAK', exact: true });
    if (await no.isVisible()) await no.click();
  }

  async search(term: string) {
    if (this.isMobile) {
      // mobile: header hanya punya ikon search (link), input muncul setelah diklik
      await this.page.getByRole('banner').getByRole('link', { name: 'search', exact: true }).click();
    }
    const input = L.searchInput(this.page);
    await expect(input).toBeVisible();
    await input.fill(term);
    await input.press('Enter');
  }
}