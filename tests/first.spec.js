// @ts-check
import { test, expect } from '@playwright/test';

test('can search on wikipedia', async ({ page }) => {
  await page.goto('https://www.wikipedia.org');

  // Type into the search input
  await page.getByRole('searchbox').fill('Playwright (software)');

  // Press Enter to search
  await page.keyboard.press('Enter');

  // Assert we landed on a results or article page
  await expect(page).toHaveURL(/search|Playwright/);

  // Assert there's an h1 on the new page
  await expect(page.locator('h1')).toBeVisible();
  await page.waitForTimeout(3000);

 
  // page.getByRole('textbox', { name: 'Email' })
  // page.getByRole('heading', { name: 'Products' })

  // // 2. GOOD — label-bound, works with forms
  // page.getByLabel('Password')

  // // 3. GOOD — visible text
  // page.getByText('Sign in')

  // // 4. GOOD — placeholder text
  // page.getByPlaceholder('Search...')

  // // 5. OK — test IDs (stable but non-semantic)
  // page.getByTestId('submit-btn')   // data-testid="submit-btn"

  // // 6. LAST RESORT — CSS / XPath (fragile, avoid)
  // page.locator('.btn-primary')     // breaks when CSS changes
  // page.locator('//button[1]')      // breaks when DOM changes
  });

test('assert Installation pages', async ({ page })=>{
await page.goto('https://playwright.dev/');
 // 1. BEST — semantic, accessible, resilient to style changes
  
  // await page.getByRole('button', { name: 'Get started' })
  await page.getByRole('link', { name: 'Get started' }).click();
     
  await expect(page.getByRole('heading', {name: 'Installation'})).toBeVisible();
  await expect(page.locator('h1')).toBeVisible();
  await page.waitForTimeout(3000);
  await expect(page.getByRole('heading', {name: 'Introduction'})).toBeVisible();
  await expect(page.locator('h2')).toHaveCount(9);
  await expect(page.getByRole('heading', {name: 'Installing Playwright'})).toBeVisible();
  
  await page.waitForTimeout(3000);
});
// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
//   await page.waitForTimeout(3000);
// });