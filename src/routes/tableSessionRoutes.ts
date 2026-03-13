import { TableSessionController } from '@/controllers/TableSessionController';
import { Router } from 'express';

const tableSessionRoutes = Router();
const tableSessionController = new TableSessionController();

tableSessionRoutes.get('/', tableSessionController.index);
tableSessionRoutes.post('/', tableSessionController.create);
tableSessionRoutes.patch('/:id', tableSessionController.close);

export { tableSessionRoutes };
