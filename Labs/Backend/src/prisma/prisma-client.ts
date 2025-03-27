// Este arquivo exporta uma instância do PrismaClient para ser usada em toda a aplicação
import { PrismaClient } from "@prisma/client";

// 1. Exporta uma nova instância do PrismaClient
const prisma = new PrismaClient();

prisma.$connect().catch((error) => {
  console.error("Failed to connect to the database:", error);
  process.exit(1);
});

export default prisma;
