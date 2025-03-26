import prisma from "../prisma/prisma-client";
import { createRelations } from "./user-activity-repository";

export async function getAll() {
  return await prisma.activity.findMany();
}

export async function getById(id: string) {
  return await prisma.activity.findUnique({
    where: {
      id,
    },
  });
}

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