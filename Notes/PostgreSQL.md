# 📘 PostgreSQL

# Sumário
- [O que é o PostgreSQL](#o-que-é-o-postgresql)
- [Características principais](#características-principais)
- [Recursos e Tecnologias Comuns com PostgreSQL](#recursos-e-tecnologias-comuns-com-postgresql)
- [Comparativo: PostgreSQL (SQL) x Bancos NoSQL](#comparativo-postgresql-sql-x-bancos-nosql)
- [Exemplo de Criação de Tabela em PostgreSQL](#exemplo-de-criação-de-tabela-em-postgresql)
- [Exemplo de SELECT](#exemplo-de-select)
- [Exemplos de bancos concorrentes por categoria](#exemplos-de-bancos-concorrentes-por-categoria)
- [Quando escolher PostgreSQL](#quando-escolher-postgresql)
- [Extras](#extras)
- [CAP Theorem (Teorema CAP)](#cap-theorem-teorema-cap)
- [Exemplos práticos de aplicação](#exemplos-práticos-de-aplicação)
- [Como você utiliza CAP na prática](#como-você-utiliza-cap-na-prática)
- [Resumo](#resumo)

## O que é o PostgreSQL?
O **PostgreSQL** é um **SGBD Relacional (RDBMS)** de código aberto, robusto e poderoso. Ele é altamente respeitado por sua confiabilidade, desempenho e flexibilidade. Utiliza **SQL como linguagem principal**, mas também oferece suporte a **tipos de dados não-relacionais**, como JSON e XML.

> É considerado um dos bancos de dados mais avançados do mundo open source.

## 🧠 Características principais:
- Sistema **relacional e orientado a objetos**.
- Suporte completo a **transações ACID**.
- Alta compatibilidade com o padrão **SQL**.
- **Extensível**: permite criar tipos de dados, operadores, funções e linguagens customizadas.
- Suporte a **índices avançados**: B-tree, Hash, GiST, SP-GiST, GIN, BRIN.
- **Replication e escalabilidade horizontal**.
- Compatível com **dados não relacionais (JSON, XML, hstore)**.

## 📦 Recursos e Tecnologias Comuns com PostgreSQL:
- **pgAdmin**: Interface gráfica de administração.
- **ORMs populares**:
  - Sequelize, Prisma, TypeORM (Node.js)
  - SQLAlchemy (Python)
  - Hibernate (Java)

## ⚖️ Comparativo: PostgreSQL (SQL) x Bancos NoSQL

| Característica           | PostgreSQL (SQL)                 | NoSQL (ex: MongoDB, Redis)             |
|-------------------------|----------------------------------|----------------------------------------|
| Modelo de dados          | Relacional (tabelas)             | Documentos, chave-valor, colunar, grafo |
| Estrutura                | Esquema rígido                   | Esquema flexível                       |
| Transações ACID          | Sim                              | Nem todos oferecem                     |
| Linguagem                | SQL padrão                       | Varia conforme o banco                 |
| Escalabilidade           | Vertical (suporte a horizontal) | Horizontal (por padrão)                |
| Consultas complexas      | SQL avançado, JOINs              | Limitado dependendo do tipo            |
| Casos de uso             | ERP, CRM, e-commerce, financeiro | Big Data, cache, redes sociais         |

## 📝 Exemplo de Criação de Tabela em PostgreSQL
```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  ativo BOOLEAN DEFAULT true,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔍 Exemplo de SELECT
```sql
SELECT nome, email FROM usuarios WHERE ativo = true;
```

## 🔗 Exemplos de bancos concorrentes por categoria:

### ➕ Bancos Relacionais (SQL):
- PostgreSQL
- MySQL
- MariaDB
- Oracle Database
- SQLite
- Microsoft SQL Server

### 🔁 Bancos NoSQL:
- **Document-based**: MongoDB, CouchDB
- **Key-Value**: Redis, DynamoDB
- **Colunar**: Apache Cassandra, HBase
- **Graph**: Neo4j, ArangoDB

## 📌 Quando escolher PostgreSQL?
- Quando você precisa de **estrutura rígida e integridade dos dados**.
- Para **aplicações críticas**, como sistemas financeiros, e-commerces, ERPs.
- Se quiser trabalhar com SQL + JSON ao mesmo tempo.
- Se precisar de **consistência e performance em consultas complexas**.
- Quando quer escalabilidade com replicação e alta disponibilidade.

## 💬 Extras:
- PostgreSQL é mantido por uma comunidade ativa e recebe atualizações frequentes.
- Tem suporte a **Stored Procedures, Triggers, Views, Roles**, etc.
- É usado por empresas como: **Instagram, Skype, Reddit, Spotify** (junto a outros bancos).


Aqui estão alguns **comandos básicos** para usar o **PostgreSQL** diretamente no terminal:

### 1. **Acessar o PostgreSQL:**
Para conectar ao PostgreSQL no terminal:

- **Conectar ao PostgreSQL:**
  ```bash
  psql -U usuario -d nome_do_banco
  ```
  Onde:
  - `usuario` é o nome do usuário do banco de dados.
  - `nome_do_banco` é o nome do banco de dados ao qual você deseja se conectar.

- **Conectar ao banco padrão `postgres`:**
  ```bash
  psql -U usuario -d postgres
  ```

### 2. **Comandos no PostgreSQL (dentro do terminal psql):**

#### **Gerenciamento de Banco de Dados**
- **Listar bancos de dados disponíveis:**
  ```sql
  \l
  ```
  
- **Conectar a um banco de dados específico:**
  ```sql
  \c nome_do_banco
  ```

- **Criar um banco de dados:**
  ```sql
  CREATE DATABASE nome_do_banco;
  ```

- **Excluir um banco de dados:**
  ```sql
  DROP DATABASE nome_do_banco;
  ```

#### **Gerenciamento de Tabelas**
- **Listar as tabelas no banco de dados atual:**
  ```sql
  \dt
  ```

- **Criar uma tabela:**
  ```sql
  CREATE TABLE nome_da_tabela (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100),
      idade INT
  );
  ```

- **Excluir uma tabela:**
  ```sql
  DROP TABLE nome_da_tabela;
  ```

- **Ver a estrutura de uma tabela:**
  ```sql
  \d nome_da_tabela
  ```

#### **Manipulação de Dados**
- **Inserir dados em uma tabela:**
  ```sql
  INSERT INTO nome_da_tabela (nome, idade) VALUES ('João', 25);
  ```

- **Selecionar dados de uma tabela:**
  ```sql
  SELECT * FROM nome_da_tabela;
  ```

- **Selecionar dados específicos com condição:**
  ```sql
  SELECT nome, idade FROM nome_da_tabela WHERE idade > 18;
  ```

- **Atualizar dados:**
  ```sql
  UPDATE nome_da_tabela SET idade = 26 WHERE nome = 'João';
  ```

- **Deletar dados:**
  ```sql
  DELETE FROM nome_da_tabela WHERE nome = 'João';
  ```

#### **Outros Comandos**
- **Exibir todos os comandos SQL executados:**
  ```sql
  \s
  ```

- **Ver todas as funções do PostgreSQL:**
  ```sql
  \df
  ```

- **Sair do psql:**
  ```sql
  \q
  ```

#### **Mostrar as configurações do banco de dados**
- **Exibir informações do banco de dados atual:**
  ```sql
  \conninfo
  ```


## ⚖️ **CAP Theorem (Teorema CAP)**

> Também chamado de **Teorema de Brewer**, ele afirma que **em um sistema distribuído**, é impossível garantir **simultaneamente** os três atributos a seguir:

| Letra | Significado         | O que é?                                                                 |
|-------|---------------------|-------------------------------------------------------------------------|
| **C** | Consistência (**Consistency**) | Todos os nós veem os mesmos dados ao mesmo tempo.                     |
| **A** | Disponibilidade (**Availability**) | Cada requisição recebe uma resposta, mesmo que nem todos os dados estejam atualizados. |
| **P** | Tolerância a Partições (**Partition Tolerance**) | O sistema continua funcionando mesmo que parte da rede falhe (quebra de comunicação entre nós). |

## 📊 **Visualização básica — Triângulo CAP**  
Imagine um triângulo com C, A e P nos vértices. Em caso de **falha na rede (partição)**, você só pode **escolher 2 dos 3** atributos.

```
          Consistência
           /       \
         /           \
     CAP              AP
       \             /
         \         /
        Disponibilidade
```

## 💡 Como isso afeta sistemas reais?

| Tipo de Sistema | Enfatiza | Exemplo |
|------------------|---------|--------|
| **CP (Consistência + Partição)** | Dados sempre corretos, mesmo que o sistema fique indisponível por um tempo | **MongoDB (em certos modos), HBase, Redis Cluster** |
| **AP (Disponibilidade + Partição)** | Sistema sempre responde, mas pode retornar dados desatualizados | **Cassandra, Couchbase, DynamoDB** |
| **CA (Consistência + Disponibilidade)** | Só é possível sem partições (quase teórico em sistemas distribuídos reais) | **RDBMS tradicional, mas não distribuído** |

## **Exemplos práticos de aplicação:**

### **Sistemas Bancários (CP)**
- Um saque precisa refletir imediatamente em todos os nós.
- Melhor manter consistência e sacrificar disponibilidade temporariamente.

### **Redes Sociais (AP)**
- É aceitável ver um post "atrasado" ou curtir algo que sumirá depois.
- Melhor garantir que a aplicação sempre responda.

### **E-commerce (CP ou AP, depende da parte)**
- Checkout: CP (consistência é crítica).
- Página de produto: AP (ok ver estoque ligeiramente desatualizado).

## 🛠 Como você **"utiliza" CAP na prática?**
Você não "escolhe CAP no código", mas sim:
- Decide **qual aspecto priorizar no design da arquitetura**.
- **Escolhe bancos de dados e estratégias de replicação** de acordo com suas prioridades.
- **Configura modos de consistência eventual, forte ou quorum**, conforme o caso.

Exemplo com MongoDB:
```js
// Você pode escolher o nível de consistência (write concern)
db.collection.insertOne(data, { writeConcern: { w: "majority" } });
```

## 📌 Resumo:

| Conceito | Explicação simples |
|---------|---------------------|
| **C** | Todos os dados estão sincronizados |
| **A** | Sempre recebo uma resposta |
| **P** | O sistema resiste a falhas de rede |

Em caso de falha, **você só consegue ter 2 dos 3**. E isso impacta diretamente o **design de sistemas escaláveis e escolha de banco de dados**.

<p align="center">
  <img src="https://3cs1e07ms.wordpress.com/wp-content/uploads/2016/02/cap.jpg" alt="CPA">
</p>