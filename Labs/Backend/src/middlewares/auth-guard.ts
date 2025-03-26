// Importa os tipos necessários do Express e a biblioteca `jsonwebtoken`.
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Recupera o segredo JWT das variáveis de ambiente.
const jwtSecret = process.env.JWT_SECRET!;

// Estende a interface `Request` do Express para incluir a propriedade `userId`.
declare module "express-serve-static-core" {
  interface Request {
    userId: string;
  }
}

// Middleware para proteger rotas verificando o token JWT.
export default function authGuard(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Recupera o cabeçalho Authorization.
  const authHeader = request.headers.authorization;

  // Se nenhum token for fornecido, retorna uma resposta 401.
  if (!authHeader) {
    response
      .status(401)
      .send("Você precisa estar autenticado para acessar este endpoint.");
    return;
  }

  // Extrai o token do cabeçalho.
  const token = authHeader.replace("Bearer ", "");

  try {
    // Verifica o token e extrai as informações do usuário.
    const user = jwt.verify(token, jwtSecret) as {
      id: string;
      name: string;
      email: string;
      password: string;
      iat: number;
      exp: number;
    };

    // Anexa o ID do usuário ao objeto da requisição.
    request.userId = user.id;
    next(); // Prossegue para o próximo middleware ou manipulador de rota.
  } catch (error: any) {
    // Retorna uma resposta 401 se o token for inválido ou expirado.
    response.status(401).send("Token inválido ou expirado.");
    return;
  }
}