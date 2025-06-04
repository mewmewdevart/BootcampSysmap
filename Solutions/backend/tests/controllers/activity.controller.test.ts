// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { uploadFileToS3 } from '../../src/config/localstack';
import { Request, Response } from 'express';
import { activityController } from '../../src/modules/activities/activity.controller';
import { activityService } from '../../src/modules/activities/activity.service';
import { 
  SUCCESS_ACTIVITY_REGISTERED, 
  SUCCESS_ACTIVITY_UPDATED, 
  SUCCESS_ACTIVITY_DELETED, 
  SUCCESS_ACTIVITY_CONFIRMED, 
  SUCCESS_ACTIVITY_COMPLETED 
} from '../../src/constants/successMessages';
import { 
  ERROR_IMAGE_FORMAT, 
  ERROR_ONLY_CREATOR_CAN_EDIT, 
  ERROR_ACTIVITY_NOT_FOUND, 
  ERROR_INVALID_CONFIRMATION_CODE,
  ERROR_ALREADY_CONFIRMED,
} from '../../src/constants/errorMessages';
import { createError } from '@utils/error.util';

jest.mock('../../src/modules/activities/activity.service');
jest.mock('../../src/config/localstack', () => ({
  uploadFileToS3: jest.fn().mockResolvedValue('http://localhost/activities-images/test-image.jpg'),
  deleteFileFromS3: jest.fn().mockResolvedValue(undefined),
}));

describe('Controlador de Atividades', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    req = {};
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    res = { status: statusMock, json: jsonMock };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // -------------------- Create Activity --------------------
  describe('Create Activity', () => {
    it('Deve retornar 201 e os dados da atividade quando a criação for bem-sucedida', async () => {
      req.user = { id: 'user1', email: 'user1@example.com' };
      req.body = {
        title: 'Test Activity',
        description: 'Test description',
        type: '123e4567-e89b-12d3-a456-426614174000',
        scheduledDate: new Date().toISOString(),
        latitude: 10.123,
        longitude: 20.456,
      };
      req.file = {
        originalname: 'test.jpg',
        buffer: Buffer.from('file content'),
        mimetype: 'image/png',
      } as Express.Multer.File;
      
      const mockActivity = { id: 'activity1', title: 'Test Activity' };
      (activityService.createActivity as jest.Mock).mockResolvedValue({
        ...mockActivity,
        location: { latitude: 10.123, longitude: 20.456 },
      });
      
      await activityController.createActivity(req as Request, res as Response);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith({
        message: SUCCESS_ACTIVITY_REGISTERED,
        activity: expect.objectContaining({ id: 'activity1', title: 'Test Activity' }),
      });
    });

    it('Deve retornar 400 e erro de formato de imagem se a imagem não for PNG ou JPG', async () => {
      req.user = { id: 'user1', email: 'user1@example.com' };
      req.body = {
        title: 'Test Activity',
        description: 'Test description',
        type: '123e4567-e89b-12d3-a456-426614174000',
        scheduledDate: new Date().toISOString(),
        latitude: 10.123,
        longitude: 20.456,
      };
      req.file = {
        originalname: 'test.gif',
        buffer: Buffer.from('file content'),
        mimetype: 'image/gif',
      } as Express.Multer.File;
      
      await activityController.createActivity(req as Request, res as Response);
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: ERROR_IMAGE_FORMAT });
    });
  });

  // -------------------- Update Activity --------------------
  describe('Update Activity', () => {
    it('Deve retornar 200 e os dados da atividade atualizada quando a atualização for bem-sucedida', async () => {
      req.user = { id: 'user1', email: 'user1@example.com' };
      req.params = { id: 'activity1' };
      req.body = { title: 'Updated Title', latitude: 15.123, longitude: 25.456 };
      req.file = {
        originalname: 'new-test.jpg',
        buffer: Buffer.from('new file content'),
        mimetype: 'image/png',
      } as Express.Multer.File;
      
      const updatedActivity = { id: 'activity1', title: 'Updated Title', image: 'http://localhost/new-image.jpg' };
      (activityService.updateActivity as jest.Mock).mockResolvedValue({
        ...updatedActivity,
        location: { latitude: 15.123, longitude: 25.456 },
      });
      
      await activityController.updateActivity(req as Request, res as Response);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        message: SUCCESS_ACTIVITY_UPDATED,
        activity: expect.objectContaining({ id: 'activity1', title: 'Updated Title' }),
      });
    });
  });

  // -------------------- Update Activity - Another Creator --------------------
  describe('Update Activity - Another Creator', () => {
    it('Should return 403 when trying to edit an activity created by another user', async () => {
      req.user = { id: 'user2', email: 'user2@example.com' };
      req.params = { id: 'activity1' };
      req.body = { title: 'Tentativa de Edição' };

      (activityService.updateActivity as jest.Mock).mockRejectedValue(
        createError(ERROR_ONLY_CREATOR_CAN_EDIT, 403)
      );

      await activityController.updateActivity(req as Request, res as Response);
      expect(statusMock).toHaveBeenCalledWith(403);
      expect(jsonMock).toHaveBeenCalledWith({ error: ERROR_ONLY_CREATOR_CAN_EDIT });
    });
  });

  // -------------------- Delete Activity --------------------
  describe('Delete Activity', () => {
    it('Deve retornar 200 e uma mensagem de sucesso ao deletar', async () => {
      req.user = { id: 'user1', email: 'user1@example.com' };
      req.params = { id: 'activity1' };
      (activityService.deleteActivity as jest.Mock).mockResolvedValue(undefined);
      
      await activityController.deleteActivity(req as Request, res as Response);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({ message: SUCCESS_ACTIVITY_DELETED });
    });
  });

  // -------------------- View Confirmation Code --------------------
  describe('View Confirmation Code', () => {
    it('Deve retornar 200 e o código de confirmação quando o criador solicita', async () => {
      req.user = { id: 'user1', email: 'user1@example.com' };
      req.params = { id: 'activity1' };
      (activityService.getConfirmationCode as jest.Mock).mockResolvedValue('code123');
      
      await activityController.viewConfirmationCode(req as Request, res as Response);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({ confirmationCode: 'code123' });
    });
  });

  // -------------------- Restrições de Acesso --------------------
  describe('Restrições de Acesso', () => {
    it('Deve retornar 404 ao tentar realizar ações em uma atividade inexistente', async () => {
      req.user = { id: 'user1', email: 'user1@example.com' };
      req.params = { id: 'nonExistingActivity' };

      (activityService.getConfirmationCode as jest.Mock).mockRejectedValue(
        createError(ERROR_ACTIVITY_NOT_FOUND, 404)
      );

      await activityController.viewConfirmationCode(req as Request, res as Response);
      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ error: ERROR_ACTIVITY_NOT_FOUND });
    });
  });

  // -------------------- Subscribe to Activity --------------------
  describe('Subscribe to Activity', () => {
    it('Deve retornar 200 e os dados do participante quando a inscrição for bem-sucedida', async () => {
      req.user = { id: 'user1', email: 'user1@example.com' };
      req.params = { id: 'activity1' };
      const participantData = { activityId: 'activity1', userId: 'user1', approved: true };
      (activityService.subscribeToActivity as jest.Mock).mockResolvedValue(participantData);
      
      await activityController.subscribeToActivity(req as Request, res as Response);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(participantData);
    });
  });

  // -------------------- Cancel Subscription --------------------
  describe('Cancel Subscription', () => {
    it('Deve retornar 200 e uma mensagem de sucesso ao cancelar a inscrição', async () => {
      req.user = { id: 'user1', email: 'user1@example.com' };
      req.params = { id: 'activity1' };
      (activityService.cancelSubscription as jest.Mock).mockResolvedValue(undefined);
      
      await activityController.cancelSubscription(req as Request, res as Response);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({ message: expect.any(String) });
    });
  });

  // -------------------- Conclude Activity --------------------
  describe('Conclude Activity', () => {
    it('Deve retornar 200 e uma mensagem de sucesso ao concluir atividade sem XP distribuído', async () => {
      req.user = { id: 'user1', email: 'user1@example.com' };
      req.params = { id: 'activity1' };
      //  simulate that the activity was concluded without XP
      (activityService.concludeActivity as jest.Mock).mockResolvedValue({ xpGained: 0 });
      
      await activityController.concludeActivity(req as Request, res as Response);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({ message: SUCCESS_ACTIVITY_COMPLETED, xpGained: 0 });
    });
  });

  // -------------------- Conclude Activity - winning xp --------------------
  describe('Conclusão da Atividade - Ganho de XP', () => {
    it('Deve concluir a atividade e distribuir XP ao criador', async () => {
      req.user = { id: 'user1', email: 'user1@example.com' };
      req.params = { id: 'activity1' };

      (activityService.concludeActivity as jest.Mock).mockResolvedValue({
        xpGained: 50,
      });

      await activityController.concludeActivity(req as Request, res as Response);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        message: SUCCESS_ACTIVITY_COMPLETED,
        xpGained: 50,
      });
    });
  });

  // -------------------- Check-In --------------------
  describe('Check-In', () => {
    it('Deve retornar 200 e uma mensagem de confirmação ao realizar o check-in com sucesso', async () => {
      req.user = { id: 'user1', email: 'user1@example.com' };
      req.params = { id: 'activity1' };
      req.body = { confirmationCode: 'ABC123' };
      (activityService.checkIn as jest.Mock).mockResolvedValue({ confirmedAt: new Date() });
      
      await activityController.checkIn(req as Request, res as Response);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({ message: SUCCESS_ACTIVITY_CONFIRMED });
    });
  });

  // -------------------- Check-In - wrong code --------------------
  describe('Check-In - Código Errado', () => {
    it('Deve retornar 400 se o código de confirmação estiver incorreto', async () => {
      req.user = { id: 'user1', email: 'user1@example.com' };
      req.params = { id: 'activity1' };
      req.body = { confirmationCode: 'WrongCode' };

      (activityService.checkIn as jest.Mock).mockRejectedValue(
        createError(ERROR_INVALID_CONFIRMATION_CODE, 400)
      );

      await activityController.checkIn(req as Request, res as Response);
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: ERROR_INVALID_CONFIRMATION_CODE });
    });
  });

  // -------------------- Check-In - Mant times --------------------
  describe('Check-In - Múltiplas Vezes', () => {
    it('Deve retornar 409 se o usuário tentar realizar o check-in mais de uma vez', async () => {
      req.user = { id: 'user1', email: 'user1@example.com' };
      req.params = { id: 'activity1' };
      req.body = { confirmationCode: 'ABC123' };

      (activityService.checkIn as jest.Mock).mockRejectedValue(
        createError(ERROR_ALREADY_CONFIRMED, 409)
      );

      await activityController.checkIn(req as Request, res as Response);
      expect(statusMock).toHaveBeenCalledWith(409);
      expect(jsonMock).toHaveBeenCalledWith({ error: ERROR_ALREADY_CONFIRMED });
    });
  });

  // -------------------- Get Activities --------------------
  describe('Get Activities', () => {
    it('Deve retornar 200 e uma lista de atividades com paginação', async () => {
      req.user = { id: 'user1', email: 'user1@example.com' };
      req.query = { page: '1', pageSize: '10' };
      const activitiesData = {
        activities: [{ id: 'activity1', title: 'Test Activity' }],
        total: 1,
        page: 1,
        pageSize: 10,
      };
      (activityService.getActivities as jest.Mock).mockResolvedValue(activitiesData);
      
      await activityController.getActivities(req as Request, res as Response);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(activitiesData);
    });
  });

  // -------------------- Get Activity Types --------------------
  describe('Get Activity Types', () => {
    it('Deve retornar 200 e a lista de tipos de atividades', async () => {
      req.user = { id: 'user1', email: 'user1@example.com' };
  
      const types = [
        { id: 'type1', name: 'Outdoor' },
        { id: 'type2', name: 'Indoor' },
      ];
      (activityService.getActivityTypes as jest.Mock).mockResolvedValue(types);
  
      await activityController.getActivityTypes(req as Request, res as Response);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(types);
    });
  });
});
