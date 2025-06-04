import { Router } from 'express';
import { userController } from './user.controller';
import { authMiddleware } from '@middlewares/auth.middleware';
import { preferencesController } from './preferences/preferences.controller';
import upload from '@config/multer';

const router = Router();

router.get('/', authMiddleware, userController.getAllUsers);
router.get('/:id', authMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deactivateUser);
router.post('/:id/experience', authMiddleware, userController.addExperience);
router.post('/:id/achievements', authMiddleware, userController.addAchievement);

router.get('/preferences', authMiddleware, preferencesController.getUserPreferences);
router.post('/preferences/define', authMiddleware, preferencesController.defineUserPreferences);

router.put('/avatar', authMiddleware, upload.single('avatar'), userController.updateAvatar);

export default router;
