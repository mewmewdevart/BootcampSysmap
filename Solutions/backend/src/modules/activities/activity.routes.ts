import { Router } from 'express';
import { activityController } from './activity.controller';
import { authMiddleware } from '@middlewares/auth.middleware';

const router = Router();

// Routes to manage activities and subscriptions
router.post('/new', authMiddleware, activityController.createActivity);
router.post('/:id/subscribe', authMiddleware, activityController.subscribeToActivity);
router.delete('/:id/unsubscribe', authMiddleware, activityController.cancelSubscription);
router.put('/:id/conclude', authMiddleware, activityController.concludeActivity);
router.put('/:id/check-in', authMiddleware, activityController.checkIn);

// Endpoints to get activities
router.get('/', authMiddleware, activityController.getActivities);
router.get('/types', authMiddleware, activityController.getActivityTypes);

export default router;
