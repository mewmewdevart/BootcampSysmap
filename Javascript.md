# Sumário
- [🥔 Diferença entre Server Side e Client Side no JavaScript](#-diferença-entre-server-side-e-client-side-no-javascript)
  - [🖥️ Client Side (Lado do Cliente)](#️-client-side-lado-do-cliente)
  - [🌐 Server Side Rendering (SSR - Renderização no Servidor)](#-server-side-rendering-ssr---renderização-no-servidor)
  - [🥔 Resumo para batatas](#-resumo-para-batatas)
- [Tipos de aplicações JavaScript](#tipos-de-aplicações-javascript)
  - [FrontEnd](#frontend)
  - [BackEnd](#backend)
  - [Fullstack](#fullstack)
  - [Mobile](#mobile)
  - [Desktop](#desktop)
- [📚 Estrutura de Dados em JavaScript](#-estrutura-de-dados-em-javascript)
  - [Declaração de Variáveis](#declaração-de-variáveis)
  - [Hoisting](#hoisting)
  - [Tipos de Dados](#tipos-de-dados)
- [Programação Estruturada](#programação-estruturada)
  - [Estrutura Sequencial](#1-estrutura-sequencial)
  - [Estrutura Condicional (Decisões)](#2-estrutura-condicional-decisões)
  - [Estrutura Repetitiva (Laços de Repetição)](#3-estrutura-repetitiva-laços-de-repetição)

# 🥔 Diferença entre Server Side e Client Side no JavaScript

Imagine que você é uma batata sentada na frente de um computador. Você quer ver uma página web bonitinha dizendo "Olá, visitante!".

Mas... quem vai montar essa página? 🤔

## 🖥️ Client Side (Lado do Cliente)

- O site manda **só um esqueleto vazio (HTML básico)** pro seu navegador.
- Depois disso, o **JavaScript entra em ação e monta tudo na sua tela**, como se fosse um quebra-cabeça.
- O React só funciona **depois que o navegador carrega tudo**.

### 🧠 Como funciona:
- O navegador recebe algo como: `<div id="root"></div>` (vazio!).
- Aí o React vem e coloca o conteúdo lá dentro usando JavaScript.

#### Exemplo (React no Cliente):
```jsx
// App.jsx
import React from 'react';

function App() {
  return <h1>Olá, visitante!</h1>;
}

export default App;
```

```jsx
// index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

🟡 Resultado: a batata (você) **vê o conteúdo só depois que o JavaScript faz mágica no navegador**.


## 🌐 Server Side Rendering (SSR - Renderização no Servidor)

- O site já vem **montado e prontinho** do servidor.
- Você (a batata) **recebe a página já com o conteúdo visível**, sem depender de JavaScript para mostrar o texto.
- Muito usado com **Next.js**, que é React com superpoderes de servidor.

### Exemplo (React no Servidor com Next.js):
```jsx
// pages/index.jsx
export default function Home() {
  return <h1>Olá, visitante!</h1>;
}
```

🟢 Resultado: o servidor já envia o HTML com a frase "Olá, visitante!" pronta pra batata ver — **tudo já montado antes de chegar no navegador**.


## 🥔 Resumo para batatas:

|                      | Client Side (CSR) 🍟         | Server Side (SSR) 🥔            |
|----------------------|-----------------------------|-------------------------------|
| Onde monta o site?   | No seu navegador            | No servidor, antes de chegar |
| Precisa de JavaScript pra aparecer? | Sim                         | Não                          |
| Carregamento inicial | Mais devagar                | Mais rápido                  |
| Bom para SEO?        | Não muito                   | Sim!                         |
| Exemplo               | React puro (Vite/CRA)       | Next.js                      |



# Tipos de aplicações JavaScript

### FrontEnd
- Interface que o usuário vê e interage (site, botões, menus).
- Ex: HTML + CSS + JavaScript (React, Vue, etc).

### BackEnd
- Parte invisível que roda no servidor (lógica, banco de dados, APIs).
- Ex: Node.js, Express.

### Fullstack
- Junta FrontEnd + BackEnd.
- Ex: Aplicações completas com React (frente) + Node.js (fundo).

### Mobile
- Aplicativos de celular.
- Ex: React Native, Ionic.

### Desktop
- Programas para computador.
- Ex: Electron.js (usando HTML, CSS, JS para criar apps como o VS Code).


# 📚 Estrutura de Dados em JavaScript

## Declaração de Variáveis

No JavaScript, `let`, `const` e `var` são usados para declarar variáveis, mas cada um tem comportamentos e regras específicas. Abaixo está um resumo detalhado:

#### `let`
- **Escopo**: Bloco (`{}`).
- **Mutabilidade**: Pode ser reatribuída.
- **Uso**: Ideal para variáveis que precisam ter seu valor alterado ao longo do código.
- **Exemplo**:
  ```js
  let nome = "Larissa";
  nome = "Mewmew"; // ✅ Ok, valor pode ser alterado
  ```

#### `const`
- **Escopo**: Bloco (`{}`).
- **Mutabilidade**: Não pode ser reatribuída.
- **Uso**: Ideal para valores constantes que não devem mudar.
- **Exemplo**:
  ```js
  const pi = 3.14;
  pi = 3.14159; // ❌ Erro, não pode reatribuir
  ```

  **Observação**: Quando usado com objetos ou arrays, o conteúdo interno pode ser modificado, mas a referência não pode ser alterada.
  ```js
  const frutas = ["maçã", "banana"];
  frutas.push("laranja"); // ✅ Ok, conteúdo interno pode mudar
  frutas = ["abacaxi"];   // ❌ Erro, não pode reatribuir
  ```

#### `var` (Legado)
- **Escopo**: Função (não tem escopo de bloco).
- **Mutabilidade**: Pode ser reatribuída.
- **Uso**: Evitar, pois pode causar bugs difíceis de rastrear.
- **Exemplo**:
  ```js
  var idade = 25;
  idade = 26; // ✅ Ok

  if (true) {
    var idade = 30; // ❌ Problema: vaza para fora do bloco
  }
  console.log(idade); // 30 (mesmo fora do bloco!) 😬
  ```


## Hoisting

Hoisting é um mecanismo do JavaScript onde declarações de variáveis e funções são movidas para o topo do escopo antes da execução do código. No entanto, apenas a **declaração** é içada, não a **atribuição**.

### Diferenças entre `var` e `let`/`const`

#### `var`
- A declaração é içada, mas a atribuição não.
- A variável existe desde o início do escopo, mas seu valor é `undefined` até a linha de atribuição.
- **Exemplo**:
  ```js
  console.log(a); // undefined
  var a = "teste";
  ```
  O código é interpretado como:
  ```js
  var a; // Declaração içada
  console.log(a); // undefined
  a = "teste"; // Atribuição ocorre aqui
  ```

#### `let` e `const`
- A declaração é içada, mas a variável não é inicializada até a linha de declaração.
- Acessar a variável antes da declaração resulta em um erro (zona morta temporal).
- **Exemplo**:
  ```js
  console.log(b); // ❌ Erro: Cannot access 'b' before initialization
  let b = "teste";
  ```
  O código é interpretado como:
  ```js
  let b; // Declaração içada, mas não inicializada
  console.log(b); // ❌ Erro: Zona morta temporal
  b = "teste"; // Inicialização ocorre aqui
  ```


## Tipos de Dados

Em JavaScript, os tipos de dados são divididos em duas categorias principais:

### Tipos Primitivos (Primitive Types)
São imutáveis e armazenados diretamente na **stack memory**.

| Tipo       | Descrição                          | Exemplo                          |
|------------|------------------------------------|----------------------------------|
| **String** | Textos                             | `let nome = "Larissa";`          |
| **Number** | Números inteiros ou decimais       | `let idade = 25;`               |
| **Boolean**| Verdadeiro (`true`) ou falso (`false`)| `let estaLogado = true;`      |
| **Undefined**| Valor indefinido (variável declarada, mas não inicializada) | `let endereco;` |
| **Null**   | Ausência intencional de valor      | `let telefone = null;`          |
| **Symbol** | Valor único e imutável (identificadores) | `let id = Symbol("id");` |
| **BigInt** | Números inteiros muito grandes    | `let numeroGrande = 1234567890123456789012345678901234567890n;` |

### Tipos de Referência (Reference Types)
São mutáveis e armazenados na **heap memory**. Incluem objetos, arrays e funções.

| Tipo       | Descrição                          | Exemplo                          |
|------------|------------------------------------|----------------------------------|
| **Objetos**| Coleção de pares chave-valor       | `let pessoa = { nome: "Larissa", idade: 25 };` |
| **Arrays** | Listas ordenadas de valores        | `let frutas = ["maçã", "banana"];` |
| **Funções**| Blocos de código reutilizáveis     | `function soma(a, b) { return a + b; }` |


### Resumo
- Use `let` para variáveis mutáveis e `const` para constantes.
- Evite `var` devido ao seu escopo de função e problemas de hoisting.
- Entenda a diferença entre tipos primitivos (imutáveis) e tipos de referência (mutáveis).
- Hoisting pode causar comportamentos inesperados, especialmente com `var`.

## Programação Estruturada

### O que é?
É um paradigma de desenvolvimento que visa organizar o código em blocos estruturados, tornando-o mais claro, legível, modular e de fácil manutenção. Ela divide o código em partes pequenas que são independentes (funções), permitindo reutilização e melhor organização do código.

### Estruturas

#### 1. Estrutura Sequencial
Executa as instruções de cima para baixo.

```js
let a = 1;
console.log(a);
```

#### 2. Estrutura Condicional (Decisões)
Executa instruções com base em condições.

```js
const a = 0;

if (a === 0) {
  console.log("a é igual a zero");
} else if (a > 0) {
  console.log("a é maior que zero");
} else {
  console.log("a é menor que zero");
}
```

Observação:
- `a = 3` é atribuição
- `a == 3` testa a igualdade do valor
- `a === 3` testa o valor e o tipo da variável

```js
const b = 0;

switch (b) { // Testa somente valores, não expressões
  case 0:
    console.log("0");
    break;
  case 1:
    console.log("1");
    break;
  default:
    console.log("2");
}
```

#### 3. Estrutura Repetitiva (Laços de Repetição)
Executa instruções repetidamente com base em uma condição.

```js
const array = [0, 1, 2, 3, 4];

for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}

// Método próprio do array
array.forEach((number) => {
  console.log(number);
});

array.forEach((number, index) => {
  console.log(`${number}: ${index}`);
});

let i = 0;
while (i < array.length) {
  console.log(array[i]);
  if (i == 3) break;
  i++;
}
```