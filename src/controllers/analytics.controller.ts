import { Request, Response } from "express";
import { TestAttempt } from "../models/TestAttempt.model";
import { Question } from "../models/Question.model";
import { sendSuccess } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const getMyAnalytics = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;

  const [attempts, subjectStats, weeklyActivity] = await Promise.all([
    TestAttempt.find({ userId })
      .sort({ completedAt: -1 })
      .limit(10)
      .populate("testId", "title exam"),

    // Subject-wise accuracy from individual answers
    TestAttempt.aggregate([
      { $match: { userId: new (require("mongoose").Types.ObjectId)(userId) } },
      { $unwind: "$answers" },
      {
        $lookup: {
          from: "questions",
          localField: "answers.questionId",
          foreignField: "_id",
          as: "question",
        },
      },
      { $unwind: "$question" },
      {
        $group: {
          _id: "$question.subject",
          total: { $sum: 1 },
          correct: { $sum: { $cond: ["$answers.isCorrect", 1, 0] } },
        },
      },
      {
        $project: {
          subject: "$_id",
          total: 1,
          correct: 1,
          percentage: {
            $round: [{ $multiply: [{ $divide: ["$correct", "$total"] }, 100] }, 1],
          },
        },
      },
    ]),

    // Weekly activity (questions answered per day for last 7 days)
    TestAttempt.aggregate([
      {
        $match: {
          userId: new (require("mongoose").Types.ObjectId)(userId),
          completedAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: "$completedAt" },
          questions: { $sum: { $size: "$answers" } },
          tests: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
  ]);

  const recentTests = attempts.slice(0, 6).map((a) => ({
    date: a.completedAt.toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
    score: a.percentage,
    name: (a.testId as { title?: string })?.title ?? "Test",
  }));

  const overallAccuracy =
    attempts.length > 0
      ? parseFloat(
          (
            (attempts.reduce((s, a) => s + a.correctAnswers, 0) /
              Math.max(
                1,
                attempts.reduce((s, a) => s + a.correctAnswers + a.wrongAnswers + a.unanswered, 0)
              )) *
            100
          ).toFixed(1)
        )
      : 0;

  const avgTime =
    attempts.length > 0
      ? Math.round(
          attempts.reduce((s, a) => {
            const total = a.correctAnswers + a.wrongAnswers + a.unanswered;
            return s + (total > 0 ? a.timeTaken / total : 0);
          }, 0) / attempts.length
        )
      : 0;

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekMap = new Map(weeklyActivity.map((w: { _id: number; questions: number }) => [w._id, w.questions]));
  const weeklyData = days.map((day, i) => ({ day, questions: weekMap.get(i + 1) ?? 0 }));

  sendSuccess(res, {
    recentTests,
    subjectWise: subjectStats,
    weeklyActivity: weeklyData,
    accuracy: overallAccuracy,
    averageTime: avgTime,
    totalAttempts: attempts.length,
  });
});
