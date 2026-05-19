// @ts-check
import { test, expect } from '@playwright/test';

const HOMEPAGE_URL = 'https://www.cashewnotes.com/';

test.describe('Cashew Notes - Homepage & Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(HOMEPAGE_URL, { waitUntil: 'load' });
  });

  test('homepage loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(HOMEPAGE_URL);
    await expect(page).toHaveTitle(/Home/i);
    await expect(
      page.getByRole('heading', { name: /help our farmers/i })
    ).toBeVisible();
  });

  test('primary navigation links are visible', async ({ page }) => {
    const navItems = [
      'Home',
      'The Model',
      'The Farmers',
      'Our Brand',
      'Our Action',
      'About Us',
    ];

    for (const name of navItems) {
      await expect(
        page.getByRole('link', { name, exact: true }).first()
      ).toBeVisible();
    }
  });

  test('navigates to The Model page', async ({ page }) => {
    await Promise.all([
      page.waitForURL(/\/model/, { timeout: 20000 }),
      page
        .getByRole('link', { name: 'The Model', exact: true })
        .first()
        .click({ noWaitAfter: true }),
    ]);
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('navigates to The Farmers page', async ({ page }) => {
    await Promise.all([
      page.waitForURL(/\/farmers/, { timeout: 20000 }),
      page
        .getByRole('link', { name: 'The Farmers', exact: true })
        .first()
        .click({ noWaitAfter: true }),
    ]);
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('navigates to Our Brand page', async ({ page }) => {
    await Promise.all([
      page.waitForURL(/\/brand/, { timeout: 20000 }),
      page
        .getByRole('link', { name: 'Our Brand', exact: true })
        .first()
        .click({ noWaitAfter: true }),
    ]);
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('navigates to Our Action page', async ({ page }) => {
    await Promise.all([
      page.waitForURL(/\/action/, { timeout: 20000 }),
      page
        .getByRole('link', { name: 'Our Action', exact: true })
        .first()
        .click({ noWaitAfter: true }),
    ]);
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('navigates to About Us page', async ({ page }) => {
    await Promise.all([
      page.waitForURL(/\/about/, { timeout: 20000 }),
      page
        .getByRole('link', { name: 'About Us', exact: true })
        .first()
        .click({ noWaitAfter: true }),
    ]);
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('Login link points to the login page', async ({ page }) => {
    const loginLink = page.locator('a[href*="/account/login"]').first();

    await expect(loginLink).toHaveAttribute('href', /\/account\/login/);
  });

  test('Signup link points to the signup page', async ({ page }) => {
    const signupLink = page.locator('a[href*="/account/signup"]').first();

    await expect(signupLink).toHaveAttribute('href', /\/account\/signup/);
  });

  test('returns to homepage from another page', async ({ page }) => {
    await Promise.all([
      page.waitForURL(/\/about/, { timeout: 20000 }),
      page
        .getByRole('link', { name: 'About Us', exact: true })
        .first()
        .click({ noWaitAfter: true }),
    ]);

    await Promise.all([
      page.waitForURL(HOMEPAGE_URL, { timeout: 20000 }),
      page
        .getByRole('link', { name: 'Home', exact: true })
        .first()
        .click({ noWaitAfter: true }),
    ]);

    await expect(
      page.getByRole('heading', { name: /help our farmers/i })
    ).toBeVisible();
  });
});
