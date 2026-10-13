import { test, expect } from '@playwright/test';

function customerCredentials() {
  const email = process.env.TOOLSHOP_CUSTOMER_EMAIL;
  const password = process.env.TOOLSHOP_CUSTOMER_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'Customer login tests require TOOLSHOP_CUSTOMER_EMAIL and TOOLSHOP_CUSTOMER_PASSWORD.',
    );
  }

  return { email, password };
}

test.describe('Customer login', () => {
  test('customer can log in with valid credentials @smoke', async ({ page }) => {
    const { email, password } = customerCredentials();
    await page.goto('/auth/login');
    await page.getByLabel('Email address').fill(email);
    await page.getByPlaceholder('Your password', { exact: true }).fill(password);
    await page.getByRole('button', { name: 'Login', exact: true }).click();

    await expect(page, 'signed-in customer should land on their account page').toHaveURL(
      /\/account\/?$/,
    );
    await expect(
      page.getByRole('heading', { name: 'My account', exact: true }),
      'signed-in customer should see My account',
    ).toBeVisible();
  });

  test('customer cannot log in with a wrong password @smoke', async ({ page }) => {
    const { email, password } = customerCredentials();
    // Keep the valid length so the request reaches authentication, not form validation.
    const wrongPassword = `${password.startsWith('A') ? 'B' : 'A'}${password.slice(1)}`;
    await page.goto('/auth/login');
    await page.getByLabel('Email address').fill(email);
    await page.getByPlaceholder('Your password', { exact: true }).fill(wrongPassword);

    const loginResponse = page.waitForResponse(
      response =>
        new URL(response.url()).pathname === '/users/login' &&
        response.request().method() === 'POST',
    );
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    await loginResponse;

    await expect(
      page.getByText('Invalid email or password', { exact: true }),
      'customer should see an error when their password is wrong',
    ).toBeVisible();
    await expect(page, 'customer with a wrong password should stay on the login page').toHaveURL(
      /\/auth\/login\/?$/,
    );
  });
});
