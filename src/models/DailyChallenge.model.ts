import mongoose, { Document, Schema } from "mongoose";

export interface IDailyChallengeAttempt extends Document {
  userId: mongoose.Types.ObjectId;
  date: string; // "YYYY-MM-DD"
  exam: string;
  questions: mongoose.Types.ObjectId[];
  answers: {
    questionId: mongoose.Types.ObjectId;
    selectedOption: string;
    isCorrect: boolean;
  }[];
  score: number;
  totalQuestions: number;
  completedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStreak extends Document {
  userId: mongoose.Types.ObjectId;
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string; // "YYYY-MM-DD"
  totalCompleted: number;
  createdAt: Date;
  updatedAt: Date;
}

const dailyChallengeAttemptSchema = new Schema<IDailyChallengeAttempt>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    date: { type: String, required: true }, // "YYYY-MM-DD"
    exam: { type: String, required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    answers: [
      {
        questionId: { type: Schema.Types.ObjectId, ref: "Question" },
        selectedOption: { type: String },
        isCorrect: { type: Boolean },
      },
    ],
    score: { type: Number, default: 0 },
    totalQuestions: { type: Number, default: 10 },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

dailyChallengeAttemptSchema.index({ userId: 1, date: 1 }, { unique: true });
dailyChallengeAttemptSchema.set("toJSON", { versionKey: false });

export const DailyChallengeAttempt = mongoose.model<IDailyChallengeAttempt>(
  "DailyChallengeAttempt",
  dailyChallengeAttemptSchema
);

const streakSchema = new Schema<IStreak>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    lastCompletedDate: { type: String, default: "" },
    totalCompleted: { type: Number, default: 0 },
  },
  { timestamps: true }
);

streakSchema.set("toJSON", { versionKey: false });

export const Streak = mongoose.model<IStreak>("Streak", streakSchema);
