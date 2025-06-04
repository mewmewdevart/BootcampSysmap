import { z } from 'zod';
import { createError } from '@utils/error.util';
import { ERROR_INVALID_UUID } from '@constants/errorMessages';

const uuidSchema = z.string().uuid();

export function validateUUID(id: string): void {
  if (!uuidSchema.safeParse(id).success) {
    throw createError(ERROR_INVALID_UUID, 400);
  }
}
