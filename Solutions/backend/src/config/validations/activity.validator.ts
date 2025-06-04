import { z } from 'zod';
import { createError } from '@utils/error.util';
import { ERROR_REQUIRED_FIELDS } from '@constants/errorMessages';

export const activitySchema = z.object({
  title: z.string().nonempty(ERROR_REQUIRED_FIELDS),
  description: z.string().nonempty(ERROR_REQUIRED_FIELDS),
  type: z.string().uuid(ERROR_REQUIRED_FIELDS),
  scheduledDate: z.string().refine(
    (val) => !isNaN(Date.parse(val)),
    { message: ERROR_REQUIRED_FIELDS }
  ),
  latitude: z.number({
    required_error: ERROR_REQUIRED_FIELDS,
  }),
  longitude: z.number({
    required_error: ERROR_REQUIRED_FIELDS,
  }),
  private: z.boolean().optional(),
});

export function validateActivity(data: Record<string, unknown>): void {
  const result = activitySchema.safeParse(data);
  if (!result.success) {
    throw createError(result.error.errors[0].message, 400);
  }
}
