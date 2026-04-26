import { z } from 'zod';

export const MATERIAL_CATEGORIES = [
  'madeira',
  'vidro',
  'metal',
  'plastico',
  'tecido',
  'outro',
] as const;

export const MATERIAL_UNITS = [
  'metro',
  'metro2',
  'metro3',
  'unidade',
  'kg',
] as const;

export const MaterialCategoryEnum = z.enum(MATERIAL_CATEGORIES);
export const MaterialUnitEnum = z.enum(MATERIAL_UNITS);

export type MaterialCategory = z.infer<typeof MaterialCategoryEnum>;
export type MaterialUnit = z.infer<typeof MaterialUnitEnum>;

export interface Material {
  _id: string;
  name: string;
  category: MaterialCategory;
  unit: MaterialUnit;
  pricePerUnit: number;
  wasteFactor: number;
  createdAt: string;
  updatedAt: string;
}

export const MaterialFormSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').min(3, 'Nome deve ter pelo menos 3 caracteres'),
  category: MaterialCategoryEnum,
  unit: MaterialUnitEnum,
  pricePerUnit: z.number().min(0, 'Preço deve ser positivo'),
  wasteFactor: z.number().min(1, 'Fator de desperdício deve ser ≥ 1').max(2, 'Fator de desperdício deve ser ≤ 2'),
});

export type MaterialFormData = z.infer<typeof MaterialFormSchema>;
