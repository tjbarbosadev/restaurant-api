# restaurant-api

API de restaurante para estudos — Node.js, Express, TypeScript, Knex, SQLite.

## Guia de comandos Knex

### Migrations

Migrations controlam a **estrutura** do banco (criar/alterar/remover tabelas). O Knex guarda quais já rodaram; não repete.

| Comando | O que faz |
|---|---|
| `npm run knex -- migrate:make <nome>` | Cria um novo arquivo de migration |
| `npm run knex -- migrate:latest` | Roda todas as migrations **pendentes** |
| `npm run knex -- migrate:up` | Roda apenas a **próxima** migration pendente |
| `npm run knex -- migrate:rollback` | Desfaz o **último lote** de migrations |
| `npm run knex -- migrate:rollback --all` | Desfaz **todas** as migrations |
| `npm run knex -- migrate:status` | Mostra quais migrations já rodaram e quais estão pendentes |

#### Migrations criadas neste projeto

```bash
npm run knex -- migrate:make create-products
npm run knex -- migrate:make create-tables
npm run knex -- migrate:make table-session
```

Tabelas: `products`, `tables`, `table_sessions`.

Para rodar todas as pendentes:

```bash
npm run knex -- migrate:latest
```

### Seeds

Seeds populam o banco com **dados iniciais**. Diferente de migrations, seeds **rodam sempre** (não têm controle de "já executado"). Se o seed faz delete + insert, ele apaga e recria os dados (IDs podem mudar).

| Comando | O que faz |
|---|---|
| `npm run knex -- seed:make <nome>` | Cria um novo arquivo de seed |
| `npm run knex -- seed:run` | Roda **todos** os seeds |
| `npm run knex -- seed:run --specific=<arquivo.ts>` | Roda **apenas** o seed especificado |

#### Seeds criados neste projeto

```bash
# Criar arquivos
npm run knex -- seed:make insert-products
npm run knex -- seed:make insert-tables

# Rodar todos
npm run knex -- seed:run

# Rodar individualmente
npm run knex -- seed:run --specific=insert-products.ts
npm run knex -- seed:run --specific=insert-tables.ts
```

### Resumo rápido

| Ação | Comando |
|---|---|
| Criar migration | `npm run knex -- migrate:make <nome>` |
| Rodar pendentes | `npm run knex -- migrate:latest` |
| Rodar próxima | `npm run knex -- migrate:up` |
| Desfazer última | `npm run knex -- migrate:rollback` |
| Ver status | `npm run knex -- migrate:status` |
| Criar seed | `npm run knex -- seed:make <nome>` |
| Rodar todos seeds | `npm run knex -- seed:run` |
| Rodar seed específico | `npm run knex -- seed:run --specific=<arquivo.ts>` |
