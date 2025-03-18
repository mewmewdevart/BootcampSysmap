"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importa o módulo express e o objeto response
const express_1 = __importDefault(require("express"));
// Cria uma instância do servidor express
const server = (0, express_1.default)(); // => Express é um objeto que retorna varios elementos
// Define uma rota GET para o caminho "/teste"
server.get("/teste", (request, response) => {
    // Envia uma resposta com status 200 e a mensagem "Testado com sucesso!"
    response.status(200).send("Testado com sucesso!");
});
// Faz o servidor escutar na porta 3000
server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!");
});
