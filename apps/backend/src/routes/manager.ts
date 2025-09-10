import { Router, Response } from 'express';
import { AuthRequest, authMiddleware } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/roleMiddleware';
import Task from '../models/Task';

const router = Router();

router.use(authMiddleware, requireRole('manager'));

// GET tasks for department
router.get('/tasks', async (req: AuthRequest, res: Response) => {
  const tasks = await Task.find({ departmentId: req.user?.departmentId });
  res.json(tasks);
});

// CREATE task
router.post('/tasks', async (req: AuthRequest, res: Response) => {
  const { title, description, assignedTo, dueDate } = req.body;

  const task = await Task.create({
    title,
    description,
    assignedTo,
    assignedBy: req.user?._id,
    departmentId: req.user?.departmentId,
    dueDate,
  });

  res.json(task);
});

export default router;
