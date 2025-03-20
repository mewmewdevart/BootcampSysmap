import { Express, Router } from "express";
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from "../repository/user-repository";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

const userController = (server: Express) => {
  const router = Router();

  router.get("/", async (request, response) => {
    const users = await getAll();
    response.status(200).send(users);
  });

  router.get("/:id", async (request, response) => {
    const userId = request.params.id;
    const user = await getById(userId);
    response.status(200).send(user);
  });

  router.post("/new", async (request, response) => {
    try {
      const userData = request.body;
      const user = await create(userData);

      response.status(201).send(user);
    } catch (error: any) {
      throw new Error("An error occurred while creating a new user.");
      /*
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
      */
    }
  });

  router.put("/update/:id", async (request, response) => {
    const userId = request.params.id;
    const userData = request.body;
    const user = await update(userData, userId);

    response.status(200).send(user);
  });

  router.delete("/delete/:id", async (request, response) => {
    const userId = request.params.id;
    const user = await remove(userId);

    response.status(200).send(user);
  });

  server.use("/users", router);
};

export default userController;