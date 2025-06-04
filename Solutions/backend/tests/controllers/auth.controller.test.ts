import { Request, Response, NextFunction } from 'express';
import { authController } from '../../src/modules/auth/auth.controller';
import { authService } from '../../src/modules/auth/auth.service';
import { createError } from '@utils/error.util';
import {
  SUCCESS_USER_REGISTERED,
  SUCCESS_USER_LOGGED_IN,
} from '@constants/successMessages';

jest.mock('../../src/modules/auth/auth.service');

describe('Controlador de Autenticação', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    req = {};
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    res = { status: statusMock, json: jsonMock };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ------------------------ Registro ------------------------
  describe('Registro', () => {
    it('Deve retornar 201 e mensagem de sucesso ao registrar o usuário com sucesso', async () => {
      const usuario = { id: '1', name: 'Usuário Teste', email: 'teste@example.com' };
      (authService.registerUser as jest.Mock).mockResolvedValue(usuario);
      
      req.body = {
        name: 'Usuário Teste',
        email: 'teste@example.com',
        cpf: '12345678901',
        password: 'Senha@123'
      };

      await authController.register(req as Request, res as Response, next);
      
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith({
        message: SUCCESS_USER_REGISTERED,
        user: usuario,
      });
    });

    it('Deve retornar 400 e mensagem de erro se ocorrer erro no registro', async () => {
      (authService.registerUser as jest.Mock).mockRejectedValue(
        createError('E1: Erro no registro', 400)
      );
      req.body = {
        name: 'Usuário Teste',
        email: 'teste@example.com',
        cpf: '12345678901',
        password: 'Senha@123'
      };

      await authController.register(req as Request, res as Response, next);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        error: 'E1: Erro no registro',
        details: undefined,
      });
    });

    it('Deve retornar 400 e mensagem de erro se os campos obrigatórios estiverem ausentes', async () => {
      (authService.registerUser as jest.Mock).mockRejectedValue(
        createError('E1: Informe os campos obrigatórios corretamente.', 400)
      );
      req.body = {
        name: 'Usuário Teste',
        email: 'teste@example.com',
        password: 'Senha@123' // missing the cpf field
      };

      await authController.register(req as Request, res as Response, next);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        error: 'E1: Informe os campos obrigatórios corretamente.',
        details: undefined,
      });
    });

    it('Deve retornar 400 se forem enviados campos extras não permitidos', async () => {
      const errorMessage = 'E1: Apenas os campos de nome, e-mail, cpf e senha são permitidos.';
      req.body = {
        name: 'Usuário Teste',
        email: 'teste@example.com',
        cpf: '12345678901',
        password: 'Senha@123',
        campoExtra: 'valorInvalido'
      };

      (authService.registerUser as jest.Mock).mockRejectedValue(
        createError(errorMessage, 400)
      );

      await authController.register(req as Request, res as Response, next);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        error: errorMessage,
        details: undefined,
      });
    });
  });

  // ------------------------ Login ------------------------
  describe('Login', () => {
    it('Deve retornar 200 e o token ao fazer login com sucesso', async () => {
      const result = {
        token: 'abc123',
        user: { id: '1', name: 'Usuário Teste', email: 'teste@example.com' }
      };
      (authService.loginUser as jest.Mock).mockResolvedValue(result);
      req.body = { email: 'teste@example.com', password: 'Senha@123' };

      await authController.login(req as Request, res as Response, next);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        token: result.token,
        user: result.user,
        message: SUCCESS_USER_LOGGED_IN,
      });
    });
    
    it('Deve retornar 400 e mensagem de erro se ocorrer erro no login', async () => {
      (authService.loginUser as jest.Mock).mockRejectedValue(
        createError('E1: Informe os campos obrigatórios corretamente.', 400)
      );
      req.body = { email: 'teste@example.com', password: 'senhaErrada' };

      await authController.login(req as Request, res as Response, next);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        error: 'E1: Informe os campos obrigatórios corretamente.',
        details: undefined,
      });
    });

    it('Deve retornar 400 se os campos de email ou senha não forem fornecidos', async () => {
      (authService.loginUser as jest.Mock).mockRejectedValue(
        createError('E1: Informe os campos obrigatórios corretamente.', 400)
      );
      req.body = { email: 'teste@example.com' }; // missing password field

      await authController.login(req as Request, res as Response, next);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        error: 'E1: Informe os campos obrigatórios corretamente.',
        details: undefined,
      });
    });

    it('Deve retornar 403 se a conta estiver desativada', async () => {
      (authService.loginUser as jest.Mock).mockRejectedValue(
        createError('E6: Esta conta foi desativada e não pode ser utilizada.', 403)
      );
      req.body = { email: 'teste@example.com', password: 'Senha@123' };

      await authController.login(req as Request, res as Response, next);

      expect(statusMock).toHaveBeenCalledWith(403);
      expect(jsonMock).toHaveBeenCalledWith({
        error: 'E6: Esta conta foi desativada e não pode ser utilizada.',
        details: undefined,
      });
    });

    it('Deve retornar 400 se forem enviados campos extras não permitidos no login', async () => {
      const errorMessage = 'E1: Apenas os campos de e-mail e senha são permitidos.';
      req.body = {
        email: 'teste@example.com',
        password: 'Senha@123',
        campoExtra: 'valorInvalido'
      };
    
      (authService.loginUser as jest.Mock).mockRejectedValue(
        createError(errorMessage, 400)
      );
    
      await authController.login(req as Request, res as Response, next);
    
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        error: errorMessage,
        details: undefined,
      });
    });
  });
});
