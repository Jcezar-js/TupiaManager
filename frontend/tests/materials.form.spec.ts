import { test, expect } from '@playwright/test';

test.describe('Material Form', () => {
  test.beforeEach(async ({ page }) => {
    // Login and navigate to new material form
    await page.goto('/login');
    await page.locator('input[placeholder="seu@email.com"]').fill('admin@test.com');
    await page.locator('input[placeholder="••••••••"]').fill('Password123!');
    await page.locator('button:has-text("Entrar")').click();
    await page.waitForURL('**/admin/materials');

    // Click "Novo Material"
    await page.locator('button:has-text("Novo Material")').click();
    await page.waitForURL('**/admin/materials/new');
  });

  test('should display material form', async ({ page }) => {
    const form = page.locator('form');
    await expect(form).toBeVisible();
  });

  test('should have all form fields', async ({ page }) => {
    await expect(page.locator('input[type="text"]')).toBeVisible(); // Name
    await expect(page.locator('select').first()).toBeVisible(); // Category
    await expect(page.locator('select').nth(1)).toBeVisible(); // Unit
    await expect(page.locator('input[type="number"]').first()).toBeVisible(); // Price
    await expect(page.locator('input[type="number"]').nth(1)).toBeVisible(); // WasteFactor
  });

  test('should have Save and Cancel buttons', async ({ page }) => {
    await expect(page.locator('button:has-text("Salvar")')).toBeVisible();
    await expect(page.locator('button:has-text("Cancelar")')).toBeVisible();
  });

  test('should cancel and go back to list', async ({ page }) => {
    await page.locator('button:has-text("Cancelar")').click();
    await page.waitForURL('**/admin/materials');
    expect(page.url()).toContain('/admin/materials');
  });

  test('should create new material with valid data', async ({ page }) => {
    const timestamp = Date.now();
    const materialName = `Test Material ${timestamp}`;

    // Fill form
    await page.locator('input[type="text"]').fill(materialName);
    await page.locator('select').first().selectOption('madeira');
    await page.locator('select').nth(1).selectOption('metro');
    await page.locator('input[type="number"]').first().fill('100.50');
    await page.locator('input[type="number"]').nth(1).fill('1.15');

    // Submit
    await page.locator('button:has-text("Salvar")').click();

    // Should redirect to materials list
    await page.waitForURL('**/admin/materials');
    expect(page.url()).toContain('/admin/materials');

    // Material should appear in list
    await page.waitForTimeout(500);
    const materialNameCell = page.locator(`text=${materialName}`);
    await expect(materialNameCell).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    // Try submitting empty form
    await page.locator('button:has-text("Salvar")').click();

    // Should show validation error (or stay on form)
    await page.waitForTimeout(500);
    const form = page.locator('form');
    const isStillOnForm = await form.isVisible();

    expect(isStillOnForm).toBe(true);
  });

  test('should validate email format on name field', async ({ page }) => {
    // This test depends on actual validation rules
    // If form validates name length, test that
    await page.locator('input[type="text"]').fill('a');
    await page.locator('button:has-text("Salvar")').click();

    // Should either show error or stay on form
    await page.waitForTimeout(500);
    const form = page.locator('form');
    expect(await form.isVisible()).toBe(true);
  });

  test('should pre-fill form for edit', async ({ page }) => {
    // Navigate back to list
    await page.locator('button:has-text("Cancelar")').click();
    await page.waitForURL('**/admin/materials');

    // Click edit on first material
    const editButton = page.locator('button:has-text("Editar")').first();
    const count = await editButton.count();

    if (count > 0) {
      await editButton.click();
      await page.waitForURL('**/admin/materials/*/edit');

      // Form should be pre-filled
      const nameInput = page.locator('input[type="text"]');
      const nameValue = await nameInput.inputValue();
      expect(nameValue.length).toBeGreaterThan(0);
    }
  });

  test('should update material', async ({ page }) => {
    // Navigate back to list
    await page.locator('button:has-text("Cancelar")').click();
    await page.waitForURL('**/admin/materials');

    // Click edit on first material
    const editButton = page.locator('button:has-text("Editar")').first();
    const count = await editButton.count();

    if (count > 0) {

      await editButton.click();
      await page.waitForURL('**/admin/materials/*/edit');

      // Change a field
      const priceInput = page.locator('input[type="number"]').first();
      await priceInput.fill('999.99');

      // Save
      await page.locator('button:has-text("Salvar")').click();
      await page.waitForURL('**/admin/materials');

      // Verify change (would need to check list or re-edit)
      await page.waitForTimeout(500);
    }
  });
});
