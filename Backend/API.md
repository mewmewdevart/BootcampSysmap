# Sumário
- [O que é API](#o-que-é-api)
- [API REST e JSON](#api-rest-e-json)
- [Diferença entre REST e RESTful](#diferença-entre-rest-e-restful)
- [Swagger](#swagger)
  - [O que o Swagger faz](#o-que-o-swagger-faz)
  - [Como funciona o Swagger](#como-funciona-o-swagger)
    - [Exemplo de especificação do Swagger](#exemplo-de-especificação-do-swagger)
    - [Swagger UI](#swagger-ui)
  - [Ferramentas principais do Swagger](#ferramentas-principais-do-swagger)
  - [Por que usar o Swagger](#por-que-usar-o-swagger)
  - [Conclusão](#conclusão)
- [Autenticação e CORS](#autenticação-e-cors)

## O que é API

**API** (Interface de Programação de Aplicações) é um conjunto de definições e protocolos que permite a comunicação entre sistemas. Elas permitem que diferentes sistemas se conectem e troquem dados de maneira eficiente e padronizada.

## API REST e JSON

Uma **API REST** é uma interface baseada no estilo de arquitetura **REST** (Representational State Transfer). Ela utiliza métodos HTTP padrão como GET, POST, PUT, DELETE para interagir com recursos em um servidor.

**JSON** (JavaScript Object Notation) é o formato de dados mais comum utilizado por APIs REST para enviar e receber informações, devido à sua simplicidade e compatibilidade com várias plataformas.

## Diferença entre REST e RESTful

- **REST**: Refere-se ao padrão ou protocolo arquitetural. Ele define um conjunto de restrições que devem ser seguidas para garantir a interoperabilidade entre sistemas.
  
- **RESTful**: Refere-se à implementação do padrão REST em um serviço ou API. Uma API é considerada RESTful quando segue todas as restrições e princípios do estilo arquitetural REST, como uso correto de métodos HTTP, stateless (sem estado) e a organização de recursos de forma lógica.

## Swagger

O **Swagger** é um conjunto de ferramentas para **documentação e teste de APIs RESTful**. Ele fornece uma maneira de descrever e interagir com a API de forma visual, o que facilita tanto o desenvolvimento quanto a integração com sistemas de terceiros. O Swagger se tornou popular por seu formato padrão de especificação de APIs, conhecido como **OpenAPI Specification (OAS)**, que é amplamente adotado pela indústria.

### O que o Swagger faz?

1. **Documentação Automática**:
   - O Swagger gera uma documentação interativa da API a partir de uma especificação escrita em formato YAML ou JSON. Essa documentação é legível e permite que os desenvolvedores vejam os endpoints, parâmetros de entrada, tipos de resposta, códigos de status e exemplos de uso.

2. **Testes de API**:
   - A documentação gerada pelo Swagger permite que os desenvolvedores **testem diretamente a API** a partir da interface web. Você pode enviar requisições HTTP diretamente do navegador, sem precisar de ferramentas externas como o Postman ou cURL.

3. **Integração Fácil**:
   - O Swagger facilita a integração entre equipes de desenvolvimento e outros sistemas, já que qualquer pessoa pode ver e interagir com a API sem precisar entender o código subjacente.

4. **Geração de Código**:
   - Além da documentação, o Swagger pode ser usado para **gerar automaticamente o código do cliente** em várias linguagens e frameworks, o que economiza tempo no processo de integração.

### Como funciona o Swagger?

O Swagger utiliza uma **especificação de API** (normalmente chamada de OpenAPI Specification - OAS), que descreve todos os aspectos de uma API de maneira estruturada. Essa especificação pode ser escrita manualmente ou gerada automaticamente a partir do código.

#### Exemplo de especificação do Swagger:

```yaml
openapi: 3.0.0
info:
  title: API de E-commerce
  description: API para gerenciar produtos e pedidos
  version: 1.0.0
paths:
  /produtos:
    get:
      summary: Lista todos os produtos
      responses:
        '200':
          description: Lista de produtos
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    id:
                      type: integer
                    nome:
                      type: string
                    preco:
                      type: number
                      format: float
```

Este arquivo YAML descreve um endpoint `/produtos` que, ao ser acessado via método GET, retorna uma lista de produtos.

#### Swagger UI:

A interface Swagger UI transforma essa especificação em uma documentação visual interativa, permitindo que você:

- Veja todos os endpoints da API.
- Teste cada um dos endpoints diretamente do navegador.
- Veja exemplos de resposta e código de status para cada operação.

### Ferramentas principais do Swagger:

1. **Swagger UI**:
   - Interface web interativa para explorar e testar APIs. A documentação gerada com Swagger UI permite que você envie requisições, veja respostas e entenda como a API funciona.

2. **Swagger Editor**:
   - Ferramenta para editar a especificação da API (geralmente em YAML ou JSON). Ela pode ser usada para criar e editar a documentação da API de forma colaborativa.

3. **Swagger Codegen**:
   - Gera automaticamente código de cliente e servidor em várias linguagens de programação a partir da especificação da API. Isso ajuda a acelerar o desenvolvimento de sistemas que consomem a API.

4. **Swagger Hub**:
   - Plataforma colaborativa para desenvolvimento, documentação e hospedagem de APIs, onde equipes podem compartilhar, versionar e testar suas APIs de forma centralizada.

### Por que usar o Swagger?

- **Facilidade de Integração**: Como as APIs são bem documentadas e interativas, a integração entre sistemas fica mais simples.
- **Padronização**: A especificação OpenAPI é um padrão amplamente aceito, garantindo consistência entre diferentes APIs.
- **Economia de Tempo**: A geração automática de código e a capacidade de testar as APIs diretamente pela interface ajudam a acelerar o desenvolvimento.
- **Acessibilidade**: Qualquer pessoa pode acessar a documentação interativa, o que facilita a colaboração entre equipes de desenvolvimento e outros stakeholders (como testers ou gerentes de produto).

### Conclusão

O Swagger é uma excelente ferramenta para **documentação e teste de APIs**, oferecendo uma maneira simples e visual de interagir com os endpoints de uma API sem precisar recorrer a ferramentas externas. Ele melhora a colaboração entre equipes e facilita o consumo e teste de APIs.

Se você estiver desenvolvendo uma API ou consumindo uma, o Swagger é uma ferramenta que pode fazer toda a diferença, aumentando a produtividade e garantindo que todos os envolvidos tenham uma boa experiência.

## Autenticação e CORS

**Autenticação**: É o processo de verificar a identidade de um usuário ou sistema antes de permitir acesso a um serviço. Em APIs, a autenticação é frequentemente feita por meio de tokens, como JWT (JSON Web Token).

**CORS** (Cross-Origin Resource Sharing) é uma política de segurança que define como os recursos de uma API podem ser compartilhados entre diferentes domínios. Quando uma aplicação web faz uma solicitação a uma API de outro domínio, o navegador verifica as configurações de CORS para garantir que a solicitação seja permitida.

[URL de HTTPS CATS](https://http.cat/)