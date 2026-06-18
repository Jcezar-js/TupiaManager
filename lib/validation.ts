import { Response } from 'express';
import { ZodError } from 'zod';

export function sendValidationError(res: Response, error: ZodError, message: string) {
  return res.status(400).json({
    success: false,
    message,
    errors: error.flatten().fieldErrors,
  });
}
