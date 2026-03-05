import { Request, Response } from "express";
import { User } from "../models/User.model";
import { MockTest } from "../models/MockTest.model";
import { Question } from "../models/Question.model";
import { TestAttempt } from "../models/TestAttempt.model";
import { Subscription } from "../models/Subscription.model";
import { AppError, sendSuccess } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const getDashboardStats = asyncHandler(async (_req: Request, res: Response) => {
  const [totalUsers, totalTests, totalQuestions, activeSubscriptions, recentAttempts] =
    await Promise.all([
      User.countDocuments({ isActive: true, role: "student" }),
      MockTest.countDocuments({ isActive: true }),
      Question.countDocuments({ isActive: true }),
      Subscription.countDocuments({ status: "success", endDate: { $gte: new Date() } }),
      TestAttempt.find()
        .sort({ completedAt: -1 })
        .limit(10)
        .populate("userId", "name")
        .populate("testId", "title"),
    ]);

  sendSuccess(res, {
    stats: { totalUsers, totalTests, totalQuestions, activeSubscriptions },
    recentAttempts,
  });
});

export const listUsers = asyncHandler(async (req: Request, res: Response) => {
  const { search, category, plan, page = "1", limit = "20" } = req.query as Record<string, string>;

  const filter: Record<string, unknown> = { role: "student" };
  if (search) filter.$or = [
    { name: new RegExp(search, "i") },
    { email: new RegExp(search, "i") },
  ];
  if (category) filter.category = category;
  if (plan) filter.subscriptionPlan = plan;

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(100, parseInt(limit));

  const [users, total] = await Promise.all([
    User.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .select("-refreshToken"),
    User.countDocuments(filter),
  ]);

  sendSuccess(res, { users }, "Users fetched", 200, {
    total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum),
  });
});

export const deactivateUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params.userId, { isActive: false }, { new: true });
  if (!user) throw new AppError("User not found", 404);
  sendSuccess(res, null, "User deactivated");
});

export const getSystemStats = asyncHandler(async (_req: Request, res: Response) => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const [newUsersThisMonth, attemptsThisMonth, revenue] = await Promise.all([
    User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
    TestAttempt.countDocuments({ completedAt: { $gte: thirtyDaysAgo } }),
    Subscription.aggregate([
      { $match: { status: "success", createdAt: { $gte: thirtyDaysAgo } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
  ]);

  sendSuccess(res, {
    newUsersThisMonth,
    attemptsThisMonth,
    revenueThisMonth: revenue[0]?.total ?? 0,
  });
});
