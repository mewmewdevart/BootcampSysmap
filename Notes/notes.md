## Diferença entre Dependências de Desenvolvimento e de Produção
- **Dependências de Desenvolvimento**: São usadas apenas durante o desenvolvimento do projeto, como ferramentas de teste, transpiladores, etc. Elas não são necessárias em um ambiente de produção.
- **Dependências de Produção**: São necessárias para a aplicação funcionar em produção. Incluem bibliotecas e frameworks que a aplicação utiliza diretamente.

## Dependências de Desenvolvimento
Coloque o `-D` na frente:
```sh
$ npm i -D typescript
```

## Dependências de Produção
```sh
$ npm i express
$ npm i dotenv // => permite a utilização de variaveis de ambiente
```

## Comandos npm e npx
- `npm`: Node Package Manager
- `npx`: Executa um comando do Node

### Exemplo
Iniciando um projeto TypeScript:
```sh
$ npx tsc --init
```

## Executando Scripts do package.json
No seu `package.json`, você pode definir scripts específicos, como `test`. Para rodar o script `test`, use o comando:

```ts
// No package.json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

```sh
$ npm run test
```

Para usar o Node.js com TypeScript e Express, você precisa instalar os tipos do Express. Você pode fazer isso executando o seguinte comando:

```sh
$ npm install --save-dev @types/express
```

## Automatizando o Processo de Desenvolvimento

Para automatizar o processo de desenvolvimento e evitar a necessidade de parar e reiniciar o servidor manualmente, você pode usar o `nodemon` e o `ts-node`. Instale-os como dependências de desenvolvimento:

```sh
$ npm i -D nodemon ts-node
```

Em seguida, adicione os seguintes scripts ao seu `package.json`:

```ts
// No package.json
  "scripts": {
    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

Agora, você pode iniciar o servidor em modo de desenvolvimento com o comando:

```sh
$ npm run dev
```

Para compilar o projeto TypeScript, use o comando:

```sh
$ npm run build
```

O arquivo transpilado estará disponível no diretório de saída especificado no seu `tsconfig.json`.

```sh
$ node dist/arquivo.js // => é o arquivo ts que foi transpilado
```

## Diferença entre Controllers e Services

- **Controller/**: Responsável por receber as requisições HTTP, processar os dados de entrada e enviar as respostas apropriadas. Ele atua como intermediário entre a camada de apresentação (frontend) e a camada de lógica de negócios (services).
- **Service/**: Contém a lógica de negócios da aplicação. É responsável por processar os dados, aplicar regras de negócio e interagir com a camada de dados (banco de dados, APIs externas, etc.). Os services são chamados pelos controllers para executar operações específicas.

## Exportando e Importando Módulos

### Exportação Padrão

Quando um elemento é o export padrão de um arquivo, você pode exportá-lo assim:

```ts
// No arquivo controllers/teste-controller.ts
export default testController;
```

E importá-lo no outro arquivo desta forma:

```ts
// No arquivo que importa o controller
import testController from "./controllers/teste-controller";
```

### Exportação Nomeada

Você também pode exportar elementos de forma nomeada:

```ts
// No arquivo controllers/teste-controller.ts
export const testController = (server: Express) => {
  // ...código do controller...
};
```

E importá-lo no outro arquivo desta forma:

```ts
// No arquivo que importa o controller
import { testController } from "./controllers/teste-controller";
```

## CORS (Cross-Origin Resource Sharing)
CORS é um mecanismo que permite que recursos restritos em uma página web sejam solicitados a partir de outro domínio fora do domínio do qual o recurso foi servido. Ele é usado para permitir que sua API seja acessada por diferentes domínios.

Para instalar os tipos do CORS, execute o seguinte comando:
```sh
$ npm i -D @types/cors
```

**Observação:** Nunca instale tipos (`@types`) em produção.

Para configurar o CORS no seu servidor, você pode usar o middleware `cors` do Express. Por exemplo, para permitir que apenas o domínio "www.teste.com.br" acesse sua API, adicione o seguinte código ao seu servidor:

```ts
import cors from 'cors';

// ...código existente...

server.use(cors({ origin: "https://www.teste.com.br" }));

// ...código existente...
```

