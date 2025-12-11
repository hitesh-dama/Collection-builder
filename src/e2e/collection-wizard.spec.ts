import { test, expect } from '@playwright/test';

test.describe('Collection Builder with Inline Editing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('Landing page to template selection to wizard flow', async ({ page }) => {
    await page.goto('/');

    // Step 1: Landing page
    await expect(
      page.getByRole('heading', { name: /What would you like to build today/i })
    ).toBeVisible();

    // Click on Group Gifts card
    await page.getByRole('button', { name: /Group Gifts/i }).click();

    // Step 2: Template selection screen appears
    await expect(
      page.getByRole('heading', { name: /Collection: Group Gifts/i })
    ).toBeVisible();

    // Verify template selection options
    await expect(page.getByText(/Create from scratch/i).first()).toBeVisible();
    await expect(page.getByText(/Get Recommendations/i).first()).toBeVisible();
    await expect(page.getByText(/Ready to use templates/i)).toBeVisible();

    // Click "Get Recommendations" button
    await page.getByRole('button', { name: /Get Recommendations/i }).click();

    // Verify navigation to wizard
    await expect(page).toHaveURL(/.*wizard/);

    // Verify navigation to wizard
    await expect(page).toHaveURL(/.*wizard/);

    // Step 3: Input screen appears
    await expect(
      page.getByRole('heading', { name: /Welcome! Let's get your collection started./i })
    ).toBeVisible();

    // Enter prompt
    const promptInput = page.getByPlaceholder(/I'm collecting a group gift for/i);
    await promptInput.fill('I need a page that will help me collect donations for a wedding gift');
    await promptInput.press('Enter');

    // Step 3: Loading - Cube animation
    await expect(page.getByText(/here is an example/i)).toBeVisible({ timeout: 2000 });

    // Step 4: Wait for result (cube → skeleton → result takes ~3s)
    await page.waitForTimeout(6000);

    // Step 5: Result appears - check for title
    await expect(
      page.locator('h1').filter({ hasText: /wedding gift/i })
    ).toBeVisible({ timeout: 3000 });

    // Check for buttons in result
    await expect(page.getByRole('button', { name: /preview/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /try this out/i })).toBeVisible();

    // Add custom donation button should be visible
    await expect(page.getByText(/add custom donation/i)).toBeVisible();
  });

  test('Complete wizard flow: Input → Loading → Result', async ({ page }) => {
    await page.goto('/');

    // Navigate through landing → template selection → wizard
    await page.getByRole('button', { name: /Group Gifts/i }).click();
    await page.getByRole('button', { name: /Get Recommendations/i }).click();
    await expect(page).toHaveURL(/.*wizard/);

    // Step 1: Input screen
    await expect(
      page.getByRole('heading', { name: /Welcome! Let's get your collection started./i })
    ).toBeVisible();

    // Enter prompt
    const promptInput = page.getByPlaceholder(/I'm collecting a group gift for/i);
    await promptInput.fill('I need a page that will help me collect donations for a wedding gift');
    await promptInput.press('Enter');

    // Step 2: Loading - Cube animation
    await expect(page.getByText(/here is an example/i)).toBeVisible({ timeout: 2000 });

    // Step 3: Wait for result (cube → skeleton → result takes ~3s)
    await page.waitForTimeout(6000);

    // Step 4: Result appears - check for title
    await expect(
      page.locator('h1').filter({ hasText: /wedding gift/i })
    ).toBeVisible({ timeout: 3000 });

    // Check for buttons in result
    await expect(page.getByRole('button', { name: /preview/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /try this out/i })).toBeVisible();

    // Add custom donation button should be visible
    await expect(page.getByText(/add custom donation/i)).toBeVisible();
  });

  test('Inline editing: Title with checkmark and X', async ({ page }) => {
    await page.goto('/');

    // Navigate through landing → template selection → wizard
    await page.getByRole('button', { name: /Group Gifts/i }).click();
    await page.getByRole('button', { name: /Get Recommendations/i }).click();
    await expect(page).toHaveURL(/.*wizard/);

    // Quick path to result using Christmas chip
    await page.getByRole('button', { name: /christmas/i }).click();
    await page.waitForTimeout(5000); // Wait for loading phases

    // Find and click on the main title to edit
    const title = page.locator('h1 button').filter({ hasText: /wedding gift/i }).first();
    await expect(title).toBeVisible();
    await title.click();

    // Input field should appear
    const titleInput = page.locator('input[type="text"]').first();
    await expect(titleInput).toBeVisible();

    // Clear and type new title
    await titleInput.fill('Custom Wedding Collection');

    // Find the checkmark button (should have Check icon)
    await page.locator('button[aria-label="Save collection title"]').first().click();

    // Title should update
    await expect(page.locator('h1').filter({ hasText: /custom wedding collection/i })).toBeVisible();
  });

  test('Add custom donation panel', async ({ page }) => {
    await page.goto('/');

    // Navigate through landing → template selection → wizard
    await page.getByRole('button', { name: /Group Gifts/i }).click();
    await page.getByRole('button', { name: /Get Recommendations/i }).click();
    await expect(page).toHaveURL(/.*wizard/);

    // Use Christmas chip for quick result
    await page.getByRole('button', { name: /christmas/i }).click();
    await page.waitForTimeout(5000);

    // Click "Add custom donation"
    await page.getByText(/add custom donation/i).click();

    // Panel should appear with default content
    await expect(page.getByText(/donation title/i)).toBeVisible();
    await expect(page.getByText(/donation description/i)).toBeVisible();
  });

  test('Data persistence: localStorage saves collection', async ({ page }) => {
    await page.goto('/');

    // Navigate through landing → template selection → wizard
    await page.getByRole('button', { name: /Group Gifts/i }).click();
    await page.getByRole('button', { name: /Get Recommendations/i }).click();
    await expect(page).toHaveURL(/.*wizard/);

    // Generate collection
    await page.getByRole('button', { name: /retirement/i }).click();
    await page.waitForTimeout(7000);

    // Verify in localStorage
    const storedData = await page.evaluate(() => {
      const data = localStorage.getItem('cheddar_collections');
      return data ? JSON.parse(data) : null;
    });

    expect(storedData).toBeTruthy();
    expect(Array.isArray(storedData)).toBe(true);
    expect(storedData.length).toBeGreaterThan(0);
  });

  test('Previous button returns to input', async ({ page }) => {
    await page.goto('/');

    // Navigate through landing → template selection → wizard
    await page.getByRole('button', { name: /Group Gifts/i }).click();
    await page.getByRole('button', { name: /Get Recommendations/i }).click();
    await expect(page).toHaveURL(/.*wizard/);

    // Generate using chip
    await page.getByRole('button', { name: /staff giving/i }).click();
    await page.waitForTimeout(5000);

    // Click Previous button
    await page.getByRole('button', { name: /previous/i }).click();

    // Should be back at input screen
    await expect(page.getByRole('heading', { name: /Welcome! Let's get your collection started./i })).toBeVisible();
    await expect(page.getByPlaceholder(/I'm collecting a group gift for/i)).toBeVisible();
  });

  test('Suggestion chips work correctly', async ({ page }) => {
    await page.goto('/');

    // Navigate through landing → template selection → wizard
    await page.getByRole('button', { name: /Group Gifts/i }).click();
    await page.getByRole('button', { name: /Get Recommendations/i }).click();
    await expect(page).toHaveURL(/.*wizard/);

    // Verify all suggestion chips are visible
    await expect(page.getByRole('button', { name: /christmas/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /baby shower/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /retirement/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /staff giving/i })).toBeVisible();

    // Click Baby Shower chip
    await page.getByRole('button', { name: /baby shower/i }).click();

    // Loading message should appear
    await expect(page.getByText(/here is an example/i)).toBeVisible({ timeout: 2000 });

    // Result should eventually appear
    await page.waitForTimeout(6000);
    await expect(page.locator('h1').filter({ hasText: /baby shower/i })).toBeVisible();
  });

  test('Error handling: Search for "error" shows error message and allows retry', async ({ page }) => {
    await page.goto('/');

    // Navigate through landing → template selection → wizard
    await page.getByRole('button', { name: /Group Gifts/i }).click();
    await page.getByRole('button', { name: /Get Recommendations/i }).click();
    await expect(page).toHaveURL(/.*wizard/);

    // Enter "error" prompt
    const promptInput = page.getByPlaceholder(/I'm collecting a group gift for/i);
    await promptInput.fill('error');
    await promptInput.press('Enter');

    // Wait for error message
    await expect(page.getByText(/Something went wrong. Please try again./i)).toBeVisible({ timeout: 10000 });

    // Verify Retry button
    const retryButton = page.getByRole('button', { name: /Retry/i });
    await expect(retryButton).toBeVisible();

    // Verify input still has "error"
    await expect(promptInput).toHaveValue('error');

    // Click retry
    await retryButton.click();

    // Should show loading state (error message disappears)
    await expect(page.getByText(/Something went wrong. Please try again./i)).not.toBeVisible();
    await expect(page.getByText(/here is an example/i)).toBeVisible();
  });
});
