# Sumário
- [Rodando uma aplicação Typescript](#rodando-uma-aplicação-typescript)
- [Tipos Primitivos](#tipos-primitivos)
- [Tipos Comuns e Complexos](#tipos-comuns-e-complexos)
- [Tipos Estruturais](#tipos-estruturais)
- [Union e Intersection](#union-e-intersection)

## Rodando uma aplicação Typescript

#### **Inicialize seu projeto (se ainda não tiver feito isso):**
```sh
npm init -y
```

#### **Instale o compilador TypeScript como dependência de desenvolvimento:**
```sh
npm install typescript --save-dev
```

#### **Crie o arquivo de configuração do TypeScript (`tsconfig.json`):**
```sh
npx tsc --init
```

> Isso gera um arquivo `tsconfig.json` com várias opções configuráveis para o compilador TypeScript.


#### **Crie seu arquivo `.ts` (exemplo):**
```sh
touch index.ts
```

Dentro do `index.ts`, você pode escrever algo simples, por exemplo:
```ts
const mensagem: string = "Olá, TypeScript!";
console.log(mensagem);
```

#### **Compile o TypeScript para JavaScript:**
```sh
npx tsc
```

> Isso vai compilar todos os arquivos `.ts` com base no que estiver configurado no `tsconfig.json`, gerando arquivos `.js`.

#### **Rode o arquivo JavaScript gerado:**
```sh
node index.js
```

### Dica: compilar e executar direto com um script
Você pode adicionar isso no seu `package.json`:
```json
"scripts": {
  "build": "tsc",
  "start": "node index.js"
}
```

E depois rodar com:

```sh
npm run build
npm start
```


## Tipos Primitivos

**`string`** – Texto  
   ```ts
   let nome: string = "Larissa";
   ```

**`number`** – Números (inteiros, decimais, hexadecimais, binários etc.)  
   ```ts
   let idade: number = 25;
   ```

**`boolean`** – Verdadeiro ou falso  
   ```ts
   let isAtiva: boolean = true;
   ```

**`null`** – Ausência intencional de valor  
   ```ts
   let valorNulo: null = null;
   ```
**`undefined`** – Valor não definido  
   ```ts
   let valorIndefinido: undefined = undefined;
   ```

**`symbol`** – Valor único e imutável (mais avançado, pouco usado em projetos comuns)  
   ```ts
   let id: symbol = Symbol("id");
   ```

**`bigint`** – Números inteiros muito grandes  
   ```ts
   let numeroGrande: bigint = 12345678901234567890n;
   ```

## Tipos Comuns e Complexos

**`any`** – Qualquer tipo (cuidado! perde as vantagens do TypeScript)  
   ```ts
   let qualquerCoisa: any = "texto ou número ou objeto";
   ```

**`unknown`** – Tipo desconhecido (mais seguro que `any`)  
   ```ts
   let dado: unknown = 123;
   ```

**`void`** – Usado para funções que **não retornam nada**  
   ```ts
   function logMensagem(): void {
     console.log("Olá!");
   }
   ```

**`never`** – Usado quando **uma função nunca retorna**, como em erros ou loops infinitos  
   ```ts
   function erro(): never {
     throw new Error("Erro fatal!");
   }
   ```

**`object`** – Qualquer objeto (não primitivo)  
   ```ts
   let pessoa: object = { nome: "Ana", idade: 30 };
   ```

## Tipos Estruturais

**`array`** – Listas  
   ```ts
   let numeros: number[] = [1, 2, 3];
   let nomes: Array<string> = ["Ana", "João"];
   ```

**`tuple` (tupla)** – Lista com **quantidade e tipos fixos**  
   ```ts
   let tupla: [string, number] = ["idade", 30];
   ```

**`enum`** – Conjunto de valores nomeados  
   ```ts
   enum Cor {
     Vermelho,
     Verde,
     Azul,
   }
   let corFavorita: Cor = Cor.Verde;
   ```

**`type` e `interface`** – Definição de estruturas customizadas  
   ```ts
   type Pessoa = {
     nome: string;
     idade: number;
   };

   interface Produto {
     id: number;
     nome: string;
   }
   ```

## Union e Intersection

- **Union (`|`)** – Um valor pode ser de **um ou mais tipos**  
  ```ts
  let id: string | number = 123;
  ```

- **Intersection (`&`)** – Combina múltiplos tipos  
  ```ts
  type A = { nome: string };
  type B = { idade: number };
  type C = A & B;
  const pessoa: C = { nome: "Lari", idade: 25 };
  ```

