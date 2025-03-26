// Importa os tipos necessários do Express e a biblioteca Zod.
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

// Middleware para validar o corpo da requisição usando um esquema Zod.
export default function validateRequestBody(schema: ZodSchema) {
  return function requestBodyValidator(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      // Faz o parse e valida o corpo da requisição com base no esquema.
      schema.parse(request.body);
      next(); // Prossegue para o próximo middleware ou manipulador de rota.
    } catch (error: any) {
      // Retorna uma resposta 400 se a validação falhar.
      response.status(400).send("Informe os campos obrigatórios corretamente.");
    }
  };
}