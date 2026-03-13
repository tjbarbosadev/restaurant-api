import { knex } from '@/database/knex';
import { AppError } from '@/utils/AppError';
import { Request, Response, NextFunction } from 'express';
import z from 'zod';

class TableSessionController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const sessions = await knex<TableSessionRepository>('table_session').orderBy(
        'closed_at',
        'desc',
      );

      res.json(sessions);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchmema = z.object({
        table_id: z.number(),
      });

      const { table_id } = bodySchmema.parse(req.body);

      const session = await knex<TableSessionRepository>('table_session')
        .where({ table_id })
        .orderBy('opened_at', 'desc')
        .first();

      if (session && !session.closed_at)
        throw new AppError('Já existe uma sessão aberta para esta mesa', 400);

      await knex<TableSessionRepository>('table_session').insert({ table_id });
      res.status(201).json({ message: 'Sessão de mesa criada com sucesso', table_id });
    } catch (error) {
      next(error);
    }
  }

  async close(req: Request, res: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), {
          message: 'ID precisa ser um número válido',
        })
        .parse(req.params.id);

      const session = await knex<TableSessionRepository>('table_session').where({ id }).first();

      if (!session) throw new AppError('Sessão de mesa não encontrada', 404);
      if (session.closed_at) throw new AppError('Sessão de mesa já está fechada', 400);

      await knex<TableSessionRepository>('table_session')
        .where({ id })
        .update({ closed_at: knex.fn.now() });

      res.json({ message: 'Sessão de mesa fechada com sucesso', session_id: id });
    } catch (error) {
      next(error);
    }
  }
}

export { TableSessionController };
