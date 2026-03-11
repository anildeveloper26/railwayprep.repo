import { Request, Response } from "express";
import { Question } from "../models/Question.model";
import { User } from "../models/User.model";
import { DailyChallengeAttempt, Streak } from "../models/DailyChallenge.model";
import { AppError, sendSuccess } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

function todayStr(): string {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}

// GET /daily-challenge  — return today's 10 questions for the user's target exam
export const getDailyChallenge = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const date = todayStr();

  // Check if already attempted today
  const existing = await DailyChallengeAttempt.findOne({ userId, date }).populate("questions");
  if (existing) {
    const streak = await Streak.findOne({ userId });
    return sendSuccess(res, {
      alreadyAttempted: true,
      attempt: existing,
      streak: streak ?? { currentStreak: 0, longestStreak: 0, totalCompleted: 0 },
    });
  }

  // Get user's target exam
  const user = await User.findById(userId).select("targetExam");
  if (!user) throw new AppError("User not found", 404);

  const exam = (req.query.exam as string) || user.targetExam || "RRB NTPC";

  // Pick 10 random questions
  const questions = await Question.aggregate([
    { $match: { isActive: true } },
    { $sample: { size: 10 } },
    {
      $project: {
        questionText: 1,
        options: 1,
        subject: 1,
        topic: 1,
        difficulty: 1,
        // Exclude correctOption from the challenge fetch
      },
    },
  ]);

  if (questions.length === 0) throw new AppError("No questions available", 404);

  const streak = await Streak.findOne({ userId });

  return sendSuccess(res, {
    alreadyAttempted: false,
    date,
    exam,
    questions,
    streak: streak ?? { currentStreak: 0, longestStreak: 0, totalCompleted: 0 },
  });
});

// POST /daily-challenge/submit
export const submitDailyChallenge = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const date = todayStr();

  const existing = await DailyChallengeAttempt.findOne({ userId, date });
  if (existing) throw new AppError("Already submitted today's challenge", 409);

  const { exam, questionIds, answers } = req.body as {
    exam: string;
    questionIds: string[];
    answers: { questionId: string; selectedOption: string }[];
  };

  // Validate answers against correct options
  const questions = await Question.find({ _id: { $in: questionIds } }).select("correctOption");
  const questionMap = new Map(questions.map((q) => [q._id.toString(), q.correctOption]));

  const scored = answers.map((a) => ({
    questionId: a.questionId,
    selectedOption: a.selectedOption,
    isCorrect: questionMap.get(a.questionId) === a.selectedOption,
  }));

  const score = scored.filter((a) => a.isCorrect).length;

  const attempt = await DailyChallengeAttempt.create({
    userId,
    date,
    exam,
    questions: questionIds,
    answers: scored,
    score,
    totalQuestions: questionIds.length,
    completedAt: new Date(),
  });

  // Update streak
  let streak = await Streak.findOne({ userId });
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  if (!streak) {
    streak = await Streak.create({
      userId,
      currentStreak: 1,
      longestStreak: 1,
      lastCompletedDate: date,
      totalCompleted: 1,
    });
  } else {
    if (streak.lastCompletedDate === yesterdayStr) {
      streak.currentStreak += 1;
    } else if (streak.lastCompletedDate !== date) {
      streak.currentStreak = 1;
    }
    streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak);
    streak.lastCompletedDate = date;
    streak.totalCompleted += 1;
    await streak.save();
  }

  return sendSuccess(res, { attempt, score, streak }, "Challenge submitted", 201);
});

// GET /daily-challenge/streak
export const getStreak = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const streak = await Streak.findOne({ userId });
  sendSuccess(res, {
    streak: streak ?? { currentStreak: 0, longestStreak: 0, totalCompleted: 0, lastCompletedDate: "" },
  });
});
