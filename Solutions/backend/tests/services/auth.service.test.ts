import { authService } from '../../src/modules/auth/auth.service';
import { createError } from '@utils/error.util';
import { ERROR_REQUIRED_FIELDS, ERROR_USER_ALREADY_EXISTS, ERROR_INCORRECT_PASSWORD } from '@constants/errorMessages';

describe('Auth Service', () => {
  // Before each test, you can set up any necessary mocks or initial data
  // For example, if you are using a database, you might want to clear it
  // or set up a test user.  
  beforeEach(async () => {
    // Exemple: await clearTestDatabase();
  });

  // -------------------- registerUser --------------------
  describe('registerUser', () => {
    it('Deve registrar um usuário com sucesso', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        cpf: '12345678901',
        password: 'Senha@123',
        confirmPassword: 'Senha@123',
      };

      const expectedUser = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        cpf: '12345678901',
      };

      const result = await authService.registerUser(userData);
      expect(result).toEqual(expectedUser);
    });

    it('Deve lançar erro se os campos obrigatórios estiverem ausentes', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'Senha@123',
      };

      await expect(authService.registerUser(userData))
        .rejects.toEqual(createError(ERROR_REQUIRED_FIELDS, 400));
    });

    it('Deve lançar erro se o usuário já existir', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        cpf: '12345678901',
        password: 'Senha@123',
        confirmPassword: 'Senha@123',
      };

      await authService.registerUser(userData);
      await expect(authService.registerUser(userData))
        .rejects.toEqual(createError(ERROR_USER_ALREADY_EXISTS, 409));
    });
  });

  // -------------------- loginUser --------------------
  describe('loginUser', () => {
    it('Deve retornar token e dados do usuário em um login bem-sucedido', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'Senha@123',
      };

      const expectedResult = {
        token: 'jwt-token',
        user: {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
        },
      };

      await authService.registerUser({
        name: 'Test User',
        email: 'test@example.com',
        cpf: '12345678901',
        password: 'Senha@123',
        confirmPassword: 'Senha@123',
      });

      const result = await authService.loginUser(credentials);
      expect(result).toEqual(expectedResult);
    });

    it('Deve lançar erro se a senha estiver incorreta', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'WrongPassword',
      };

      await expect(authService.loginUser(credentials))
        .rejects.toEqual(createError(ERROR_INCORRECT_PASSWORD, 401));
    });

    it('Deve lançar erro se os campos obrigatórios não forem fornecidos no login', async () => {
      const credentials = {
        email: 'test@example.com',
      };

      await expect(authService.loginUser(credentials))
        .rejects.toEqual(createError(ERROR_REQUIRED_FIELDS, 400));
    });
  });
});
