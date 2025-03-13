# Serviço de mensageria

Um **serviço de mensageria** (ou sistema de mensagens) é uma tecnologia usada para **comunicação assíncrona entre aplicações, serviços ou sistemas** — ou seja, uma forma de enviar mensagens entre partes diferentes de um sistema **sem que elas precisem estar diretamente conectadas ao mesmo tempo**.

### 📬 Em resumo:  
Um serviço de mensageria atua como um **intermediário (broker)** que **recebe, armazena e entrega mensagens** entre produtor(es) (quem envia) e consumidor(es) (quem recebe).  

### 🔧 Exemplo prático:
Imagine um e-commerce:

- Quando alguém faz um pedido, o sistema **envia uma mensagem "Novo Pedido Criado"** para um serviço de mensageria.
- Essa mensagem pode ser **consumida por outros serviços**, como:
  - Serviço de envio de e-mails (para notificar o cliente).
  - Serviço de estoque (para dar baixa no produto).
  - Serviço de logística (para iniciar o processo de entrega).

Tudo isso **sem o sistema principal precisar esperar que cada etapa seja concluída na hora**.  

### 💡 Benefícios:
- **Desacoplamento** entre sistemas.
- **Escalabilidade** (serviços podem processar mensagens no seu ritmo).
- **Tolerância a falhas** (se o consumidor estiver fora do ar, a mensagem pode ficar na fila até ele voltar).
- **Alta performance** em sistemas distribuídos.

### 🔁 Conceitos comuns:
| Termo | Significado |
|-------|-------------|
| **Fila (Queue)** | As mensagens são processadas em ordem (FIFO). |
| **Tópico (Topic)** | Vários consumidores podem receber a mesma mensagem (publicação/assinatura). |
| **Produtor (Producer)** | Quem envia a mensagem. |
| **Consumidor (Consumer)** | Quem recebe/processa a mensagem. |
| **Broker** | O intermediário (serviço que gerencia as mensagens). |

### 🚀 Exemplos de serviços de mensageria populares:
- **RabbitMQ** 🐰  
- **Apache Kafka** 🐘  
- **Amazon SQS (Simple Queue Service)**  
- **Redis Streams**  
- **Azure Service Bus**  
- **Google Pub/Sub**


# 🐰 O que é RabbitMQ?

O **RabbitMQ** é um **sistema de mensageria open-source** (message broker) que permite que diferentes sistemas ou serviços se comuniquem de forma **desacoplada e assíncrona**.

Em outras palavras, ele funciona como um **mensageiro digital**:  
- Um sistema **envia uma mensagem** (Produtor).  
- O RabbitMQ **guarda essa mensagem em uma fila**.  
- Outro sistema **recebe e processa essa mensagem** (Consumidor), no seu próprio tempo.
## 🔍 Como o RabbitMQ funciona?

1. **Produtor (Producer):** Envia mensagens para uma fila.  
2. **Fila (Queue):** Armazena temporariamente as mensagens até que sejam processadas.  
3. **Consumidor (Consumer):** Recebe e processa as mensagens da fila.

> Se o consumidor estiver fora do ar, a mensagem continua na fila até ele voltar. Nada se perde!
## ✅ Por que usar RabbitMQ?

- **Desacoplamento de sistemas:** os serviços não dependem diretamente uns dos outros.  
- **Escalabilidade:** múltiplos consumidores podem processar mensagens em paralelo.  
- **Resiliência:** mensagens não se perdem se algum sistema falhar.  
- **Melhor desempenho:** tarefas demoradas são processadas em segundo plano.  
- **Organização e controle de fluxo:** você controla quando e como cada parte do sistema reage a eventos.
## 📦 Casos de Uso Comuns + Exemplos Práticos

### 1. Microserviços

**Cenário real:**  
Você tem microserviços para pedidos, pagamentos e envio de e-mails.

**Como o RabbitMQ ajuda:**  
- O serviço de pedidos envia uma mensagem para a fila.  
- O serviço de pagamentos pega a mensagem e processa.  
- O serviço de e-mail escuta outra fila e envia o recibo.

➡ Os serviços ficam **independentes e mais fáceis de manter**.
### 2. Fila de Tarefas (Task Queue)

**Cenário real:**  
Seu sistema precisa enviar 1000 e-mails ou gerar 1000 PDFs.

**Como o RabbitMQ ajuda:**  
- Envia as tarefas para uma fila.  
- Consumidores vão pegando e executando uma a uma ou em paralelo.

➡ **Evita travamentos** no sistema principal.
### 3. Notificações em Tempo Real

**Cenário real:**  
Um usuário precisa ser avisado sobre uma nova mensagem ou evento.

**Como o RabbitMQ ajuda:**  
- O sistema envia uma mensagem para a fila de notificações.  
- Outro serviço pega a mensagem e envia push, e-mail ou SMS.

➡ Sistema de notificações **mais eficiente e confiável**.
### 4. Sistemas Desacoplados

**Cenário real:**  
Você quer que seu sistema funcione mesmo se uma parte estiver fora do ar.

**Como o RabbitMQ ajuda:**  
- Mensagens continuam na fila até o consumidor voltar.  
- Nenhuma tarefa é perdida.

➡ **Alta disponibilidade e tolerância a falhas**.
### 5. Processamento Assíncrono de Dados

**Cenário real:**  
Você precisa processar algo pesado (ex: relatório), mas sem travar a experiência do usuário.

**Como o RabbitMQ ajuda:**  
- Usuário envia o pedido → entra na fila.  
- O sistema processa em background.  
- Depois, envia o resultado via e-mail ou notificação.

➡ Usuário continua navegando normalmente, sem lentidão.
## 📈 Resumo Rápido

> “Use RabbitMQ quando quiser **enfileirar tarefas**, **desacoplar sistemas**, **processar eventos assíncronos** ou **garantir resiliência no seu sistema**.”
## 💻 Estrutura do exemplo

Vamos simular um sistema onde o usuário faz um **pedido via HTTP (Express)** e esse pedido é **enviado para uma fila no RabbitMQ**, depois outro processo (um consumidor) **pega essa mensagem da fila e processa**.

```bash
rabbitmq-example/
├── producer.js         # Express app que envia mensagens pra fila
├── consumer.js         # Serviço que escuta a fila e processa mensagens
```
## ✅ Pré-requisitos

- RabbitMQ rodando localmente (ou via Docker)  
- Node.js instalado

### (Opcional) Suba o RabbitMQ com Docker:

```bash
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

> Acesse o painel: [http://localhost:15672](http://localhost:15672)  
> Login padrão: **guest / guest**
## 📦 Instale as dependências

```bash
npm init -y
npm install express amqplib
```
## 🔸 `producer.js` — Envia mensagens para a fila

```js
// Importando bibliotecas necessárias
const express = require("express");
const amqp = require("amqplib");

const app = express();
app.use(express.json()); // Para entender JSON no body das requisições

const QUEUE = "pedidos";
let channel, connection;

async function connectRabbitMQ() {
  try {
    // Conectando ao RabbitMQ
    connection = await amqp.connect("amqp://localhost");
    channel = await connection.createChannel();

    // Garantindo que a fila existe
    await channel.assertQueue(QUEUE);
    console.log("✅ Conectado ao RabbitMQ");
  } catch (err) {
    console.error("Erro ao conectar ao RabbitMQ:", err);
  }
}

// Rota POST que envia o pedido para a fila
app.post("/pedido", async (req, res) => {
  const pedido = req.body;

  try {
    // Enviando mensagem para a fila
    channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(pedido)));
    console.log("📤 Pedido enviado para a fila:", pedido);
    res.status(200).send("Pedido recebido!");
  } catch (err) {
    console.error("Erro ao enviar pedido:", err);
    res.status(500).send("Erro ao enviar pedido.");
  }
});

// Inicializa o servidor e conecta ao RabbitMQ
app.listen(3000, () => {
  console.log("🚀 API rodando em http://localhost:3000");
  connectRabbitMQ();
});
```
## 🔸 `consumer.js` — Lê da fila e processa mensagens

```js
const amqp = require("amqplib");

const QUEUE = "pedidos";

async function startConsumer() {
  try {
    // Conectando ao RabbitMQ
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    // Garantindo que a fila existe
    await channel.assertQueue(QUEUE);

    console.log("🎧 Aguardando mensagens na fila...");

    // Escutando a fila
    channel.consume(QUEUE, (msg) => {
      const pedido = JSON.parse(msg.content.toString());
      console.log("✅ Pedido processado:", pedido);

      // Aqui você pode: salvar no banco, enviar e-mail, etc.
      channel.ack(msg); // Confirma que a mensagem foi processada
    });
  } catch (err) {
    console.error("Erro no consumidor:", err);
  }
}

startConsumer();
```
## ▶️ Como testar

1. Rode o **consumidor** em um terminal:
```bash
node consumer.js
```

2. Rode o **produtor (API Express)** em outro terminal:
```bash
node producer.js
```

3. Envie um pedido via `curl`:
```bash
curl -X POST http://localhost:3000/pedido \
  -H "Content-Type: application/json" \
  -d '{"produto": "Camiseta", "quantidade": 2, "cliente": "Larissa"}'
```
## 🧠 Recapitulando

- O Express é o **produtor**.  
- O `consumer.js` é o **consumidor**.  
- O RabbitMQ faz a **ponte entre os dois**.

