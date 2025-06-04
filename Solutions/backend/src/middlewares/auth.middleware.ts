import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { createError } from '@utils/error.util';
import { ERROR_AUTH_REQUIRED, ERROR_INVALID_TOKEN } from '@constants/errorMessages';

interface TokenPayload extends JwtPayload {
  id: string;
  email: string;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    const error = createError(ERROR_AUTH_REQUIRED, 401);
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;

    if (!decoded || !decoded.id || !decoded.email) {
      throw createError(ERROR_INVALID_TOKEN, 403);
    }

    req.user = decoded;
    next();
  } catch {
    const mappedError = createError(ERROR_INVALID_TOKEN, 403);
    res.status(mappedError.statusCode).json({ error: mappedError.message });
    return;
  }
}
