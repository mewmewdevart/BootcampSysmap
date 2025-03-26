import prisma from "../prisma/prisma-client";
import userData from "../types/user-data";

// Retorna todos os usuários, com filtros opcionais e ordenação
export async function getAll(
  filterBy: string | undefined,
  filter: string | undefined,
  orderByField: string,
  direction: string
) {
  // Define os critérios de filtro, se fornecidos
  const where = filterBy
    ? {
        [filterBy]: { contains: filter, mode: "insensitive" },
      }
    : undefined;

  // Define os critérios de ordenação
  const orderBy = {
    [orderByField]: direction,
  };

  // Busca os usuários no banco de dados
  return await prisma.user.findMany({
    where,
    orderBy,
  });
}

// Retorna uma lista paginada de usuários
export async function getPaginated(take: number, skip: number) {
  return await prisma.user.findMany({
    take, // Quantidade de registros a serem retornados
    skip, // Quantidade de registros a serem ignorados
  });
}

// Retorna um usuário pelo ID
export async function getById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id, // Critério de busca pelo ID
    },
  });
}

// Retorna um usuário pelo email
export async function getByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email, // Critério de busca pelo email
    },
  });
}

// Cria um novo usuário no banco de dados
export async function create(data: userData) {
  return await prisma.user.create({
    data, // Dados do usuário a serem criados
  });
}

// Atualiza os dados de um usuário existente
export async function update(data: userData, id: string) {
  return await prisma.user.update({
    data, // Novos dados do usuário
    where: {
      id, // Critério de busca pelo ID
    },
  });
}

// Remove um usuário pelo ID
export async function remove(id: string) {
  return await prisma.user.delete({
    where: {
      id, // Critério de busca pelo ID
    },
  });
}