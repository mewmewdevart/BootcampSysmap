# Sumário
- [Comunicação Síncrona e Assíncrona](#comunicação-síncrona-e-assíncrona)
- [Serviços de Mensageria](#serviços-de-mensageria)
- [Programação Reativa](#programação-reativa)
- [Microsserviços](#microsserviços)

## Comunicação Síncrona e Assíncrona

A comunicação entre microsserviços pode ser dividida em dois tipos principais: **síncrona** e **assíncrona**. Uma analogia comum para ilustrar a diferença é o WhatsApp:

- **Comunicação Síncrona**: Quando você conversa com um **robô** no WhatsApp, ele te responde de forma **imediata**, ou seja, a comunicação é síncrona. A resposta acontece no mesmo momento em que você envia a mensagem.
- **Comunicação Assíncrona**: Já quando você conversa com uma **pessoa**, a resposta pode demorar horas ou até dias para chegar. Isso é uma comunicação assíncrona, onde não há garantia de uma resposta imediata.

## Serviços de Mensageria

Serviços de mensageria como **RabbitMQ** e **Kafka** são essenciais para a comunicação assíncrona entre microsserviços. Eles permitem que as mensagens sejam enviadas entre sistemas de forma desacoplada, o que melhora a escalabilidade e a resiliência da arquitetura.

- **RabbitMQ**: Sistema de mensageria baseado em filas, utilizado para comunicação assíncrona entre sistemas.
- **Kafka**: Plataforma distribuída de streaming de eventos, também usada para comunicação assíncrona em grandes sistemas.

## Programação Reativa

A **programação reativa** é um paradigma de programação assíncrona focado na manipulação de fluxos de dados e na propagação de mudanças. Isso permite que sistemas reagem de maneira eficiente a eventos e alterações de estado, sem a necessidade de bloquear a execução de outros processos.

Exemplo: Em vez de esperar por uma resposta de um serviço, o sistema pode continuar executando outras tarefas e "reagir" à resposta quando ela for recebida.

## Microsserviços

Em uma arquitetura de **microsserviços**, diferentes sistemas se comunicam por meio de **filas**. Isso permite que cada microsserviço se mantenha independente, realizando tarefas específicas e enviando mensagens de forma assíncrona para outros serviços, o que melhora a escalabilidade e a flexibilidade da aplicação.

A comunicação entre microsserviços pode ser feita de forma síncrona ou assíncrona, dependendo da necessidade do sistema. Filas de mensageria, como RabbitMQ ou Kafka, são comumente utilizadas para garantir essa comunicação eficiente e escalável.
