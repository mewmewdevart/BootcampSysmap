import { Prisma } from '@prisma/client';
import { prisma } from '@config/database';
import {
  ERROR_ACTIVITY_NOT_FOUND,
  ERROR_CREATOR_CANNOT_REGISTER,
  ERROR_ACTIVITY_COMPLETED_REGISTRATION,
  ERROR_CHECKIN_NOT_ALLOWED,
  ERROR_INVALID_CONFIRMATION_CODE,
  ERROR_ALREADY_REGISTERED,
  ERROR_CANNOT_CANCEL_CONFIRMED,
  ERROR_ONLY_CREATOR_CAN_COMPLETE,
  ERROR_ONLY_CREATOR_CAN_EDIT,
  ERROR_ONLY_CREATOR_CAN_DELETE,
  ERROR_ONLY_CREATOR_CAN_VIEW_CONFIRMATION,
  ERROR_ALREADY_CONFIRMED
} from '@constants/errorMessages';
import { awardAchievement } from '@utils/achievement.util';
import { validateUUID } from '@config/validations/uuid.validator';
import { createError } from '@utils/error.util';

export const activityService = {
  async createActivity(
    userId: string, 
    data: { 
      title: string; 
      description: string; 
      type: string; 
      scheduledDate: string; 
      image: string; 
      latitude: number; 
      longitude: number; 
      private?: boolean 
    }
  ): Promise<{
    id: string;
    title: string;
    description: string;
    type: string;
    scheduledDate: Date;
    image: string;
    private: boolean;
    address: { latitude: number; longitude: number };
  }> {
    validateUUID(userId);
    validateUUID(data.type);

    const confirmationCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const [activity] = await prisma.$transaction([
      prisma.activities.create({
        data: {
          title: data.title,
          description: data.description,
          type: data.type,
          scheduledDate: new Date(data.scheduledDate),
          image: data.image,
          creatorId: userId,
          confirmationCode,
          private: data.private ?? false,
          ActivityAddresses: {
            create: {
              latitude: data.latitude,
              longitude: data.longitude
            }
          }
        },
        include: { ActivityAddresses: true }
      }),
      prisma.users.update({
        where: { id: userId },
        data: { xp: { increment: 50 } }
      })
    ]);

    const activityCount = await prisma.activities.count({ 
      where: { creatorId: userId } 
    });
    
    if (activityCount === 1) {
      await awardAchievement(userId, 'first_activity_created', 50);
    }

    return {
      ...activity,
      address: {
        latitude: activity.ActivityAddresses?.latitude || 0,
        longitude: activity.ActivityAddresses?.longitude || 0
      }
    };
  },

  async updateActivity(
    userId: string,
    activityId: string,
    updateData: {
      title?: string;
      description?: string;
      type?: string;
      scheduledDate?: string;
      image?: string;
      latitude?: number;
      longitude?: number;
      private?: boolean;
    }
  ): Promise<{
    id: string;
    title: string;
    description: string;
    type: string;
    scheduledDate: Date;
    image: string;
    private: boolean;
    ActivityAddresses: { latitude: number; longitude: number } | null;
  }> {
    validateUUID(userId);
    validateUUID(activityId);
    
    const activity = await prisma.activities.findUnique({
      where: { id: activityId },
      include: { ActivityAddresses: true }
    });

    if (!activity) throw createError(ERROR_ACTIVITY_NOT_FOUND, 404);
    if (activity.creatorId !== userId) throw createError(ERROR_ONLY_CREATOR_CAN_EDIT, 403);
    if (activity.completedAt) throw createError(ERROR_ACTIVITY_COMPLETED_REGISTRATION, 400);

    const updatedActivity = await prisma.activities.update({
      where: { id: activityId },
      data: {
        title: updateData.title,
        description: updateData.description,
        type: updateData.type,
        scheduledDate: updateData.scheduledDate ? new Date(updateData.scheduledDate) : undefined,
        image: updateData.image,
        private: updateData.private,
        ActivityAddresses: updateData.latitude && updateData.longitude ? {
          upsert: {
            create: {
              latitude: updateData.latitude,
              longitude: updateData.longitude
            },
            update: {
              latitude: updateData.latitude,
              longitude: updateData.longitude
            }
          }
        } : undefined
      },
      include: { ActivityAddresses: true }
    });

    return {
      ...updatedActivity,
      ActivityAddresses: updatedActivity.ActivityAddresses || null
    };
  },

  async deleteActivity(userId: string, activityId: string): Promise<void> {
    validateUUID(userId);
    validateUUID(activityId);
    
    const activity = await prisma.activities.findUnique({ 
      where: { id: activityId } 
    });

    if (!activity) throw createError(ERROR_ACTIVITY_NOT_FOUND, 404);
    if (activity.creatorId !== userId) throw createError(ERROR_ONLY_CREATOR_CAN_DELETE, 403);

    await prisma.activities.update({
      where: { id: activityId },
      data: { deletedAt: new Date() }
    });
  },

  async getConfirmationCode(userId: string, activityId: string): Promise<string> {
    validateUUID(userId);
    validateUUID(activityId);
    
    const activity = await prisma.activities.findUnique({ 
      where: { id: activityId } 
    });

    if (!activity) throw createError(ERROR_ACTIVITY_NOT_FOUND, 404);
    if (activity.creatorId !== userId) throw createError(ERROR_ONLY_CREATOR_CAN_VIEW_CONFIRMATION, 403);

    return activity.confirmationCode;
  },

  async subscribeToActivity(
    userId: string, 
    activityId: string
  ): Promise<{ 
    id: string; 
    activityId: string; 
    userId: string; 
    approved: boolean 
  }> {
    validateUUID(userId);
    validateUUID(activityId);
    
    const activity = await prisma.activities.findUnique({ 
      where: { id: activityId } 
    });

    if (!activity) throw createError(ERROR_ACTIVITY_NOT_FOUND, 404);
    if (activity.creatorId === userId) throw createError(ERROR_CREATOR_CANNOT_REGISTER, 403);
    if (activity.completedAt) throw createError(ERROR_ACTIVITY_COMPLETED_REGISTRATION, 400);

    const existing = await prisma.activityParticipants.findUnique({
      where: { activityId_userId: { activityId, userId } }
    });
    
    if (existing) throw createError(ERROR_ALREADY_REGISTERED, 400);

    return prisma.activityParticipants.create({
      data: { 
        activityId, 
        userId, 
        approved: !activity.private 
      }
    });
  },

  async cancelSubscription(userId: string, activityId: string): Promise<void> {
    validateUUID(userId);
    validateUUID(activityId);

    const participant = await prisma.activityParticipants.findUnique({
      where: { activityId_userId: { activityId, userId } }
    });

    if (!participant) throw createError(ERROR_ALREADY_REGISTERED, 400);
    if (participant.confirmedAt) throw createError(ERROR_CANNOT_CANCEL_CONFIRMED, 400);

    await prisma.activityParticipants.delete({
      where: { activityId_userId: { activityId, userId } }
    });
  },

  async concludeActivity(
    userId: string, 
    activityId: string
  ): Promise<{ xpGained: number }> {
    validateUUID(userId);
    validateUUID(activityId);
    
    const activity = await prisma.activities.findUnique({
      where: { id: activityId },
      include: { 
        ActivityParticipants: true 
      }
    });

    if (!activity) throw createError(ERROR_ACTIVITY_NOT_FOUND, 404);
    if (activity.creatorId !== userId) throw createError(ERROR_ONLY_CREATOR_CAN_COMPLETE, 403);

    const xpGained = activity.ActivityParticipants.filter(p => p.confirmedAt).length * 50;

    await prisma.$transaction([
      prisma.activities.update({
        where: { id: activityId },
        data: { completedAt: new Date() }
      }),
      prisma.users.update({
        where: { id: userId },
        data: { xp: { increment: xpGained } }
      })
    ]);

    return { xpGained };
  },

  async checkIn(
    userId: string, 
    activityId: string, 
    confirmationCode: string
  ): Promise<{ confirmedAt: Date }> {
    validateUUID(userId);
    validateUUID(activityId);
    
    const activity = await prisma.activities.findUnique({ 
      where: { id: activityId } 
    });

    if (!activity) throw createError(ERROR_ACTIVITY_NOT_FOUND, 404);
    if (activity.confirmationCode !== confirmationCode) throw createError(ERROR_INVALID_CONFIRMATION_CODE, 400);

    const participant = await prisma.activityParticipants.findUnique({
      where: { activityId_userId: { activityId, userId } }
    });

    if (!participant) throw createError(ERROR_CHECKIN_NOT_ALLOWED, 403);
    if (participant.confirmedAt) throw createError(ERROR_ALREADY_CONFIRMED, 400);

    const updatedParticipant = await prisma.activityParticipants.update({
      where: { activityId_userId: { activityId, userId } },
      data: { confirmedAt: new Date() }
    });

    await prisma.$transaction([
      prisma.users.update({
        where: { id: userId },
        data: { xp: { increment: 50 } }
      }),
      prisma.users.update({
        where: { id: activity.creatorId },
        data: { xp: { increment: 50 } }
      })
    ]);

    if (!updatedParticipant.confirmedAt) {
      throw createError('ConfirmedAt é nulo ou indefinido', 500);
    }
    return { confirmedAt: updatedParticipant.confirmedAt };
  },

  async getActivities(
    userId: string,
    query: { page?: number; pageSize?: number; typeId?: string }
  ): Promise<{
    activities: {
      id: string;
      title: string;
      description: string;
      type: string;
      scheduledDate: Date;
      image: string;
      private: boolean;
      creator: { id: string; name: string; avatar: string } | null;
      address: { latitude: number; longitude: number } | null;
    }[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> {
    validateUUID(userId);
    if (query.typeId) validateUUID(query.typeId);

    const page = query.page || 1;
    const pageSize = query.pageSize || 10;
    const where: Prisma.ActivitiesWhereInput = { 
      deletedAt: null, 
      completedAt: null 
    };

    if (query.typeId) {
      where.type = query.typeId;
    } else {
      const preferences = await prisma.preferences.findMany({ 
        where: { userId } 
      });
      where.type = { in: preferences.map(p => p.typeId) };
    }

    const [total, activities] = await Promise.all([
      prisma.activities.count({ where }),
      prisma.activities.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          Creator: { select: { id: true, name: true, avatar: true } },
          ActivityAddresses: true
        }
      })
    ]);

    return {
      activities: activities.map(activity => ({
        id: activity.id,
        title: activity.title,
        description: activity.description,
        type: activity.type,
        scheduledDate: activity.scheduledDate,
        image: activity.image,
        private: activity.private,
        creator: activity.Creator || null,
        address: activity.ActivityAddresses
          ? { latitude: activity.ActivityAddresses.latitude, longitude: activity.ActivityAddresses.longitude }
          : null
      })),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    };
  },

  async getActivityTypes(): Promise<{ id: string; name: string }[]> {
    return prisma.activityTypes.findMany({
      select: { id: true, name: true }
    });
  }
};