# Sumário
- [O que é SOLID?](#o-que-é-solid)
  - [Princípio da Responsabilidade Única (SRP)](#princípio-da-responsabilidade-única-srp)
  - [Princípio Aberto/Fechado (OCP)](#princípio-aberto-fechado-ocp)
  - [Princípio da Substituição de Liskov (LSP)](#princípio-da-substituição-de-liskov-lsp)
  - [Princípio da Segregação da Interface (ISP)](#princípio-da-segregação-da-interface-isp)
  - [Princípio da Inversão de Dependência (DIP)](#princípio-da-inversão-de-dependência-dip)
- [O que é Domain Driven Design (DDD)?](#o-que-é-domain-driven-design-ddd)
- [O que é DRY (Don't Repeat Yourself)?](#o-que-é-dry-dont-repeat-yourself)
- [O que é KISS (Keep It Simple, Stupid)?](#o-que-é-kiss-keep-it-simple-stupid)
- [O que é YAGNI (You Ain’t Gonna Need It)?](#o-que-é-yagni-you-aint-gonna-need-it)

## O que é SOLID?

**SOLID** é um conjunto de cinco princípios de design de software que visam tornar o código mais fácil de entender, manter e expandir. Eles ajudam a criar sistemas de software flexíveis, com menos dependências e mais reutilizáveis. A ideia por trás do SOLID é evitar o "código bagunçado" e promover boas práticas de programação.

A sigla SOLID é composta pelos seguintes princípios:

1. **S** - Single Responsibility Principle (Princípio da Responsabilidade Única)
2. **O** - Open/Closed Principle (Princípio Aberto/Fechado)
3. **L** - Liskov Substitution Principle (Princípio da Substituição de Liskov)
4. **I** - Interface Segregation Principle (Princípio da Segregação da Interface)
5. **D** - Dependency Inversion Principle (Princípio da Inversão de Dependência)

### Princípio da Responsabilidade Única (SRP)

**O que diz?**  
Cada classe ou módulo deve ter **uma única responsabilidade**, ou seja, deve fazer apenas uma coisa e fazer bem.

**Exemplo em TypeScript:**

```typescript
class Funcionario {
  calcularSalario(): number {
    return 3000;
  }
}

class BancoDeDados {
  salvarFuncionario(funcionario: Funcionario): void {
    console.log("Funcionário salvo no banco de dados");
  }
}
```

**Solução (aplicando o SRP):**

```typescript
class Funcionario {
  calcularSalario(): number {
    return 3000;
  }
}

class BancoDeDados {
  salvarFuncionario(funcionario: Funcionario): void {
    console.log("Funcionário salvo no banco de dados");
  }
}
```

Agora, `Funcionario` calcula o salário e `BancoDeDados` lida com o armazenamento, mantendo a **responsabilidade única** para cada classe.

### Princípio Aberto/Fechado (OCP)

**O que diz?**  
As classes devem ser **abertas para extensão**, mas **fechadas para modificação**. Ou seja, você pode adicionar novas funcionalidades sem alterar o código existente.

**Exemplo em TypeScript:**

```typescript
class Pagamento {
  calcularPagamento(tipo: string): void {
    if (tipo === 'boleto') {
      console.log("Pagamento via boleto");
    } else if (tipo === 'cartao') {
      console.log("Pagamento via cartão");
    }
  }
}
```

**Solução (aplicando o OCP):**

```typescript
abstract class Pagamento {
  abstract calcularPagamento(): void;
}

class PagamentoBoleto extends Pagamento {
  calcularPagamento(): void {
    console.log("Pagamento via boleto");
  }
}

class PagamentoCartao extends Pagamento {
  calcularPagamento(): void {
    console.log("Pagamento via cartão");
  }
}

function processarPagamento(pagamento: Pagamento) {
  pagamento.calcularPagamento();
}
```

Agora, podemos adicionar novos tipos de pagamento criando novas classes, sem modificar o código existente, respeitando o **Princípio Aberto/Fechado**.

### Princípio da Substituição de Liskov (LSP)

**O que diz?**  
Se uma classe `B` é uma subclasse de `A`, você deve poder substituir `A` por `B` sem quebrar o comportamento esperado.

**Exemplo em TypeScript:**

```typescript
class Animal {
  fazerSom(): void {
    console.log("Som genérico");
  }
}

class Cachorro extends Animal {
  fazerSom(): void {
    console.log("Au au");
  }
}

class Gato extends Animal {
  fazerSom(): void {
    console.log("Miau");
  }
}

function fazerSomDeAnimal(animal: Animal) {
  animal.fazerSom();
}
```

Aqui, tanto o `Cachorro` quanto o `Gato` podem substituir `Animal` sem problemas, respeitando o **LSP**.

### Princípio da Segregação da Interface (ISP)

**O que diz?**  
Evite criar interfaces grandes e obrigar as classes a implementarem métodos que elas não vão usar. Em vez disso, crie **interfaces menores e mais específicas**.

**Exemplo em TypeScript:**

```typescript
interface PodeVoar {
  voar(): void;
}

interface PodeNadar {
  nadar(): void;
}

class Passaro implements PodeVoar {
  voar(): void {
    console.log("Voando...");
  }
}

class Peixe implements PodeNadar {
  nadar(): void {
    console.log("Nadando...");
  }
}
```

Agora, cada classe implementa apenas as interfaces que fazem sentido para ela, respeitando o **ISP**.

### Princípio da Inversão de Dependência (DIP)

**O que diz?**  
Os módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações. As abstrações não devem depender de detalhes, mas os detalhes devem depender de abstrações.

**Exemplo em TypeScript:**

```typescript
interface Dispositivo {
  ligar(): void;
}

class TV implements Dispositivo {
  ligar(): void {
    console.log("TV ligada");
  }
}

class Radio implements Dispositivo {
  ligar(): void {
    console.log("Rádio ligado");
  }
}

class ControleRemoto {
  private dispositivo: Dispositivo;

  constructor(dispositivo: Dispositivo) {
    this.dispositivo = dispositivo;
  }

  ligarDispositivo(): void {
    this.dispositivo.ligar();
  }
}
```

Aqui, o `ControleRemoto` depende da abstração `Dispositivo`, permitindo que qualquer dispositivo seja conectado sem modificar a classe `ControleRemoto`, respeitando o **DIP**.

## O que é Domain Driven Design (DDD)? 🤔💻

O **Domain Driven Design (DDD)** é uma abordagem para o desenvolvimento de software que foca em entender profundamente o "domínio" do problema que você está tentando resolver e estruturar o código com base nesse entendimento.

### Exemplificando com uma padaria 🍞🏪

Imagine uma **padaria** com diversas áreas de funcionamento: **vendas** 💰, **estoque** 📦, **produção** 🍞, **entrega** 🚚, etc. Cada uma dessas áreas tem **sua própria linguagem** e regras que as governam. O DDD foca em entender essas áreas e como elas se comunicam entre si.

#### Passos principais do DDD:

1. **Domínio** 🧠: Entender o que está acontecendo na padaria. O "domínio" envolve todas as **atividades e regras** relacionadas ao funcionamento da padaria.
2. **Modelagem** 🔧: Criar uma **representação do domínio** no software, refletindo o funcionamento real da padaria.
3. **Linguagem Comum** 🗣️: Garantir que todos os envolvidos (programadores, analistas e pessoas do negócio) falem a mesma língua.

## O que é DRY (Don't Repeat Yourself)? 🔄✋

O princípio **DRY** (Não se repita) visa evitar a **duplicação de código**. Quando você percebe que está escrevendo o mesmo código várias vezes, é hora de refatorar para centralizar essa lógica em um único lugar.

### Exemplo Simples: 🍞 Padaria

Imagine que você tem uma padaria, e sempre precisa calcular o preço de um pão. Se, em várias partes do seu sistema, você está repetindo o cálculo do preço, isso é uma violação do princípio DRY.

#### Sem DRY: Repetindo o cálculo

```javascript
let precoPao = 5;
let quantidade1 = 3;
let total1 = precoPao * quantidade1;

let quantidade2 = 2;
let total2 = precoPao * quantidade2;

let quantidade3 = 4;
let total3 = precoPao * quantidade3;
```

#### Com DRY: Centralizando a lógica

```javascript
function calcularPrecoPao(preco, quantidade) {
  return preco * quantidade;
}

let precoPao = 5;
let total1 = calcularPrecoPao(precoPao, 3);
let total2 = calcularPrecoPao(precoPao, 2);
let total3 = calcularPrecoPao(precoPao, 4);
```

Com isso, a lógica de cálculo do preço foi centralizada em uma única função e não precisa ser repetida em diversos lugares do código.

## O que é KISS (Keep It Simple, Stupid)? 🧠💡

O princípio **KISS** (Keep It Simple, Stupid - Mantenha Simples, Estúpido) defende que soluções simples são sempre melhores do que soluções complexas. A ideia é que, ao desenvolver software, devemos evitar complicações desnecessárias, buscando uma implementação que resolva o problema de forma eficiente e clara.

### Exemplo de Complexidade Desnecessária

Imagine que você está criando uma função para calcular a soma de números:

```javascript
function somaComplexa(a, b) {
  if (a === undefined || b === undefined) {
    throw new Error("Faltando parâmetros");
  }
  
  // Lógica desnecessária para resolver um problema simples
  let resultado = a;
  for (let i = 0; i < b; i++) {
    resultado += 1;
  }
  return resultado;
}
```

### Exemplo KISS

```javascript
function somaSimples(a, b) {
  return a + b;
}
```

A solução simples é sempre a melhor!

## O que é YAGNI (You Ain’t Gonna Need It)? 🤷‍♂️🚫

O princípio **YAGNI** (Você Não Vai Precisar) sugere que você não deve adicionar funcionalidades ao seu código até que elas sejam realmente necessárias. A ideia é evitar o desperdício de tempo e recursos implementando algo que pode nunca ser usado.

### Exemplo Simples: 📦 Sistema de Estoque

Imagine que você está desenvolvendo um sistema de estoque e pensa em adicionar uma funcionalidade para calcular o valor total dos itens em estoque em diferentes moedas, mesmo que atualmente só precise em uma moeda.

#### Sem YAGNI: Adicionando funcionalidade desnecessária

```javascript
function calcularValorTotalEmMoedas(itens, taxaDeCambio) {
  let total = 0;
  for (let item of itens) {
    total += item.preco * item.quantidade * taxaDeCambio;
  }
  return total;
}
```

#### Com YAGNI: Focando no necessário

```javascript
function calcularValorTotal(itens) {
  let total = 0;
  for (let item of itens) {
    total += item.preco * item.quantidade;
  }
  return total;
}
```

Com isso, você evita complexidade desnecessária e foca apenas no que é realmente necessário no momento.
