import { test as base, expect } from '@playwright/test';
import { Kumparan } from '../pages/kumparan.page';

type Fixtures = {
  /** Page object; tiap test otomatis dapat browser context baru (terisolasi). */
  app: Kumparan;
};

export const test = base.extend<Fixtures>({
  app: async ({ page, isMobile }, use) => {
    await use(new Kumparan(page, isMobile));
  },
});

export { expect };