import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import { AuthRequest, authMiddleware } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/roleMiddleware';
import User from '../models/User';

const router = Router();

router.use(authMiddleware, requireRole('admin'));

// GET all users
router.get('/users', async (req: AuthRequest, res: Response) => {
  const users = await User.find();
  res.json(users);
});

// CREATE user
router.post('/users', async (req: AuthRequest, res: Response) => {
  const { name, email, password, role, departmentId } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'User already exists' });

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, passwordHash, role, departmentId });
  res.json(user);
});

// UPDATE user
router.put('/users/:id', async (req: AuthRequest, res: Response) => {
  const { name, role, departmentId } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, role, departmentId },
    { new: true }
  );
  res.json(user);
});

// DELETE user
router.delete('/users/:id', async (req: AuthRequest, res: Response) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

export default router;
