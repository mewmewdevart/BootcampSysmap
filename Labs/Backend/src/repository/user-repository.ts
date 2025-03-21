// 1. Importa o cliente Prisma
import prisma from "../prisma/prisma-client";

// 2. Importa o tipo userData
import userData from "../types/user-data";

// 3. Função para obter todos os usuários
export async function getAll() {
  return await prisma.user.findMany();
}

// 4. Função para obter um usuário pelo ID
export async function getById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}

// 5. Função para criar um novo usuário
export async function create(data: userData) {
  return await prisma.user.create({
    data,
  });
}

// 6. Função para atualizar um usuário existente
export async function update(data: userData, id: string) {
  return await prisma.user.update({
    data,
    where: {
      id,
    },
  });
}

// 7. Função para remover um usuário pelo ID
export async function remove(id: string) {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
}
