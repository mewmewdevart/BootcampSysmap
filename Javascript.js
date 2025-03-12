// Aula 01 - Backend com Node.js + TypeScript

// 1. Apresentação e Introdução
// Professores: Andrev e Igor
// Tecnologias: Node com TypeScript : Express , Prisma ORM, LocalStack, Ozod , PostgreSQL e Docker
// Repositório no GitHub → para dúvidas e materiais (via Issues)
// Plataforma → acesso às aulas e exercícios

// 2. Configuração do Ambiente
// Ferramentas recomendadas:
// - Visual Studio Code (VS Code)
// - Node.js v22.14 LTS
// Para executar código JavaScript no terminal do VS Code:
// node nomeDoArquivo.js

// 3. Tipos de Dados em JavaScript
let nome = "Larissa"; // String
let idade = 25;       // Number
let ativo = true;     // Boolean
let indefinido;       // Undefined
let vazio = null;     // Null

const pessoa = {
    nome: "Larissa",
    sobrenome: "Cristina"
};
console.log(pessoa.nome); // Acessando atributo

const numeros = [1, 2, 3, 4];
console.log(numeros[2]); // 3

const novoArray = [...numeros, 5];

const novoObjeto = {
    ...pessoa,
    email: "larissa@example.com"
};

// 4. Estruturas de Controle
const idadeUsuario = 20;
if (idadeUsuario >= 18) {
    console.log("Maior de idade");
} else {
    console.log("Menor de idade");
}

const cor = "azul";
switch (cor) {
    case "vermelho":
        console.log("Cor quente");
        break;
    case "azul":
        console.log("Cor fria");
        break;
    default:
        console.log("Cor não identificada");
}

for (let i = 0; i < 3; i++) {
    console.log("Valor:", i);
}

numeros.forEach((num) => {
    console.log("Número:", num);
});

// 5. Funções em JavaScript
function somar(x, y) {
    return x + y;
}
console.log(somar(5, 2));

const multiplicar = (x, y) => x * y;
console.log(multiplicar(3, 4));

// Função nomeada (hoisting possível)
console.log(subtrair(10, 2));
function subtrair(a, b) {
    return a - b;
}

// Arrow function (sem hoisting)
// console.log(dividir(10, 2)); // ERRO
const dividir = (a, b) => a / b;

// Escopo de variáveis
let a = "teste";
a = 10;

const b = "constante";
// b = 20; // ERRO

function testeVar() {
    if (true) {
        var exemplo = "dentro do bloco";
    }
    console.log(exemplo);
}
testeVar();

// Extras
const numero = 11;
console.log(`O número é ${numero}`);

const num = 999;
const texto = "O número é " + num;
console.log(texto);

console.log(undefined == null);  // true
console.log(undefined === null); // false

const array = [];
// array = []; // ERRO
array.push(1);

const obj = { nome: "Larissa" };
obj.nome = "Andrev";
// obj = {}; // ERRO

const cloneObj = { ...obj };
const novoObj = { ...obj, email: "email@example.com" };