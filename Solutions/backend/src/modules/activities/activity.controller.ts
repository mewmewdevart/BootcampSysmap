import { Request, Response } from 'express';
import { activityService } from './activity.service';
import { createError } from '@utils/error.util';
import { uploadFileToS3, deleteFileFromS3 } from '@config/localstack';
import { validateActivity } from '@config/validations/activity.validator';
import { validateFile } from '@config/validations/file.validator';
import {
  ERROR_AUTH_REQUIRED,
} from '@constants/errorMessages';
import {
  SUCCESS_ACTIVITY_REGISTERED,
  SUCCESS_ACTIVITY_UPDATED,
  SUCCESS_ACTIVITY_DELETED,
  SUCCESS_ACTIVITY_CONFIRMED,
  SUCCESS_ACTIVITY_COMPLETED,
  SUCCESS_CANCELED_SUBSCRIPTION,
} from '@constants/successMessages';

export const activityController = {
  async createActivity(req: Request, res: Response): Promise<void> {
    let uploadedImageUrl: string | null = null;
    try {
      if (!req.user) {
        throw createError(ERROR_AUTH_REQUIRED, 401);
      }

      validateActivity(req.body);
      const file = validateFile(req.file);

      const bucketName = 'activities-images';
      const fileName = `${req.user.id}/${Date.now()}-${file.originalname}`;
      uploadedImageUrl = await uploadFileToS3(bucketName, fileName, file.buffer, file.mimetype);

      const activityData = {
        ...req.body,
        image: uploadedImageUrl,
        latitude: Number(req.body.latitude),
        longitude: Number(req.body.longitude),
      };

      const activity = await activityService.createActivity(req.user.id, activityData);
      res.status(201).json({ 
        message: SUCCESS_ACTIVITY_REGISTERED, 
        activity 
      });
    } catch (error: unknown) {
      if (uploadedImageUrl) {
        await deleteFileFromS3(uploadedImageUrl).catch(console.error);
      }
      const err = error as { message: string; statusCode: number };
      res.status(err.statusCode || 400).json({ error: err.message });
    }
  },

  async updateActivity(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw createError(ERROR_AUTH_REQUIRED, 401);
      }
      const activityId = req.params.id;
      const updateData: Record<string, unknown> = { ...req.body };
      if (req.body.latitude) updateData.latitude = Number(req.body.latitude);
      if (req.body.longitude) updateData.longitude = Number(req.body.longitude);

      if (req.file) {
        validateFile(req.file);
        const fileName = `${req.user.id}/${Date.now()}-${req.file.originalname}`;
        updateData.image = await uploadFileToS3(
          'activities-images',
          fileName,
          req.file.buffer,
          req.file.mimetype
        );
      }

      const updatedActivity = await activityService.updateActivity(
        req.user.id, 
        activityId, 
        updateData
      );
      res.status(200).json({ 
        message: SUCCESS_ACTIVITY_UPDATED, 
        activity: updatedActivity 
      });
    } catch (error: unknown) {
      const err = error as { message: string; statusCode: number };
      res.status(err.statusCode || 400).json({ error: err.message });
    }
  },

  async deleteActivity(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw createError(ERROR_AUTH_REQUIRED, 401);
      }
      await activityService.deleteActivity(req.user.id, req.params.id);
      res.status(200).json({ message: SUCCESS_ACTIVITY_DELETED });
    } catch (error: unknown) {
      const err = error as { message: string; statusCode: number };
      res.status(err.statusCode || 400).json({ error: err.message });
    }
  },

  async viewConfirmationCode(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw createError(ERROR_AUTH_REQUIRED, 401);
      }
      const confirmationCode = await activityService.getConfirmationCode(
        req.user.id, 
        req.params.id
      );
      res.status(200).json({ confirmationCode });
    } catch (error: unknown) {
      const err = error as { message: string; statusCode: number };
      res.status(err.statusCode || 400).json({ error: err.message });
    }
  },

  async subscribeToActivity(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw createError(ERROR_AUTH_REQUIRED, 401);
      }
      const participant = await activityService.subscribeToActivity(
        req.user.id, 
        req.params.id
      );
      res.status(200).json(participant);
    } catch (error: unknown) {
      const err = error as { message: string; statusCode: number };
      res.status(err.statusCode || 400).json({ error: err.message });
    }
  },

  async cancelSubscription(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw createError(ERROR_AUTH_REQUIRED, 401);
      }
      await activityService.cancelSubscription(req.user.id, req.params.id);
      res.status(200).json({ message: SUCCESS_CANCELED_SUBSCRIPTION });
    } catch (error: unknown) {
      const err = error as { message: string; statusCode: number };
      res.status(err.statusCode || 400).json({ error: err.message });
    }
  },

  async concludeActivity(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw createError(ERROR_AUTH_REQUIRED, 401);
      }
      const result = await activityService.concludeActivity(
        req.user.id, 
        req.params.id
      );
      res.status(200).json({ 
        message: SUCCESS_ACTIVITY_COMPLETED,
        xpGained: result.xpGained 
      });
    } catch (error: unknown) {
      const err = error as { message: string; statusCode: number };
      res.status(err.statusCode || 400).json({ error: err.message });
    }
  },

  async checkIn(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw createError(ERROR_AUTH_REQUIRED, 401);
      }
      await activityService.checkIn(
        req.user.id, 
        req.params.id, 
        req.body.confirmationCode
      );
      res.status(200).json({ message: SUCCESS_ACTIVITY_CONFIRMED });
    } catch (error: unknown) {
      const err = error as { message: string; statusCode: number };
      res.status(err.statusCode || 400).json({ error: err.message });
    }
  },

  async getActivities(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw createError(ERROR_AUTH_REQUIRED, 401);
      }
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const typeId = req.query.typeId as string | undefined;
      
      const result = await activityService.getActivities(req.user.id, { page, pageSize, typeId });
      res.status(200).json(result);
    } catch (error: unknown) {
      const err = error as { message: string; statusCode: number };
      res.status(err.statusCode || 400).json({ error: err.message });
    }
  },

  async getActivityTypes(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        throw createError(ERROR_AUTH_REQUIRED, 401);
      }
      const types = await activityService.getActivityTypes();
      res.status(200).json(types);
    } catch (error: unknown) {
      const err = error as { message: string; statusCode: number };
      res.status(err.statusCode || 400).json({ error: err.message });
    }
  },
};
