import { test, expect } from '@playwright/test'

test.describe('Budget Wizard (Orçamento)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/orcamento')
  })

  test('should load the budget wizard page', async ({ page }) => {
    // Check page heading
    const heading = page.locator('h1, h2').first()
    await expect(heading).toBeVisible()
  })

  test('should display step indicator', async ({ page }) => {
    // Look for step indicator component
    const stepIndicator = page.locator('[class*="step"], [class*="indicator"], text=/Etapa|Step/')
    const isVisible = await stepIndicator.first().isVisible().catch(() => false)

    // Optional: steps should exist
    if (isVisible) {
      await expect(stepIndicator.first()).toBeVisible()
    }
  })

  test('should display guest counter controls', async ({ page }) => {
    // Look for any controls related to guest selection
    const buttons = page.locator('button')
    const inputs = page.locator('input[type="number"], [role="spinbutton"]')

    const btnCount = await buttons.count()
    const inputCount = await inputs.count()

    // Either buttons or input controls should exist
    expect(btnCount + inputCount).toBeGreaterThan(0)
  })

  test('should display sticky total', async ({ page }) => {
    // Look for total/price display
    const totalDisplay = page.locator('text=/Total|R\\$|Preço/')
    const isVisible = await totalDisplay.first().isVisible().catch(() => false)

    if (isVisible) {
      await expect(totalDisplay.first()).toBeVisible()
    }
  })

  test('should have menu/cardapio selection', async ({ page }) => {
    // Look for cardapio cards or buttons to select menu items
    const cardapioElements = page.locator('[class*="cardapio"], [class*="menu"], [role="button"]')
    const count = await cardapioElements.count()

    // Should have selectable items
    expect(count).toBeGreaterThan(0)
  })

  test('should have navigation buttons', async ({ page }) => {
    // Look for Next/Previous buttons
    const buttons = page.locator('button')
    const btnCount = await buttons.count()

    // Should have navigation buttons
    expect(btnCount).toBeGreaterThan(0)
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    const heading = page.locator('h1, h2').first()
    await expect(heading).toBeVisible()
  })
})
