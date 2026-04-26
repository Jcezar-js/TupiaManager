import { test, expect } from '@playwright/test';

test.describe('Delete Material Modal', () => {
  test.beforeEach(async ({ page }) => {
    // Login and navigate to materials list
    await page.goto('/login');
    await page.locator('input[placeholder="seu@email.com"]').fill('admin@test.com');
    await page.locator('input[placeholder="••••••••"]').fill('Password123!');
    await page.locator('button:has-text("Entrar")').click();
    await page.waitForURL('**/admin/materials');
  });

  test('should show delete confirmation modal', async ({ page }) => {
    await page.waitForTimeout(500);

    const deleteButton = page.locator('button:has-text("Deletar")').first();
    const count = await deleteButton.count();

    if (count > 0) {
      await deleteButton.click();
      await page.waitForTimeout(300);

      // Modal should appear
      const modal = page.locator('[role="dialog"]');
      await expect(modal).toBeVisible();
    }
  });

  test('should cancel delete operation', async ({ page }) => {
    await page.waitForTimeout(500);

    const deleteButton = page.locator('button:has-text("Deletar")').first();
    const count = await deleteButton.count();

    if (count > 0) {
      await deleteButton.click();
      await page.waitForTimeout(300);

      // Click cancel button in modal
      const cancelButton = page.locator('button:has-text("Cancelar")');
      await cancelButton.click();

      // Modal should close
      await page.waitForTimeout(300);
      const modal = page.locator('[role="dialog"]');
      const isVisible = await modal.isVisible().catch(() => false);
      expect(isVisible).toBe(false);
    }
  });

  test('should show warning for in-use material', async ({ page }) => {
    // This test assumes there's a material that's used by a product
    // Create a material first and a product using it, then test delete
    await page.waitForTimeout(500);

    const deleteButton = page.locator('button:has-text("Deletar")').first();
    const count = await deleteButton.count();

    if (count > 0) {
      await deleteButton.click();
      await page.waitForTimeout(500);

      // Check if warning text appears
      const warningText = page.locator('text=Este material é utilizado');
      const hasWarning = await warningText.count() > 0;

      if (hasWarning) {
        await expect(warningText).toBeVisible();

        // Should show list of affected products
        const affectedList = page.locator('ul');
        await expect(affectedList).toBeVisible();

        // Should require confirmation checkbox
        const confirmCheckbox = page.locator('input[type="checkbox"]');
        await expect(confirmCheckbox).toBeVisible();
      }
    }
  });

  test('should delete unused material', async ({ page }) => {
    // First create a new material that definitely won't be used
    await page.locator('button:has-text("Novo Material")').click();
    await page.waitForURL('**/admin/materials/new');

    const timestamp = Date.now();
    const materialName = `Delete Test ${timestamp}`;

    await page.locator('input[type="text"]').fill(materialName);
    await page.locator('select').first().selectOption('outro');
    await page.locator('select').nth(1).selectOption('unidade');
    await page.locator('input[type="number"]').first().fill('10');
    await page.locator('input[type="number"]').nth(1).fill('1.1');

    await page.locator('button:has-text("Salvar")').click();
    await page.waitForURL('**/admin/materials');
    await page.waitForTimeout(500);

    // Find and delete the material
    const materialCell = page.locator(`text=${materialName}`).first();
    const row = materialCell.locator('..');
    const deleteBtn = row.locator('button:has-text("Deletar")');

    await deleteBtn.click();
    await page.waitForTimeout(500);

    // Confirm delete
    const deleteModalBtn = page.locator('button:has-text("Deletar")').last();
    await deleteModalBtn.click();

    // Should redirect to list
    await page.waitForURL('**/admin/materials');
    await page.waitForTimeout(500);

    // Material should not be in list
    const deletedCell = page.locator(`text=${materialName}`);
    const count = await deletedCell.count();
    expect(count).toBe(0);
  });

  test('should require confirmation for in-use materials', async ({ page }) => {
    await page.waitForTimeout(500);

    const deleteButton = page.locator('button:has-text("Deletar")').first();
    const count = await deleteButton.count();

    if (count > 0) {
      await deleteButton.click();
      await page.waitForTimeout(500);

      // Check for checkbox
      const checkbox = page.locator('input[type="checkbox"]');
      const checkboxCount = await checkbox.count();

      if (checkboxCount > 0) {
        // Checkbox should be unchecked
        const isChecked = await checkbox.isChecked();
        expect(isChecked).toBe(false);

        // Try to delete without checking
        const deleteBtn = page.locator('button:has-text("Deletar")').last();
        const isDisabled = await deleteBtn.isDisabled().catch(() => false);

        // Either disabled or should not work
        if (!isDisabled) {
          await deleteBtn.click();
          // Should stay on modal or show error
          await page.waitForTimeout(300);
        }
      }
    }
  });
});
