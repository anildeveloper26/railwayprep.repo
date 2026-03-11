import { Request, Response } from "express";
import { LiveEvent, LiveEventAttempt } from "../models/LiveEvent.model";
import { Question } from "../models/Question.model";
import { AppError, sendSuccess } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import mongoose from "mongoose";

// GET /events  — list upcoming/live/ended events
export const listEvents = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.query as { status?: string };
  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;

  const events = await LiveEvent.find(filter)
    .populate("testId", "title totalQuestions duration")
    .sort({ scheduledAt: 1 })
    .limit(20);

  const userId = req.user!.userId;
  const result = events.map((e) => ({
    ...e.toJSON(),
    isRegistered: e.registeredUsers.some((u) => u.toString() === userId),
    registeredCount: e.registeredUsers.length,
  }));

  sendSuccess(res, { events: result });
});

// GET /events/:id
export const getEvent = asyncHandler(async (req: Request, res: Response) => {
  const event = await LiveEvent.findById(req.params.id)
    .populate("testId", "title totalQuestions duration");
  if (!event) throw new AppError("Event not found", 404);

  // Auto-update status
  const now = new Date();
  const endTime = new Date(event.scheduledAt.getTime() + event.durationMinutes * 60_000);
  if (now >= event.scheduledAt && now <= endTime && event.status === "upcoming") {
    event.status = "live";
    await event.save();
  } else if (now > endTime && event.status !== "ended") {
    event.status = "ended";
    await event.save();
  }

  sendSuccess(res, { event });
});

// POST /events/:id/register
export const registerForEvent = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const event = await LiveEvent.findById(req.params.id);
  if (!event) throw new AppError("Event not found", 404);
  if (event.status !== "upcoming") throw new AppError("Registration closed", 400);
  if (new Date() > event.registrationDeadline) throw new AppError("Registration deadline passed", 400);
  if (event.registeredUsers.some((u) => u.toString() === userId)) {
    throw new AppError("Already registered", 409);
  }

  event.registeredUsers.push(new mongoose.Types.ObjectId(userId));
  await event.save();
  sendSuccess(res, null, "Registered for event");
});

// POST /events/:id/submit  — submit live event answers
export const submitEvent = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const event = await LiveEvent.findById(req.params.id).populate("testId");
  if (!event) throw new AppError("Event not found", 404);
  if (event.status !== "live") throw new AppError("Event is not live", 400);

  const existing = await LiveEventAttempt.findOne({ eventId: req.params.id, userId });
  if (existing) throw new AppError("Already submitted", 409);

  const { answers, timeTaken } = req.body as {
    answers: { questionId: string; selectedOption: string }[];
    timeTaken: number;
  };

  const questionIds = answers.map((a) => a.questionId);
  const questions = await Question.find({ _id: { $in: questionIds } }).select("correctOption");
  const qMap = new Map(questions.map((q) => [q._id.toString(), q.correctOption]));

  const scored = answers.map((a) => ({
    questionId: a.questionId,
    selectedOption: a.selectedOption,
    isCorrect: qMap.get(a.questionId) === a.selectedOption,
  }));

  const correct = scored.filter((a) => a.isCorrect).length;
  const percentage = Math.round((correct / answers.length) * 100);

  const attempt = await LiveEventAttempt.create({
    eventId: req.params.id,
    userId,
    answers: scored,
    score: correct,
    percentage,
    timeTaken,
    submittedAt: new Date(),
  });

  // Compute rank
  const rank = await LiveEventAttempt.countDocuments({
    eventId: req.params.id,
    $or: [
      { percentage: { $gt: percentage } },
      { percentage: percentage, timeTaken: { $lt: timeTaken } },
    ],
  });
  attempt.rank = rank + 1;
  await attempt.save();

  sendSuccess(res, { attempt }, "Submitted", 201);
});

// GET /events/:id/leaderboard  — top 50
export const getEventLeaderboard = asyncHandler(async (req: Request, res: Response) => {
  const attempts = await LiveEventAttempt.find({ eventId: req.params.id })
    .populate("userId", "name category")
    .sort({ percentage: -1, timeTaken: 1 })
    .limit(50);

  const leaderboard = attempts.map((a, i) => ({
    rank: i + 1,
    user: a.userId,
    score: a.score,
    percentage: a.percentage,
    timeTaken: a.timeTaken,
  }));

  sendSuccess(res, { leaderboard });
});

// POST /events  — admin creates event
export const createEvent = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { title, exam, testId, scheduledAt, registrationDeadline, durationMinutes } = req.body;

  if (!title || !testId || !scheduledAt || !durationMinutes) {
    throw new AppError("title, testId, scheduledAt and durationMinutes are required", 400);
  }

  const event = await LiveEvent.create({
    title,
    exam: exam ?? "RRB NTPC",
    testId,
    scheduledAt: new Date(scheduledAt),
    registrationDeadline: new Date(registrationDeadline ?? scheduledAt),
    durationMinutes,
    createdBy: userId,
  });

  sendSuccess(res, { event }, "Event created", 201);
});

// PATCH /events/:id  — admin updates event
export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
  const event = await LiveEvent.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!event) throw new AppError("Event not found", 404);
  sendSuccess(res, { event }, "Event updated");
});
