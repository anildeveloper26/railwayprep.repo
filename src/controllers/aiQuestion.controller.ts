import { Request, Response } from "express";
import Anthropic from "@anthropic-ai/sdk";
import { Question } from "../models/Question.model";
import { AppError, sendSuccess } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// POST /ai/extract-questions  — admin pastes raw text (from PDF/paper)
export const extractQuestions = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { text, subject, exam, year, isPYQ } = req.body as {
    text: string;
    subject?: string;
    exam?: string;
    year?: number;
    isPYQ?: boolean;
  };

  if (!text?.trim() || text.trim().length < 50) {
    throw new AppError("Please provide at least 50 characters of question text", 400);
  }

  const prompt = `Extract all multiple choice questions from the following text.
Each question must have exactly 4 options (A, B, C, D) and a correct answer.

Text:
"""
${text.slice(0, 8000)}
"""

Return ONLY a valid JSON array (no markdown, no explanation) with this exact structure:
[
  {
    "questionText": "string",
    "options": [
      {"key": "A", "text": "string"},
      {"key": "B", "text": "string"},
      {"key": "C", "text": "string"},
      {"key": "D", "text": "string"}
    ],
    "correctOption": "A"|"B"|"C"|"D",
    "explanation": "Brief explanation of the correct answer",
    "topic": "string (specific topic name)",
    "difficulty": "Easy"|"Medium"|"Hard",
    "confidence": number (0-100, how confident you are this extraction is accurate)
  }
]

If no valid MCQs found, return empty array [].`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const raw = (message.content[0] as { type: string; text: string }).text.trim();
  let extracted: unknown[];
  try {
    const jsonMatch = raw.match(/\[[\s\S]*\]/);
    extracted = JSON.parse(jsonMatch ? jsonMatch[0] : raw);
  } catch {
    throw new AppError("Failed to parse questions from AI. Try with cleaner text.", 500);
  }

  if (!Array.isArray(extracted) || extracted.length === 0) {
    return sendSuccess(res, { questions: [], count: 0 }, "No questions found in the provided text");
  }

  // Build review queue (not saved yet — admin reviews first)
  const reviewQueue = (extracted as Array<{
    questionText: string;
    options: Array<{ key: string; text: string }>;
    correctOption: string;
    explanation: string;
    topic: string;
    difficulty: string;
    confidence: number;
  }>).map((q) => ({
    questionText: q.questionText,
    options: q.options,
    correctOption: q.correctOption,
    explanation: q.explanation || "No explanation provided",
    topic: q.topic || "General",
    difficulty: (["Easy", "Medium", "Hard"].includes(q.difficulty) ? q.difficulty : "Medium") as "Easy" | "Medium" | "Hard",
    subject: subject ?? "General Knowledge",
    exam: exam ?? "RRB NTPC",
    year: year ?? new Date().getFullYear(),
    isPYQ: isPYQ ?? false,
    confidence: q.confidence ?? 80,
  }));

  sendSuccess(res, { questions: reviewQueue, count: reviewQueue.length }, `Extracted ${reviewQueue.length} questions for review`);
});

// POST /ai/questions/approve  — admin approves and saves extracted questions
export const approveQuestions = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { questions } = req.body as {
    questions: Array<{
      questionText: string;
      options: Array<{ key: string; text: string }>;
      correctOption: string;
      explanation: string;
      topic: string;
      difficulty: "Easy" | "Medium" | "Hard";
      subject: string;
      exam: string;
      year?: number;
      isPYQ?: boolean;
    }>;
  };

  if (!Array.isArray(questions) || questions.length === 0) {
    throw new AppError("No questions to approve", 400);
  }

  const saved = await Question.insertMany(
    questions.map((q) => ({
      ...q,
      createdBy: userId,
      isActive: true,
      tags: [q.topic?.toLowerCase(), q.subject?.toLowerCase()].filter(Boolean),
    }))
  );

  sendSuccess(res, { saved: saved.length }, `${saved.length} questions published to question bank`, 201);
});
