import { z } from "zod";

export const submitAttemptSchema = z.object({
  body: z.object({
    answers: z.array(
      z.object({
        questionId: z.string().min(1),
        selectedOption: z.enum(["A", "B", "C", "D"]).nullable(),
        timeTaken: z.number().min(0).default(0),
        isFlagged: z.boolean().default(false),
      })
    ).min(1),
    timeTaken: z.number().min(0),
  }),
  params: z.object({
    testId: z.string().min(1),
  }),
});

export const plannerTaskSchema = z.object({
  body: z.object({
    title: z.string().trim().min(2).max(200),
    subject: z.string().trim().min(1),
    topic: z.string().trim().min(1),
    priority: z.enum(["High", "Medium", "Low"]).default("Medium"),
    targetDate: z.coerce.date(),
    estimatedMinutes: z.number().int().min(5).default(30),
    notes: z.string().trim().optional(),
  }),
});

export type SubmitAttemptInput = z.infer<typeof submitAttemptSchema>["body"];
export type PlannerTaskInput = z.infer<typeof plannerTaskSchema>["body"];
