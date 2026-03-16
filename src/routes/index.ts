import { Router } from 'express';
import { productsRoutes } from './productsRoutes';
import { tableRoutes } from '@/routes/tablesRoutes';
import { tableSessionRoutes } from '@/routes/tableSessionRoutes';
import { orderRoutes } from '@/routes/ordersRoutes';

const routes = Router();
routes.use('/products', productsRoutes);
routes.use('/tables', tableRoutes);
routes.use('/table-session', tableSessionRoutes);
routes.use('/orders', orderRoutes);

export { routes };
