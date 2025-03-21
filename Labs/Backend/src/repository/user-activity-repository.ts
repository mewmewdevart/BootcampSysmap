// 1. Importa o cliente Prisma
import prisma from "../prisma/prisma-client";

// 2. Função para criar relações entre usuários e atividades
export async function createRelations(
  data: { activityId: string; userId: string }[]
) {
  return await prisma.userActivity.createMany({
    data,
  });
}

// 3. Função para obter atividades por ID de usuário
export async function getActivitiesByUserId(userId: string) {
  return await prisma.userActivity.findMany({
    where: {
      userId,
    },
    include: {
      activity: true,
    },
    omit: {
      activityId: true,
      userId: true,
    },
  });
}
