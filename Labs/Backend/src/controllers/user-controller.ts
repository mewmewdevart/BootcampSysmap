// 1. Importa o Express e o Router do express
import { Express, Router } from "express";

// 2. Importa as funções do repositório de usuário
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from "../repository/user-repository";

// 3. Importa os erros conhecidos do PrismaClient
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

// 4. Define o controlador de usuário
const userController = (server: Express) => {
  const router = Router();

  // 5. Rota para obter todos os usuários
  router.get("/", async (request, response) => {
    const users = await getAll();
    response.status(200).send(users);
  });

  // 6. Rota para obter um usuário pelo ID
  router.get("/:id", async (request, response) => {
    const userId = request.params.id;
    const user = await getById(userId);
    response.status(200).send(user);
  });

  // 7. Rota para criar um novo usuário
  router.post("/new", async (request, response) => {
    try {
      const userData = request.body;
      const user = await create(userData);

      response.status(201).send(user);
    } catch (error: any) {
      if (error instanceof PrismaClientValidationError) {
        response.status(400).send("Dados inválidos ou faltando.");
        return;
      }

      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        response.status(409).send("Email já utilizado.");
        return;
      }

      console.error(error);
      response.status(500).send("Ocorreu um erro no servidor.");
    }
  });

  // 8. Rota para atualizar um usuário existente
  router.put("/update/:id", async (request, response) => {
    const userId = request.params.id;
    const userData = request.body;
    const user = await update(userData, userId);

    response.status(200).send(user);
  });

  // 9. Rota para remover um usuário pelo ID
  router.delete("/delete/:id", async (request, response) => {
    const userId = request.params.id;
    const user = await remove(userId);

    response.status(200).send(user);
  });

  // 10. Adiciona o roteador ao servidor na rota /users
  server.use("/users", router);
};

// 11. Exporta o controlador de usuário como padrão
export default userController;
