import { test, expect } from '@playwright/test';

test.describe('Careers Page - Meet Our Team', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/careers');
  });

  test('should display Meet Our Team section', async ({ page }) => {
    const sectionTitle = page.getByRole('heading', { name: 'Meet Our Team' });
    await expect(sectionTitle).toBeVisible();
  });

  test('should display all team members with correct roles', async ({ page }) => {
    const section = page.locator('section').filter({ hasText: 'Meet Our Team' });
    const teamMembers = [
      { name: 'Piyush Tembhekar', role: 'CEO, Financial Distribution' },
      { name: 'Sarth Shende', role: 'CTO, Technical Delivery' },
      { name: 'Ansh Mishra', role: 'Software Developer' },
    ];

    for (const member of teamMembers) {
      await expect(section.getByText(member.name)).toBeVisible();
      await expect(section.getByText(member.role)).toBeVisible();
    }
  });

  test('should have a working portfolio link for Ansh Mishra', async ({ page }) => {
    const anshCard = page.locator('div').filter({ hasText: 'Ansh Mishra' });
    const portfolioLink = anshCard.getByRole('link', { name: 'Portfolio' });
    
    await expect(portfolioLink).toBeVisible();
    await expect(portfolioLink).toHaveAttribute('href', 'https://ansh-dev-portfolio.netlify.app/');
    await expect(portfolioLink).toHaveAttribute('target', '_blank');
  });
});
