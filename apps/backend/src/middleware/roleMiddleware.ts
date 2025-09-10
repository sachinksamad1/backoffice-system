import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';

export function requireRole(...roles: ('admin' | 'manager' | 'staff')[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }

    next();
  };
}
