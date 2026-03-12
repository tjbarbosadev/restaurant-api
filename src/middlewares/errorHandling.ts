import { AppError } from '@/utils/AppError';
import { Request, Response, NextFunction, response } from 'express';

export function errorHandling(error: any, req: Request, res: Response, next: NextFunction) {
  if (error instanceof AppError)
    return res.status(error.statusCode).json({ message: error.message });

  return response.status(500).json({ message: error.message || 'Internal Server Error' });
}
