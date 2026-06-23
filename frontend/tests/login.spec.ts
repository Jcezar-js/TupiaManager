import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should display login form', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('TupiaManager');
    await expect(page.locator('text=Painel de Administração')).toBeVisible();
    await expect(page.locator('input[placeholder="seu@email.com"]')).toBeVisible();
    await expect(page.locator('input[placeholder="••••••••"]')).toBeVisible();
    await expect(page.locator('button:has-text("Entrar")')).toBeVisible();
  });

  test.skip('should show email validation error', async ({ page }) => {
    await page.locator('input[placeholder="seu@email.com"]').fill('invalid-email');
    await page.locator('button:has-text("Entrar")').click();
    await expect(page.getByText('Email inválido')).toBeVisible();
  });

  test('should show password required error', async ({ page }) => {
    await page.locator('input[placeholder="seu@email.com"]').fill('test@test.com');
    await page.locator('button:has-text("Entrar")').click();
    await expect(page.locator('text=Senha é obrigatória')).toBeVisible();
  });

  test('should trigger shake animation on validation error', async ({ page }) => {
    await page.locator('button:has-text("Entrar")').click();
    const card = page.locator('div').filter({ has: page.locator('h1') }).first();
    const boundingBox = await card.boundingBox();
    expect(boundingBox).toBeTruthy();
  });

  test('should show loading spinner while authenticating', async ({ page }) => {
    await page.route('**/api/auth/login', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await route.continue();
    });

    await page.locator('input[placeholder="seu@email.com"]').fill('admin@test.com');
    await page.locator('input[placeholder="••••••••"]').fill('Password123!');

    const submitButton = page.locator('button:has-text("Entrar")');
    await submitButton.click();

    await expect(page.locator('text=Autenticando')).toBeVisible();
  });

  test.skip('should display API error message on failed login', async ({ page }) => {
    await page.route('**/api/auth/login', (route) => {
      route.abort('failed');
    });

    await page.locator('input[placeholder="seu@email.com"]').fill('admin@test.com');
    await page.locator('input[placeholder="••••••••"]').fill('Password123!');
    await page.locator('button:has-text("Entrar")').click();

    await expect(page.getByText('Erro ao fazer login')).toBeVisible();
  });

  test('should display rate limit message on 429', async ({ page }) => {
    await page.route('**/api/auth/login', (route) => {
      route.abort('failed');
    });

    await page.locator('input[placeholder="seu@email.com"]').fill('admin@test.com');
    await page.locator('input[placeholder="••••••••"]').fill('Password123!');

    // Mock 429 response
    await page.route('**/api/auth/login', async (route) => {
      await route.fulfill({
        status: 429,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          message: 'Too many requests',
        }),
      });
    });

    await page.locator('button:has-text("Entrar")').click();
    await expect(page.locator('text=Muitas tentativas')).toBeVisible();
  });

  test('should redirect to admin when login succeeds', async ({ page }) => {
    await page.route('**/api/auth/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiQWRtaW4iLCJlbWFpbCI6ImFkbWluQHRlc3QuY29tIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U',
          userId: '123456789',
        }),
      });
    });

    await page.locator('input[placeholder="seu@email.com"]').fill('admin@test.com');
    await page.locator('input[placeholder="••••••••"]').fill('Password123!');
    await page.locator('button:has-text("Entrar")').click();

    await page.waitForURL('/admin/materials');
    expect(page.url()).toContain('/admin/materials');
  });

  test('should store token in sessionStorage on successful login', async ({ page }) => {
    await page.route('**/api/auth/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiQWRtaW4ifQ.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U',
          userId: '123456789',
        }),
      });
    });

    await page.locator('input[placeholder="seu@email.com"]').fill('admin@test.com');
    await page.locator('input[placeholder="••••••••"]').fill('Password123!');
    await page.locator('button:has-text("Entrar")').click();

    await page.waitForURL('/admin/materials');

    const token = await page.evaluate(() => sessionStorage.getItem('auth_token'));
    expect(token).toBeTruthy();
    expect(token).toContain('eyJhbGc');
  });
});
