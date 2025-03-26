import prisma from "../prisma/prisma-client";
import { createRelations } from "./user-activity-repository";

// Retorna todas as atividades
export async function getAll() {
  return await prisma.activity.findMany();
}

// Retorna uma atividade pelo ID
export async function getById(id: string) {
  return await prisma.activity.findUnique({
    where: {
      id, // Critério de busca pelo ID
    },
  });
}

// Cria uma nova atividade no banco de dados
export async function create(data: { title: string; description: string }) {
  const { title, description } = data;

  // Cria a atividade com os dados fornecidos
  const activity = await prisma.activity.create({
    data: {
      title, // Título da atividade
      description, // Descrição da atividade
    },
  });

  return activity;
}