// 1. Importa o cliente Prisma
import prisma from "../prisma/prisma-client";

// 2. Importa a função createRelations do repositório user-activity
import { createRelations } from "./user-activity-repository";

// 3. Função para obter todas as atividades
export async function getAll() {
  return await prisma.activity.findMany();
}

// 4. Função para obter uma atividade pelo ID
export async function getById(id: string) {
  return await prisma.activity.findUnique({
    where: {
      id,
    },
  });
}

// 5. Função para criar uma nova atividade
export async function create(data: { title: string; description: string }) {
  const { title, description } = data;

  const activity = await prisma.activity.create({
    data: {
      title,
      description,
    },
  });

  return activity;
}
