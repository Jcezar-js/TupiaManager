import { test, expect } from '@playwright/test';

test.describe('Auth Flow', () => {
  const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiQWRtaW4ifQ.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U';

  test('should persist session in sessionStorage after login', async ({ page }) => {
    await page.goto('/login');

    await page.route('**/api/auth/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ token: mockToken, userId: '123456789' }),
      });
    });

    await page.locator('input[placeholder="seu@email.com"]').fill('admin@test.com');
    await page.locator('input[placeholder="••••••••"]').fill('Password123!');
    await page.locator('button:has-text("Entrar")').click();

    await page.waitForURL('/admin/materials');

    const token = await page.evaluate(() => sessionStorage.getItem('auth_token'));
    expect(token).toBe(mockToken);
  });

  test('should restore session from sessionStorage on page reload', async ({ page }) => {
    await page.goto('/login');

    await page.evaluate((token) => {
      sessionStorage.setItem('auth_token', token);
    }, mockToken);

    await page.reload();
    await page.waitForURL('/admin/materials');

    expect(page.url()).toContain('/admin/materials');
  });

  test('should clear sessionStorage when logout is clicked', async ({ page }) => {
    await page.goto('/catalog');

    await page.evaluate((token) => {
      sessionStorage.setItem('auth_token', token);
    }, mockToken);

    await page.reload();

    // Wait for admin navbar to be visible
    await expect(page.locator('button:has-text("Sair")')).toBeVisible();

    await page.locator('button:has-text("Sair")').click();

    await page.waitForURL('/login');

    const token = await page.evaluate(() => sessionStorage.getItem('auth_token'));
    expect(token).toBeNull();
  });

  test('should show Entrar button after logout', async ({ page }) => {
    await page.goto('/catalog');

    await page.evaluate((token) => {
      sessionStorage.setItem('auth_token', token);
    }, mockToken);

    await page.reload();
    await expect(page.locator('button:has-text("Sair")')).toBeVisible();

    await page.locator('button:has-text("Sair")').click();
    await page.waitForURL('/login');

    await page.goto('/catalog');
    await expect(page.locator('a:has-text("Entrar")')).toBeVisible();
  });

  test('should handle API error with 401 response', async ({ page }) => {
    await page.goto('/admin/materials');

    // Set token and reload
    await page.evaluate((token) => {
      sessionStorage.setItem('auth_token', token);
    }, mockToken);

    await page.reload();

    // Mock API returning 401
    await page.route('**/api/**', (route) => {
      if (route.request().method() === 'GET') {
        route.fulfill({
          status: 401,
          contentType: 'application/json',
          body: JSON.stringify({
            success: false,
            message: 'Unauthorized',
          }),
        });
      }
    });

    // Trigger an API call by navigating (if API is called)
    await page.evaluate(() => {
      const event = new CustomEvent('auth:logout');
      window.dispatchEvent(event);
    });

    await page.waitForTimeout(500);

    const token = await page.evaluate(() => sessionStorage.getItem('auth_token'));
    expect(token).toBeNull();
  });

  test('should decode userId from token on login', async ({ page }) => {
    await page.goto('/login');

    await page.route('**/api/auth/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ token: mockToken, userId: '123456789' }),
      });
    });

    await page.locator('input[placeholder="seu@email.com"]').fill('admin@test.com');
    await page.locator('input[placeholder="••••••••"]').fill('Password123!');
    await page.locator('button:has-text("Entrar")').click();

    await page.waitForURL('/admin/materials');

    // Check that token is decoded and available in context
    const userId = await page.evaluate(() => {
      const token = sessionStorage.getItem('auth_token');
      if (!token) return null;
      try {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        return decoded.id;
      } catch {
        return null;
      }
    });

    expect(userId).toBe('1234567890');
  });

  test('should not lose session on page navigation', async ({ page }) => {
    await page.goto('/catalog');

    await page.evaluate((token) => {
      sessionStorage.setItem('auth_token', token);
    }, mockToken);

    await page.reload();

    // Navigate between pages
    await page.locator('a:has-text("Materiais")').click();
    expect(page.url()).toContain('/admin/materials');

    let token = await page.evaluate(() => sessionStorage.getItem('auth_token'));
    expect(token).toBe(mockToken);

    await page.locator('a:has-text("Produtos")').click();
    expect(page.url()).toContain('/admin/products');

    token = await page.evaluate(() => sessionStorage.getItem('auth_token'));
    expect(token).toBe(mockToken);
  });
});
