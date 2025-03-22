import prisma from "../prisma/prisma-client";
import userData from "../types/user-data";

// 1. Função para obter todos os usuários
export async function getAll() {
  return await prisma.user.findMany();
}

// 2. Função para obter um usuário pelo ID
export async function getById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}

// 3. Função para criar um novo usuário
export async function create(data: userData) {
  return await prisma.user.create({
    data,
  });
}

// 4. Função para atualizar um usuário existente
export async function update(data: userData, id: string) {
  return await prisma.user.update({
    data,
    where: {
      id,
    },
  });
}

// 5. Função para remover um usuário pelo ID
export async function remove(id: string) {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
}
