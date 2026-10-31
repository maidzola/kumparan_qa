import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

const baseURL = process.env.KUMPARAN_BASE_URL ?? 'https://kumparan.com';
const isCI = !!process.env.CI;

const DESKTOP = { ...devices['Desktop Chrome'] };
const MOBILE = { ...devices['Pixel 7'] };

export default defineConfig({
  testDir: './tests/web',
  fullyParallel: true,                 // every test is independent -> parallel at test level
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,               // retries only in CI; trace is captured on first retry
  workers: isCI ? 4 : undefined,       // third-party site: keep modest to avoid rate limiting
  timeout: 45_000,                     // per test
  expect: { timeout: 10_000 },         // per web-first assertion
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    testIdAttribute: 'data-qa-id',     // page.getByTestId('x') === [data-qa-id="x"]; codegen uses it too
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    locale: 'id-ID',
    timezoneId: 'Asia/Jakarta',
  },
  projects: [
    { name: 'desktop', testMatch: /.*\.spec\.ts/, use: DESKTOP },
    { name: 'mobile', testMatch: /.*\.spec\.ts/, use: MOBILE },
  ],
});
