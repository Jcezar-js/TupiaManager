import { request } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const BASE_URL = process.env.API_URL ?? 'http://localhost:3001';
export const STATE_FILE = path.join(__dirname, '.auth-state.json');

export const TEST_USER = {
  name: 'Usuario Teste',
  email: process.env.ADMIN_EMAIL ?? 'test@gauderio.test',
  password: process.env.ADMIN_PASSWORD ?? 'TesteGauderio@123',
};

export default async function globalSetup() {
  const ctx = await request.newContext({ baseURL: BASE_URL });

  const login = await ctx.post('/api/auth/login', {
    data: { email: TEST_USER.email, password: TEST_USER.password },
  });

  if (!login.ok()) {
    throw new Error(
      `globalSetup: login falhou (${login.status()}). ` +
      `Verifique se ADMIN_EMAIL e ADMIN_PASSWORD no .env correspondem a um usuário existente no banco. ` +
      `Use 'npx ts-node scripts/create_admin.ts' para criar o usuário admin.`
    );
  }

  const { token, userId } = await login.json();
  fs.writeFileSync(STATE_FILE, JSON.stringify({ token, userId }));
  await ctx.dispose();
}
