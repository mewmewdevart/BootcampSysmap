# Sumário
- [O que é SOLID](#o-que-é-solid)
  - [Princípio da Responsabilidade Única (SRP)](#princípio-da-responsabilidade-única-srp)
  - [Princípio Aberto/Fechado (OCP)](#princípio-aberto-fechado-ocp)
  - [Princípio da Substituição de Liskov (LSP)](#princípio-da-substituição-de-liskov-lsp)
  - [Princípio da Segregação da Interface (ISP)](#princípio-da-segregação-da-interface-isp)
  - [Princípio da Inversão de Dependência (DIP)](#princípio-da-inversão-de-dependência-dip)

# O que é SOLID?

**SOLID** é um conjunto de cinco princípios de design de software que visam tornar o código mais fácil de entender, manter e expandir. Eles ajudam a criar sistemas de software flexíveis, com menos dependências e mais reutilizáveis. A ideia por trás do SOLID é evitar o "código bagunçado" e promover boas práticas de programação.

A sigla SOLID é composta pelos seguintes princípios:

1. **S** - Single Responsibility Principle (Princípio da Responsabilidade Única)
2. **O** - Open/Closed Principle (Princípio Aberto/Fechado)
3. **L** - Liskov Substitution Principle (Princípio da Substituição de Liskov)
4. **I** - Interface Segregation Principle (Princípio da Segregação da Interface)
5. **D** - Dependency Inversion Principle (Princípio da Inversão de Dependência)

Vamos entender cada um desses princípios com exemplos práticos em **TypeScript**.

## Princípio da Responsabilidade Única (SRP)

### O que diz?
Cada classe ou módulo deve ter **uma única responsabilidade**, ou seja, deve fazer apenas uma coisa e fazer bem.

### Exemplo em TypeScript:

Imagina que temos uma classe que lida tanto com o cálculo de salário quanto com a persistência de dados no banco. Isso vai contra o SRP, pois ela tem duas responsabilidades.

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
Dividimos as responsabilidades em classes separadas, cada uma com uma responsabilidade bem definida.

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

Agora, `Funcionario` calcula o salário, e `BancoDeDados` lida com o armazenamento. Isso facilita a manutenção e evolução do código.

## Princípio Aberto/Fechado (OCP)

### O que diz?
As classes devem ser **abertas para extensão**, mas **fechadas para modificação**. Ou seja, você pode adicionar novas funcionalidades sem alterar o código existente.

### Exemplo em TypeScript:

Imagina que temos uma classe que calcula pagamentos, mas, se precisarmos adicionar um novo tipo de pagamento, precisamos modificar a classe.

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
Para não modificar o código existente, podemos criar uma estrutura mais flexível usando polimorfismo.

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

// Uso:
const boleto = new PagamentoBoleto();
processarPagamento(boleto);

const cartao = new PagamentoCartao();
processarPagamento(cartao);
```

Agora, se precisarmos adicionar um novo tipo de pagamento, podemos criar uma nova classe que estenda `Pagamento`, sem alterar o código da classe `Pagamento`.

## Princípio da Substituição de Liskov (LSP)

### O que diz?
Se uma classe `B` é uma subclasse de `A`, você deve poder substituir `A` por `B` sem quebrar o comportamento esperado.

### Exemplo em TypeScript:

Imagina que temos uma classe `Animal` e classes que a estendem, como `Cachorro` e `Gato`. Devemos ser capazes de substituir `Animal` por qualquer subclasse sem problemas.

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

// Uso:
const cachorro = new Cachorro();
fazerSomDeAnimal(cachorro); // Saída: Au au

const gato = new Gato();
fazerSomDeAnimal(gato); // Saída: Miau
```

Aqui, tanto o `Cachorro` quanto o `Gato` podem substituir `Animal` sem problemas, respeitando o **LSP**.

## Princípio da Segregação da Interface (ISP)

### O que diz?
Evite criar interfaces grandes e obrigar as classes a implementarem métodos que elas não vão usar. Em vez disso, crie **interfaces menores e mais específicas**.

### Exemplo em TypeScript:

Imagina que temos uma interface `Animal` com muitos métodos que nem todos os animais vão usar. Vamos separar esses métodos em interfaces menores.

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

## Princípio da Inversão de Dependência (DIP)

### O que diz?
Os módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações. As abstrações não devem depender de detalhes, mas os detalhes devem depender de abstrações.

### Exemplo em TypeScript:

Imagina que temos uma classe `ControleRemoto` que depende diretamente de uma implementação de `TV`. Vamos inverter essa dependência para que o `ControleRemoto` dependa de uma abstração, e não de uma implementação específica.

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

// Uso:
const tv = new TV();
const controleTV = new ControleRemoto(tv);
controleTV.ligarDispositivo(); // Saída: TV ligada

const radio = new Radio();
const controleRadio = new ControleRemoto(radio);
controleRadio.ligarDispositivo(); // Saída: Rádio ligado
```

Agora, o `ControleRemoto` depende da abstração `Dispositivo`, permitindo que qualquer dispositivo seja conectado sem modificar a classe `ControleRemoto`, respeitando o **DIP**.
