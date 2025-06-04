<p align="center">
  <img src="https://github.com/user-attachments/assets/f2745810-1c5d-4901-a097-dc2ec25109a8" alt="Frontend FitMeet Logo" style="width: 150px;">
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT" target="_blank">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="Licença MIT">
  </a>
</p>

<p align="center">
  <b><i>🚀 | Minha solução para o desafio frontend da Sysmap</i></b>
</p>

## 📚 Sumário

1. [📖 Introdução](#-introdução)
2. [🎯 Desafio](#-desafio)
3. [🚀 Funcionalidades](#-funcionalidades)
4. [🛠️ Arquitetura e Estrutura do Projeto](#️-arquitetura-e-estrutura-do-projeto)
5. [⚙️ Desafios e Soluções](#️-desafios-e-soluções)
6. [🚀 Como Rodar o Projeto](#-como-rodar-o-projeto)
   - [Rodando o frontend](#rodando-o-frontend)
   - [Rodando o backend com Docker Compose](#rodando-o-backend-com-docker-compose)
7. [🖼️ Prints de Tela](#️-prints-de-tela)
   - [Tela de Login](#tela-de-login)
   - [Tela de Cadastro](#tela-de-cadastro)
   - [Tela Inicial](#tela-inicial)
   - [Tela de Categorias](#tela-de-categorias)
   - [Tela de Perfil](#tela-de-perfil)
   - [Tela de Edição de Perfil](#tela-de-edição-de-perfil)
8. [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
9. [📚 Referências](#-referências)
10. [👩🏿 Experiência](#-experiência)
11. [📜 Licença](#-licença)

## 📖 Introdução

Este projeto é uma plataforma desenvolvida como parte do desafio frontend da Sysmap. Ele inclui:

- Cadastro e login de usuários com validações robustas. [✅]
- Seleção de preferências de atividades físicas. [✅]
- Criação de eventos com opção de participação pública ou privada. [✅]
- Inscrição em eventos e sistema de aprovação para eventos privados. [❌]
- Check-in via código de confirmação. [❌]
- Sistema de pontuação e conquistas. [✅]
- Perfil do usuário com nível e histórico de atividades. [✅]
- Edição de atividades e perfil. [✅]
- Cancelamento e encerramento de atividades. [❌]

O frontend foi implementado utilizando React, Vite, TypeScript, Tailwind CSS, Radix UI, React Router DOM, Zod, UUID e React Leaflet para o Maps. Seguindo o design do Figma.

## 🎯 Desafio

O sistema permite que usuários criem eventos esportivos, podendo ser públicos ou privados. Os eventos privados requerem aprovação do organizador para participação. Os participantes podem validar sua presença com um código de check-in e ganhar pontos (XP) para evoluir de nível e desbloquear conquistas.

## 🚀 Funcionalidades

- **Autenticação:** Login e registro de usuários com validações de CPF, e-mail e senha.
- **Criação de Atividades:** Criação de eventos com imagens, localização e tipos de atividades.
- **Sistema de Pontuação:** Usuários ganham XP ao participar ou criar atividades.
- **Conquistas:** Desbloqueio de conquistas com base em ações realizadas.
- **Perfil do Usuário:** Exibição de nível, XP, conquistas e histórico de atividades.
- **Edição de Perfil:** Alteração de dados pessoais e avatar.
- **Mapa Interativo:** Seleção de localizações para atividades usando React Leaflet.
- **Acessibilidade:** Componentes acessíveis com Radix UI e boas práticas de design.

## 🛠️ Arquitetura e Estrutura do Projeto

### Arquitetura

O projeto segue uma arquitetura modular baseada em Atomic Design, permitindo uma estrutura organizada e escalável. Os componentes são divididos em:

- **Átomos:** Elementos básicos, como botões e inputs.
- **Moléculas:** Combinações de átomos que formam pequenas funcionalidades.
- **Organismos:** Seções completas, como formulários e listas.
- **Templates:** Estrutura base das páginas.
- **Páginas:** Telas da aplicação que reúnem os templates e organismos.

## ⚙️ Desafios e Soluções

Durante o desenvolvimento desta aplicação, alguns desafios surgiram e foram superados com as seguintes estratégias:

- **Validação de Formulários:** Implementação de validações rigorosas utilizando **Zod** para garantir inputs corretos de CPF, e-mail e senha.
- **Gerenciamento de Estado:** Utilização de **React Context API** para estados globais e **React Router** para navegação eficiente entre páginas.
- **Autenticação e Segurança:** Proteção de endpoints e integração segura para login e registro utilizando **React Router Dom** e boas práticas de autenticação.
- **Mapeamento e Localização:** Implementação de **Leaflet** e **React Leaflet** para exibir pontos de encontro das atividades físicas.
- **Design Responsivo e Acessibilidade:** Uso de **Tailwind CSS**, **clsx**, **tw-animate-css** e componentes **Radix UI (do Shadcn)** para garantir acessibilidade e responsividade.

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- **Node.js** (v18 ou superior)
- **Git**
- **Docker Compose** (necessário para rodar o backend em conjunto com o frontend)

### Rodando o frontend

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/bc-fullstack-06/Larissa-Cristina-Benedito.git
   cd frontend/
   ```

2. **Instale as dependências do frontend:**
   ```bash
   npm install
   ```

3. **Inicie o frontend:**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação:**
   Abra o navegador e acesse:
   ```
   http://localhost:5173
   ```

### Rodando o backend com Docker Compose

1. **Baixe o arquivo `compose.yml`:**
   Baixe o arquivo necessário para rodar o backend com Docker Compose clicando [aqui](https://files.online.engaged.com.br/65d604f57698ea0007795a6f/YCc5FNaSQ2h2Nw8Q58wZ_compose.yml).

2. **Abra o terminal na pasta onde o arquivo `compose.yml` está localizado:**
   Navegue até o diretório onde você salvou o arquivo `compose.yml`.

3. **Execute o comando para iniciar os containers:**
   ```bash
   docker compose up -d
   ```

4. **Aguarde a execução dos containers:**
   Certifique-se de que todos os containers foram iniciados corretamente. Você pode verificar o status dos containers com o comando:
   ```bash
   docker ps
   ```

5. **Parar os containers:**
   ```bash
   docker compose down
   ```

## 🖼️ Prints de Tela

### Tela de Login

- **Tela de Login**
  ![Tela de Login](https://github.com/user-attachments/assets/00ea6000-4ad0-4792-bcf4-9071ca48aa8d)

- **Validações dos Inputs**
  ![Validações dos Inputs](https://github.com/user-attachments/assets/157eba0e-1674-4c0d-b05f-37bd66559857)

- **Responsividade**
  ![Responsividade](https://github.com/user-attachments/assets/50ad62c7-78c5-4474-8c79-d3c28115d556)

### Tela de Cadastro

- **Tela de Cadastro**
  ![Tela de Cadastro](https://github.com/user-attachments/assets/cf432cf9-3f1a-41c0-86a0-ae1b35925daf)

- **Validações dos Inputs**
  ![Validações dos Inputs](https://github.com/user-attachments/assets/a363e8b4-f041-4c44-8c43-d33b5623a043)

- **Responsividade**
  ![Responsividade](https://github.com/user-attachments/assets/79149aa2-9316-4ca0-ae38-ac359a005d9b)

### Tela Inicial

- **Sem Atividades**
  ![Sem Atividades](https://github.com/user-attachments/assets/82cf14f7-9f04-4b3d-9f20-248c3cc0a53e)

- **Modal de Atividades**
  ![Modal de Atividades](https://github.com/user-attachments/assets/24bdc23e-ce40-43ae-8192-da5b6e4ffbdd)

- **Responsividade**
  ![Responsividade](https://github.com/user-attachments/assets/4e28f027-8db2-433a-bc2a-b9aca4429856)

### Tela de Categorias

- **Categoria Futebol**
  ![Categoria Futebol](https://github.com/user-attachments/assets/9fc29cf0-2209-4e19-8843-d9ae98cc8da8)

### Tela de Perfil

- **Perfil do Usuário**
  ![Perfil do Usuário](https://github.com/user-attachments/assets/25c335fd-c7e4-49ac-a705-8e20adc986fa)

### Tela de Edição de Perfil

- **Alteração de Foto**
  ![Alteração de Foto](https://github.com/user-attachments/assets/30614075-4292-4610-9765-f49f7a9b6a56)

- **Deletar Perfil**
  ![Deletar Perfil](https://github.com/user-attachments/assets/2c21908a-faf6-4744-9ea8-06b7f359f3ff)


## 🛠️ Tecnologias Utilizadas

### **Front-end**

- **React.js** – Biblioteca para construção da interface do usuário.
- **Tailwind CSS** – Estilização rápida e responsiva.
- **Shadcdn (Radix UI e Lucide)** – Componentes acessíveis para melhorar a usabilidade.
- **Lucide React** – Ícones modernos e personalizáveis.

### **Gerenciamento e Validação**

- **Zod** – Biblioteca para validação de dados.
- **React Router** – Gerenciamento de rotas da aplicação.
- **React Context API** – Controle de estado global.

### **Mapa e Localização**

- **Leaflet** – Biblioteca de mapas interativa.
- **React Leaflet** – Integração de Leaflet com React.

### **Ferramentas e Configuração**

- **Docker** – Facilita a configuração do ambiente de desenvolvimento.
- **ESLint / Prettier** – Garantia de código limpo e padronizado.
- **Vite** – Ambiente de desenvolvimento rápido e otimizado.
- **UUID** – Geração de identificadores únicos.

## 📚 Referências

- [Documentação React](https://reactjs.org/)
- [Radix UI (shadcn)](https://ui.shadcn.com/)
- [Figma Design](https://www.figma.com/)
- [React Leaflet](https://react-leaflet.js.org/)
- [Leaflet](https://leafletjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/)
- [React Router](https://reactrouter.com/)
- [Lucide Icons](https://lucide.dev/)
- [Class Variance Authority (CVA)](https://cva.style/)
- [Vite](https://vitejs.dev/)
- [UUID](https://github.com/uuidjs/uuid)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## 👩🏿 Experiência

Esse projeto foi intenso, desafiador e, acima de tudo, muito divertido de desenvolver. Apesar do escopo extenso e de não ter conseguido entregar todas as telas previstas no Figma, trabalhar em uma aplicação tão completa foi extremamente gratificante. Cada etapa trouxe aprendizados valiosos e me permitiu colocar em prática conceitos avançados de frontend que antes pareciam distantes. Alguns destaques:

- **Integração Frontend e Backend:** Essa parte me tirou da zona de conforto no bom sentido. Trabalhar com chamadas autenticadas, gerenciar tokens, tratar erros de API… tudo isso me deu uma visão muito mais clara (e realista) de como essas camadas se conversam no dia a dia.
- **Gerenciamento de Estado com Context API:** Criar e organizar contextos como `AuthContext`, `UserContext` e `ActivitiesContext` foi um baita desafio, mas no final fez tudo fazer sentido. Ver a aplicação reagindo aos dados globais de forma fluida foi uma das partes mais satisfatórias do projeto.
- **Validações com Zod:** Implementar validações robustas, especialmente com campos dinâmicos no `ValidatedFieldComponent`, me fez entender a importância de entregar formulários mais seguros e amigáveis sem abrir mão da usabilidade.
- **Acessibilidade e Responsividade:** Garantir que a aplicação fosse acessível de verdade (com foco visível, navegação por teclado, etc.) e que se comportasse bem em diferentes dispositivos foi uma prioridade desde o início. Gosto de pensar que cada ajuste aqui é um passo a mais para uma web mais inclusiva.
- **Mapas com React Leaflet:** Integrar o `MapPicker` foi uma daquelas partes mais técnicas, mas também mais recompensadoras. Fazer o mapa funcionar de forma intuitiva e visualmente limpa exigiu bastante atenção aos detalhes.
- **Extras que agregam:** Além das funcionalidades principais, adicionei:
  - Tela de carregamento para uma UX mais fluida.
  - Ajustes visuais como espaçamentos entre os cards.
  - Página de Termos de Serviço (fictícia, mas estratégica) pensando em LGPD.
  - Mensagens de feedback claras e humanas — porque ninguém merece erros genéricos.
- **Componentização:** Criar componentes reutilizáveis como `ButtonComponent`, `ToastNotifications`, e `ModalActivitiesComponent` ajudou demais a manter o projeto organizado e escalável.

> Se eu fosse refazer esse projeto hoje, faria de outro jeito: priorizaria a integração com o backend desde o começo e deixaria a estilização para depois. Ter feito o caminho inverso estilizar tudo primeiro e só depois conectar acabou me tomando muito tempo, especialmente quando precisei resolver conflitos de estilo que atrapalharam o fluxo da integração. Foi um daqueles aprendizados que a gente só entende mesmo na prática.

As partes mais desafiadoras foram, sem dúvida, o gerenciamento de estado global e a integração com o backend especialmente nas funcionalidades de criação e edição de atividades com validações e upload de imagens. Foi ali que entendi como tudo se conecta na prática.

No fim das contas, esse projeto foi um verdadeiro laboratório. Me empurrou pra frente, me fez quebrar a cabeça (no bom sentido) e consolidou muitas das habilidades que venho desenvolvendo. Ver a aplicação funcionando e ganhando vida foi, com certeza, uma das maiores recompensas desse processo.

## 📜 Licença

Este projeto está licenciado sob a [Licença MIT](https://opensource.org/licenses/MIT).

<p align="center">
  Desenvolvido com muito ☕ por
  <a href="https://linktr.ee/mewmewdevart" target="_blank">Larissa Cristina Benedito</a>
</p>
