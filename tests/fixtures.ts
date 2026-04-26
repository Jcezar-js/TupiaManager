import { test as base, expect } from '@playwright/test';
import fs from 'fs';
import { STATE_FILE, TEST_USER } from './global.setup';

export type AuthState = { token: string; userId: string };

export const test = base.extend<{
  authState: AuthState;
  authHeaders: Record<string, string>;
}>({
  authState: async ({}, use) => {
    const state: AuthState = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
    await use(state);
  },
  authHeaders: async ({ authState }, use) => {
    await use({ Authorization: `Bearer ${authState.token}` });
  },
});

export { expect, TEST_USER };
