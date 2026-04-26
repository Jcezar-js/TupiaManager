import { test, expect } from './fixtures';
import { request as playwrightRequest } from '@playwright/test';
import fs from 'fs';
import { STATE_FILE } from './global.setup';

const BASE_URL = process.env.API_URL ?? 'http://localhost:3001';

const VALID_MATERIAL = {
  name: 'MDF Teste',
  category: 'MDF',
  unit: 'm2',
  pricePerUnit: 85.5,
  wasteFactor: 1.1,
};

test.describe('GET /api/materials', () => {
  test('401 sem token', async ({ request }) => {
    const res = await request.get('/api/materials');
    expect(res.status()).toBe(401);
  });

  test('200 com token → retorna paginado', async ({ request, authHeaders }) => {
    const res = await request.get('/api/materials', { headers: authHeaders });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.pagination).toHaveProperty('total');
    expect(body.pagination).toHaveProperty('page');
  });
});

test.describe('CRUD /api/materials', () => {
  let materialId: string;

  test.beforeAll(async () => {
    const { token } = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
    const ctx = await playwrightRequest.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: { Authorization: `Bearer ${token}` },
    });
    const res = await ctx.post('/api/materials', { data: VALID_MATERIAL });
    if (!res.ok()) throw new Error(`beforeAll: falha ao criar material (${res.status()})`);
    materialId = (await res.json())._id;
    await ctx.dispose();
  });

  test.afterAll(async () => {
    if (!materialId) return;
    const { token } = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
    const ctx = await playwrightRequest.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: { Authorization: `Bearer ${token}` },
    });
    await ctx.delete(`/api/materials/${materialId}`);
    await ctx.dispose();
  });

  test('POST 401 sem token', async ({ request }) => {
    const res = await request.post('/api/materials', { data: VALID_MATERIAL });
    expect(res.status()).toBe(401);
  });

  test('POST 400 categoria inválida', async ({ request, authHeaders }) => {
    const res = await request.post('/api/materials', {
      headers: authHeaders,
      data: { ...VALID_MATERIAL, category: 'Inexistente' },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.errors).toHaveProperty('category');
  });

  test('POST 400 unidade inválida', async ({ request, authHeaders }) => {
    const res = await request.post('/api/materials', {
      headers: authHeaders,
      data: { ...VALID_MATERIAL, unit: 'tonelada' },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.errors).toHaveProperty('unit');
  });

  test('POST 400 nome muito curto', async ({ request, authHeaders }) => {
    const res = await request.post('/api/materials', {
      headers: authHeaders,
      data: { ...VALID_MATERIAL, name: 'A' },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.errors).toHaveProperty('name');
  });

  test('POST 400 preço negativo', async ({ request, authHeaders }) => {
    const res = await request.post('/api/materials', {
      headers: authHeaders,
      data: { ...VALID_MATERIAL, pricePerUnit: -10 },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.errors).toHaveProperty('pricePerUnit');
  });

  test('GET /:id 200 material existente', async ({ request, authHeaders }) => {
    const res = await request.get(`/api/materials/${materialId}`, { headers: authHeaders });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body._id).toBe(materialId);
    expect(body.name).toBe(VALID_MATERIAL.name);
  });

  test('GET /:id 404 id inexistente', async ({ request, authHeaders }) => {
    const res = await request.get('/api/materials/000000000000000000000000', { headers: authHeaders });
    expect(res.status()).toBe(404);
  });

  test('PATCH /:id 200 atualização parcial', async ({ request, authHeaders }) => {
    const res = await request.patch(`/api/materials/${materialId}`, {
      headers: authHeaders,
      data: { pricePerUnit: 99.9 },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.pricePerUnit).toBe(99.9);
  });

  test('PATCH /:id 401 sem token', async ({ request }) => {
    const res = await request.patch(`/api/materials/${materialId}`, {
      data: { pricePerUnit: 50 },
    });
    expect(res.status()).toBe(401);
  });

  test('PATCH /:id 404 id inexistente', async ({ request, authHeaders }) => {
    const res = await request.patch('/api/materials/000000000000000000000000', {
      headers: authHeaders,
      data: { pricePerUnit: 50 },
    });
    expect(res.status()).toBe(404);
  });

  test('DELETE /:id 401 sem token', async ({ request }) => {
    const res = await request.delete(`/api/materials/${materialId}`);
    expect(res.status()).toBe(401);
  });

  test('DELETE /:id 200', async ({ request, authHeaders }) => {
    const create = await request.post('/api/materials', {
      headers: authHeaders,
      data: { ...VALID_MATERIAL, name: 'MDF Para Deletar' },
    });
    const { _id } = await create.json();

    const res = await request.delete(`/api/materials/${_id}`, { headers: authHeaders });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('message');
  });

  test('DELETE /:id 404 id inexistente', async ({ request, authHeaders }) => {
    const res = await request.delete('/api/materials/000000000000000000000000', { headers: authHeaders });
    expect(res.status()).toBe(404);
  });
});
