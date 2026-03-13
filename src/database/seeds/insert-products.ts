import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('products').del();

  // Inserts seed entries
  await knex('products').insert([
    { name: 'Porção de fritas', price: 12.0 },
    { name: 'X-Burguer', price: 15.0 },
    { name: 'X-Salada', price: 16.0 },
    { name: 'X-Bacon', price: 18.0 },
    { name: 'X-Egg', price: 17.0 },
    { name: 'X-Tudo', price: 22.0 },
    { name: 'Coca-Cola Lata', price: 6.0 },
    { name: 'Guaraná Lata', price: 6.0 },
    { name: 'Suco de Laranja', price: 8.0 },
    { name: 'Água Mineral', price: 4.0 },
    { name: 'Porção de Calabresa', price: 14.0 },
    { name: 'Porção de Mandioca', price: 13.0 },
    { name: 'Porção de Polenta', price: 13.0 },
    { name: 'Batata Recheada', price: 19.0 },
    { name: 'Pizza Margherita', price: 32.0 },
    { name: 'Pizza Calabresa', price: 34.0 },
    { name: 'Pizza Portuguesa', price: 36.0 },
    { name: 'Pizza Quatro Queijos', price: 38.0 },
    { name: 'Esfiha de Carne', price: 7.0 },
    { name: 'Esfiha de Frango', price: 7.0 },
    { name: 'Pastel de Queijo', price: 8.0 },
    { name: 'Pastel de Carne', price: 8.0 },
    { name: 'Coxinha', price: 6.0 },
    { name: 'Kibe', price: 6.0 },
    { name: 'Refrigerante 2L', price: 12.0 },
    { name: 'Hambúrguer Vegano', price: 20.0 },
    { name: 'Salada Caesar', price: 18.0 },
    { name: 'Salada Grega', price: 17.0 },
    { name: 'Wrap de Frango', price: 15.0 },
    { name: 'Wrap Vegano', price: 16.0 },
    { name: 'Tapioca de Frango', price: 12.0 },
    { name: 'Tapioca de Queijo', price: 11.0 },
    { name: 'Brownie', price: 9.0 },
    { name: 'Pudim', price: 8.0 },
    { name: 'Mousse de Maracujá', price: 7.0 },
    { name: 'Sorvete', price: 10.0 },
    { name: 'Milkshake Chocolate', price: 14.0 },
    { name: 'Milkshake Morango', price: 14.0 },
    { name: 'Café Expresso', price: 5.0 },
    { name: 'Cappuccino', price: 7.0 },
  ]);
}
