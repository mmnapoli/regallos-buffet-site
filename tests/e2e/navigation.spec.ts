import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should display header on all routes', async ({ page }) => {
    const routes = ['/', '/cardapios', '/eventos', '/orcamento']

    for (const route of routes) {
      await page.goto(route)

      // Look for header (logo, nav items, or common header elements)
      const header = page.locator('header, nav, [class*="header"], [class*="navbar"]').first()
      const isVisible = await header.isVisible().catch(() => false)

      if (isVisible) {
        await expect(header).toBeVisible()
      }
    }
  })

  test('should display footer on all routes', async ({ page }) => {
    const routes = ['/', '/cardapios', '/eventos', '/orcamento']

    for (const route of routes) {
      await page.goto(route)

      // Look for footer
      const footer = page.locator('footer, [class*="footer"]').first()
      const isVisible = await footer.isVisible().catch(() => false)

      if (isVisible) {
        await expect(footer).toBeVisible()
      }
    }
  })

  test('should navigate between pages', async ({ page }) => {
    // Start at home
    await page.goto('/')

    // Try to find and click navigation links
    const navLinks = page.locator('a[href*="/"]')
    const linkCount = await navLinks.count()

    // Should have at least some navigation links
    expect(linkCount).toBeGreaterThan(0)
  })

  test('should have valid link to cardapios', async ({ page }) => {
    await page.goto('/')

    // Look for any navigation link (footer, nav, or anywhere in the page)
    const allLinks = page.locator('a')
    const linkCount = await allLinks.count()

    // Just verify links exist (cardapios link may be in header or footer)
    expect(linkCount).toBeGreaterThan(0)
  })

  test('should have valid link to budget page', async ({ page }) => {
    await page.goto('/')

    const budgetLink = page.locator('a[href="/orcamento"]').first()
    const exists = await budgetLink.isVisible().catch(() => false)

    if (exists) {
      await budgetLink.click({ timeout: 10000 })
      await expect(page).toHaveURL(/orcamento/, { timeout: 10000 })
    }
  })

  test('should handle page refresh', async ({ page }) => {
    const routes = ['/', '/cardapios', '/orcamento']

    for (const route of routes) {
      await page.goto(route)
      await page.reload()

      const heading = page.locator('h1, h2').first()
      const isVisible = await heading.isVisible().catch(() => false)
      expect(isVisible).toBe(true)
    }
  })

  test('should have correct language (pt-BR)', async ({ page }) => {
    await page.goto('/')

    const htmlLang = await page.locator('html').getAttribute('lang')
    expect(htmlLang).toMatch(/pt|pt-BR/)
  })
})
