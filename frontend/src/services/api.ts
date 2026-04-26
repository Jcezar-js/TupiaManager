import { ApiError } from '../types/index';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${path}`;
  const token = sessionStorage.getItem('auth_token');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      window.dispatchEvent(new CustomEvent('auth:logout'));
    }

    let errorData: ApiError;
    try {
      errorData = await response.json();
    } catch {
      errorData = {
        success: false,
        message: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const error = new Error(errorData.message) as Error & { status?: number; fieldErrors?: Record<string, string[]> };
    error.status = response.status;
    if (errorData.errors) {
      error.fieldErrors = errorData.errors;
    }
    throw error;
  }

  return response.json();
}
