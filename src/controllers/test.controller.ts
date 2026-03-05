import { Request, Response } from "express";
import { MockTest } from "../models/MockTest.model";
import { Question } from "../models/Question.model";
import { AppError, sendSuccess } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const createTest = asyncHandler(async (req: Request, res: Response) => {
  const test = await MockTest.create({
    ...req.body,
    createdBy: req.user!.userId,
  });
  sendSuccess(res, { test }, "Mock test created", 201);
});

export const listTests = asyncHandler(async (req: Request, res: Response) => {
  const { exam, difficulty, page = "1", limit = "10" } = req.query as Record<string, string>;

  const filter: Record<string, unknown> = { isActive: true };
  if (exam) filter.exam = new RegExp(exam, "i");
  if (difficulty) filter.difficulty = difficulty;

  // Non-premium users only see free tests
  if (req.user) {
    // premium check can be added via user subscription lookup if needed
  }

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
  const skip = (pageNum - 1) * limitNum;

  const [tests, total] = await Promise.all([
    MockTest.find(filter)
      .select("-questions")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    MockTest.countDocuments(filter),
  ]);

  sendSuccess(res, { tests }, "Tests fetched", 200, {
    total,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(total / limitNum),
  });
});

export const getTest = asyncHandler(async (req: Request, res: Response) => {
  const test = await MockTest.findById(req.params.testId).populate({
    path: "questions",
    select: "-correctOption -explanation",
    match: { isActive: true },
  });

  if (!test || !test.isActive) throw new AppError("Test not found", 404);
  sendSuccess(res, { test });
});

export const getTestForReview = asyncHandler(async (req: Request, res: Response) => {
  // Full question data with answers (for result review only)
  const test = await MockTest.findById(req.params.testId).populate({
    path: "questions",
    match: { isActive: true },
  });

  if (!test || !test.isActive) throw new AppError("Test not found", 404);
  sendSuccess(res, { test });
});

export const updateTest = asyncHandler(async (req: Request, res: Response) => {
  const test = await MockTest.findByIdAndUpdate(req.params.testId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!test) throw new AppError("Test not found", 404);
  sendSuccess(res, { test }, "Test updated");
});

export const deleteTest = asyncHandler(async (req: Request, res: Response) => {
  const test = await MockTest.findByIdAndUpdate(
    req.params.testId,
    { isActive: false },
    { new: true }
  );
  if (!test) throw new AppError("Test not found", 404);
  sendSuccess(res, null, "Test deleted");
});

export const addQuestionsToTest = asyncHandler(async (req: Request, res: Response) => {
  const { questionIds } = req.body as { questionIds: string[] };

  const test = await MockTest.findById(req.params.testId);
  if (!test) throw new AppError("Test not found", 404);

  const valid = await Question.find({
    _id: { $in: questionIds },
    isActive: true,
  }).select("_id");

  const validIds = valid.map((q) => q._id);
  const existing = new Set(test.questions.map(String));
  const newIds = validIds.filter((id) => !existing.has(String(id)));

  test.questions.push(...(newIds as typeof test.questions));
  test.totalQuestions = test.questions.length;
  await test.save();

  sendSuccess(res, { addedCount: newIds.length }, "Questions added to test");
});
