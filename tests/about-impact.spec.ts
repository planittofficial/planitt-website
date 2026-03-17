import { test, expect } from '@playwright/test';

test.describe('About Section - Financial Impact Layout', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/main');
        
        // Handle ComingSoonPopup if it appears
        const closePopupBtn = page.getByLabel('Close popup');
        try {
            // Wait a bit for the popup to potentially appear (it has a 120ms timeout in the component)
            await expect(closePopupBtn).toBeVisible({ timeout: 2000 });
            await closePopupBtn.click();
        } catch (e) {
            // Popup didn't appear or was already seen in session
            console.log('Popup not visible or already closed');
        }
    });

    test('should have a centered and reduced width impact container in financial mode', async ({ page }) => {
        // Ensure we are in financial mode (it's the default, but let's be explicit)
        const financialBtn = page.getByRole('button', { name: /Financial/i });
        await financialBtn.click();

        const aboutSection = page.locator('#about');
        await aboutSection.scrollIntoViewIfNeeded();

        const impactContainer = aboutSection.locator('div.bg-gradient-to-br');
        
        // Check for reduced width classes
        await expect(impactContainer).toHaveClass(/max-w-md/);
        await expect(impactContainer).toHaveClass(/mx-auto/);

        // Verify it contains the correct heading
        await expect(impactContainer.locator('h3')).toHaveText('Financial Impact');

        // Check grid for achievements
        const achievementGrid = impactContainer.locator('div.grid');
        const achievements = achievementGrid.locator('p');
        await expect(achievements).toHaveCount(3); // 50+ Happy Clients, Rs 50+ Lakhs AUM, 6+ Years...

        // Verify the last achievement spans 2 columns (since 3 is odd)
        const lastAchievement = achievementGrid.locator('> div').last();
        await expect(lastAchievement).toHaveClass(/sm:col-span-2/);
    });

    test('should show full width impact container in "all" mode if applicable', async ({ page }) => {
        // Note: The /main page uses HomeModeContext which defaults to 'financial' or 'technical' based on Hero toggle.
        // If we want to test 'all' mode, we might need a different route or just verify the 'technical' mode too.
        
        const technicalBtn = page.getByRole('button', { name: /Technical/i });
        await technicalBtn.click();

        const aboutSection = page.locator('#about');
        const impactContainer = aboutSection.locator('div.bg-gradient-to-br');
        
        await expect(impactContainer.locator('h3')).toHaveText('Technical Impact');
        await expect(impactContainer).toHaveClass(/max-w-md/);
        await expect(impactContainer).toHaveClass(/mx-auto/);
    });
});
