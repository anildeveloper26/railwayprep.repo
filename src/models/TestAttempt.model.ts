import mongoose, { Document, Schema } from "mongoose";

export interface IAnswerRecord {
  questionId: mongoose.Types.ObjectId;
  selectedOption: "A" | "B" | "C" | "D" | null;
  isCorrect: boolean;
  marksAwarded: number;
  timeTaken: number; // seconds
  isFlagged: boolean;
}

export interface ITestAttempt extends Document {
  userId: mongoose.Types.ObjectId;
  testId: mongoose.Types.ObjectId;
  answers: IAnswerRecord[];
  score: number;
  totalMarks: number;
  percentage: number;
  correctAnswers: number;
  wrongAnswers: number;
  unanswered: number;
  timeTaken: number; // total seconds
  rank?: number;
  completedAt: Date;
  createdAt: Date;
}

const testAttemptSchema = new Schema<ITestAttempt>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    testId: { type: Schema.Types.ObjectId, ref: "MockTest", required: true, index: true },
    answers: [
      {
        questionId: { type: Schema.Types.ObjectId, ref: "Question", required: true },
        selectedOption: { type: String, enum: ["A", "B", "C", "D", null], default: null },
        isCorrect: { type: Boolean, required: true },
        marksAwarded: { type: Number, required: true },
        timeTaken: { type: Number, default: 0 },
        isFlagged: { type: Boolean, default: false },
      },
    ],
    score: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
    percentage: { type: Number, required: true },
    correctAnswers: { type: Number, required: true },
    wrongAnswers: { type: Number, required: true },
    unanswered: { type: Number, required: true },
    timeTaken: { type: Number, required: true },
    rank: { type: Number },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

testAttemptSchema.index({ userId: 1, testId: 1 });
testAttemptSchema.index({ userId: 1, completedAt: -1 });

testAttemptSchema.set("toJSON", { versionKey: false });

export const TestAttempt = mongoose.model<ITestAttempt>("TestAttempt", testAttemptSchema);
