import { knex } from '@/database/knex';
import { AppError } from '@/utils/AppError';
import { Request, Response, NextFunction } from 'express';
import z from 'zod';

class OrdersController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { table_session_id } = z
        .object({
          table_session_id: z
            .string()
            .transform((value) => Number(value))
            .refine((value) => !isNaN(value), {
              message: 'table_session_id must be a valid number',
            }),
        })
        .parse(req.params);

      const orders = await knex<OrderRepository>('orders')
        .where({ table_session_id })
        .join('products', 'orders.product_id', 'products.id')
        .select(
          'orders.id',
          'orders.table_session_id',
          'orders.product_id',
          'products.name',
          'orders.price',
          'orders.quantity',
          knex.raw('orders.price * orders.quantity as total'),
          'orders.created_at',
          'orders.updated_at',
        )
        .orderBy('orders.created_at', 'desc');

      res.json({
        message: 'Pedidos encontrados',
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_session_id: z.number(),
        product_id: z.number().int(),
        quantity: z.number().int(),
      });

      const { table_session_id, product_id, quantity } = bodySchema.parse(req.body);

      const session = await knex<TableSessionRepository>('table_session')
        .where({ id: table_session_id })
        .first();
      if (!session) throw new AppError('Sessão não encontrada', 404);
      if (session.closed_at) throw new AppError('Sessão de mesa encerrada', 404);

      const product = await knex<ProductRepository>('products').where({ id: product_id }).first();
      if (!product?.id) throw new AppError('Produto não encontrado', 404);

      await knex<OrderRepository>('orders').insert({
        table_session_id,
        product_id,
        quantity,
        price: product.price,
      });

      res.json({
        message: 'Pedido criado',
        data: {
          table_session_id,
          product_id,
          quantity,
          price: product.price,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { table_session_id } = z
        .object({
          table_session_id: z
            .string()
            .transform((value) => Number(value))
            .refine((value) => !isNaN(value), {
              message: 'table_session_id must be a valid number',
            }),
        })
        .parse(req.params);

      const order = await knex<OrderRepository>('orders')
        .select(knex.raw('COALESCE(SUM(price * quantity), 0) as total'))
        .select(knex.raw('COALESCE(SUM(quantity), 0) as quantity'))
        .where({ table_session_id })
        .first();

      return res.json({ order });
    } catch (error) {
      next(error);
    }
  }
}

export { OrdersController };
