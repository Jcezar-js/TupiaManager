import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';
import { app_error_class } from './error_handling_middleware';

export function create_rate_limiter() {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    handler: (_req: Request, _res: Response, next: NextFunction) => {
      next(new app_error_class('Muitas requisições, por favor tente novamente mais tarde.', 429));
    },
  });
}

export const rate_limiter_login = rateLimit({
  windowMs: 5 * 10 * 1000,
  max: 5,
  handler: (_req: Request, _res: Response, next: NextFunction) => {
    next(new app_error_class('Muitas tentativas de login, por favor tente novamente mais tarde.', 429));
  },
});
