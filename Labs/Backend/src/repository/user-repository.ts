import prisma from "../prisma/prisma-client";
import userData from "../types/user-data";

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

export async function getPaginated(take: number, skip: number) {
  return await prisma.user.findMany({
    take,
    skip,
  });
}

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

export async function create(data: userData) {
  return await prisma.user.create({
    data,
  });
}

export async function update(data: userData, id: string) {
  return await prisma.user.update({
    data,
    where: {
      id,
    },
  });
}

export async function remove(id: string) {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
}