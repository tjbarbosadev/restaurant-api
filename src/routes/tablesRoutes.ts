import { TablesController } from '@/controllers/TablesController';
import { Router } from 'express';

const tableRoutes = Router();
const tablesController = new TablesController();

tableRoutes.get('/', tablesController.index);

export { tableRoutes };
