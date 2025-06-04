import { Request, Response } from 'express';
import { preferencesService } from './preferences.service';
import { createError } from '@utils/error.util';
import {
  ERROR_AUTH_REQUIRED,
  ERROR_REQUIRED_FIELDS,
  ERROR_PREFERENCES_INVALID,
} from '@constants/errorMessages';
import { SUCCESS_PREFERENCES_UPDATED } from '@constants/successMessages';

export const preferencesController = {
  async getUserPreferences(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) throw createError(ERROR_AUTH_REQUIRED, 401);
      const userId = (req.user as { id: string }).id;

      const preferences = await preferencesService.getUserPreferences(userId);
      res.status(200).json(preferences);
    } catch (error: unknown) {
      const mappedError = createError((error as Error).message, 400);
      res.status(mappedError.statusCode).json({ error: mappedError.message });
    }
  },

  async defineUserPreferences(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) throw createError(ERROR_AUTH_REQUIRED, 401);
      if (!req.body || !req.body.typeIds || !Array.isArray(req.body.typeIds)) {
        throw createError(ERROR_REQUIRED_FIELDS, 400);
      }

      const userId = (req.user as { id: string }).id;
      await preferencesService.defineUserPreferences(userId, req.body.typeIds);

      res.status(200).json({ message: SUCCESS_PREFERENCES_UPDATED });
    } catch (error: unknown) {
      const mappedError = createError((error as Error).message || ERROR_PREFERENCES_INVALID, 400);
      res.status(mappedError.statusCode).json({ error: mappedError.message });
    }
  },
};
