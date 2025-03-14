# Configuração do Projeto NODE w/ Banco de Dados PostgreSQL

## Inicializando o Projeto com `npm`

```sh
npm init -y
```

Este comando inicializa um novo projeto Node.js, criando o arquivo `package.json` com as configurações padrão.

## Instalando Dependências

```sh
npm install express
```

Este comando instala o Express, um framework para Node.js, que facilita a criação de servidores web.

## Exemplo de Importação do Express

```javascript
// Modo antigo de importar o express
const express = require('express');

// Modo moderno de importar o express (ES Modules)
import express from 'express';

// Nota: Para usar a sintaxe de importação moderna, é necessário
// adicionar a chave "type": "module" no arquivo package.json.
```

A sintaxe moderna de importação (`import express from 'express'`) é compatível com ES Modules, que pode ser ativada no `package.json` através da chave `"type": "module"`. Sem isso, o Node.js usará a sintaxe antiga (`require`).

---

## Criando o Banco de Dados PostgreSQL via Terminal

1. **Acessando o PostgreSQL**

   Para acessar o PostgreSQL como o usuário `postgres`, execute o comando:

   ```sh
   sudo -u postgres psql
   ```

2. **Criando um Novo Banco de Dados**

   Para criar um banco de dados no PostgreSQL, use o comando:

   ```sql
   CREATE DATABASE "db-api-node-jwt";
   ```

3. **Listando os Bancos de Dados**

   Para listar todos os bancos de dados existentes, use:

   ```sql
   \l
   ```

4. **Conectando-se ao Banco de Dados**

   Para conectar ao banco de dados `db-api-node-jwt`, use o comando:

   ```sql
   \c "db-api-node-jwt"
   ```

   Alternativamente, você pode usar o seguinte comando no terminal:

   ```sh
   psql -U postgres -h localhost -d db-api-node-jwt
   ```

   Onde:
   - `-U postgres` é o nome de usuário.
   - `-h localhost` especifica que o banco de dados está na máquina local.
   - `-d db-api-node-jwt` é o nome do banco de dados.

---

## Usando o Prisma com o PostgreSQL

1. **Rodando Migrações do Prisma**

   Após configurar o Prisma, execute o seguinte comando para aplicar as migrações no banco de dados:

   ```sh
   npx prisma migrate dev --name init
   ```

   Esse comando cria as migrações de banco de dados com base no seu modelo do Prisma.

2. **Acessando o Prisma Studio**

   Para abrir a interface gráfica do Prisma Studio e visualizar os dados, use:

   ```sh
   npx prisma studio
   ```

   O Prisma Studio será aberto no navegador no endereço [http://localhost:5555](http://localhost:5555/).

---

## Consultando Dados no PostgreSQL

Após executar as migrações e criar o banco de dados, você pode visualizar os dados diretamente no PostgreSQL com os seguintes comandos:

1. **Listando as Tabelas**

   Para ver todas as tabelas no banco de dados, use:

   ```sql
   \dt
   ```

   Exemplo de saída:

   ```
               List of relations
   Schema |        Name        | Type  |  Owner   
   --------+--------------------+-------+----------
   public | User               | table | postgres
   public | _prisma_migrations  | table | postgres
   (2 rows)
   ```

2. **Consultando os Dados de uma Tabela**

   Para consultar os dados da tabela `User`, use:

   ```sql
   SELECT * FROM "User";
   ```

   Exemplo de saída:

   ```
    id |      email      |   name   | password 
   ----+-----------------+----------+----------
    1 | teste@teste.com | Testinho | 
   (1 row)
   ```


O prisma é uma **ferramenta de ORM (Object-Relational Mapping)** que facilita a interação entre seu código (geralmente em Node.js) e o banco de dados, oferecendo uma maneira mais eficiente e segura de trabalhar com dados.

Aqui estão os principais recursos do Prisma:

1. **ORM (Object-Relational Mapping):**  
   O Prisma permite que você trabalhe com o banco de dados usando **objetos JavaScript/TypeScript**, em vez de escrever consultas SQL diretamente. Ele mapeia suas tabelas e colunas no banco de dados para **modelos de dados** em seu código, tornando a manipulação de dados mais intuitiva.

2. **Migrações de Banco de Dados:**  
   O Prisma ajuda a **migrar seu banco de dados** automaticamente, criando, modificando e gerenciando a estrutura das tabelas, colunas e relacionamentos entre elas. Isso é feito usando comandos como `npx prisma migrate dev` para aplicar migrações definidas no arquivo de esquema do Prisma.

3. **Prisma Client:**  
   O **Prisma Client** é uma biblioteca gerada automaticamente que fornece uma **API para consultas e manipulação de dados**. Usando essa API, você pode fazer operações como `create`, `find`, `update`, e `delete` em suas tabelas do banco de dados de forma simples e segura.

4. **Prisma Studio (Visualizador de Dados):**  
   O **Prisma Studio** é uma **ferramenta gráfica** que serve como uma interface para visualização e edição de dados. Ele ajuda a explorar, editar e até adicionar dados diretamente no banco de dados de maneira mais amigável, mas **não substitui o Prisma Client** nem o propósito principal de gerenciar as interações com o banco de dados em seu código.

### Em resumo:
- **Prisma** é uma ferramenta completa que **facilita o trabalho com banco de dados** no seu código, fornecendo uma API fácil de usar (Prisma Client) e recursos como migrações automáticas e validação de dados.
- **Prisma Studio** é uma interface gráfica **opcional** que permite visualizar e editar dados, mas é apenas uma das funcionalidades dentro do ecossistema do Prisma.

Então, o Prisma não é apenas um visualizador/editor, mas uma ferramenta robusta para gerenciar a interação entre seu aplicativo e o banco de dados de forma eficiente e moderna.