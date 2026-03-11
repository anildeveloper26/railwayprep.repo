import { Request, Response } from "express";
import Anthropic from "@anthropic-ai/sdk";
import { TestAttempt } from "../models/TestAttempt.model";
import { PlannerTask } from "../models/PlannerTask.model";
import { User } from "../models/User.model";
import { AppError, sendSuccess } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// POST /ai/study-plan  body: { examDate }
export const generateStudyPlan = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { examDate } = req.body as { examDate: string };

  if (!examDate) throw new AppError("examDate is required (YYYY-MM-DD)", 400);

  const targetDate = new Date(examDate);
  const today = new Date();
  const daysLeft = Math.max(1, Math.round((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  // Gather analytics
  const [user, attempts] = await Promise.all([
    User.findById(userId).select("targetExam name averageScore"),
    TestAttempt.find({ userId }).sort({ completedAt: -1 }).limit(5),
  ]);

  if (!user) throw new AppError("User not found", 404);

  // Build analytics context for Claude
  const avgScore = user.averageScore ?? 0;
  const recentScores = attempts.map((a) => a.percentage);

  const prompt = `You are an expert railway exam coach. Generate a personalised study plan for:
- Exam: ${user.targetExam}
- Days until exam: ${daysLeft}
- Current average score: ${avgScore}%
- Recent test scores: ${recentScores.join(", ") || "none yet"}

Create exactly 14 study tasks (2 weeks) covering all RRB subjects: Mathematics, Reasoning, General Knowledge, Technical.
Allocate more time to weaker areas.

Return ONLY a valid JSON array (no explanation, no markdown) with this exact structure:
[
  {
    "title": "string",
    "subject": "Mathematics"|"Reasoning"|"General Knowledge"|"Technical",
    "topic": "string",
    "priority": "High"|"Medium"|"Low",
    "targetDate": "YYYY-MM-DD",
    "estimatedMinutes": number
  }
]

Spread tasks across ${Math.min(14, daysLeft)} days starting from tomorrow (${new Date(Date.now() + 86400000).toISOString().slice(0, 10)}).`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    messages: [{ role: "user", content: prompt }],
  });

  const raw = (message.content[0] as { type: string; text: string }).text.trim();
  let tasks: unknown[];
  try {
    const jsonMatch = raw.match(/\[[\s\S]*\]/);
    tasks = JSON.parse(jsonMatch ? jsonMatch[0] : raw);
  } catch {
    throw new AppError("Failed to parse AI response. Please try again.", 500);
  }

  if (!Array.isArray(tasks)) throw new AppError("Invalid AI response format", 500);

  // Delete existing incomplete tasks and insert new AI-generated ones
  await PlannerTask.deleteMany({ userId, isCompleted: false });

  const created = await PlannerTask.insertMany(
    (tasks as Array<{
      title: string; subject: string; topic: string;
      priority: string; targetDate: string; estimatedMinutes: number;
    }>).map((t) => ({
      userId,
      title: t.title,
      subject: t.subject,
      topic: t.topic,
      priority: t.priority ?? "Medium",
      targetDate: new Date(t.targetDate),
      estimatedMinutes: t.estimatedMinutes ?? 45,
    }))
  );

  sendSuccess(res, { tasks: created, daysLeft }, `AI generated ${created.length} tasks for your ${user.targetExam} prep`, 201);
});
