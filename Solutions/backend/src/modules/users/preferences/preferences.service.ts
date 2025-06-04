import { prisma } from '@config/database';
import { validateUUID } from '@config/validations/fields.validation';
import { createError } from '@utils/error.util';
import { ERROR_USER_NOT_FOUND } from '@constants/errorMessages';

export const preferencesService = {
  async getUserPreferences(userId: string): Promise<{ id: string; name: string; description: string; image: string }[]> {
    validateUUID(userId);

    const user = await prisma.users.findUnique({ where: { id: userId } });
    if (!user) throw createError(ERROR_USER_NOT_FOUND, 404);

    const preferences = await prisma.preferences.findMany({
      where: { userId },
      include: {
        ActivityTypes: {
          select: { id: true, name: true, description: true, image: true },
        },
      },
    });
    return preferences.map((pref) => pref.ActivityTypes);
  },

  async defineUserPreferences(userId: string, typeIds: string[]): Promise<void> {
    validateUUID(userId);
    typeIds.forEach((id) => validateUUID(id));

    const user = await prisma.users.findUnique({ where: { id: userId } });
    if (!user) throw createError(ERROR_USER_NOT_FOUND, 404);

    await prisma.preferences.deleteMany({ where: { userId } });
    await prisma.preferences.createMany({
      data: typeIds.map((typeId) => ({
        userId,
        typeId,
      })),
    });
  },
};
