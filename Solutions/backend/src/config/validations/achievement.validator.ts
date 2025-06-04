import { z } from 'zod';
import { createError } from '@utils/error.util';
import { ERROR_REQUIRED_FIELDS } from '@constants/errorMessages';

const achievementSchema = z.object({
  criterion: z.string().nonempty(ERROR_REQUIRED_FIELDS),
});

export function validateAchievement(data: Record<string, unknown>): void {
  const result = achievementSchema.safeParse(data);
  if (!result.success) {
    throw createError(result.error.errors[0].message, 400);
  }
}
