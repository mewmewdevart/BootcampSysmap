import { Request, Response, RequestHandler } from 'express';
import { userService } from './user.service';
import { createError } from '@utils/error.util';
import {
  SUCCESS_USER_DEACTIVATED,
  SUCCESS_ACHIEVEMENT_ADDED,
} from '@constants/successMessages';
import {
  ERROR_USER_NOT_FOUND,
  ERROR_ACCOUNT_DEACTIVATED,
  ERROR_INVALID_FIELDS,
  ERROR_IMAGE_FORMAT,
} from '@constants/errorMessages';

export const userController: {
  getUserById: RequestHandler;
  getAllUsers: RequestHandler;
  updateUser: RequestHandler;
  deactivateUser: RequestHandler;
  addExperience: RequestHandler;
  addAchievement: RequestHandler;
  updateAvatar: RequestHandler;
} = {
  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (error: unknown) {
      const mappedError = createError(
        (error as Error).message || ERROR_USER_NOT_FOUND,
        (error as { statusCode?: number }).statusCode || 404
      );
      res.status(mappedError.statusCode).json({ error: mappedError.message });
    }
  },

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const { users, total } = await userService.getAllUsers(page, pageSize);
      res.status(200).json({ users, total, page, pageSize });
    } catch (error: unknown) {
      const mappedError = createError(
        (error as Error).message || ERROR_INVALID_FIELDS,
        (error as { statusCode?: number }).statusCode || 400
      );
      res.status(mappedError.statusCode).json({ error: mappedError.message });
    }
  },

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.status(200).json(user);
    } catch (error: unknown) {
      const mappedError = createError(
        (error as Error).message || ERROR_INVALID_FIELDS,
        (error as { statusCode?: number }).statusCode || 400
      );
      res.status(mappedError.statusCode).json({ error: mappedError.message });
    }
  },

  async deactivateUser(req: Request, res: Response): Promise<void> {
    try {
      await userService.deactivateUser(req.params.id);
      res.status(200).json({ message: SUCCESS_USER_DEACTIVATED });
    } catch (error: unknown) {
      const mappedError = createError(
        (error as Error).message || ERROR_ACCOUNT_DEACTIVATED,
        (error as { statusCode?: number }).statusCode || 400
      );
      res.status(mappedError.statusCode).json({ error: mappedError.message });
    }
  },

  async addExperience(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.addExperience(req.params.id, req.body.xp);
      res.status(200).json(user);
    } catch (error: unknown) {
      const mappedError = createError(
        (error as Error).message || ERROR_INVALID_FIELDS,
        (error as { statusCode?: number }).statusCode || 400
      );
      res.status(mappedError.statusCode).json({ error: mappedError.message });
    }
  },

  async addAchievement(req: Request, res: Response): Promise<void> {
    try {
      await userService.addAchievement(req.params.id, req.body.achievementId);
      res.status(201).json({ message: SUCCESS_ACHIEVEMENT_ADDED });
    } catch (error: unknown) {
      const mappedError = createError(
        (error as Error).message || ERROR_INVALID_FIELDS,
        (error as { statusCode?: number }).statusCode || 400
      );
      res.status(mappedError.statusCode).json({ error: mappedError.message });
    }
  },

  async updateAvatar(req: Request, res: Response): Promise<void> {
    try {
      const { file } = req;
      if (!file) throw createError(ERROR_IMAGE_FORMAT, 400);

      const avatarUrl = await userService.updateAvatar((req.user as { id: string }).id, file);
      res.status(200).json({ avatar: avatarUrl });
    } catch (error: unknown) {
      const mappedError = createError(
        (error as Error).message || ERROR_IMAGE_FORMAT,
        (error as { statusCode?: number }).statusCode || 400
      );
      res.status(mappedError.statusCode).json({ error: mappedError.message });
    }
  },
};
