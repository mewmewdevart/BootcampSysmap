import { Express, Router } from "express";
import { getByEmail } from "../repository/user-repository";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const jwtSecret = process.env.JWT_SECRET!;

const authController = (server: Express) => {
  const router = Router();

  // Rota para autenticação de usuário
  router.post(
    "/",
    async (request, response) => {
      const { email, password } = request.body;

      const user = await getByEmail(email);

      if (!user) {
        response.status(404).send("Usuário não encontrado.");
        return;
      }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        response.status(401).send("Senha incorreta.");
        return;
      }

      const token = jwt.sign(user, jwtSecret, { expiresIn: "1d" });

      response.status(200).send(token);
    }
  );

  server.use("/auth", router);
};

export default authController;