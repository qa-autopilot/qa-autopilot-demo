import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';
import { currentTarget } from './fixtures/targets';

const target = currentTarget();
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  // One retry in CI so the triage can tell "flaky" (passed on retry) from "failing".
  retries: isCI ? 1 : 0,
  // Toolshop is a shared public site: keep the load polite.
  workers: isCI ? 2 : 3,
  timeout: 30_000,
  expect: { timeout: 7_000 },

  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    // The triage reads this file.
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  use: {
    baseURL: target.webUrl,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
    testIdAttribute: 'data-test',
  },

  metadata: {
    target: target.name,
    webUrl: target.webUrl,
    apiUrl: target.apiUrl,
  },

  projects: [
    {
      name: 'api',
      testMatch: /tests\/api\/.*\.spec\.ts/,
      use: { baseURL: target.apiUrl },
    },
    {
      name: 'chromium',
      testMatch: /tests\/(ui|hybrid)\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
