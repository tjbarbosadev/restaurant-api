import { ProductRepository } from '@/database/types/ProductRepository';
import { productSchema } from '@/schema/product';
import { knex } from '@/database/knex';
import { Request, Response, NextFunction } from 'express';
import z from 'zod';
import { AppError } from '@/utils/AppError';

class ProductsController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await knex<ProductRepository>('products')
        .select()
        .whereLike('name', `%${req.query.name ?? ''}%`)
        .orderBy('name');

      res.json(products);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price } = productSchema.parse(req.body);

      await knex<ProductRepository>('products').insert({ name, price });

      return res
        .status(201)
        .json({ message: 'Produto criado com sucesso', product: { name, price } });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), {
          message: 'ID precisa ser um número válido',
        })
        .parse(req.params.id);

      const bodySchema = z.object({
        name: z.string().trim().min(6, 'O nome do produto é obrigatório').optional(),
        price: z.number().gt(0, 'O preço do produto deve ser maior que zero').optional(),
      });

      const { name, price } = bodySchema.parse(req.body);

      const product = await knex<ProductRepository>('products').where({ id }).first();

      if (!product) throw new AppError('Produto não encontrado', 404);

      await knex<ProductRepository>('products')
        .where({ id })
        .update({ name, price, updated_at: knex.fn.now() });

      res.json({ message: 'Produto atualizado com sucesso', product: { id, name, price } });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), {
          message: 'ID precisa ser um número válido',
        })
        .parse(req.params.id);

      const product = await knex<ProductRepository>('products').where({ id }).first();

      if (!product) throw new AppError('Produto não encontrado', 404);

      await knex<ProductRepository>('products').where({ id }).delete();

      return res.json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
      next(error);
    }
  }
}

export { ProductsController };
