import express from 'express';
import { routes } from '@/routes';

import dotenv from 'dotenv';
import { errorHandling } from '@/middlewares/errorHandling';
dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
  res.json({ message: 'Hello world' });
});

app.use(errorHandling);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
