import { activityService } from '../../src/modules/activities/activity.service';
import { createError } from '@utils/error.util';

jest.mock('@config/database', () => {
  const mockPrisma = {
    activities: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      count: jest.fn(),
      findMany: jest.fn(),
    },
    activityParticipants: {
      findUnique: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    },
    preferences: {
      findMany: jest.fn(),
    },
    users: {
      update: jest.fn(),
    },
    activityTypes: {
      findMany: jest.fn(),
    },
    $transaction: jest.fn(),
  };
  return { prisma: mockPrisma };
});

const { prisma } = jest.requireMock('@config/database');

describe('Activity Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // -------------------- createActivity --------------------
  describe('createActivity', () => {
    it('deve criar uma atividade com sucesso', async () => {
      const userId = '550e8400-e29b-41d4-a716-446655440000';// Invalid UUID
      const activityData = {
        title: 'Test Activity',
        description: 'Test description',
        type: '550e8400-e29b-41d4-a716-446655440001',// Invalid UUID
        scheduledDate: new Date().toISOString(),
        image: 'http://localhost/activities-images/test-image.jpg',
        latitude: 10.123,
        longitude: 20.456,
      };

      prisma.$transaction.mockResolvedValueOnce([
        {
          id: '550e8400-e29b-41d4-a716-446655440002',// Invalid UUID
          ...activityData,
          ActivityAddresses: { latitude: activityData.latitude, longitude: activityData.longitude },
        },
      ]);

      const activity = await activityService.createActivity(userId, activityData);
      expect(activity).toHaveProperty('id');
      expect(activity.title).toBe(activityData.title);
      expect(activity.address).toEqual({
        latitude: activityData.latitude,
        longitude: activityData.longitude,
      });
    });
  });

  // -------------------- updateActivity --------------------
  describe('updateActivity', () => {
    it('deve atualizar a atividade com sucesso', async () => {
      const userId = '550e8400-e29b-41d4-a716-446655440000';// Invalid UUID
      const activityId = '550e8400-e29b-41d4-a716-446655440003';// Invalid UUID
      const updateData = {
        title: 'Updated Title',
        latitude: 15.123,
        longitude: 25.456,
      };

      (prisma.activities.findUnique as jest.Mock).mockResolvedValueOnce({
        id: activityId,
        creatorId: userId,
        completedAt: null,
        ActivityAddresses: { latitude: 10.123, longitude: 20.456 },
      });

      prisma.activities.update.mockResolvedValueOnce({
        id: activityId,
        ...updateData,
        ActivityAddresses: { latitude: updateData.latitude, longitude: updateData.longitude },
      });

      const result = await activityService.updateActivity(userId, activityId, updateData);
      expect(result.id).toBe(activityId);
      expect(result.title).toBe(updateData.title);
      expect(result.ActivityAddresses).toEqual({
        latitude: updateData.latitude,
        longitude: updateData.longitude,
      });
    });

    it('deve lançar erro se o usuário não for o criador da atividade', async () => {
      const userId = '550e8400-e29b-41d4-a716-446655440000';// Invalid UUID
      const activityId = '550e8400-e29b-41d4-a716-446655440003';// Invalid UUID
      const updateData = { title: 'New Title' };

      prisma.activities.findUnique.mockResolvedValueOnce({
        id: activityId,
        creatorId: '550e8400-e29b-41d4-a716-446655440004', // Outro usuário
        completedAt: null,
      });

      await expect(
        activityService.updateActivity(userId, activityId, updateData)
      ).rejects.toEqual(createError('E15: Apenas o criador da atividade pode editá-la.', 403));
    });
  });

  // -------------------- deleteActivity --------------------
  describe('deleteActivity', () => {
    it('deve deletar a atividade com sucesso', async () => {
      const userId = '550e8400-e29b-41d4-a716-446655440000';// Invalid UUID
      const activityId = '550e8400-e29b-41d4-a716-446655440003';// Invalid UUID

      prisma.activities.findUnique.mockResolvedValueOnce({
        id: activityId,
        creatorId: userId,
      });

      prisma.activities.update.mockResolvedValueOnce({});

      const result = await activityService.deleteActivity(userId, activityId);
      expect(result).toBeUndefined();
    });
  });

  // -------------------- getConfirmationCode --------------------
  describe('getConfirmationCode', () => {
    it('deve retornar um código de confirmação', async () => {
      const userId = '550e8400-e29b-41d4-a716-446655440000';// Invalid UUID
      const activityId = '550e8400-e29b-41d4-a716-446655440003';// Invalid UUID

      prisma.activities.findUnique.mockResolvedValueOnce({
        id: activityId,
        creatorId: userId,
        confirmationCode: 'ABC123',
      });

      const code = await activityService.getConfirmationCode(userId, activityId);
      expect(typeof code).toBe('string');
      expect(code.length).toBeGreaterThan(0);
    });
  });

  // -------------------- subscribeToActivity --------------------
  describe('subscribeToActivity', () => {
    it('deve retornar os dados do participante se a inscrição ocorrer com sucesso', async () => {
      const userId = '550e8400-e29b-41d4-a716-446655440000';// Invalid UUID
      const activityId = '550e8400-e29b-41d4-a716-446655440003';// Invalid UUID

      prisma.activities.findUnique.mockResolvedValueOnce({
        id: activityId,
        creatorId: '550e8400-e29b-41d4-a716-446655440001', // Outro usuário
        completedAt: null,
      });

      prisma.activityParticipants.findUnique.mockResolvedValueOnce(null);

      const participantData = {
        activityId: activityId,
        userId: userId,
        approved: true,
      };

      prisma.activityParticipants.create.mockResolvedValueOnce(participantData);

      const result = await activityService.subscribeToActivity(userId, activityId);
      expect(result).toEqual(expect.objectContaining(participantData));
    });
  });

  // -------------------- cancelSubscription --------------------
  describe('cancelSubscription', () => {
    it('deve cancelar a inscrição com sucesso', async () => {
      const userId = '550e8400-e29b-41d4-a716-446655440000';// Invalid UUID
      const activityId = '550e8400-e29b-41d4-a716-446655440003';// Invalid UUID

      prisma.activityParticipants.findUnique.mockResolvedValueOnce({
        activityId,
        userId,
        confirmedAt: null,
      });

      prisma.activityParticipants.delete.mockResolvedValueOnce({});

      const result = await activityService.cancelSubscription(userId, activityId);
      expect(result).toBeUndefined();
    });
  });

  // -------------------- concludeActivity --------------------
  describe('concludeActivity', () => {
    it('deve concluir a atividade e retornar os XP ganhos', async () => {
      const userId = '550e8400-e29b-41d4-a716-446655440000';// Invalid UUID
      const activityId = '550e8400-e29b-41d4-a716-446655440003';// Invalid UUID

      prisma.activities.findUnique.mockResolvedValueOnce({
        id: activityId,
        creatorId: userId,
        completedAt: null,
        ActivityParticipants: [{ confirmedAt: new Date() }],
      });

      prisma.$transaction.mockResolvedValueOnce([]);

      const expectedResult = { xpGained: 50 };
      const result = await activityService.concludeActivity(userId, activityId);
      expect(result).toEqual(expectedResult);
    });
  });

  // -------------------- checkIn --------------------
  describe('checkIn', () => {
    it('deve realizar o check-in com sucesso', async () => {
      const userId = '550e8400-e29b-41d4-a716-446655440000';// Invalid UUID
      const activityId = '550e8400-e29b-41d4-a716-446655440003';// Invalid UUID
      const confirmationCode = 'ABC123';

      prisma.activities.findUnique.mockResolvedValueOnce({
        id: activityId,
        confirmationCode,
      });

      prisma.activityParticipants.findUnique.mockResolvedValueOnce({
        activityId,
        userId,
        confirmedAt: null,
      });

      prisma.activityParticipants.update.mockResolvedValueOnce({
        activityId,
        userId,
        confirmedAt: new Date(),
      });

      const result = await activityService.checkIn(userId, activityId, confirmationCode);
      expect(result).toHaveProperty('confirmedAt');
      expect(result.confirmedAt).toBeInstanceOf(Date);
    });

    it('deve lançar erro se o código de confirmação for inválido', async () => {
      const userId = '550e8400-e29b-41d4-a716-446655440000';// Invalid UUID
      const activityId = '550e8400-e29b-41d4-a716-446655440003';// Invalid UUID
      const invalidCode = 'WrongCode';

      prisma.activities.findUnique.mockResolvedValueOnce({
        id: activityId,
        confirmationCode: 'ABC123',
      });

      await expect(
        activityService.checkIn(userId, activityId, invalidCode)
      ).rejects.toEqual(createError('E11: Código de confirmação incorreto.', 400));
    });
  });

  // -------------------- getActivities --------------------
  describe('getActivities', () => {
    it('deve retornar uma lista paginada de atividades', async () => {
      const userId = '550e8400-e29b-41d4-a716-446655440000';// Invalid UUID
      const queryParams = { page: 1, pageSize: 10, typeId: '550e8400-e29b-41d4-a716-446655440001' };// Invalid UUID
      const activitiesResult = {
        activities: [
          {
            id: '550e8400-e29b-41d4-a716-446655440003',
            title: 'Test Activity',
            description: 'Description',
            type: 'Type',
            scheduledDate: new Date('2025-03-31T00:48:42.470Z'),
            image: 'http://example.com/image.jpg',
            private: false,
            creator: { id: userId, name: 'Test User', avatar: 'http://example.com/avatar.jpg' },
            address: { latitude: 10.123, longitude: 20.456 },
          },
        ],
        total: 1,
        page: 1,
        pageSize: 10,
        totalPages: 1,
      };

      prisma.activities.findMany.mockResolvedValueOnce([
        {
          id: '550e8400-e29b-41d4-a716-446655440003',
          title: 'Test Activity',
          description: 'Description',
          type: 'Type',
          scheduledDate: new Date('2025-03-31T00:48:42.470Z'),
          image: 'http://example.com/image.jpg',
          private: false,
          Creator: { id: userId, name: 'Test User', avatar: 'http://example.com/avatar.jpg' },
          ActivityAddresses: { latitude: 10.123, longitude: 20.456 },
        },
      ]);
      prisma.activities.count.mockResolvedValueOnce(1);

      const result = await activityService.getActivities(userId, queryParams);
      expect(result).toEqual(activitiesResult);
    });
  });

  // -------------------- getActivityTypes --------------------
  describe('getActivityTypes', () => {
    it('deve retornar um array de tipos de atividades', async () => {
      const types = [
        { id: '550e8400-e29b-41d4-a716-446655440001', name: 'Type 1' },
        { id: '550e8400-e29b-41d4-a716-446655440002', name: 'Type 2' },
      ];

      prisma.activityTypes.findMany.mockResolvedValueOnce(types);

      const result = await activityService.getActivityTypes();
      expect(result).toEqual(types);
    });
  });
});
