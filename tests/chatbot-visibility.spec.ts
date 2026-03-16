import { test, expect } from '@playwright/test';

test.describe('Chatbot Visibility Logic', () => {
  test('should show Wealth Advisory bot in financial mode', async ({ page }) => {
    await page.goto('/main');
    
    // Wealth Advisory bot should be visible
    const wealthBot = page.locator('button[aria-label="Open Wealth Advisory Bot"]');
    await expect(wealthBot).toBeVisible();
    
    // Technical FAQ bot should NOT be visible
    const techBot = page.locator('button[aria-label="Open Technical FAQ"]');
    await expect(techBot).not.toBeVisible();
  });

  test('should show Technical FAQ bot in technical mode', async ({ page }) => {
    await page.goto('/main');
    
    // Click on the Technical mode button (identified by text)
    await page.getByRole('button', { name: 'Technical', exact: true }).click();
    
    // Technical FAQ bot should be visible
    const techBot = page.locator('button[aria-label="Open Technical FAQ"]');
    await expect(techBot).toBeVisible();
    
    // Wealth Advisory bot should NOT be visible
    const wealthBot = page.locator('button[aria-label="Open Wealth Advisory Bot"]');
    await expect(wealthBot).not.toBeVisible();
  });
});
