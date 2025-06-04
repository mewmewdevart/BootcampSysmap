import { Request, Response, RequestHandler } from 'express';
import { ZodError } from 'zod';

import {
  ERROR_USER_ALREADY_EXISTS,
  ERROR_USER_NOT_FOUND,
  ERROR_INCORRECT_PASSWORD,
  ERROR_ACCOUNT_DEACTIVATED,
  ERROR_EMAIL_REQUIRED,
  ERROR_PASSWORD_REQUIRED,
  ERROR_INVALID_FIELDS,
  ERROR_UNKNOWN,
} from '@constants/errorMessages';
import { SUCCESS_USER_REGISTERED, SUCCESS_USER_LOGGED_IN } from '@constants/successMessages';
import { createError } from '@utils/error.util';
import { authService } from './auth.service';

const mapErrorMessage = (
  error: unknown
): { message: string; statusCode: number; details?: Record<string, unknown> } => {
  if (error instanceof ZodError) {
    return createError(error.errors[0].message, 400, { field: error.errors[0].path });
  }
  if (error && typeof error === 'object' && 'statusCode' in error && 'message' in error) {
    return error as { message: string; statusCode: number; details?: Record<string, unknown> };
  }
  if (error instanceof Error) {
    switch (error.message) {
    case ERROR_USER_ALREADY_EXISTS:
      return createError(ERROR_USER_ALREADY_EXISTS, 409);
    case ERROR_USER_NOT_FOUND:
      return createError(ERROR_USER_NOT_FOUND, 404);
    case ERROR_INCORRECT_PASSWORD:
      return createError(ERROR_INCORRECT_PASSWORD, 401);
    case ERROR_ACCOUNT_DEACTIVATED:
      return createError(ERROR_ACCOUNT_DEACTIVATED, 403);
    case ERROR_EMAIL_REQUIRED:
      return createError(ERROR_EMAIL_REQUIRED, 400);
    case ERROR_PASSWORD_REQUIRED:
      return createError(ERROR_PASSWORD_REQUIRED, 400);
    case ERROR_INVALID_FIELDS:
      return createError(ERROR_INVALID_FIELDS, 400);
    default:
      return createError(error.message || ERROR_UNKNOWN, 500);
    }
  }
  return createError(ERROR_UNKNOWN, 500);
};

export const authController: { register: RequestHandler; login: RequestHandler } = {
  register: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await authService.registerUser(req.body);
      res.status(201).json({
        message: SUCCESS_USER_REGISTERED,
        user,
      });
    } catch (error: unknown) {
      const mappedError = mapErrorMessage(error);
      res.status(mappedError.statusCode).json({
        error: mappedError.message,
        details: mappedError.details,
      });
    }
  },

  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await authService.loginUser(req.body);
      res.status(200).json({
        token: result.token,
        user: result.user,
        message: SUCCESS_USER_LOGGED_IN,
      });
    } catch (error: unknown) {
      const mappedError = mapErrorMessage(error);
      res.status(mappedError.statusCode).json({
        error: mappedError.message,
        details: mappedError.details,
      });
    }
  },
};
