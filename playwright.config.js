// @ts-check
const { defineConfig, devices } = require('@playwright/test');

// Set BASE_URL to test a deployed site (e.g. production); otherwise a local server is started.
const BASE_URL = process.env.BASE_URL;
const LOCAL = 'http://localhost:4173';

module.exports = defineConfig({
  testDir: 'tests',
  timeout: 30_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 4,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list']],
  use: {
    baseURL: BASE_URL || LOCAL,
    timezoneId: 'America/New_York',
    locale: 'en-US',
    reducedMotion: 'reduce', // skip decorative animations; keeps tests fast and stable
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: BASE_URL
    ? undefined
    : { command: 'npx serve -l 4173 --no-clipboard .', url: LOCAL, reuseExistingServer: !process.env.CI },
});
