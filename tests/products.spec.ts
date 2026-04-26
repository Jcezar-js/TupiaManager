import { test, expect } from './fixtures';
import { request as playwrightRequest } from '@playwright/test';
import fs from 'fs';
import { STATE_FILE } from './global.setup';

const BASE_URL = process.env.API_URL ?? 'http://localhost:3001';

const DIMENSIONS_VALID = { height: 1200, width: 600, depth: 300 };
const CONSTRAINTS = {
  minHeight: 500, maxHeight: 2400,
  minWidth: 300, maxWidth: 1200,
  minDepth: 150, maxDepth: 600,
};

test.describe('GET /api/products (público)', () => {
  test('200 sem token → retorna paginado', async ({ request }) => {
    const res = await request.get('/api/products');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.pagination).toHaveProperty('total');
    expect(body.pagination).toHaveProperty('page');
  });

  test('404 produto inexistente', async ({ request }) => {
    const res = await request.get('/api/products/000000000000000000000000');
    expect(res.status()).toBe(404);
  });
});

test.describe('CRUD /api/products (protegido) + /api/products/quote/:id', () => {
  let materialId: string;
  let productId: string;

  test.beforeAll(async () => {
    const { token } = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
    const ctx = await playwrightRequest.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: { Authorization: `Bearer ${token}` },
    });

    const matRes = await ctx.post('/api/materials', {
      data: {
        name: 'MDF Produto Teste',
        category: 'MDF',
        unit: 'm2',
        pricePerUnit: 70,
        wasteFactor: 1.1,
      },
    });
    if (!matRes.ok()) throw new Error(`beforeAll: falha ao criar material (${matRes.status()})`);
    materialId = (await matRes.json())._id;

    const prodRes = await ctx.post('/api/products', {
      data: {
        name: 'Armario Teste',
        description: 'Armario de teste para specs Playwright',
        constraints: CONSTRAINTS,
        components: [
          { material: materialId, quantityType: 'area_based', quantityFactor: 2 },
        ],
        baseLaborCost: 300,
        profitMargin: 20,
      },
    });
    if (!prodRes.ok()) throw new Error(`beforeAll: falha ao criar produto (${prodRes.status()}): ${await prodRes.text()}`);
    productId = (await prodRes.json())._id;

    await ctx.dispose();
  });

  test.afterAll(async () => {
    const { token } = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
    const ctx = await playwrightRequest.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: { Authorization: `Bearer ${token}` },
    });
    if (productId) await ctx.delete(`/api/products/${productId}`);
    if (materialId) await ctx.delete(`/api/materials/${materialId}`);
    await ctx.dispose();
  });

  // --- Criação ---
  test('POST / 401 sem token', async ({ request }) => {
    const res = await request.post('/api/products', {
      data: { name: 'Teste', description: 'Descricao teste produto' },
    });
    expect(res.status()).toBe(401);
  });

  test('POST / 400 dados incompletos', async ({ request, authHeaders }) => {
    const res = await request.post('/api/products', {
      headers: authHeaders,
      data: { name: 'AB' },
    });
    expect(res.status()).toBe(400);
  });

  // --- Leitura ---
  test('GET /:id 200 produto existente', async ({ request }) => {
    const res = await request.get(`/api/products/${productId}`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body._id).toBe(productId);
    expect(body.name).toBe('Armario Teste');
  });

  // --- Atualização ---
  test('PATCH /:id 401 sem token', async ({ request }) => {
    const res = await request.patch(`/api/products/${productId}`, {
      data: { name: 'Novo Nome' },
    });
    expect(res.status()).toBe(401);
  });

  test('PATCH /:id 200 atualização parcial', async ({ request, authHeaders }) => {
    const res = await request.patch(`/api/products/${productId}`, {
      headers: authHeaders,
      data: { profitMargin: 25 },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.profitMargin).toBe(25);
  });

  test('PATCH /:id 404 id inexistente', async ({ request, authHeaders }) => {
    const res = await request.patch('/api/products/000000000000000000000000', {
      headers: authHeaders,
      data: { profitMargin: 10 },
    });
    expect(res.status()).toBe(404);
  });

  // --- Deleção ---
  test('DELETE /:id 401 sem token', async ({ request }) => {
    const res = await request.delete(`/api/products/${productId}`);
    expect(res.status()).toBe(401);
  });

  test('DELETE /:id 404 id inexistente', async ({ request, authHeaders }) => {
    const res = await request.delete('/api/products/000000000000000000000000', {
      headers: authHeaders,
    });
    expect(res.status()).toBe(404);
  });

  // --- Orçamento (quote) ---
  test('POST /quote/:id 400 sem campos obrigatórios', async ({ request }) => {
    const res = await request.post(`/api/products/quote/${productId}`, { data: {} });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.errors).toHaveProperty('height');
    expect(body.errors).toHaveProperty('width');
    expect(body.errors).toHaveProperty('depth');
  });

  test('POST /quote/:id 200 dimensões válidas → retorna preço', async ({ request }) => {
    const res = await request.post(`/api/products/quote/${productId}`, {
      data: DIMENSIONS_VALID,
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('finalPrice');
    expect(typeof body.finalPrice).toBe('number');
    expect(body.finalPrice).toBeGreaterThan(0);
    expect(body.details.technicalSheet).toBeInstanceOf(Array);
  });

  test('POST /quote/:id 400 altura fora dos limites', async ({ request }) => {
    const res = await request.post(`/api/products/quote/${productId}`, {
      data: { ...DIMENSIONS_VALID, height: 9999 },
    });
    expect(res.status()).toBe(400);
  });

  test('POST /quote/:id 400 largura fora dos limites', async ({ request }) => {
    const res = await request.post(`/api/products/quote/${productId}`, {
      data: { ...DIMENSIONS_VALID, width: 1 },
    });
    expect(res.status()).toBe(400);
  });

  test('POST /quote/:id 400 profundidade fora dos limites', async ({ request }) => {
    const res = await request.post(`/api/products/quote/${productId}`, {
      data: { ...DIMENSIONS_VALID, depth: 9999 },
    });
    expect(res.status()).toBe(400);
  });

  test('POST /quote/:id 404 produto inexistente', async ({ request }) => {
    const res = await request.post('/api/products/quote/000000000000000000000000', {
      data: DIMENSIONS_VALID,
    });
    expect(res.status()).toBe(404);
  });
});
