import { AppError } from '@/utils/AppError';
import { Request, Response, NextFunction } from 'express';

class ProductsController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      throw new AppError('Erro ao listar os produtos', 500);
      res.json({ message: 'Lista de produtos' });
    } catch (err) {
      next(err);
    }
  }
}

export { ProductsController };
