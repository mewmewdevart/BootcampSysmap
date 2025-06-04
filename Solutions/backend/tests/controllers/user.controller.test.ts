import { Request, Response, NextFunction } from 'express';
import { userController } from '../../src/modules/users/user.controller';
import { userService } from '../../src/modules/users/user.service';
import { createError } from '@utils/error.util';

jest.mock('../../src/modules/users/user.service');

describe('User Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    req = { body: {}, params: {} };
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    res = { status: statusMock, json: jsonMock };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // --------------------  Get all users --------------------
  describe('getUserById', () => {
    it('Deve retornar os dados do usuário com conquistas', async () => {
      req.params = { id: 'user1' };
      const mockUser = {
        id: 'user1',
        name: 'Test User',
        email: 'test@example.com',
        cpf: '12345678901',
        avatar: 'avatar.jpg',
        xp: 0,
        level: 1,
        UserAchievements: [],
      };
      (userService.getUserById as jest.Mock).mockResolvedValue(mockUser);

      await userController.getUserById(req as Request, res as Response, next);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'user1',
          name: 'Test User',
          email: 'test@example.com',
        })
      );
    });
  });

  // -------------------- LIst users --------------------
  describe('getAllUsers', () => {
    it('Deve retornar uma lista paginada de usuários', async () => {
      const usersData = { users: [{ id: 'user1' }], total: 1, page: 1, pageSize: 10 };
      (userService.getAllUsers as jest.Mock).mockResolvedValue(usersData);
      req.query = { page: '1', pageSize: '10' };

      await userController.getAllUsers(req as Request, res as Response, next);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(usersData);
    });
  });

  // -------------------- Update user data --------------------
  describe('updateUser', () => {
    it('Deve retornar os dados do usuário atualizados', async () => {
      req.params = { id: 'user1' };
      req.body = { name: 'Updated Name' };
      const updatedUser = { id: 'user1', name: 'Updated Name' };
      (userService.updateUser as jest.Mock).mockResolvedValue(updatedUser);
      
      await userController.updateUser(req as Request, res as Response, next);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(updatedUser);
    });

    it('Deve retornar erro ao tentar alterar o CPF', async () => {
      req.params = { id: 'user1' };
      req.body = { cpf: '98765432100' };
      const errorMessage = 'E1: Não é permitido editar o CPF.';
      (userService.updateUser as jest.Mock).mockRejectedValue(
        createError(errorMessage, 400)
      );

      await userController.updateUser(req as Request, res as Response, next);
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: errorMessage });
    });

    it('Deve retornar erro ao faltar campos obrigatórios', async () => {
      req.params = { id: 'user1' };
      req.body = {}; // None of the required fields
      const errorMessage = 'E1: Campos obrigatórios não fornecidos.';
      (userService.updateUser as jest.Mock).mockRejectedValue(
        createError(errorMessage, 400)
      );

      await userController.updateUser(req as Request, res as Response, next);
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  // -------------------- Desactived user --------------------
  describe('deactivateUser', () => {
    it('Deve retornar uma mensagem de sucesso ao desativar a conta', async () => {
      req.params = { id: 'user1' };
      (userService.deactivateUser as jest.Mock).mockResolvedValue(undefined);

      await userController.deactivateUser(req as Request, res as Response, next);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({ message: expect.any(String) });
    });
  });

  // -------------------- Add experience to user --------------------
  describe('addExperience', () => {
    it('Deve retornar os dados do usuário atualizados após adicionar XP', async () => {
      req.params = { id: 'user1' };
      req.body = { xp: 50 };
      const updatedUser = { id: 'user1', xp: 50 };
      (userService.addExperience as jest.Mock).mockResolvedValue(updatedUser);

      await userController.addExperience(req as Request, res as Response, next);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(updatedUser);
    });
  });

  // -------------------- Add achievement to user --------------------
  describe('addAchievement', () => {
    it('Deve retornar mensagem de sucesso ao adicionar conquista', async () => {
      req.params = { id: 'user1' };
      req.body = { achievementId: 'achieve1' };
      (userService.addAchievement as jest.Mock).mockResolvedValue(undefined);

      await userController.addAchievement(req as Request, res as Response, next);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith({ message: expect.any(String) });
    });
  });

  // -------------------- Atualizar avatar do usuário --------------------
  describe('updateAvatar', () => {
    it('Deve retornar a nova URL do avatar ao atualizar', async () => {
      req.user = { id: 'user1', email: 'user1@example.com' };
      const file = {
        originalname: 'avatar.jpg',
        buffer: Buffer.from('file content'),
        mimetype: 'image/png',
      } as Express.Multer.File;
      req.file = file;
      const avatarUrl = 'http://localhost/user-avatars/user1/avatar.jpg';
      (userService.updateAvatar as jest.Mock).mockResolvedValue(avatarUrl);

      await userController.updateAvatar(req as Request, res as Response, next);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({ avatar: avatarUrl });
    });
  });

  // -------------------- Blocked actions for deactivated user --------------------
  describe('Blocked actions for deactivated user', () => {
    const errorMessage = 'E6: Esta conta foi desativada e não pode ser utilizada.';

    it('Deve retornar 403 ao tentar atualizar usuário com conta desativada', async () => {
      req.params = { id: 'user1' };
      req.body = { name: 'Updated Name' };
      (userService.updateUser as jest.Mock).mockRejectedValue(
        createError(errorMessage, 403)
      );

      await userController.updateUser(req as Request, res as Response, next);
      expect(statusMock).toHaveBeenCalledWith(403);
      expect(jsonMock).toHaveBeenCalledWith({ error: errorMessage });
    });

    it('Deve retornar 403 ao tentar adicionar experiência com conta desativada', async () => {
      req.params = { id: 'user1' };
      req.body = { xp: 50 };
      (userService.addExperience as jest.Mock).mockRejectedValue(
        createError(errorMessage, 403)
      );

      await userController.addExperience(req as Request, res as Response, next);
      expect(statusMock).toHaveBeenCalledWith(403);
      expect(jsonMock).toHaveBeenCalledWith({ error: errorMessage });
    });

    it('Deve retornar 403 ao tentar adicionar conquista com conta desativada', async () => {
      req.params = { id: 'user1' };
      req.body = { achievementId: 'achieve1' };
      (userService.addAchievement as jest.Mock).mockRejectedValue(
        createError(errorMessage, 403)
      );

      await userController.addAchievement(req as Request, res as Response, next);
      expect(statusMock).toHaveBeenCalledWith(403);
      expect(jsonMock).toHaveBeenCalledWith({ error: errorMessage });
    });

    it('Deve retornar 403 ao tentar atualizar avatar com conta desativada', async () => {
      req.user = { id: 'user1', email: 'user1@example.com' };
      const file = {
        originalname: 'avatar.jpg',
        buffer: Buffer.from('file content'),
        mimetype: 'image/png',
      } as Express.Multer.File;
      req.file = file;
      (userService.updateAvatar as jest.Mock).mockRejectedValue(
        createError(errorMessage, 403)
      );

      await userController.updateAvatar(req as Request, res as Response, next);
      expect(statusMock).toHaveBeenCalledWith(403);
      expect(jsonMock).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
