import z from 'zod';

const productSchema = z.object({
  name: z.string().trim().min(6, 'O nome do produto é obrigatório'),
  price: z.number().gt(0, 'O preço do produto deve ser maior que zero'),
});

export { productSchema };
