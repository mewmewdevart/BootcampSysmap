# Guia Completo de LocalStack 🌐

## Sumário
- [O que é LocalStack?](#o-que-é-localstack)
- [Vantagens do LocalStack](#vantagens-do-localstack)
- [Como instalar o LocalStack](#como-instalar-o-localstack)
- [Como usar o LocalStack](#como-usar-o-localstack)
- [Comandos úteis](#comandos-úteis)
- [Upload de arquivos com Multer e S3](#upload-de-arquivos-com-multer-e-s3)
- [Instalar Multer e Tipos para TypeScript](#instalar-multer-e-tipos-para-typescript)

---

## O que é LocalStack?

LocalStack é uma ferramenta que simula serviços da AWS (Amazon Web Services) localmente. Ele permite que desenvolvedores testem e desenvolvam aplicações que dependem de serviços da AWS sem precisar de uma conta ou conexão com a nuvem.

### Serviços suportados:
LocalStack suporta diversos serviços da AWS, como:
- **S3** (Simple Storage Service)
- **DynamoDB** (Banco de dados NoSQL)
- **Lambda** (Funções serverless)
- **API Gateway**
- **SNS** (Simple Notification Service)
- **SQS** (Simple Queue Service)
- E muitos outros.

---

## Vantagens do LocalStack

- **Custo zero**: Não há custos associados ao uso de serviços da AWS localmente.
- **Desenvolvimento offline**: Funciona sem necessidade de conexão com a internet.
- **Velocidade**: Reduz o tempo de feedback ao evitar chamadas para a nuvem.
- **Ambiente isolado**: Permite testar aplicações em um ambiente controlado.
- **Integração fácil**: Compatível com ferramentas e SDKs da AWS.

---

## Como instalar o LocalStack

### Pré-requisitos:
1. **Docker**: Certifique-se de que o Docker está instalado e funcionando.
   - Verifique a instalação com:
     ```bash
     docker --version
     ```

2. **Python** (opcional): Para usar o CLI do LocalStack.

### Instalação com Docker:
1. Baixe a imagem do LocalStack:
   ```bash
   docker pull localstack/localstack
   ```

2. Suba o container:
   ```bash
   docker run -d --name localstack -p 4566:4566 localstack/localstack
   ```

### Instalação com Docker Compose:
Adicione o seguinte serviço ao seu arquivo `docker-compose.yml`:
```yaml
localstack:
  image: localstack/localstack
  container_name: localstack
  ports:
    - "4566:4566"
  environment:
    SERVICES: s3
    AWS_REGION: us-east-1
    AWS_ACCESS_KEY: test
    AWS_SECRET_ACCESS_KEY: test
```

Suba o serviço com:
```bash
sudo docker compose up -d
```

---

## Como usar o LocalStack

### Configurar o AWS CLI:
1. Instale o AWS CLI:
   ```bash
   sudo apt install awscli
   ```

2. Configure o AWS CLI para usar o LocalStack:
   ```bash
   aws configure
   ```
   - **Access Key**: `test`
   - **Secret Key**: `test`
   - **Region**: `us-east-1`
   - **Output format**: `json`

3. Adicione o endpoint do LocalStack ao usar comandos do AWS CLI:
   ```bash
   aws --endpoint-url=http://localhost:4566 s3 ls
   ```

### Criar um bucket S3:
1. Crie um bucket:
   ```bash
   aws --endpoint-url=http://localhost:4566 s3 mb s3://meu-bucket
   ```

2. Liste os buckets:
   ```bash
   aws --endpoint-url=http://localhost:4566 s3 ls
   ```

3. Envie um arquivo para o bucket:
   ```bash
   aws --endpoint-url=http://localhost:4566 s3 cp arquivo.txt s3://meu-bucket/
   ```

### Instalar o SDK da AWS para Node.js:
Para interagir com serviços simulados pelo LocalStack, como o S3, você pode usar o SDK da AWS. Instale os pacotes necessários com os comandos:
```bash
npm install @aws-sdk/client-s3
npm install @aws-sdk/s3-request-presigner
```

Após a instalação, você pode usar o SDK para criar buckets, enviar arquivos e muito mais. Por exemplo:
```javascript
import { S3Client, CreateBucketCommand } from "@aws-sdk/client-s3";

const client = new S3Client({
  endpoint: "http://localhost:4566",
  region: "us-east-1",
  credentials: {
    accessKeyId: "test",
    secretAccessKey: "test",
  },
});

const run = async () => {
  try {
    const data = await client.send(new CreateBucketCommand({ Bucket: "meu-bucket" }));
    console.log("Bucket criado com sucesso:", data);
  } catch (err) {
    console.error("Erro ao criar bucket:", err);
  }
};

run();
```

---

## Upload de arquivos com Multer e S3

### Configuração do Multer
O `multer` é usado para lidar com uploads de arquivos no Node.js. Ele pode ser integrado com o LocalStack para armazenar arquivos no S3.

1. Configure o `multer` para armazenar arquivos na memória:
   ```javascript
   import multer from "multer";
   const storage = multer.memoryStorage();
   export const upload = multer({ storage });
   ```

2. Envie o arquivo para o S3 usando o SDK da AWS:
   ```javascript
   import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

   const s3 = new S3Client({
     endpoint: "http://localhost:4566",
     region: "us-east-1",
     credentials: {
       accessKeyId: "test",
       secretAccessKey: "test",
     },
   });

   export async function uploadFileToS3(file) {
     const params = {
       Bucket: "meu-bucket",
       Key: file.originalname,
       Body: file.buffer,
       ContentType: file.mimetype,
     };

     await s3.send(new PutObjectCommand(params));
     console.log(`Arquivo ${file.originalname} enviado para o bucket.`);
   }
   ```

3. Crie uma rota para upload de arquivos:
   ```javascript
   import express from "express";
   import { upload } from "./services/upload-service";
   import { uploadFileToS3 } from "./services/upload-service";

   const router = express.Router();

   router.post("/upload", upload.single("file"), async (req, res) => {
     try {
       if (!req.file) {
         return res.status(400).send("Nenhum arquivo enviado.");
       }
       await uploadFileToS3(req.file);
       res.status(200).send("Arquivo enviado com sucesso.");
     } catch (err) {
       console.error(err);
       res.status(500).send("Erro ao enviar arquivo.");
     }
   });

   export default router;
   ```

4. Teste o upload:
   Use ferramentas como Postman ou cURL para enviar um arquivo para a rota `/upload`.
   ```bash
   curl -X POST -F "file=@caminho/do/arquivo.txt" http://localhost:3000/upload
   ```

---

## Instalar Multer e Tipos para TypeScript

Para lidar com uploads de arquivos no Node.js, você pode usar o pacote `multer`. Se estiver usando TypeScript, também é necessário instalar os tipos correspondentes.

### Instalação:
1. Instale o `multer`:
   ```bash
   npm install multer
   ```

2. Instale os tipos para TypeScript:
   ```bash
   npm install --save-dev @types/multer
   ```

### Verificação:
Após a instalação, verifique se as dependências foram adicionadas ao arquivo `package.json`:
```json
"dependencies": {
  "multer": "^1.4.5-lts.2"
},
"devDependencies": {
  "@types/multer": "^1.4.12"
}
```

Agora você pode usar o `multer` com suporte completo ao TypeScript em seu projeto.

--- 

## Comandos úteis

### Gerenciar containers:
- **Verificar se o container está rodando**:
  ```bash
  docker ps
  ```

- **Parar o container**:
  ```bash
  docker stop localstack
  ```

- **Remover o container**:
  ```bash
  docker rm localstack
  ```

### Limpar recursos:
Para limpar buckets, tabelas ou outros recursos criados no LocalStack, use os comandos equivalentes do AWS CLI com o endpoint do LocalStack.

---

Com o LocalStack, você pode simular serviços da AWS de forma eficiente e sem custos, acelerando o desenvolvimento e testes de suas aplicações! 🚀
