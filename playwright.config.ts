import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: {
    baseURL: process.env.API_URL ?? 'http://localhost:3001',
  },
  globalSetup: './tests/global.setup.ts',
  projects: [{ name: 'api' }],
  reporter: [['list'], ['html', { open: 'never' }]],
  webServer: {
    command: 'npm run devStart',
    url: 'http://localhost:3001/api/products',
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
