import { test, expect } from '@playwright/test';

const mockToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiQWRtaW4ifQ.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U';

async function authenticate(page: import('@playwright/test').Page, path = '/admin/change-password') {
  await page.goto(path);
  await page.evaluate((token) => sessionStorage.setItem('auth_token', token), mockToken);
  await page.reload();
}

test.describe('Trocar senha', () => {
  test('deve alterar a senha com sucesso quando dados válidos', async ({ page }) => {
    await authenticate(page);

    await page.route('**/api/auth/updatepsw', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Senha alterada com sucesso!' }),
      })
    );

    await page.locator('#currentPassword').fill('OldPass123!');
    await page.locator('#newPassword').fill('NewPass123!');
    await page.locator('#confirmPassword').fill('NewPass123!');
    await page.locator('button:has-text("Alterar senha")').click();

    await expect(page.locator('.alert-success')).toContainText('Senha alterada com sucesso');
  });

  test('deve exibir erro e manter sessão quando senha atual está incorreta (400)', async ({ page }) => {
    await authenticate(page);

    await page.route('**/api/auth/updatepsw', (route) =>
      route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, message: 'A senha atual está incorreta' }),
      })
    );

    await page.locator('#currentPassword').fill('WrongPass1!');
    await page.locator('#newPassword').fill('NewPass123!');
    await page.locator('#confirmPassword').fill('NewPass123!');
    await page.locator('button:has-text("Alterar senha")').click();

    await expect(page.locator('.alert-danger')).toContainText('A senha atual está incorreta');

    // Regressão: 400 não pode disparar auth:logout — sessão preservada
    const token = await page.evaluate(() => sessionStorage.getItem('auth_token'));
    expect(token).toBe(mockToken);
    expect(page.url()).toContain('/admin/change-password');
  });

  test('deve validar no client e não chamar a API quando confirmação não corresponde', async ({ page }) => {
    await authenticate(page);

    let apiCalled = false;
    await page.route('**/api/auth/updatepsw', (route) => {
      apiCalled = true;
      route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
    });

    await page.locator('#currentPassword').fill('OldPass123!');
    await page.locator('#newPassword').fill('NewPass123!');
    await page.locator('#confirmPassword').fill('Outra456!');
    await page.locator('button:has-text("Alterar senha")').click();

    await expect(page.locator('.alert-danger')).toContainText('não corresponde');
    expect(apiCalled).toBe(false);
  });

  test('deve navegar para trocar senha pelo link da topbar', async ({ page }) => {
    await authenticate(page, '/admin/materials');

    await page.locator('a:has-text("Trocar senha")').click();
    await page.waitForURL('/admin/change-password');

    await expect(page.locator('#currentPassword')).toBeVisible();
  });
});
