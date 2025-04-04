# Swagger

Swagger é uma ferramenta amplamente utilizada para documentar APIs RESTful. Ele permite que desenvolvedores criem, descrevam, consumam e visualizem APIs de forma interativa.

## Instalação

Para instalar o Swagger em um projeto Node.js, você pode usar o pacote `swagger-ui-express`. Execute o seguinte comando no terminal:

```bash
npm install swagger-ui-express

npm install @types/swagger-ui-express ## para ts
```

## Configuração Básica

1. Crie um arquivo para a documentação da API, geralmente chamado `swagger.json` ou `swagger.yaml`. Este arquivo contém a definição da API no formato OpenAPI.

Exemplo de um arquivo `swagger.json` básico:
```json
{
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "Minha API",
    "description": "Descrição da minha API"
  },
  "host": "localhost:3000",
  "basePath": "/",
  "schemes": ["http"],
  "paths": {
    "/exemplo": {
      "get": {
        "summary": "Exemplo de endpoint",
        "responses": {
          "200": {
            "description": "Sucesso"
          }
        }
      }
    }
  }
}
```

2. Configure o Swagger no seu servidor Express:

```javascript
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
  console.log('Documentação disponível em http://localhost:3000/api-docs');
});
```

## Acessando a Documentação

Após configurar, você pode acessar a documentação da API no navegador através do endpoint `/api-docs`.

## Recursos Adicionais

- [Documentação oficial do Swagger](https://swagger.io/docs/)
- [Editor online do Swagger](https://editor.swagger.io/)
