import dotenv from 'dotenv';
import { createError } from '@utils/error.util';
import { ERROR_ENV_VARIABLE_MISSING } from '@constants/errorMessages';

dotenv.config();

export function validateEnvVariables(): void {
  const requiredVariables = [
    'DATABASE_URL',
    'DB_USER',
    'DB_PASSWORD',
    'DB_NAME',
    'DB_HOST',
    'DB_PORT',
    'PORT',
    'BASE_URL_SWAGGER',
    'JWT_SECRET',
  ];

  const missingVariables = requiredVariables.filter((variable) => !process.env[variable]);

  if (missingVariables.length > 0) {
    throw createError(
      `${ERROR_ENV_VARIABLE_MISSING}: ${missingVariables.join(', ')}. Verifique o arquivo .env.`,
      500
    );
  }
}
