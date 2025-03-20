import prisma from "../prisma/prisma-client";
import userData from "../types/user-data";

export async function getAll() {
  return await prisma.user.findMany();
}

export async function getById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
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
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
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