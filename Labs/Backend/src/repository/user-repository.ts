import prisma from "../prisma/prisma-client";
import userData from "../types/user-data";

// 1. Função para obter todos os usuários
export async function getAll(
  filterBy: string | undefined,
  filter: string | undefined,
  orderByField: string,
  direction: string
) {
  const where = filterBy
    ? {
        [filterBy]: { contains: filter, mode: "insensitive" },
      }
    : undefined;

  const orderBy = {
    [orderByField]: direction,
  };

  return await prisma.user.findMany({
    where,
    orderBy,
  });
}

// 2. Função para obter usuários paginados
export async function getPaginated(take: number, skip: number) {
  return await prisma.user.findMany({
    take,
    skip,
    orderBy: {
      email: "asc",
    }
  });
}

// 3. Função para obter um usuário pelo ID
export async function getById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function getByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

// 4. Função para criar um novo usuário
export async function create(data: userData) {
  return await prisma.user.create({
    data,
  });
}


// 5. Função para atualizar um usuário existente
export async function update(data: userData, id: string) {
  return await prisma.user.update({
    data,
    where: {
      id,
    },
  });
}

// 6. Função para remover um usuário pelo ID
export async function remove(id: string) {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
}
