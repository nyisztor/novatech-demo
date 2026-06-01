import { defineConfig } from '@playwright/test';

const PORT = Number(process.env.PORT) || 3000;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  webServer: {
    command: `npx --no-install serve src -l ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
