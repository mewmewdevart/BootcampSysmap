import { prisma } from '@config/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import {
  ERROR_USER_ALREADY_EXISTS,
  ERROR_USER_NOT_FOUND,
  ERROR_INCORRECT_PASSWORD,
  ERROR_ACCOUNT_DEACTIVATED,
  ERROR_EMAIL_INVALID,
  ERROR_NAME_EMPTY,
  ERROR_NAME_ONLY_NUMBERS,
  ERROR_NAME_CONTAINS_NUMBERS,
  ERROR_CPF_EMPTY,
  ERROR_CPF_INVALID,
  ERROR_PASSWORD_MIN_LENGTH,
  ERROR_PASSWORD_UPPERCASE,
  ERROR_PASSWORD_LOWERCASE,
  ERROR_PASSWORD_NUMBER,
  ERROR_PASSWORD_SPECIAL_CHAR,
  ERROR_PASSWORD_ONLY_NUMBERS,
  ERROR_CONFIRM_PASSWORD_EMPTY,
  ERROR_CONFIRM_PASSWORD_MISMATCH,
  ERROR_EMAIL_REQUIRED,
  ERROR_PASSWORD_REQUIRED,
  ERROR_UNKNOWN,
} from '@constants/errorMessages';
import { Users } from '@prisma/client';
import { awardAchievement } from '@utils/achievement.util';
import { createError } from '@utils/error.util';

const validatePassword = z
  .string()
  .min(6, { message: ERROR_PASSWORD_MIN_LENGTH })
  .refine((val) => /[A-Z]/.test(val), { message: ERROR_PASSWORD_UPPERCASE })
  .refine((val) => /[a-z]/.test(val), { message: ERROR_PASSWORD_LOWERCASE })
  .refine((val) => /\d/.test(val), { message: ERROR_PASSWORD_NUMBER })
  .refine((val) => /[^a-zA-Z0-9]/.test(val), { message: ERROR_PASSWORD_SPECIAL_CHAR })
  .refine((val) => !/^\d+$/.test(val), { message: ERROR_PASSWORD_ONLY_NUMBERS });

const registerUserSchema = z.object({
  name: z.string()
    .nonempty({ message: ERROR_NAME_EMPTY })
    .refine((val) => !/^\d+$/.test(val), { message: ERROR_NAME_ONLY_NUMBERS })
    .refine((val) => !/\d/.test(val), { message: ERROR_NAME_CONTAINS_NUMBERS }),
  email: z.string().email({ message: ERROR_EMAIL_INVALID }),
  cpf: z.string()
    .nonempty({ message: ERROR_CPF_EMPTY })
    .regex(/^\d{11}$/, { message: ERROR_CPF_INVALID }),
  password: validatePassword,
  confirmPassword: z.string()
    .nonempty({ message: ERROR_CONFIRM_PASSWORD_EMPTY }) 
}).refine((data) => data.password === data.confirmPassword, {
  message: ERROR_CONFIRM_PASSWORD_MISMATCH,
  path: ['confirmPassword'],
});

const loginUserSchema = z.object({
  email: z.string().nonempty({ message: ERROR_EMAIL_REQUIRED }).email({ message: ERROR_EMAIL_INVALID }),
  password: z.string().nonempty({ message: ERROR_PASSWORD_REQUIRED }),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;

export const authService = {
  async registerUser(data: unknown): Promise<Users> {
    try {
      const parsedData: RegisterUserInput = registerUserSchema.parse(data);

      const existingUser = await prisma.users.findFirst({
        where: {
          OR: [{ email: parsedData.email }, { cpf: parsedData.cpf }],
        },
        select: { id: true },
      });

      if (existingUser) {
        throw createError(ERROR_USER_ALREADY_EXISTS, 409);
      }

      const hashedPassword = await bcrypt.hash(parsedData.password, 10);

      const newUser = await prisma.users.create({
        data: {
          name: parsedData.name,
          email: parsedData.email,
          cpf: parsedData.cpf,
          password: hashedPassword,
          avatar: '/resources/user-default.jpg',
          xp: 0,
          level: 1,
        },
      });

      return newUser;
    } catch (error: unknown) {
      if (error instanceof Error && error.message !== ERROR_UNKNOWN) {
        throw createError(error.message, 400);
      }
      throw createError(ERROR_UNKNOWN, 500);
    }
  },

  async loginUser(data: unknown): Promise<{ token: string; user: Partial<Users> & { achievements?: { name: string; criterion: string }[] } }> {
    try {
      const parsedData: LoginUserInput = loginUserSchema.parse(data);

      const user = await prisma.users.findUnique({
        where: { email: parsedData.email },
        include: {
          UserAchievements: {
            include: {
              Achievements: {
                select: { name: true, criterion: true },
              },
            },
          },
        },
      });

      if (!user) {
        throw createError(ERROR_USER_NOT_FOUND, 404);
      }

      if (user.deletedAt) {
        throw createError(ERROR_ACCOUNT_DEACTIVATED, 403);
      }

      const passwordMatch = await bcrypt.compare(parsedData.password, user.password);
      if (!passwordMatch) {
        throw createError(ERROR_INCORRECT_PASSWORD, 401);
      }

      const firstLoginAchievement = await prisma.userAchievements.findFirst({
        where: {
          userId: user.id,
          Achievements: { criterion: 'first_login' },
        },
      });
      if (!firstLoginAchievement) {
        await awardAchievement(user.id, 'first_login', 50);
      }

      const updatedAchievements = await prisma.userAchievements.findMany({
        where: { userId: user.id },
        include: {
          Achievements: {
            select: { name: true, criterion: true },
          },
        },
      });

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' }
      );

      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          cpf: user.cpf,
          avatar: user.avatar,
          xp: user.xp,
          level: user.level,
          achievements: updatedAchievements.map((ua) => ua.Achievements),
        },
      };
    } catch (error: unknown) {
      if (error instanceof Error && error.message !== ERROR_UNKNOWN) {
        throw createError(error.message, 400);
      }
      throw createError(ERROR_UNKNOWN, 500);
    }
  }
};
