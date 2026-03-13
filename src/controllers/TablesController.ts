import { Request, Response, NextFunction } from 'express';
import { knex } from '@/database/knex';

class TablesController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const tables = await knex<TableRepository>('tables')
        .select()
        .orderBy('table_number');

      res.json(tables);
    } catch (err) {
      next(err);
    }
  }
}

export { TablesController };
