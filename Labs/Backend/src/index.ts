import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { testController } from "./controllers/teste-controller";

dotenv.config();

// Cria uma instância do servidor express
const server = express(); // => Express é um objeto que retorna varios elementos
server.use(json()) // => Avisando ao express que os dados sao via json
server.use(cors()) // => A api passa a ceitar requisições só desse dominio

testController(server);

const port = process.env.PORT;

// Faz o servidor escutar na porta 3000
server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!");
});