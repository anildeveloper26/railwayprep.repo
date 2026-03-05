import { Request, Response } from "express";
import { ExamNotification } from "../models/ExamNotification.model";
import { AppError, sendSuccess } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const listNotifications = asyncHandler(async (req: Request, res: Response) => {
  const { status, exam, page = "1", limit = "10" } = req.query as Record<string, string>;

  const filter: Record<string, unknown> = { isActive: true };
  if (status) filter.status = status;
  if (exam) filter.exam = new RegExp(exam, "i");

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(50, parseInt(limit));

  const [notifications, total] = await Promise.all([
    ExamNotification.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    ExamNotification.countDocuments(filter),
  ]);

  sendSuccess(res, { notifications }, "Notifications fetched", 200, {
    total,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(total / limitNum),
  });
});

export const getNotification = asyncHandler(async (req: Request, res: Response) => {
  const notification = await ExamNotification.findById(req.params.id);
  if (!notification || !notification.isActive) throw new AppError("Notification not found", 404);
  sendSuccess(res, { notification });
});

export const createNotification = asyncHandler(async (req: Request, res: Response) => {
  const notification = await ExamNotification.create(req.body);
  sendSuccess(res, { notification }, "Notification created", 201);
});

export const updateNotification = asyncHandler(async (req: Request, res: Response) => {
  const notification = await ExamNotification.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!notification) throw new AppError("Notification not found", 404);
  sendSuccess(res, { notification }, "Notification updated");
});

export const deleteNotification = asyncHandler(async (req: Request, res: Response) => {
  const notification = await ExamNotification.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );
  if (!notification) throw new AppError("Notification not found", 404);
  sendSuccess(res, null, "Notification deleted");
});
