import { OrdersController } from '@/controllers/OrdersController';
import { Router } from 'express';

const orderRoutes = Router();
const orderController = new OrdersController();

orderRoutes.post('/', orderController.create);
orderRoutes.get('/table-session/:table_session_id/total', orderController.show);
orderRoutes.get('/table-session/:table_session_id', orderController.index);

export { orderRoutes };
