# Sumário
- [O que é um Mock de Dados no Frontend](#o-que-é-um-mock-de-dados-no-frontend)
  - [Exemplo Prático de Mock de Dados](#exemplo-prático-de-mock-de-dados)
  - [Para Que Serve o Mock de Dados](#para-que-serve-o-mock-de-dados)
  - [Ferramentas para Criar Mocks](#ferramentas-para-criar-mocks)
  - [Criando um Mock de Dados com `fetch`](#criando-um-mock-de-dados-com-fetch)
    - [Criar o mock de dados](#criar-o-mock-de-dados)
    - [Simular a API com `fetch`](#simular-a-api-com-fetch)
    - [Consumindo o mock no frontend](#consumindo-o-mock-no-frontend)
  - [O Que Acontece no Código](#o-que-acontece-no-código)


## O que é um Mock de Dados no Frontend?

No **frontend**, um **mock de dados** (ou simplesmente **mock**) é uma **simulação de dados reais**, geralmente usada para **testar e desenvolver a interface** em cenários onde:

- O backend ainda não está pronto.
- A API está fora do ar.
- Você quer testar diferentes comportamentos sem depender do servidor.

### Exemplo Prático de Mock de Dados

Imagine que você está desenvolvendo uma lista de produtos em um e-commerce, mas a API que retorna os produtos ainda não foi entregue. Você pode criar um mock de dados assim:

```js
// mockProdutos.js
export const produtosMock = [
  {
    id: 1,
    nome: "Camiseta Preta",
    preco: 59.90,
    imagem: "camiseta-preta.jpg"
  },
  {
    id: 2,
    nome: "Tênis Branco",
    preco: 199.90,
    imagem: "tenis-branco.jpg"
  }
];
```

Agora, dentro do seu componente, você pode consumir esse mock de dados:

```js
import { produtosMock } from "./mockProdutos";

function ListaDeProdutos() {
  return (
    <div>
      {produtosMock.map(produto => (
        <div key={produto.id}>
          <h2>{produto.nome}</h2>
          <p>R${produto.preco}</p>
          <img src={produto.imagem} alt={produto.nome} />
        </div>
      ))}
    </div>
  );
}
```

### Para Que Serve o Mock de Dados?

Os mocks são úteis para:

- **Testar componentes e layout**: Você pode testar a interface sem precisar da API.
- **Simular diferentes cenários**: Exemplo, testar erro 404, lista vazia, ou resposta lenta.
- **Desenvolver sem depender do backend**: Permite que você avance no desenvolvimento enquanto o backend não está pronto.
- **Testes automatizados ou de UI**: Facilita testes quando você precisa de dados para a interface.

### Ferramentas para Criar Mocks

Algumas ferramentas úteis para gerar mocks de dados:

- **Arquivos `.json` locais**: Simples e eficaz para dados pequenos.
- **MSW (Mock Service Worker)**: Permite simular APIs reais via interceptação de requests.
- **Faker.js ou Mockaroo**: Geram dados fictícios automaticamente, útil para grandes volumes de dados.

### Criando um Mock de Dados com `fetch`

Se quiser simular uma API utilizando o `fetch`, podemos seguir os seguintes passos:

#### Criar o mock de dados:

```js
// mockData.js
export const dadosMock = [
  {
    id: 1,
    nome: "Camiseta Preta",
    preco: 59.90,
    imagem: "camiseta-preta.jpg"
  },
  {
    id: 2,
    nome: "Tênis Branco",
    preco: 199.90,
    imagem: "tenis-branco.jpg"
  }
];
```

#### Simular a API com `fetch`:

Aqui vamos criar uma função que simula a chamada de uma API utilizando `fetch`.

```js
// mockApi.js
import { dadosMock } from './mockData';

// Função que simula o comportamento de uma API
export const fetchProdutos = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulando um erro de rede
      const erroDeRede = false;

      if (erroDeRede) {
        reject("Erro de rede");
      } else {
        resolve(dadosMock);
      }
    }, 1000); // Simulando um delay de 1 segundo
  });
};
```

#### Consumindo o mock no frontend:

Agora, você pode consumir os dados mockados dentro do seu componente React.

```js
import React, { useEffect, useState } from 'react';
import { fetchProdutos } from './mockApi';

function ListaDeProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetchProdutos()
      .then(dados => {
        setProdutos(dados);
        setLoading(false);
      })
      .catch(erro => {
        setErro(erro);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (erro) {
    return <p>{erro}</p>;
  }

  return (
    <div>
      {produtos.map(produto => (
        <div key={produto.id}>
          <h2>{produto.nome}</h2>
          <p>R${produto.preco}</p>
          <img src={produto.imagem} alt={produto.nome} />
        </div>
      ))}
    </div>
  );
}

export default ListaDeProdutos;
```

### O Que Acontece no Código?

- **`fetchProdutos`**: A função é chamada dentro de `useEffect` para simular o carregamento dos dados.
- **Delay Simulado**: Usamos `setTimeout` para criar um delay de 1 segundo, simulando o tempo que a API levaria para responder.
- **Respostas e Erros**: Se não houver erro de rede, os dados mockados são retornados. Se houver um erro, a promise é rejeitada com uma mensagem de erro.
- **Estado `loading`**: Mostra a mensagem "Carregando..." enquanto os dados estão sendo recuperados.

Agora você tem uma forma simples de testar e desenvolver sua interface sem depender de um backend real. Espero que isso tenha ficado claro! 😊 Se tiver mais dúvidas, é só chamar!
