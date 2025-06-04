import { z } from 'zod';
import { createError } from '@utils/error.util';
import {
  ERROR_INVALID_UUID,
  ERROR_EMAIL_INVALID,
  ERROR_CPF_INVALID,
  ERROR_PASSWORD_MIN_LENGTH,
  ERROR_PASSWORD_UPPERCASE,
  ERROR_PASSWORD_LOWERCASE,
  ERROR_PASSWORD_NUMBER,
  ERROR_PASSWORD_SPECIAL_CHAR,
  ERROR_PASSWORD_ONLY_NUMBERS,
  ERROR_REQUIRED_FIELDS,
  ERROR_IMAGE_FORMAT,
} from '@constants/errorMessages';

export const uuidSchema = z.string().uuid({ message: ERROR_INVALID_UUID });
export function validateUUID(id: string): void {
  if (!uuidSchema.safeParse(id).success) {
    throw createError(ERROR_INVALID_UUID, 400);
  }
}

export const emailSchema = z.string().email({ message: ERROR_EMAIL_INVALID });
export function validateEmail(email: string): void {
  if (!emailSchema.safeParse(email).success) {
    throw createError(ERROR_EMAIL_INVALID, 400);
  }
}

export const cpfSchema = z.string().regex(/^\d{11}$/, { message: ERROR_CPF_INVALID });
export function validateCPF(cpf: string): void {
  if (!cpfSchema.safeParse(cpf).success) {
    throw createError(ERROR_CPF_INVALID, 400);
  }
}

export const passwordSchema = z
  .string()
  .min(6, { message: ERROR_PASSWORD_MIN_LENGTH })
  .refine((val) => /[A-Z]/.test(val), { message: ERROR_PASSWORD_UPPERCASE })
  .refine((val) => /[a-z]/.test(val), { message: ERROR_PASSWORD_LOWERCASE })
  .refine((val) => /\d/.test(val), { message: ERROR_PASSWORD_NUMBER })
  .refine((val) => /[^a-zA-Z0-9]/.test(val), { message: ERROR_PASSWORD_SPECIAL_CHAR })
  .refine((val) => !/^\d+$/.test(val), { message: ERROR_PASSWORD_ONLY_NUMBERS });

export function validatePassword(password: string): void {
  const result = passwordSchema.safeParse(password);
  if (!result.success) {
    throw createError(result.error.errors[0].message, 400);
  }
}

export const urlSchema = z.string().url({ message: ERROR_IMAGE_FORMAT });
export function validateURL(url: string): void {
  if (!urlSchema.safeParse(url).success) {
    throw createError(ERROR_IMAGE_FORMAT, 400);
  }
}

export function validateRequiredFields(data: Record<string, unknown>, requiredFields: string[]): void {
  const missingFields = requiredFields.filter((field) => !data[field]);
  if (missingFields.length > 0) {
    throw createError(`${ERROR_REQUIRED_FIELDS}: ${missingFields.join(', ')}`, 400);
  }
}
