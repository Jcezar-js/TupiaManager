import { request } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const BASE_URL = process.env.API_URL ?? 'http://localhost:3001';
export const STATE_FILE = path.join(__dirname, '.auth-state.json');

export const TEST_USER = {
  name: 'Usuario Teste',
  email: 'test@gauderio.test',
  password: 'TesteGauderio@123',
};

export default async function globalSetup() {
  const ctx = await request.newContext({ baseURL: BASE_URL });

  // Registra usuario de teste — ignora 409 se ja existe
  const reg = await ctx.post('/api/auth/register', { data: TEST_USER });
  if (!reg.ok() && reg.status() !== 409) {
    throw new Error(`Falha ao registrar usuario de teste: ${reg.status()}`);
  }

  // Login para obter token
  const login = await ctx.post('/api/auth/login', {
    data: { email: TEST_USER.email, password: TEST_USER.password },
  });
  if (!login.ok()) {
    throw new Error(`Falha no login de teste: ${login.status()}`);
  }

  const { token, userId } = await login.json();
  fs.writeFileSync(STATE_FILE, JSON.stringify({ token, userId }));
  await ctx.dispose();
}
