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