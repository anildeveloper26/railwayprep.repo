import { Request, Response } from "express";
import mongoose from "mongoose";
import { TestAttempt } from "../models/TestAttempt.model";
import { MockTest } from "../models/MockTest.model";
import { Question } from "../models/Question.model";
import { User } from "../models/User.model";
import { AppError, sendSuccess } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const submitAttempt = asyncHandler(async (req: Request, res: Response) => {
  const { testId } = req.params;
  const { answers, timeTaken } = req.body;
  const userId = req.user!.userId;

  const test = await MockTest.findById(testId);
  if (!test || !test.isActive) throw new AppError("Test not found", 404);

  const questionIds = answers.map((a: { questionId: string }) => a.questionId);
  const questions = await Question.find({ _id: { $in: questionIds } }).select(
    "correctOption"
  );
  const questionMap = new Map(questions.map((q) => [String(q._id), q.correctOption]));

  // Score calculation with negative marking
  const marksPerQ = test.totalMarks / test.totalQuestions;
  const negativeMarks = test.sections[0]?.negativeMarks ?? 0.33;

  let score = 0;
  let correctAnswers = 0;
  let wrongAnswers = 0;
  let unanswered = 0;

  const processedAnswers = answers.map((a: {
    questionId: string;
    selectedOption: string | null;
    timeTaken: number;
    isFlagged: boolean;
  }) => {
    const correct = questionMap.get(a.questionId);

    if (!a.selectedOption) {
      unanswered++;
      return { ...a, isCorrect: false, marksAwarded: 0 };
    }

    if (a.selectedOption === correct) {
      correctAnswers++;
      score += marksPerQ;
      return { ...a, isCorrect: true, marksAwarded: marksPerQ };
    } else {
      wrongAnswers++;
      score -= marksPerQ * negativeMarks;
      return { ...a, isCorrect: false, marksAwarded: -(marksPerQ * negativeMarks) };
    }
  });

  score = Math.max(0, parseFloat(score.toFixed(2)));
  const percentage = parseFloat(((score / test.totalMarks) * 100).toFixed(2));

  const attempt = await TestAttempt.create({
    userId,
    testId,
    answers: processedAnswers,
    score,
    totalMarks: test.totalMarks,
    percentage,
    correctAnswers,
    wrongAnswers,
    unanswered,
    timeTaken,
    completedAt: new Date(),
  });

  // Update test stats and user stats in parallel
  await Promise.all([
    MockTest.findByIdAndUpdate(testId, {
      $inc: { totalAttempts: 1 },
    }),
    // Recalculate user's average score
    (async () => {
      const attempts = await TestAttempt.find({ userId }).select("percentage");
      const avg = attempts.reduce((s, a) => s + a.percentage, 0) / attempts.length;
      await User.findByIdAndUpdate(userId, {
        $inc: { testsAttempted: 1, totalPoints: Math.round(score) },
        averageScore: parseFloat(avg.toFixed(2)),
      });
    })(),
  ]);

  sendSuccess(res, { attempt }, "Test submitted successfully", 201);
});

export const getMyAttempts = asyncHandler(async (req: Request, res: Response) => {
  const { page = "1", limit = "10" } = req.query as Record<string, string>;
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(50, parseInt(limit));

  const [attempts, total] = await Promise.all([
    TestAttempt.find({ userId: req.user!.userId })
      .sort({ completedAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .populate("testId", "title exam totalMarks duration"),
    TestAttempt.countDocuments({ userId: req.user!.userId }),
  ]);

  sendSuccess(res, { attempts }, "Attempts fetched", 200, {
    total,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(total / limitNum),
  });
});

export const getAttemptById = asyncHandler(async (req: Request, res: Response) => {
  const attempt = await TestAttempt.findById(req.params.attemptId)
    .populate("testId", "title exam totalMarks duration sections")
    .populate("answers.questionId");

  if (!attempt) throw new AppError("Attempt not found", 404);

  // Users can only view their own attempts unless admin
  if (
    String(attempt.userId) !== req.user!.userId &&
    req.user!.role !== "admin"
  ) {
    throw new AppError("Not authorized", 403);
  }

  sendSuccess(res, { attempt });
});
