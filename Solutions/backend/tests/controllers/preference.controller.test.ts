import { Request, Response } from 'express';
import { preferencesController } from '../../src/modules/users/preferences/preferences.controller';
import { preferencesService } from '../../src/modules/users/preferences/preferences.service';

jest.mock('../../src/modules/users/preferences/preferences.service');

describe('Preferences Controller', () => {
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

  // -------------------- Get User Preferences --------------------
  describe('Get User Preferences', () => {
    it('Deve retornar as preferências do usuário quando autenticado', async () => {
      req.user = { id: 'user1', email: 'user1@example.com' };
      const mockPreferences = [
        { id: 'type1', name: 'Tipo 1', description: 'Descrição 1', image: 'image1.jpg' },
        { id: 'type2', name: 'Tipo 2', description: 'Descrição 2', image: 'image2.jpg' },
      ];
      (preferencesService.getUserPreferences as jest.Mock).mockResolvedValue(mockPreferences);

      await preferencesController.getUserPreferences(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockPreferences);
    });

    it('Deve retornar 400 se o usuário não estiver autenticado', async () => {
      req.user = undefined;

      await preferencesController.getUserPreferences(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: expect.any(String) });
    });
  });

  // -------------------- Define User Preferences --------------------
  describe('Define User Preferences', () => {
    it('Deve atualizar as preferências do usuário e retornar mensagem de sucesso', async () => {
      req.user = { id: 'user1', email: 'user1@example.com' };
      req.body = { typeIds: ['type1', 'type2'] };

      (preferencesService.defineUserPreferences as jest.Mock).mockResolvedValue(undefined);

      await preferencesController.defineUserPreferences(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({ message: expect.any(String) });
    });

    it('Deve retornar 400 se typeIds não for fornecido ou for inválido', async () => {
      req.user = { id: 'user1', email: 'user1@example.com' };
      req.body = { typeIds: null };

      await preferencesController.defineUserPreferences(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: expect.any(String) });
    });

    it('Deve retornar 400 se o usuário não estiver autenticado', async () => {
      req.user = undefined;

      await preferencesController.defineUserPreferences(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: expect.any(String) });
    });
  });
});