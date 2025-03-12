import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';

export const authenticateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = data.user;
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
