import { Request, Response } from "express";
import { Question } from "../models/Question.model";
import { AppError, sendSuccess } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const createQuestion = asyncHandler(async (req: Request, res: Response) => {
  const question = await Question.create({
    ...req.body,
    createdBy: req.user!.userId,
  });
  sendSuccess(res, { question }, "Question created", 201);
});

export const listQuestions = asyncHandler(async (req: Request, res: Response) => {
  const {
    subject, topic, difficulty, isPYQ, year, exam,
    page = "1", limit = "20", search,
  } = req.query as Record<string, string>;

  const filter: Record<string, unknown> = { isActive: true };
  if (subject) filter.subject = subject;
  if (topic) filter.topic = new RegExp(topic, "i");
  if (difficulty) filter.difficulty = difficulty;
  if (isPYQ !== undefined) filter.isPYQ = isPYQ === "true";
  if (year) filter.year = Number(year);
  if (exam) filter.exam = new RegExp(exam, "i");
  if (search) filter.questionText = new RegExp(search, "i");

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
  const skip = (pageNum - 1) * limitNum;

  const [questions, total] = await Promise.all([
    Question.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .select("-correctOption -explanation"),
    Question.countDocuments(filter),
  ]);

  sendSuccess(res, { questions }, "Questions fetched", 200, {
    total,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(total / limitNum),
  });
});

export const getQuestion = asyncHandler(async (req: Request, res: Response) => {
  const question = await Question.findById(req.params.id);
  if (!question || !question.isActive) throw new AppError("Question not found", 404);
  sendSuccess(res, { question });
});

export const updateQuestion = asyncHandler(async (req: Request, res: Response) => {
  const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!question) throw new AppError("Question not found", 404);
  sendSuccess(res, { question }, "Question updated");
});

export const deleteQuestion = asyncHandler(async (req: Request, res: Response) => {
  const question = await Question.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );
  if (!question) throw new AppError("Question not found", 404);
  sendSuccess(res, null, "Question deleted");
});

export const getPYQTopics = asyncHandler(async (_req: Request, res: Response) => {
  const topics = await Question.aggregate([
    { $match: { isPYQ: true, isActive: true } },
    {
      $group: {
        _id: { subject: "$subject", topic: "$topic" },
        count: { $sum: 1 },
        years: { $addToSet: "$year" },
      },
    },
    {
      $group: {
        _id: "$_id.subject",
        topics: {
          $push: { topic: "$_id.topic", count: "$count", years: "$years" },
        },
        totalQuestions: { $sum: "$count" },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  sendSuccess(res, { topics });
});
