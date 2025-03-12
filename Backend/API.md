# Sumário
- [O que é API](#o-que-é-api)
- [API REST e JSON](#api-rest-e-json)
- [Diferença entre REST e RESTful](#diferença-entre-rest-e-restful)
- [Autenticação e CORS](#autenticação-e-cors)

## O que é API

**API** (Interface de Programação de Aplicações) é um conjunto de definições e protocolos que permite a comunicação entre sistemas. Elas permitem que diferentes sistemas se conectem e troquem dados de maneira eficiente e padronizada.

## API REST e JSON

Uma **API REST** é uma interface baseada no estilo de arquitetura **REST** (Representational State Transfer). Ela utiliza métodos HTTP padrão como GET, POST, PUT, DELETE para interagir com recursos em um servidor.

**JSON** (JavaScript Object Notation) é o formato de dados mais comum utilizado por APIs REST para enviar e receber informações, devido à sua simplicidade e compatibilidade com várias plataformas.

## Diferença entre REST e RESTful

- **REST**: Refere-se ao padrão ou protocolo arquitetural. Ele define um conjunto de restrições que devem ser seguidas para garantir a interoperabilidade entre sistemas.
  
- **RESTful**: Refere-se à implementação do padrão REST em um serviço ou API. Uma API é considerada RESTful quando segue todas as restrições e princípios do estilo arquitetural REST, como uso correto de métodos HTTP, stateless (sem estado) e a organização de recursos de forma lógica.

## Autenticação e CORS

**Autenticação**: É o processo de verificar a identidade de um usuário ou sistema antes de permitir acesso a um serviço. Em APIs, a autenticação é frequentemente feita por meio de tokens, como JWT (JSON Web Token).

**CORS** (Cross-Origin Resource Sharing) é uma política de segurança que define como os recursos de uma API podem ser compartilhados entre diferentes domínios. Quando uma aplicação web faz uma solicitação a uma API de outro domínio, o navegador verifica as configurações de CORS para garantir que a solicitação seja permitida.
