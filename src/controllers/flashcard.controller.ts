import { Request, Response } from "express";
import { Flashcard, FlashcardProgress } from "../models/Flashcard.model";
import { AppError, sendSuccess } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

// GET /flashcards?subject=&limit=20
// Returns cards due for review first (SRS), sorted by nextReviewDate
export const getFlashcards = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { subject, limit = "20" } = req.query as Record<string, string>;

  const filter: Record<string, unknown> = { isActive: true };
  if (subject && subject !== "All") filter.subject = subject;

  const cards = await Flashcard.find(filter).limit(parseInt(limit) * 3);

  if (cards.length === 0) {
    return sendSuccess(res, { flashcards: [] });
  }

  const cardIds = cards.map((c) => c._id);
  const progresses = await FlashcardProgress.find({
    userId,
    flashcardId: { $in: cardIds },
  });

  const progressMap = new Map(progresses.map((p) => [p.flashcardId.toString(), p]));
  const now = new Date();

  // Merge cards with progress, sort: due cards first
  const merged = cards.map((card) => {
    const prog = progressMap.get(card._id.toString());
    return {
      _id: card._id,
      subject: card.subject,
      topic: card.topic,
      front: card.front,
      back: card.back,
      tags: card.tags,
      isCustom: card.isCustom,
      progress: prog
        ? {
            easeFactor: prog.easeFactor,
            interval: prog.interval,
            repetitions: prog.repetitions,
            nextReviewDate: prog.nextReviewDate,
            lastResult: prog.lastResult,
          }
        : null,
      isDue: !prog || prog.nextReviewDate <= now,
    };
  });

  // Due cards first, then by nextReviewDate
  merged.sort((a, b) => {
    if (a.isDue && !b.isDue) return -1;
    if (!a.isDue && b.isDue) return 1;
    return 0;
  });

  return sendSuccess(res, { flashcards: merged.slice(0, parseInt(limit)) });
});

// POST /flashcards/:id/review  — record review result using SM-2 algorithm
export const reviewFlashcard = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const flashcardId = req.params.id;
  const { result } = req.body as { result: "easy" | "hard" | "again" };

  if (!["easy", "hard", "again"].includes(result)) {
    throw new AppError("result must be easy, hard, or again", 400);
  }

  let prog = await FlashcardProgress.findOne({ userId, flashcardId });
  if (!prog) {
    prog = new FlashcardProgress({
      userId,
      flashcardId,
      easeFactor: 2.5,
      interval: 1,
      repetitions: 0,
      nextReviewDate: new Date(),
      lastResult: result,
    });
  }

  // SM-2 algorithm
  const q = result === "easy" ? 5 : result === "hard" ? 3 : 1;

  if (q < 3) {
    prog.repetitions = 0;
    prog.interval = 1;
  } else {
    if (prog.repetitions === 0) prog.interval = 1;
    else if (prog.repetitions === 1) prog.interval = 6;
    else prog.interval = Math.round(prog.interval * prog.easeFactor);
    prog.repetitions += 1;
  }

  prog.easeFactor = Math.max(1.3, prog.easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
  prog.lastResult = result;

  const next = new Date();
  next.setDate(next.getDate() + prog.interval);
  prog.nextReviewDate = next;

  await prog.save();
  sendSuccess(res, { progress: prog }, "Review recorded");
});

// GET /flashcards/progress  — mastery % per subject
export const getFlashcardProgress = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;

  const progresses = await FlashcardProgress.find({ userId }).populate<{
    flashcardId: { subject: string };
  }>("flashcardId", "subject");

  const subjectMap: Record<string, { total: number; mastered: number }> = {};
  for (const p of progresses) {
    const subject = (p.flashcardId as unknown as { subject: string })?.subject ?? "Unknown";
    if (!subjectMap[subject]) subjectMap[subject] = { total: 0, mastered: 0 };
    subjectMap[subject].total += 1;
    if (p.repetitions >= 3 && p.lastResult === "easy") {
      subjectMap[subject].mastered += 1;
    }
  }

  const result = Object.entries(subjectMap).map(([subject, data]) => ({
    subject,
    total: data.total,
    mastered: data.mastered,
    masteryPercent: data.total > 0 ? Math.round((data.mastered / data.total) * 100) : 0,
  }));

  sendSuccess(res, { progress: result });
});

// POST /flashcards/custom  — create user-defined flashcard
export const createCustomFlashcard = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { subject, topic, front, back, tags } = req.body;

  const card = await Flashcard.create({
    subject,
    topic,
    front,
    back,
    tags: tags ?? [],
    isCustom: true,
    createdBy: userId,
  });

  sendSuccess(res, { flashcard: card }, "Flashcard created", 201);
});
