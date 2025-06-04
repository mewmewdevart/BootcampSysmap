import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function awardAchievement(
  userId: string,
  achievementCriterion: string,
  xpBonus: number
): Promise<void> {
  const existing = await prisma.userAchievements.findFirst({
    where: {
      userId,
      Achievements: { criterion: achievementCriterion },
    },
  });
  if (!existing) {
    const achievement = await prisma.achievements.findFirst({
      where: { criterion: achievementCriterion },
    });
    if (achievement) {
      await prisma.userAchievements.create({
        data: { userId, achievementId: achievement.id },
      });
      await prisma.users.update({
        where: { id: userId },
        data: { xp: { increment: xpBonus } },
      });
    }
  }
}
