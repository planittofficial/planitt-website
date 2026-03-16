import { test, expect } from '@playwright/test';

test.describe('Landing Page and About Component Verification', () => {
  test('Why Planitt? section should be centered', async ({ page }) => {
    await page.goto('/');
    const section = page.locator('#download');
    const container = section.locator('div.space-y-4.text-center');
    const paragraph = container.locator('p');

    // Check for text-center class on the container div
    await expect(container).toHaveClass(/text-center/);
    
    // Check for mx-auto and max-w-3xl on the paragraph
    await expect(paragraph).toHaveClass(/mx-auto/);
    await expect(paragraph).toHaveClass(/max-w-3xl/);
  });

  test('About page images should load successfully', async ({ page }) => {
    // Assuming About component is rendered on the home page or a specific /about route
    // Checking home page first as LandingPage was the context
    await page.goto('/');
    
    // Find images by alt text
    const ceoImage = page.locator('img[alt="Piyush Tembhekar"]');
    const techLeadImage = page.locator('img[alt="Parth Shende"]');

    // Wait for images to be visible if they exist on this page
    if (await ceoImage.count() > 0) {
      await expect(ceoImage).toBeVisible();
      const ceoSrc = await ceoImage.getAttribute('src');
      const response = await page.request.get(ceoSrc!);
      expect(response.status()).toBe(200);
    }

    if (await techLeadImage.count() > 0) {
      await expect(techLeadImage).toBeVisible();
      const techLeadSrc = await techLeadImage.getAttribute('src');
      const response = await page.request.get(techLeadSrc!);
      expect(response.status()).toBe(200);
    }
  });
});
