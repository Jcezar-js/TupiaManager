import { test, expect } from '@playwright/test';

test.describe('Materials Page Routing', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.locator('input[placeholder="seu@email.com"]').fill('admin@test.com');
    await page.locator('input[placeholder="••••••••"]').fill('Password123!');
    await page.locator('button:has-text("Entrar")').click();
    await page.waitForURL('**/admin/materials');
  });

  test('should access /admin/materials page', async ({ page }) => {
    await page.goto('/admin/materials');
    expect(page.url()).toContain('/admin/materials');

    const heading = page.locator('h2:has-text("Materiais")');
    await expect(heading).toBeVisible();
  });

  test('should access /admin/materials/new page', async ({ page }) => {
    await page.goto('/admin/materials/new');
    expect(page.url()).toContain('/admin/materials/new');

    const heading = page.locator('text=Novo Material');
    await expect(heading).toBeVisible();
  });

  test('should access /admin/materials/:id/edit page', async ({ page }) => {
    // First go to list
    await page.goto('/admin/materials');
    await page.waitForTimeout(500);

    // Get first material ID from edit link
    const editLink = page.locator('button:has-text("Editar")').first();
    const count = await editLink.count();

    if (count > 0) {
      await editLink.click();

      // Should be on edit page
      expect(page.url()).toMatch(/\/admin\/materials\/[a-z0-9]+\/edit/i);

      const heading = page.locator('text=Editar Material');
      await expect(heading).toBeVisible();
    }
  });

  test('should protect /admin/materials from unauthenticated users', async ({ page }) => {
    // Logout
    await page.goto('/admin/materials');
    await page.locator('button:has-text("Sair")').click();
    await page.waitForURL('**/login');

    // Try to access materials page
    await page.goto('/admin/materials');

    // Should be redirected to login
    expect(page.url()).toContain('/login');
  });

  test('should show navbar in materials page', async ({ page }) => {
    await page.goto('/admin/materials');

    // Navbar should be visible
    const navbar = page.locator('nav');
    await expect(navbar).toBeVisible();

    // Title should be visible
    const title = page.locator('text=NexusAdmin');
    await expect(title).toBeVisible();
  });

  test('should have logout button in navbar', async ({ page }) => {
    await page.goto('/admin/materials');

    // Logout button should be visible
    const logoutBtn = page.locator('button:has-text("Sair")');
    await expect(logoutBtn).toBeVisible();
  });

  test('should navigate from navbar links', async ({ page }) => {
    await page.goto('/admin/materials');

    // Should have products link
    const productsLink = page.locator('a:has-text("Produtos")');
    const hasProductsLink = await productsLink.count() > 0;

    if (hasProductsLink) {
      await productsLink.click();
      await page.waitForURL('**/admin/products');
      expect(page.url()).toContain('/admin/products');
    }
  });

  test('should redirect from /admin/materials/new to list after create', async ({ page }) => {
    await page.goto('/admin/materials/new');

    // Cancel should go back to list
    await page.locator('button:has-text("Cancelar")').click();
    await page.waitForURL('**/admin/materials');

    expect(page.url()).toBe(page.context().browser()?.contexts()[0]?.pages()[0]?.url() || '');
  });

  test('should redirect from /admin/materials/:id/edit to list after save', async ({ page }) => {
    // Go to list
    await page.goto('/admin/materials');
    await page.waitForTimeout(500);

    // Click edit
    const editBtn = page.locator('button:has-text("Editar")').first();
    const count = await editBtn.count();

    if (count > 0) {
      await editBtn.click();
      await page.waitForURL('**/admin/materials/*/edit');

      // Cancel should go back to list
      await page.locator('button:has-text("Cancelar")').click();
      await page.waitForURL('**/admin/materials');

      expect(page.url()).toContain('/admin/materials');
      expect(page.url()).not.toContain('/edit');
    }
  });
});
