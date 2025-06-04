<p align="center">
  <img src="https://github.com/user-attachments/assets/f2745810-1c5d-4901-a097-dc2ec25109a8" alt="Frontend FitMeet Logo" style="width: 150px;">
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT" target="_blank">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="Licença MIT">
  </a>
</p>

<p align="center">
  <b><i>🚀 | Minha solução para o desafio mobile da Sysmap</i></b>
</p>

## 📚 Sumário

1. [📖 Introdução](#-introdução)
2. [🎯 Desafio](#-desafio)
3. [🚀 Funcionalidades](#-funcionalidades)
4. [🛠️ Arquitetura e Estrutura do Projeto](#️-arquitetura-e-estrutura-do-projeto)
5. [⚙️ Desafios e Soluções](#️-desafios-e-soluções)
6. [🚀 Como Rodar o Projeto](#-como-rodar-o-projeto)
   - [Rodando o Mobile](#rodando-o-mobile)
7. [🖼️ Prints de Tela](#️-prints-de-tela)
8. [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
9. [📚 Referências](#-referências)
10. [👩🏿 Experiência](#-experiência)
11. [📜 Licença](#-licença)

## 📖 Introdução

Este projeto é uma plataforma mobile desenvolvida como parte do desafio da Sysmap. Ele integra funcionalidades essenciais, como autenticação, criação de eventos e edição de perfil, utilizando React Native com Expo e Expo Router. A arquitetura segue o modelo de Atomic Design para componentes reutilizáveis e uma estrutura modular que facilita a escalabilidade e a manutenção.

- Cadastro e login de usuários com validações robustas. [✅]
- Seleção de preferências de atividades físicas. [✅]
- Criação de eventos com opção de participação pública ou privada. [❌]
- Inscrição em eventos e sistema de aprovação para eventos privados. [❌]
- Check-in via código de confirmação. [❌]
- Sistema de pontuação e conquistas.[❌]
- Perfil do usuário com nível e histórico de atividades. [✅/❌]
- Edição de atividades e perfil. [✅]
- Cancelamento e encerramento de atividades. [❌]


## 🎯 Desafio

O sistema permite que usuários criem eventos esportivos, podendo ser públicos ou privados. Os eventos privados requerem aprovação do organizador para participação. Os participantes podem validar sua presença com um código de check-in e ganhar pontos (XP) para evoluir de nível e desbloquear conquistas.

## 🚀 Funcionalidades
- **Autenticação:** Login, cadastro e proteção das rotas do app.
- **Edição de Perfil:** Atualização dos dados do usuário – inclusive a troca de avatar com pré-visualização.

## 🛠️ Arquitetura e Estrutura do Projeto (principais)

A estrutura do projeto segue uma arquitetura modular, com os seguintes diretórios principais:

- **src/components:** Componentes (átomos, moléculas, organismos) reutilizáveis.
- **src/context:** Contextos globais (como AuthContext e UserContext) para gerenciamento de estado.
- **src/navigation:** Navegadores (AppNavigator, AuthNavigator, ProtectedRoutes) para gerenciar fluxos autenticados e públicos.
- **src/screens:** Telas do aplicativo (Login, Cadastro, Perfil, Edição de Perfil, etc.).

## ⚙️ Desafios e Soluções

Durante o desenvolvimento deste projeto mobile, alguns desafios foram enfrentados e superados:
- **Carregamento e Gerenciamento de Estado:** Utilização do React Context API para gerenciar autenticação e dados do usuário, garantindo que as informações sejam disponibilizadas em todas as telas.
- **Validação e Upload de Imagens:** Integração com o expo-image-picker para seleção de imagens e validação, garantindo que somente formatos JPG/JPEG e PNG sejam aceitos.
- **Navegação Dinâmica:** Uso do Expo Router e React Navigation para um fluxo de usuário consistente e protegido.
- **Feedback ao Usuário:** Exibição de mensagens de sucesso ou erro por meio do react-native-toast-message.


## 🚀 Como Rodar o Projeto

### Pré-requisitos

- **Node.js** (v18 ou superior)
- **Expo CLI** (pode ser instalado globalmente com `npm install -g expo-cli`)
- **Git**

### Rodando o Mobile

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/bc-fullstack-06/Larissa-Cristina-Benedito.git
   cd mobile
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o projeto na web:**
   ```bash
   npx expo start
   ```
   Ou, para abrir diretamente em um dispositivo:
   - **Android:** `npm run android`
   - **iOS:** `npm run ios`
   - **Web (Expo):** `npm run web`

4. **Visualize a aplicação:**
   - Você pode escanear o QR Code com o aplicativo Expo Go no seu dispositivo móvel ou acessar pela web se estiver utilizando o modo web.

## 🖼️ Prints de Tela
### Tela de Login/Cadastro

- **Tela de Login**
![screencapture-localhost-8081-LoginScreen-2025-05-05-23_43_27](https://github.com/user-attachments/assets/0fd936fd-a999-4862-a429-66a3e52aa2a6)

- **Tela de Cadastro**
![screencapture-localhost-8081-LoginScreen-2025-05-05-23_43_33](https://github.com/user-attachments/assets/23d3e792-0c41-4ac1-8571-9856386265a7)

### Telas Logadas

- **Tela de Inicio**
![screencapture-localhost-8081-HomeScreen-2025-05-05-23_44_23](https://github.com/user-attachments/assets/dc4280d8-ad77-4cb8-9be2-9c82b1fac3e5)

- **Tela de Atividades**
![screencapture-localhost-8081-ActivityScreen-2025-05-05-23_44_46](https://github.com/user-attachments/assets/b28dc53d-4048-45c0-9ebc-c647f387f9a9)

- **Tela de Cadastrar Atividades**
![screencapture-localhost-8081-ManagementActivityScreen-2025-05-05-23_45_35](https://github.com/user-attachments/assets/53afbe65-8797-4e3b-9de6-046b7b2721c3)

- **Tela de Perfil do Usuario **
![screencapture-localhost-8081-ProfileScreen-2025-05-05-23_46_23](https://github.com/user-attachments/assets/96a19db5-3121-4750-bdfe-b2d14fad6cc8)

- **Tela de Editar perfil**
![screencapture-localhost-8081-SettingsScreen-2025-05-05-23_46_48](https://github.com/user-attachments/assets/70122d4e-8f1b-446b-9a13-441988071ebc)



## 🛠️ Tecnologias Utilizadas

### **Front-end Mobile**
- **React Native & Expo:** Desenvolvimento multiplataforma.
- **Expo Router & React Navigation:** Gerenciamento de rotas.
- **Expo Image Picker:** Seleção e upload de imagens.
- **React Native Toast Message:** Feedback visual para o usuário.

### **Outras Ferramentas**
- **ESLint / Prettier:** Padronização e limpeza do código.
- **TypeScript:** Tipagem estática para maior segurança.
- **Docker Compose:** (Para o backend, se aplicável.)

## 📚 Referências

- [Documentação React Native](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Expo Image Picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- [React Native Toast Message](https://github.com/calintamas/react-native-toast-message)

## 👩🏿 Experiência
Durante o desenvolvimento do projeto, enfrentei diversos desafios técnicos e estruturais. Meu computador principal parou de funcionar, o que me obrigou a continuar utilizando o equipamento dos meus irmãos. Esse computador era bastante limitado e não permitia a instalação de muitas ferramentas essenciais. Sem acesso ao Git, precisei adotar uma abordagem improvisada, realizando backups manuais dos arquivos em um pendrive.

Além disso, surgiram erros “fantasmas” e difíceis de identificar, o que me levou a migrar o projeto para React Native com Expo como uma tentativa de garantir a entrega dentro do prazo. No entanto, essa transição gerou conflitos entre os arquivos antigos e o novo ambiente, me forçando a iniciar um novo projeto do zero e reaproveitar apenas algumas partes do código original.

Como não era possível realizar testes diretamente no celular, adaptei o fluxo de desenvolvimento para testar pelo navegador. Na quinta-feira, consegui formatar meu notebook e retomar o desenvolvimento nele, mas, mesmo assim, continuei realizando os testes apenas pelo navegador devido às limitações para executar no dispositivo físico.

Durante o processo, também notei que alguns elementos estavam desalinhados no Figma. Por conta disso, optei por aplicar uma padronização mais consistente de alinhamento na interface, buscando melhorar a harmonia visual e a usabilidade do projeto.

Apesar de não ter conseguido entregar o projeto exatamente como gostaria, considerando todo o caos envolvido, estou satisfeita com o resultado final. Muitos elementos ainda não funcionam como planejado, mas consegui me adaptar e apresentar algo funcional. Sinto que, se não fossem os problemas técnicos, teria conseguido concluir o projeto dentro do prazo com mais qualidade.

Gostaria também de ter aplicado boas práticas de desenvolvimento, como o Atomic Design, além de realizar testes mais completos. Infelizmente, isso não foi possível diante das limitações enfrentadas. Ainda assim, encaro essa experiência como um aprendizado valioso sobre resiliência, adaptação e tomada de decisões sob pressão.


## 📜 Licença

Este projeto está licenciado sob a [Licença MIT](https://opensource.org/licenses/MIT).

<p align="center">
  Desenvolvido com muito ☕ por
  <a href="https://linktr.ee/mewmewdevart" target="_blank">Larissa Cristina Benedito</a>
</p>

