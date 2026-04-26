import { apiFetch } from './api';
import type { Material, MaterialFormData } from '../types/material';
import type { PaginatedResponse } from '../types';

export const materialService = {
  async listMaterials(page: number = 1, limit: number = 20, search: string = ''): Promise<PaginatedResponse<Material>> {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (search) params.append('search', search);

    return apiFetch(`/api/materials?${params}`);
  },

  async getMaterial(id: string): Promise<Material> {
    return apiFetch(`/api/materials/${id}`);
  },

  async createMaterial(data: MaterialFormData): Promise<Material> {
    return apiFetch('/api/materials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },

  async updateMaterial(id: string, data: Partial<MaterialFormData>): Promise<Material> {
    return apiFetch(`/api/materials/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },

  async deleteMaterial(id: string): Promise<void> {
    await apiFetch(`/api/materials/${id}`, {
      method: 'DELETE',
    });
  },
};
