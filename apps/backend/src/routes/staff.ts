import { Router, Response } from 'express';
import { AuthRequest, authMiddleware } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/roleMiddleware';
import Attendance from '../models/Attendance';
import Task from '../models/Task';

const router = Router();

router.use(authMiddleware, requireRole('staff'));

// Check-in
router.post('/attendance/checkin', async (req: AuthRequest, res: Response) => {
  const today = new Date().toISOString().split('T')[0];
  const exists = await Attendance.findOne({ userId: req.user?._id, date: today });
  if (exists) return res.status(400).json({ message: 'Already checked in today' });

  const attendance = await Attendance.create({
    userId: req.user?._id,
    checkIn: new Date(),
    date: today,
  });

  res.json(attendance);
});

// Check-out
router.post('/attendance/checkout', async (req: AuthRequest, res: Response) => {
  const today = new Date().toISOString().split('T')[0];
  const attendance = await Attendance.findOne({ userId: req.user?._id, date: today });
  if (!attendance) return res.status(400).json({ message: 'No check-in found' });

  attendance.checkOut = new Date();
  await attendance.save();

  res.json(attendance);
});

// Get tasks
router.get('/tasks', async (req, res) => {
  const tasks = await Task.find({ assignedTo: (req as any).user._id });
  res.json(tasks);
});

export default router;
