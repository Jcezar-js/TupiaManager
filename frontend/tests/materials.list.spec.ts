import { test, expect } from '@playwright/test';

test.describe('Materials List', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.locator('input[placeholder="seu@email.com"]').fill('admin@test.com');
    await page.locator('input[placeholder="••••••••"]').fill('Password123!');
    await page.locator('button:has-text("Entrar")').click();
    await page.waitForURL('**/admin/materials');
  });

  test('should display materials list', async ({ page }) => {
    expect(page.url()).toContain('/admin/materials');
    await expect(page.locator('h2:has-text("Materiais")')).toBeVisible();
  });

  test('should have "Novo Material" button', async ({ page }) => {
    await expect(page.locator('button:has-text("Novo Material")')).toBeVisible();
  });

  test('should have search input', async ({ page }) => {
    await expect(page.locator('input[placeholder="Buscar material..."]')).toBeVisible();
  });

  test('should navigate to create material page', async ({ page }) => {
    await page.locator('button:has-text("Novo Material")').click();
    await page.waitForURL('**/admin/materials/new');
    expect(page.url()).toContain('/admin/materials/new');
  });

  test('should display pagination controls', async ({ page }) => {
    // Wait for materials to load
    await page.waitForTimeout(500);
    // Pagination should be present
    const pagination = page.locator('text=Página');
    await expect(pagination).toBeVisible();
  });

  test('should search materials with debounce', async ({ page }) => {
    const searchInput = page.locator('input[placeholder="Buscar material..."]');
    await searchInput.fill('madeira');

    // Wait for debounce (400ms) + API response
    await page.waitForTimeout(1000);

    // Table should still be visible
    const table = page.locator('table');
    await expect(table).toBeVisible();
  });

  test('should display material table with correct columns', async ({ page }) => {
    await page.waitForTimeout(500);

    const table = page.locator('table');
    await expect(table).toBeVisible();

    // Check for expected column headers
    await expect(table.locator('th:has-text("Nome")')).toBeVisible();
    await expect(table.locator('th:has-text("Categoria")')).toBeVisible();
    await expect(table.locator('th:has-text("Unidade")')).toBeVisible();
    await expect(table.locator('th:has-text("Preço")')).toBeVisible();
    await expect(table.locator('th:has-text("Desperdício")')).toBeVisible();
    await expect(table.locator('th:has-text("Ações")')).toBeVisible();
  });

  test('should have edit and delete buttons for each material', async ({ page }) => {
    await page.waitForTimeout(500);

    const editButtons = page.locator('button:has-text("Editar")');
    const deleteButtons = page.locator('button:has-text("Deletar")');

    const editCount = await editButtons.count();
    const deleteCount = await deleteButtons.count();

    if (editCount > 0) {
      expect(deleteCount).toBe(editCount);
    }
  });

  test('should open delete confirmation modal', async ({ page }) => {
    await page.waitForTimeout(500);

    const deleteButton = page.locator('button:has-text("Deletar")').first();
    const count = await deleteButton.count();

    if (count > 0) {
      await deleteButton.click();
      // Modal should appear
      await page.waitForTimeout(300);
      // Check if modal or confirmation dialog exists
      const modal = page.locator('[role="dialog"]');
      const hasModal = await modal.count() > 0;
      expect(hasModal).toBe(true);
    }
  });

  test('should navigate to edit material page', async ({ page }) => {
    await page.waitForTimeout(500);

    const editButton = page.locator('button:has-text("Editar")').first();
    const count = await editButton.count();

    if (count > 0) {

      await editButton.click();
      await page.waitForURL('**/admin/materials/*/edit');
      expect(page.url()).toContain('/admin/materials/');
      expect(page.url()).toContain('/edit');
    }
  });
});
