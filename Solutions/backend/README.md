<p align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/3668/3668474.png" alt="Backend Logo" style="width: 150px;">
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT" target="_blank">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="Licença MIT">
  </a>
</p>

<p align="center">
  <b><i>🚀 | Minha solução para o desafio backend da Sysmap</i></b>
</p>



## 📚 Sumário

1. [Introdução](#-introdução)
2. [Desafio](#-desafio)
3. [Funcionalidades](#-funcionalidades)
4. [Arquitetura e Estrutura do Projeto](#-arquitetura-e-estrutura-do-projeto)
5. [Desafios e Soluções](#-desafios-e-soluções)
6. [Testes Realizados](#-testes-realizados)
7. [Como Rodar o Projeto](#-como-rodar-o-projeto)
   - [Rodando com Docker Compose](#rodando-com-docker-compose)
   - [Rodando somente com Dockerfile](#rodando-somente-com-dockerfile)
8. [Endpoints da API](#-endpoints-da-api)
9. [Tecnologias Utilizadas](#-tecnologias-utilizadas)
10. [Referências](#-referências)
11. [Experiencia](#-experiencia)
12. [Licença](#-licença)

## 📖 Introdução

Este projeto é uma plataforma desenvolvida como parte do desafio backend da Sysmap. Ele inclui:

- **Cadastro e Autenticação de Usuários**
- **Criação e Gestão de Atividades**
- **Sistema de XP, Níveis e Conquistas**

O backend foi implementado com **Node.js**, **Express**, **TypeScript** e **Prisma ORM**, utilizando **PostgreSQL** como banco de dados. Para simular serviços AWS (como o S3), foram utilizados o **LocalStack** e a containerização foi realizada com **Docker** e **Docker Compose**.

## 🎯 Desafio

O desafio exigia a criação de uma aplicação backend completa com:

- Cadastro de usuários com validações rigorosas.
- Gestão de atividades com regras de negócio específicas (inscrição, check-in, conclusão).
- Sistema de XP e conquistas para engajamento.
- Integração com serviços simulados (S3 via LocalStack).
- Cobertura de testes unitários e de integração, garantindo robustez e consistência.

## 💡 Funcionalidades

- **Autenticação e Segurança:**  
  Uso de JWT para autenticação, bcrypt para criptografia, e middleware para autorização.

- **Gestão de Atividades:**  
  Criação, edição, exclusão, inscrição, check-in e conclusão de atividades, com regras específicas para o criador e para os participantes.

- **XP, Níveis e Conquistas:**  
  Sistema que atribui XP e desbloqueia conquistas automaticamente, dentre as quais:
  - **Primeiro Login:** Conquista ao realizar o primeiro login.
  - **Primeira Atividade Criada:** Ao criar a primeira atividade.
  - **Primeira Atividade Concluída:** Quando o criador conclui uma atividade pela primeira vez.
  - **Alteração do Avatar:** Ao atualizar a foto de perfil.
  - **Subir de Nível:** Ao acumular XP suficiente para avançar de nível.

- **Mensagens Padronizadas:**  
  Utilização de constantes para centralizar mensagens de erro e sucesso em todo o sistema.

## 🚀 Arquitetura e Estrutura do Projeto

### Arquitetura

A aplicação segue uma **arquitetura em camadas**, onde:

- **Controllers:** Intermediam as requisições HTTP e delegam à camada de serviços.
- **Services:** Contêm a lógica de negócio e interagem com o banco via Prisma.
- **Middlewares:** Validam a autenticação, autorização e outras verificações.
- **Utils:** Fornecem funções auxiliares, como o `createError`.
- **Constants:** Centralizam todas as mensagens padronizadas (erros e sucessos).
- **Validações:** Utilizam Zod para garantir que os dados de entrada estejam corretos.

### Estrutura do Projeto

A estrutura do repositório é organizada da seguinte forma:

```
.
├── docker-compose.yml         # Orquestração dos serviços com Docker Compose.
├── Dockerfile                 # Instruções para construir a imagem da aplicação.
├── entrypoint.sh              # Script de inicialização para aplicação de migrações e seed.
├── prisma                     
│   ├── migrations             # Migrações do banco de dados.
│   ├── schema.prisma          # Schema do Prisma.
│   └── seed.ts                # População inicial do banco de dados.
├── src                        
│   ├── app.ts                 # Configuração global da aplicação.
│   ├── config                 # Configurações (banco, LocalStack, validações, etc).
│   ├── constants              # Mensagens de erro e sucesso padronizadas.
│   ├── docs                   # Documentação da API (Swagger).
│   ├── middlewares            # Validadores de autenticação e autorização.
│   ├── modules                # Módulos (activities, auth, users) com controllers, services e rotas.
│   ├── routes                 # Rotas principais da aplicação.
│   ├── server.ts              # Inicialização do servidor.
│   └── utils                  # Funções auxiliares, como utilitários para erros e conquistas.
└── tests                      # Testes unitários e de integração.
    ├── controllers          
    ├── middlewares          
    ├── services             
    └── utils                
```

## 🚀 Desafios e Soluções

- **Padronização de Erros:**  
  Foi desenvolvido um utilitário `createError` para garantir que todas as respostas de erro contenham um status code e mensagem consistentes.

- **Validações Rigorosas:**  
  A utilização do Zod garante que os campos obrigatórios e formatos estejam corretos, prevenindo dados inválidos.

- **Integração Simulada:**  
  LocalStack foi configurado para simular o S3, enquanto o PostgreSQL é containerizado para garantir um ambiente consistente.

- **Estrutura Modular e Testes Abrangentes:**  
  A aplicação foi dividida em módulos (activities, auth, users), e os testes unitários e de integração foram implementados com Jest para garantir a robustez do sistema.

## 📚 Testes Realizados

- **Testes Unitários:**  
  Verificam a lógica isolada nas camadas de controllers, services e utils.
  
- **Testes de Integração:**  
  Validam o fluxo completo entre as camadas, assegurando que a aplicação funcione conforme esperado.
  
- **Testes de Middleware:**  
  Avaliam a segurança e a autenticação das requisições.

- **Testes do Lint**
  Organiza os blocos do codigo (espaçamento, etc)

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- **Node.js** (v18 ou superior)
- **Docker & Docker Compose**
- **Git**

### Passos para Rodar com Docker Compose

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/bc-fullstack-06/Larissa-Cristina-Benedito.git
   cd backend
   ```

2. **Instale as dependências (opcional para desenvolvimento local):**
   ```bash
   npm install
   ```

3. **Inicie os containers com Docker Compose:**
   ```bash
   docker-compose up --d
   ```
   - Essa opção inicializa os serviços do PostgreSQL, LocalStack e a API.
   - A API será mapeada para a porta `3001`, PostgreSQL para a porta `5434` e LocalStack para a porta `4566`.

4. **Verifique os logs dos containers para assegurar que os serviços estão rodando corretamente.**

5. **Aplique as migrações e popule o banco (geralmente realizado via entrypoint.sh):**
   - O script `entrypoint.sh` é executado automaticamente ao iniciar o container da API e cuida de aplicar as migrações e rodar o seed.

### Rodando Somente com o Dockerfile

Caso prefira rodar somente o container da API (sem orquestração completa com compose), siga os passos abaixo:

1. **Construa a imagem da API:**
   ```bash
   docker build -t api .
   ```

2. **Rode o container da API:**
   ```bash
   ## Verifique se a rota está disponivel
   docker run -p 3001:3001 --env-file .env api
   ```

3. **Verifique se a API está rodando:**  
   Acesse `http://localhost:3001`.

## 📡 Endpoints da API

### Exemplos

- **Autenticação:**
  - `POST /auth/register` – Registro de usuários.
  - `POST /auth/sign-in` – Login de usuários.

- **Atividades:**
  - `POST /activities/new` – Criação de atividades.
  - `PUT /activities/:id` – Atualização de atividades.
  - `DELETE /activities/:id` – Exclusão de atividades.
  - `POST /activities/:id/subscribe` – Inscrição em atividades.
  - `PUT /activities/:id/check-in` – Check-in em atividades.
  - `PUT /activities/:id/conclude` – Conclusão de atividades.

- **Usuários:**
  - `GET /users` – Listagem de usuários.
  - `GET /users/:id` – Detalhes do usuário.
  - `PUT /users/:id` – Atualização de dados do usuário.
  - `POST /users/:id/experience` – Adicionar XP ao usuário.
  - `POST /users/:id/achievements` – Adicionar conquistas ao usuário.
  - `PUT /users/avatar` – Atualizar avatar do usuário.

## 📷 Screenshoot do Swagger

![Swagger Documentation](https://github.com/user-attachments/assets/88a40347-9c54-43a9-846c-34276a13512a)

## 🚀 Tecnologias Utilizadas

- **Backend Framework:** Node.js, Express, TypeScript
- **Banco de Dados:** PostgreSQL (via Prisma ORM)
- **Autenticação:** JWT, bcrypt
- **Validações:** Zod
- **Armazenamento:** LocalStack (simulando o AWS S3)
- **Containerização:** Docker & Docker Compose
- **Documentação:** Swagger
- **Testes:** Jest

## 📚 Referências

- [Node.js Documentation](https://nodejs.org/docs/latest/api/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Jest Documentation](https://jestjs.io/pt-BR/)
- [Docker Documentation](https://docs.docker.com/)
- [Swagger Documentation](https://swagger.io/docs/)

## 👩🏿 Experiencia

Durante o desenvolvimento a retas finais do desafio, enfrentei um período muito corrido durante a semana, o que me deixou com pouco tempo para assimilar completamente os conceitos essenciais do projeto (e rever a aula). No último dia tive que correr para implementar o máximo possível, o que acabou resultando em testes e documentação Swagger que não atingiram o padrão que eu desejava. Mesmo assim, estou contente com o aprendizado proporcionado pela experiência. Essa vivência me permitiu mergulhar em novas tecnologias como Docker, Prisma, e testes unitários, além de me desafiar a resolver problemas sob pressão uma lição super F0d4. Obrigada pela experiencia!

## 📜 Licença

Este projeto está licenciado sob a [Licença MIT](https://opensource.org/licenses/MIT).

<p align="center">
  Desenvolvido com muito ☕ por
  <a href="https://linktr.ee/mewmewdevart" target="_blank">Larissa Cristina Benedito</a>
</p>
