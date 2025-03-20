# Sumário
- [O que é ORM](#o-que-é-orm)
- [Prisma ORM – Visão Geral](#prisma-orm-–-visão-geral)
- [Instalação do Prisma com PostgreSQL](#instalação-do-prisma-com-postgresql)
- [Exemplo básico do schema.prisma](#exemplo-básico-do-schemaprisma)
- [Rodar migration](#rodar-migration)
- [Usar Prisma Client no código](#usar-prisma-client-no-código)
- [Comandos adicionais do Prisma](#comandos-adicionais-do-prisma)
- [Comandos úteis](#comandos-úteis)
- [Vantagens do Prisma](#vantagens-do-prisma)
- [Prisma vs Outros ORMs](#prisma-vs-outros-orms)
- [Fontes oficiais](#fontes-oficiais)

## O que é ORM

**ORM (Object Relational Mapper)** é uma técnica que permite interagir com bancos de dados relacionais utilizando **objetos no código**, sem precisar escrever SQL diretamente o tempo todo.

### ➕ Benefícios do ORM:
- Mais produtividade no desenvolvimento.
- Facilita a leitura e manutenção do código.
- Protege contra SQL Injection.
- Abstração de queries SQL complexas.
- Suporte a migrations/versionamento de schema.

## Prisma ORM – Visão Geral

**Prisma** é um ORM moderno, rápido, baseado em **TypeScript/JavaScript**, muito usado com bancos relacionais como:

- **PostgreSQL**
- MySQL / MariaDB
- SQLite
- SQL Server
- MongoDB (modo experimental)

## Instalação do Prisma com PostgreSQL
```bash
npm install prisma --save-dev
npx prisma init
```

Isso cria a pasta:
```
📁 prisma/
 └─ schema.prisma
```

## Exemplo básico do `schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Usuario {
  id        Int      @id @default(autoincrement())
  nome      String
  email     String   @unique
  criadoEm  DateTime @default(now())
  posts     Post[]
}

model Post {
  id         Int      @id @default(autoincrement())
  titulo     String
  conteudo   String?
  publicado  Boolean  @default(false)
  usuarioId  Int
  usuario    Usuario  @relation(fields: [usuarioId], references: [id])
}
```

## Rodar migration (criar tabelas no banco)
A cada atualização
```bash
npx prisma migrate dev --name init
```

## Para usar o prisma studio em uma url
```bash
npx prisma studio
```

## Usar Prisma Client no código
```ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Criar novo usuário
await prisma.usuario.create({
  data: {
    nome: "Larissa",
    email: "larissa@email.com"
  }
})

// Buscar usuários
const users = await prisma.usuario.findMany()
```

## Comandos adicionais do Prisma

```bash
# Em ambiente de desenvolvimento, cria uma nova migration se houver mudanças no schema
npx prisma dev

# Em ambiente de produção, aplica as migrations existentes sem criar novas
npx prisma deploy
```

## Comandos úteis

| Comando | Descrição |
|--------|-----------|
| `npx prisma init` | Inicializa o projeto Prisma |
| `npx prisma migrate dev` | Executa migrations no banco |
| `npx prisma studio` | Abre painel gráfico (tipo pgAdmin visual) |
| `npx prisma generate` | Gera Prisma Client |
| `npx prisma db push` | Atualiza o banco sem migration (dev only) |

## Vantagens do Prisma

- Tipagem forte com TypeScript  
- Autocompletar no editor  
- Prisma Studio (painel visual)  
- Migrations fáceis  
- Suporte a relações entre tabelas  
- Leve, moderno e rápido

## Prisma vs Outros ORMs

| ORM         | Linguagem | Tipo | Observação |
|-------------|-----------|------|-------------|
| **Prisma**     | JS/TS     | ORM moderno | Tipado, schema declarativo |
| Sequelize   | JS/TS     | Clássico ORM | Popular, mas verboso |
| TypeORM     | JS/TS     | ORM clássico | Suporta decorators |
| Hibernate   | Java      | ORM completo | Muito robusto |
| SQLAlchemy  | Python    | ORM poderoso | Muito usado em Flask/Django |

## Fontes oficiais:
- [Prisma Docs](https://www.prisma.io/docs)
- [Prisma GitHub](https://github.com/prisma/prisma)
