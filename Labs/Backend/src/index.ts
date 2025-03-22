import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import userController from "./controllers/user-controller";
import activityController from "./controllers/activity-controller";

// 1. Cria uma instância do servidor express
const server = express();
// 2. Adiciona o middleware para parsear JSON
server.use(json());
// 3. Adiciona o middleware para habilitar CORS
server.use(cors());
// 4. Adiciona o controlador de usuário ao servidor
userController(server);
// 5. Adiciona o controlador de atividade ao servidor
activityController(server);

// 6. Define a porta do servidor a partir das variáveis de ambiente
const port = process.env.PORT;

// 7. Inicia o servidor e escuta na porta definida
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
