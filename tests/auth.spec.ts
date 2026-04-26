import { test, expect, TEST_USER } from './fixtures';

const VALID_PASSWORD = 'TesteGauderio@123';

test.describe('POST /api/auth/register', () => {
  test('201 com dados válidos', async ({ request }) => {
    // Usa email único para não conflitar com outros testes
    const email = `novo_${Date.now()}@gauderio.test`;
    const res = await request.post('/api/auth/register', {
      data: { name: 'Novo Usuario', email, password: VALID_PASSWORD },
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body).toHaveProperty('_id');
    expect(body.email).toBe(email);
  });

  test('409 email duplicado', async ({ request }) => {
    const res = await request.post('/api/auth/register', {
      data: TEST_USER,
    });
    expect(res.status()).toBe(409);
  });

  test('400 email inválido', async ({ request }) => {
    const res = await request.post('/api/auth/register', {
      data: { name: 'Teste', email: 'nao-e-email', password: VALID_PASSWORD },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.errors).toHaveProperty('email');
  });

  test('400 senha sem letra maiúscula', async ({ request }) => {
    const res = await request.post('/api/auth/register', {
      data: { name: 'Teste', email: 'abc@gauderio.test', password: 'minuscula@123' },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.errors).toHaveProperty('password');
  });

  test('400 senha sem caractere especial', async ({ request }) => {
    const res = await request.post('/api/auth/register', {
      data: { name: 'Teste', email: 'abc@gauderio.test', password: 'SemEspecial123' },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.errors).toHaveProperty('password');
  });

  test('400 senha muito curta', async ({ request }) => {
    const res = await request.post('/api/auth/register', {
      data: { name: 'Teste', email: 'abc@gauderio.test', password: 'A1@' },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.errors).toHaveProperty('password');
  });

  test('400 nome muito curto', async ({ request }) => {
    const res = await request.post('/api/auth/register', {
      data: { name: 'AB', email: 'abc@gauderio.test', password: VALID_PASSWORD },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.errors).toHaveProperty('name');
  });
});

test.describe('POST /api/auth/login', () => {
  test('200 credenciais válidas → retorna token e userId', async ({ request }) => {
    const res = await request.post('/api/auth/login', {
      data: { email: TEST_USER.email, password: TEST_USER.password },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('token');
    expect(body).toHaveProperty('userId');
    expect(typeof body.token).toBe('string');
  });

  test('401 senha errada', async ({ request }) => {
    const res = await request.post('/api/auth/login', {
      data: { email: TEST_USER.email, password: 'SenhaErrada@999' },
    });
    expect(res.status()).toBe(401);
  });

  test('401 email inexistente', async ({ request }) => {
    const res = await request.post('/api/auth/login', {
      data: { email: 'fantasma@gauderio.test', password: VALID_PASSWORD },
    });
    expect(res.status()).toBe(401);
  });

  test('400 body inválido (sem campos)', async ({ request }) => {
    const res = await request.post('/api/auth/login', { data: {} });
    expect(res.status()).toBe(400);
  });
});

test.describe('PATCH /api/auth/updatepsw/:id', () => {
  test('401 sem token', async ({ request, authState }) => {
    const res = await request.patch(`/api/auth/updatepsw/${authState.userId}`, {
      data: { newPassword: 'NovaSenh@123', confirmPassword: 'NovaSenh@123' },
    });
    expect(res.status()).toBe(401);
  });

  test('400 nova senha igual à atual', async ({ request, authState, authHeaders }) => {
    const res = await request.patch(`/api/auth/updatepsw/${authState.userId}`, {
      headers: authHeaders,
      data: { newPassword: VALID_PASSWORD, confirmPassword: VALID_PASSWORD },
    });
    expect(res.status()).toBe(400);
  });

  test('400 confirmPassword não bate com newPassword', async ({ request, authState, authHeaders }) => {
    const res = await request.patch(`/api/auth/updatepsw/${authState.userId}`, {
      headers: authHeaders,
      data: { newPassword: 'NovaSenh@456', confirmPassword: 'Diferente@789' },
    });
    expect(res.status()).toBe(400);
  });

  test('400 nova senha fraca (sem maiúscula)', async ({ request, authState, authHeaders }) => {
    const res = await request.patch(`/api/auth/updatepsw/${authState.userId}`, {
      headers: authHeaders,
      data: { newPassword: 'fraca@123456', confirmPassword: 'fraca@123456' },
    });
    expect(res.status()).toBe(400);
  });
});
