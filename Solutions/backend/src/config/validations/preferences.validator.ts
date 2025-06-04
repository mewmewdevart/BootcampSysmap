import { z } from 'zod';
import { createError } from '@utils/error.util';
import { ERROR_REQUIRED_FIELDS, ERROR_INVALID_UUID } from '@constants/errorMessages';

const preferencesSchema = z.array(z.string().uuid({ message: ERROR_INVALID_UUID }));

export function validatePreferences(typeIds: unknown): void {
  const result = preferencesSchema.safeParse(typeIds);
  if (!result.success) {
    throw createError(ERROR_REQUIRED_FIELDS, 400);
  }
}
