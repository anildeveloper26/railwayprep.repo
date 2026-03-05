import { Request, Response } from "express";
import { PlannerTask } from "../models/PlannerTask.model";
import { AppError, sendSuccess } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const getMyTasks = asyncHandler(async (req: Request, res: Response) => {
  const { date, isCompleted } = req.query as Record<string, string>;
  const filter: Record<string, unknown> = { userId: req.user!.userId };

  if (date) {
    const d = new Date(date);
    const start = new Date(d.setHours(0, 0, 0, 0));
    const end = new Date(d.setHours(23, 59, 59, 999));
    filter.targetDate = { $gte: start, $lte: end };
  }
  if (isCompleted !== undefined) filter.isCompleted = isCompleted === "true";

  const tasks = await PlannerTask.find(filter).sort({ priority: 1, targetDate: 1 });
  sendSuccess(res, { tasks });
});

export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const task = await PlannerTask.create({ ...req.body, userId: req.user!.userId });
  sendSuccess(res, { task }, "Task created", 201);
});

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const task = await PlannerTask.findOne({ _id: req.params.id, userId: req.user!.userId });
  if (!task) throw new AppError("Task not found", 404);

  Object.assign(task, req.body);
  if (req.body.isCompleted && !task.completedAt) {
    task.completedAt = new Date();
  }
  await task.save();

  sendSuccess(res, { task }, "Task updated");
});

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const task = await PlannerTask.findOneAndDelete({ _id: req.params.id, userId: req.user!.userId });
  if (!task) throw new AppError("Task not found", 404);
  sendSuccess(res, null, "Task deleted");
});

export const getPlannerStats = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [total, completed, thisWeek] = await Promise.all([
    PlannerTask.countDocuments({ userId }),
    PlannerTask.countDocuments({ userId, isCompleted: true }),
    PlannerTask.countDocuments({ userId, targetDate: { $gte: weekAgo } }),
  ]);

  sendSuccess(res, {
    total,
    completed,
    pending: total - completed,
    completionRate: total > 0 ? parseFloat(((completed / total) * 100).toFixed(1)) : 0,
    thisWeek,
  });
});
