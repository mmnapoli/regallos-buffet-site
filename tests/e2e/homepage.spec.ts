import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display hero section with CTA buttons', async ({ page }) => {
    // Check main heading
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()

    // Check for CTA buttons
    const budgetBtn = page.locator('a, button').filter({ hasText: /Orçamento|Fazer|Faça/ }).first()
    const menuBtn = page.locator('a, button').filter({ hasText: /Cardápio|Cardapios|Menu/ }).first()

    await expect(budgetBtn).toBeVisible()
    await expect(menuBtn).toBeVisible()
  })

  test('should have working CTA navigation', async ({ page }) => {
    // Click budget button and check navigation
    const budgetLink = page.locator('a[href="/orcamento"]').first()
    if (await budgetLink.isVisible()) {
      await budgetLink.click({ timeout: 10000 })
      await expect(page).toHaveURL(/orcamento/, { timeout: 10000 })
    }
  })

  test('should display service cards', async ({ page }) => {
    // Look for service cards (should have multiple cards)
    const cards = page.locator('[class*="card"], [class*="service"], div[role="article"]')
    const visibleCards = await cards.count()

    // Should have at least some cards visible
    expect(visibleCards).toBeGreaterThan(0)
  })

  test('should display stats section', async ({ page }) => {
    // Look for stat cards or numbers like "14+", "2.000+", "100%"
    const statsSection = page.locator('text=/\\d+\\+|100%/')
    const statsCount = await statsSection.count()

    expect(statsCount).toBeGreaterThan(0)
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
  })
})
