import { Express } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import protectedRoutes from './protected.routes';
import userRoutes from '../modules/users/user.routes';

export default function setupRoutes(app: Express): void {
  app.use('/auth', authRoutes);
  app.use('/protected', protectedRoutes);
  app.use('/users', userRoutes);
}
