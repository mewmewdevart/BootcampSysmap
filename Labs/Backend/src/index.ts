// 1. Importa as configurações do dotenv
import "dotenv/config";

// 2. Importa o express e o json do express
import express, { json } from "express";

// 3. Importa o cors para permitir requisições de diferentes origens
import cors from "cors";

// 4. Importa os controladores de usuário e atividade
import userController from "./controllers/user-controller";
import activityController from "./controllers/activity-controller";

// 5. Cria uma instância do servidor express
const server = express();

// 6. Adiciona o middleware para parsear JSON
server.use(json());

// 7. Adiciona o middleware para habilitar CORS
server.use(cors());

// 8. Adiciona o controlador de usuário ao servidor
userController(server);

// 9. Adiciona o controlador de atividade ao servidor
activityController(server);

// 10. Define a porta do servidor a partir das variáveis de ambiente
const port = process.env.PORT;

// 11. Inicia o servidor e escuta na porta definida
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
