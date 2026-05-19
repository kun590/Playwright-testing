// @ts-check
import { test, expect } from '@playwright/test';

const HOMEPAGE_URL = 'https://playwright.dev/';

test.describe('Homepage', () => {
  test('loads successfully', async ({ page }) => {
    const response = await page.goto(HOMEPAGE_URL);

    expect(response?.ok()).toBeTruthy();
    await expect(page).toHaveURL(HOMEPAGE_URL);
    await expect(page).toHaveTitle(/Playwright/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('navigation to Docs works', async ({ page }) => {
    await page.goto(HOMEPAGE_URL);

    await page.getByRole('link', { name: 'Docs' }).first().click();

    await expect(page).toHaveURL(/.*docs\/intro/);
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });

  test('navigation to API works', async ({ page }) => {
    await page.goto(HOMEPAGE_URL);

    await page.getByRole('link', { name: 'API', exact: true }).first().click();

    await expect(page).toHaveURL(/.*docs\/api\/.*/);
    await expect(page.getByRole('heading', { name: 'Playwright Library' })).toBeVisible();
  });

  test('navigation back to homepage works', async ({ page }) => {
    await page.goto(HOMEPAGE_URL);
    await page.getByRole('link', { name: 'Docs' }).first().click();
    await expect(page).toHaveURL(/.*docs\/intro/);

    await page.getByRole('link', { name: 'Playwright logo Playwright' }).click();

    await expect(page).toHaveURL(HOMEPAGE_URL);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});
