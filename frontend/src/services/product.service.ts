import { apiFetch } from './api';
import type { Product, PaginatedResponse, QuoteRequest, Quote } from '../types/index';

export const productService = {
  listProducts: async (page: number = 1, limit: number = 20, search: string = '') => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (search) params.append('search', search);
    return apiFetch<PaginatedResponse<Product>>(`/api/products?${params}`);
  },

  getProduct: async (id: string) => {
    return apiFetch<Product>(`/api/products/${id}`);
  },

  createProduct: async (formData: FormData) => {
    return apiFetch<Product>('/api/products', {
      method: 'POST',
      headers: {},
      body: formData,
    });
  },

  updateProduct: async (id: string, formData: FormData) => {
    return apiFetch<Product>(`/api/products/${id}`, {
      method: 'PATCH',
      headers: {},
      body: formData,
    });
  },

  deleteProduct: async (id: string) => {
    return apiFetch<{ message: string }>(`/api/products/${id}`, {
      method: 'DELETE',
    });
  },

  getProductQuote: async (id: string, dimensions: QuoteRequest) => {
    return apiFetch<Quote>(`/api/products/quote/${id}`, {
      method: 'POST',
      body: JSON.stringify(dimensions),
    });
  },
};
