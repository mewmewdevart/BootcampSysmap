# Zod

Zod é uma biblioteca TypeScript-first para validação e parsing de esquemas. Ele permite criar esquemas para validar objetos, strings, números, arrays, entre outros, de forma simples e eficiente.

## Instalação

Para instalar o Zod, você pode usar npm ou yarn:

```bash
npm install zod
# ou
yarn add zod
```

## Usando com TypeScript

Zod é projetado para funcionar perfeitamente com TypeScript. Ele permite inferir tipos diretamente dos esquemas criados.

## Exemplos de Uso

### Criando um Esquema Básico

```typescript
import { z } from "zod";

const userSchema = z.object({
  name: z.string(),
  age: z.number().min(18), // Valida que a idade é no mínimo 18
});

const userData = {
  name: "João",
  age: 25,
};

const parsedUser = userSchema.parse(userData); // Valida e retorna os dados
console.log(parsedUser);
```

### Tratando Erros de Validação

```typescript
try {
  userSchema.parse({ name: "João", age: 15 }); // Erro: idade menor que 18
} catch (e) {
  console.error(e.errors); // Exibe os erros de validação
}
```

### Inferindo Tipos

```typescript
type User = z.infer<typeof userSchema>;

const user: User = {
  name: "Maria",
  age: 30,
};
```

### Esquemas Avançados

Zod suporta validações mais complexas, como enums, arrays e union types:

```typescript
const advancedSchema = z.object({
  roles: z.array(z.enum(["admin", "user", "guest"])), // Array de enums
  isActive: z.boolean(),
});

const data = {
  roles: ["admin", "user"],
  isActive: true,
};

const parsedData = advancedSchema.parse(data);
console.log(parsedData);
```

## Conclusão

Zod é uma ferramenta poderosa para validação de dados e parsing em aplicações TypeScript. Ele ajuda a garantir que os dados estejam no formato esperado, reduzindo erros e aumentando a confiabilidade do código.
