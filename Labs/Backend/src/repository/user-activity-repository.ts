import prisma from "../prisma/prisma-client";

export async function createRelations(
  data: { activityId: string; userId: string }[]
) {
  return await prisma.userActivity.createMany({
    data,
  });
}

export async function getActivitiesByUserId(userId: string) {
  return await prisma.userActivity.findMany({
    where: {
      userId,
    },
    include: {
      activity: true,
    },
    omit: {
      activityId: true,
      userId: true,
    },
  });
}