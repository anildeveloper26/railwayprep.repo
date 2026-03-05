import { Request, Response } from "express";
import { User } from "../models/User.model";
import { sendSuccess } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const getLeaderboard = asyncHandler(async (req: Request, res: Response) => {
  const { category, exam, page = "1", limit = "50" } = req.query as Record<string, string>;

  const filter: Record<string, unknown> = { isActive: true, role: "student", testsAttempted: { $gt: 0 } };
  if (category && category !== "All") filter.category = category;
  if (exam && exam !== "All") filter.targetExam = exam;

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(100, parseInt(limit));

  const [users, total] = await Promise.all([
    User.find(filter)
      .sort({ totalPoints: -1, averageScore: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .select("name category targetExam testsAttempted averageScore totalPoints avatar"),
    User.countDocuments(filter),
  ]);

  const leaderboard = users.map((u, i) => ({
    rank: (pageNum - 1) * limitNum + i + 1,
    userId: u._id,
    name: u.name,
    category: u.category,
    targetExam: u.targetExam,
    testsAttempted: u.testsAttempted,
    averageScore: u.averageScore,
    totalPoints: u.totalPoints,
    avatar: u.avatar,
  }));

  // My rank
  let myRank: number | null = null;
  if (req.user) {
    const myUser = await User.findById(req.user.userId).select("totalPoints");
    if (myUser) {
      myRank = (await User.countDocuments({
        ...filter,
        totalPoints: { $gt: myUser.totalPoints },
      })) + 1;
    }
  }

  sendSuccess(res, { leaderboard, myRank }, "Leaderboard fetched", 200, {
    total,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(total / limitNum),
  });
});
