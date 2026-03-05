import { z } from "zod";

export const createTestSchema = z.object({
  body: z.object({
    title: z.string().trim().min(3).max(200),
    exam: z.string().trim().min(2),
    description: z.string().trim().optional(),
    totalQuestions: z.number().int().min(1),
    duration: z.number().int().min(1),
    totalMarks: z.number().min(1),
    sections: z.array(
      z.object({
        subject: z.string().min(1),
        questionCount: z.number().int().min(1),
        marksPerQuestion: z.number().min(0.5).default(1),
        negativeMarks: z.number().min(0).default(0.33),
      })
    ).min(1),
    questions: z.array(z.string()).optional(),
    difficulty: z.enum(["Easy", "Medium", "Hard"]).default("Medium"),
    isPremium: z.boolean().default(false),
  }),
});

export const listTestsSchema = z.object({
  query: z.object({
    exam: z.string().optional(),
    difficulty: z.enum(["Easy", "Medium", "Hard"]).optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(10),
  }),
});

export const createQuestionSchema = z.object({
  body: z.object({
    subject: z.enum(["Mathematics", "Reasoning", "General Knowledge", "Technical", "Current Affairs"]),
    topic: z.string().trim().min(2),
    difficulty: z.enum(["Easy", "Medium", "Hard"]),
    year: z.number().int().min(1990).max(new Date().getFullYear()).optional(),
    exam: z.string().trim().optional(),
    questionText: z.string().trim().min(10),
    options: z.array(
      z.object({
        key: z.enum(["A", "B", "C", "D"]),
        text: z.string().trim().min(1),
      })
    ).length(4),
    correctOption: z.enum(["A", "B", "C", "D"]),
    explanation: z.string().trim().min(5),
    isPYQ: z.boolean().default(false),
    tags: z.array(z.string().trim().toLowerCase()).default([]),
  }),
});

export type CreateTestInput = z.infer<typeof createTestSchema>["body"];
export type ListTestsInput = z.infer<typeof listTestsSchema>["query"];
export type CreateQuestionInput = z.infer<typeof createQuestionSchema>["body"];
