import express, { Request, Response } from 'express';
import { authenticateUser } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateUser, (req: Request, res: Response) => {
  return res.json({ message: 'Hello from protected route' });
});

export default router;
