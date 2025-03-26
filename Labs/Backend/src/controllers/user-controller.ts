import { Express, Router } from "express";

// Importa as funções do repositório de usuário
import {
  getAll,
  getById,
  getPaginated,
  remove,
  update,
} from "../repository/user-repository";

// 2. Importa os erros conhecidos do PrismaClient
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import authGuard from "../middlwares/auth-guard";
import { createUser } from "../services/user-service";

// 3. Define o controlador de usuário
const userController = (server: Express) => {
  const router = Router();
  // router.use(authGuard);

  // 4. Rota para obter todos os usuários
  router.get("/", authGuard, async (request, response) => {
    const { filterBy, filter, orderBy, order } = request.query as {
      filterBy: string;
      filter: string;
      orderBy: string;
      order: string;
    };

    const users = await getAll(
      filterBy,
      filter,
      orderBy || "email",
      order || "desc"
    );

    response.status(200).send(users);
  });

  // 5. Rota para obter usuários paginados
  router.get("/paginated", async (request, response) => {
    const { take, skip } = request.query; // desestruturação de objeto

    const users = await getPaginated(parseInt(take as string), parseInt(skip as string));
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
      const user = await createUser(userData);

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
