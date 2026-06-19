import { Request, Response, NextFunction } from 'express';
import User from '../models/user_schema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { app_error_class } from '../middlewares/error_handling_middleware';
import { sendValidationError } from '../lib/validation';

const userSchema = z.object({
  name: z
    .string({ error: 'O nome é obrigatório' })
    .min(3, 'O nome deve conter pelo menos 3 caracteres'),
  email: z
    .string()
    .min(1, { message: 'O campo "Email" é obrigatório' })
    .email('Formato de email inválido'),
  password: z
    .string({ error: 'A senha é obrigatória' })
    .min(8, { message: 'A senha deve conter no mínimo 8 caracteres' })
    .max(32, { message: 'A senha deve conter no máximo 32 caracteres' })
    .refine((p) => /[A-Z]/.test(p), { message: 'A senha deve conter pelo menos uma letra maiúscula' })
    .refine((p) => /[a-z]/.test(p), { message: 'A senha deve conter pelo menos uma letra minúscula' })
    .refine((p) => /[0-9]/.test(p), { message: 'A senha deve conter pelo menos um número' })
    .refine((p) => /[!@#$%^&*(),.?":{}|<>]/.test(p), { message: 'A senha deve conter pelo menos um caractere especial' }),
});

const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, { message: 'A senha atual é obrigatória' }),
  newPassword: userSchema.shape.password,
  confirmPassword: z.string(),
});

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const validation = userSchema.pick({ email: true, password: true }).safeParse(req.body);
  if (!validation.success) {
    return sendValidationError(res, validation.error, 'Dados inválidos para login');
  }
  const { email, password } = validation.data;

  try {
    const user = await User.findOne({ email: { $eq: email } });
    if (!user) {
      return next(new app_error_class('Email ou senha incorretos!', 401));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new app_error_class('Email ou senha incorretos!', 401));
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return next(new app_error_class('JWT_SECRET não está definido', 500));
    }

    const token = jwt.sign({ id: user._id, role: 'user' }, secret, { expiresIn: '1d' });

    return res.json({ token, userId: user._id });
  } catch (err) {
    return next(err);
  }
};

export const update_password = async (req: Request, res: Response, next: NextFunction) => {
  const validation = updatePasswordSchema.safeParse(req.body);
  const userId = (req as any).userId;

  if (!validation.success) {
    return sendValidationError(res, validation.error, 'Dados inválidos para atualização de senha');
  }

  const { currentPassword, newPassword, confirmPassword } = validation.data;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(new app_error_class('Usuário não encontrado', 404));
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      console.warn(`[update_password] Tentativa de troca de senha com senha atual incorreta (userId=${userId})`);
      return next(new app_error_class('A senha atual está incorreta', 400));
    }

    if (newPassword !== confirmPassword) {
      return next(new app_error_class('A senha de confirmação não corresponde à nova senha', 400));
    }

    const isSameAsOldPassword = await bcrypt.compare(newPassword, user.password);
    if (isSameAsOldPassword) {
      return next(new app_error_class('A nova senha não pode ser igual à senha atual', 400));
    }

    user.password = newPassword;
    await user.save();

    console.info(`[update_password] Senha alterada com sucesso (userId=${userId})`);
    res.json({ message: 'Senha alterada com sucesso!' });
  } catch (err) {
    return next(err);
  }
};
