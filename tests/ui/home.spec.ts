import { test, expect } from '@playwright/test';

/**
 * T-000 pipeline check. Proves the config, target switching and CI work
 * before the agent team starts on T-001. Keep it; it doubles as the
 * "is the site up?" signal the triage uses to spot environment failures.
 */
test.describe('Home page', () => {
  test('loads and lists products @smoke', async ({ page }) => {
    await page.goto('/');

    await expect(page, 'page title should name the Toolshop').toHaveTitle(/Toolshop/i);
    await expect(
      page.getByRole('link', { name: /sign in/i }),
      'sign-in link should be visible in the header',
    ).toBeVisible();
    // Catalog content is covered by T-002 (search) and T-004 (filters).
  });
});
