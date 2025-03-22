import prisma from "../prisma/prisma-client";
import { createRelations } from "./user-activity-repository";

// 1. Função para obter todas as atividades
export async function getAll() {
  return await prisma.activity.findMany();
}

// 2. Função para obter uma atividade pelo ID
export async function getById(id: string) {
  return await prisma.activity.findUnique({
    where: {
      id,
    },
  });
}

// 3. Função para criar uma nova atividade
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
