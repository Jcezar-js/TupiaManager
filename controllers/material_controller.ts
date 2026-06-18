import {Request, Response, NextFunction} from 'express';
import Material from '../models/material_schema';
import { app_error_class } from '../middlewares/error_handling_middleware';
import { AuthRequest } from '../middlewares/auth_middleware';
import {z} from 'zod';
import { sendValidationError } from '../lib/validation';
import { querySchema } from '../lib/query-schema';

const materialSchemaValidator = z.object({
  name: z
    .string()
    .min(2, 'O nome do material deve conter pelo menos 2 caracteres'),
  category: z
    .enum(['MDF', 'Madeira Maciça', 'Compensado', 'Aglomerado', 'Metal', 'Vidro', 'Plástico', 'Tecido', 'Couro', 'Espuma', 'Ferragem']),
  unit: z
    .enum(['m2', 'm', 'unidade', 'kg', 'litro']),
  pricePerUnit: z.coerce.number()
    .nonnegative('O preço por unidade deve ser um número positivo'),
  wasteFactor: z.coerce.number()
    .positive('O fator de desperdício deve ser um número positivo')
    .optional(),
});

export const get_all_materials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, search } = querySchema.parse(req.query);
    const filter = search ? { $text: { $search: search } } : {};
    const skip = (page - 1) * limit;

    const [materials, total] = await Promise.all([
      Material.find(filter).skip(skip).limit(limit),
      Material.countDocuments(filter),
    ]);

    res.json({ data: materials, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (err: any) {
    return next(err);
  }
};

export const get_material_by_id = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const material = await Material.findById(req.params.id);
    if (material == null) {
      return next(new app_error_class('Material não encontrado', 404));
    }
    res.json(material);
  } catch (err: any) {
    return next(err);
  }
};

export const create_material = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validation = materialSchemaValidator.safeParse(req.body);
    if (!validation.success) {
      return sendValidationError(res, validation.error, 'Dados inválidos para criação de material');
    }

    const material = new Material({ ...validation.data, createdBy: (req as AuthRequest).userId });
    await material.save();
    res.status(201).json(material);
  } catch (err: any) {
    return next(err);
  }
};

export const update_material = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validation = materialSchemaValidator.partial().safeParse(req.body);
    if (!validation.success) {
      return sendValidationError(res, validation.error, 'Dados inválidos para atualização de material');
    }

    const material = await Material.findByIdAndUpdate(
      req.params.id,
      { ...validation.data, updatedBy: (req as AuthRequest).userId },
      { new: true }
    );
    if (material == null) {
      return next(new app_error_class('Material não encontrado', 404));
    }
    res.json(material);
  } catch (err: any) {
    return next(err);
  }
};

export const delete_material = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);
    if (material == null) {
      return next(new app_error_class('Material não encontrado', 404));
    }
    res.json({ message: 'Material deletado com sucesso' });
  } catch (err: any) {
    return next(err);
  }
};
