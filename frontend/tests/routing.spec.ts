import { test, expect } from '@playwright/test';

test.describe('Routing & Navigation', () => {
  test('should show public catalog page without authentication', async ({ page }) => {
    await page.goto('/catalog');
    await expect(page.locator('text=Catalog Page')).toBeVisible();
  });

  test('should redirect unauthenticated users from /admin/materials to /login', async ({ page }) => {
    await page.goto('/admin/materials');
    await page.waitForURL('/login');
    expect(page.url()).toContain('/login');
  });

  test('should redirect unauthenticated users from /admin/products to /login', async ({ page }) => {
    await page.goto('/admin/products');
    await page.waitForURL('/login');
    expect(page.url()).toContain('/login');
  });

  test('should redirect / to /catalog', async ({ page }) => {
    await page.goto('/');
    await page.waitForURL('/catalog');
    expect(page.url()).toContain('/catalog');
  });

  test('should show Entrar button in navbar when not authenticated', async ({ page }) => {
    await page.goto('/catalog');
    const entrarButton = page.locator('a:has-text("Entrar")');
    await expect(entrarButton).toBeVisible();
    await expect(entrarButton).toHaveAttribute('href', '/login');
  });

  test('should redirect authenticated users away from /login to /admin/materials', async ({ page }) => {
    // Set token in sessionStorage to simulate authenticated state
    await page.goto('/login');
    await page.evaluate(() => {
      sessionStorage.setItem(
        'auth_token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAifQ.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U'
      );
    });

    // Reload page to trigger auth check
    await page.reload();
    await page.waitForURL('/admin/materials');
    expect(page.url()).toContain('/admin/materials');
  });

  test('should show admin links in navbar when authenticated', async ({ page }) => {
    await page.goto('/catalog');

    // Set token and reload
    await page.evaluate(() => {
      sessionStorage.setItem(
        'auth_token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAifQ.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U'
      );
    });

    await page.reload();

    const materiaisLink = page.locator('a:has-text("Materiais")');
    const produtosLink = page.locator('a:has-text("Produtos")');
    const sairButton = page.locator('button:has-text("Sair")');

    await expect(materiaisLink).toBeVisible();
    await expect(produtosLink).toBeVisible();
    await expect(sairButton).toBeVisible();
  });

  test('should navigate to /admin/materials when clicking Materiais link', async ({ page }) => {
    await page.goto('/catalog');

    await page.evaluate(() => {
      sessionStorage.setItem(
        'auth_token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAifQ.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U'
      );
    });

    await page.reload();

    await page.locator('a:has-text("Materiais")').click();
    await expect(page).toHaveURL(/\/admin\/materials/);
  });

  test('should navigate to /admin/products when clicking Produtos link', async ({ page }) => {
    await page.goto('/catalog');

    await page.evaluate(() => {
      sessionStorage.setItem(
        'auth_token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAifQ.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U'
      );
    });

    await page.reload();

    await page.locator('a:has-text("Produtos")').click();
    await expect(page).toHaveURL(/\/admin\/products/);
  });
});
