import { prisma } from '@config/database';
import { Users } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { uploadFileToS3 } from '@config/localstack';
import { createError } from '@utils/error.util';
import {
  ERROR_USER_NOT_FOUND,
  ERROR_ACCOUNT_DEACTIVATED,
  ERROR_USER_ALREADY_EXISTS,
  ERROR_CPF_INVALID_CUSTOM,
  ERROR_PASSWORD_MIN_LENGTH,
  ERROR_PASSWORD_UPPERCASE,
  ERROR_PASSWORD_LOWERCASE,
  ERROR_PASSWORD_NUMBER,
  ERROR_PASSWORD_SPECIAL_CHAR,
  ERROR_PASSWORD_ONLY_NUMBERS,
  ERROR_ACCOUNT_ALREADY_DEACTIVATED,
  ERROR_ACHIEVEMENT_NOT_FOUND,
} from '@constants/errorMessages';
import { validateUUID } from '../../config/validations/uuid.validator';
import { awardAchievement } from '@utils/achievement.util';

const validatePassword = z
  .string()
  .min(6, { message: ERROR_PASSWORD_MIN_LENGTH })
  .refine((val) => /[A-Z]/.test(val), { message: ERROR_PASSWORD_UPPERCASE })
  .refine((val) => /[a-z]/.test(val), { message: ERROR_PASSWORD_LOWERCASE })
  .refine((val) => /\d/.test(val), { message: ERROR_PASSWORD_NUMBER })
  .refine((val) => /[^a-zA-Z0-9]/.test(val), { message: ERROR_PASSWORD_SPECIAL_CHAR })
  .refine((val) => !/^\d+$/.test(val), { message: ERROR_PASSWORD_ONLY_NUMBERS });

export const userService = {
  async updateUser(id: string, data: Partial<Users>): Promise<Users> {
    validateUUID(id);

    const user = await prisma.users.findUnique({ where: { id } });
    if (!user) throw createError(ERROR_USER_NOT_FOUND, 404);
    if (user.deletedAt) throw createError(ERROR_ACCOUNT_DEACTIVATED, 403);

    if (data.cpf && data.cpf !== user.cpf) {
      throw createError(ERROR_CPF_INVALID_CUSTOM, 400);
    }

    const allowedFields = ['name', 'email', 'password', 'avatar'] as const;
    const updateData: Partial<Users> = {};
    allowedFields.forEach((field) => {
      const value = data[field as keyof Partial<Users>];
      if (value !== undefined) {
        updateData[field as keyof Partial<Users>] = value as never;
      }
    });

    if (updateData.email && updateData.email !== user.email) {
      const existingUser = await prisma.users.findUnique({ where: { email: updateData.email } });
      if (existingUser) throw createError(ERROR_USER_ALREADY_EXISTS, 409);
    }

    if (updateData.password) {
      validatePassword.parse(updateData.password);
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await prisma.users.update({ where: { id }, data: updateData });

    if (updateData.avatar && user.avatar === '/resources/user-default.jpg') {
      await awardAchievement(id, 'first_profile_picture', 50);
    }

    return updatedUser;
  },

  async getAllUsers(page = 1, pageSize = 10): Promise<{ users: Partial<Users>[]; total: number }> {
    const total = await prisma.users.count();
    const users = await prisma.users.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: { id: true, name: true, email: true, cpf: true, avatar: true, xp: true, level: true },
    });
    return { users, total };
  },

  async deactivateUser(id: string): Promise<void> {
    const user = await prisma.users.findUnique({ where: { id } });
    if (!user) throw createError(ERROR_USER_NOT_FOUND, 404);
    if (user.deletedAt) throw createError(ERROR_ACCOUNT_ALREADY_DEACTIVATED, 400);
    await prisma.users.update({ where: { id }, data: { deletedAt: new Date() } });
  },

  async addExperience(id: string, xp: number): Promise<Users> {
    validateUUID(id);
    const user = await prisma.users.findUnique({ where: { id } });
    if (!user) throw createError(ERROR_USER_NOT_FOUND, 404);
    if (user.deletedAt) throw createError(ERROR_ACCOUNT_DEACTIVATED, 403);

    const previousXp = user.xp;
    const previousLevel = user.level;
    const newXp = previousXp + xp;
    const newLevel = Math.floor(newXp / 100) + 1;

    const updatedUser = await prisma.users.update({
      where: { id },
      data: { xp: newXp, level: newLevel },
    });

    if (previousLevel === 1 && newLevel > 1) {
      await awardAchievement(id, 'first_level_up', 50);
    }

    return updatedUser;
  },

  async addAchievement(userId: string, achievementId: string): Promise<void> {
    const user = await prisma.users.findUnique({ where: { id: userId } });
    if (!user) throw createError(ERROR_USER_NOT_FOUND, 404);
    if (user.deletedAt) throw createError(ERROR_ACCOUNT_DEACTIVATED, 403);
    const achievement = await prisma.achievements.findUnique({ where: { id: achievementId } });
    if (!achievement) throw createError(ERROR_ACHIEVEMENT_NOT_FOUND, 404);
    await prisma.userAchievements.create({ data: { userId, achievementId } });
  },

  async getUserById(id: string): Promise<Users> {
    validateUUID(id);

    const user = await prisma.users.findUnique({
      where: { id },
      include: {
        UserAchievements: {
          include: {
            Achievements: true,
          },
        },
      },
    });

    if (!user) throw createError(ERROR_USER_NOT_FOUND, 404);
    if (user.deletedAt) throw createError(ERROR_ACCOUNT_DEACTIVATED, 403);

    return user;
  },

  async updateAvatar(userId: string, file: Express.Multer.File): Promise<string> {
    validateUUID(userId);

    const user = await prisma.users.findUnique({ where: { id: userId } });
    if (!user) throw createError(ERROR_USER_NOT_FOUND, 404);
    if (user.deletedAt) throw createError(ERROR_ACCOUNT_DEACTIVATED, 403);

    const bucketName = 'user-avatars';
    const fileName = `${userId}/${Date.now()}-${file.originalname}`;
    const avatarUrl = await uploadFileToS3(bucketName, fileName, file.buffer, file.mimetype);

    await prisma.users.update({
      where: { id: userId },
      data: { avatar: avatarUrl },
    });

    return avatarUrl;
  }
};
