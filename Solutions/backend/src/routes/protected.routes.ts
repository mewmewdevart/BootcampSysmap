import { Router, Request, Response } from 'express';
import { authMiddleware } from '@middlewares/auth.middleware';
import { SUCCESS_ACCESS_GRANTED } from '@constants/successMessages';

const router = Router();

router.get('/', authMiddleware, (req: Request, res: Response) => {
  res.status(200).json({ message: SUCCESS_ACCESS_GRANTED, user: req.user });
});

export default router;
