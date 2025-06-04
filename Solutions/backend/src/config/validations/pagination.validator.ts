import { z } from 'zod';
import { createError } from '@utils/error.util';
import { ERROR_REQUIRED_FIELDS } from '@constants/errorMessages';

const paginationSchema = z.object({
  page: z.number().int().positive().optional(),
  pageSize: z.number().int().positive().optional(),
});

export function validatePagination(query: Record<string, unknown>): { page: number; pageSize: number } {
  const result = paginationSchema.safeParse(query);
  if (!result.success) {
    throw createError(ERROR_REQUIRED_FIELDS, 400);
  }
  return {
    page: result.data.page || 1,
    pageSize: result.data.pageSize || 10,
  };
}
