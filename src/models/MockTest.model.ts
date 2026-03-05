import mongoose, { Document, Schema } from "mongoose";

export interface ISectionConfig {
  subject: string;
  questionCount: number;
  marksPerQuestion: number;
  negativeMarks: number;
}

export interface IMockTest extends Document {
  title: string;
  exam: string;
  description: string;
  totalQuestions: number;
  duration: number; // in minutes
  totalMarks: number;
  sections: ISectionConfig[];
  questions: mongoose.Types.ObjectId[];
  difficulty: "Easy" | "Medium" | "Hard";
  isPremium: boolean;
  isActive: boolean;
  totalAttempts: number;
  averageScore: number;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const mockTestSchema = new Schema<IMockTest>(
  {
    title: { type: String, required: true, trim: true },
    exam: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    totalQuestions: { type: Number, required: true, min: 1 },
    duration: { type: Number, required: true, min: 1 },
    totalMarks: { type: Number, required: true, min: 1 },
    sections: [
      {
        subject: { type: String, required: true },
        questionCount: { type: Number, required: true, min: 1 },
        marksPerQuestion: { type: Number, required: true, default: 1 },
        negativeMarks: { type: Number, required: true, default: 0.33 },
      },
    ],
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Medium" },
    isPremium: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    totalAttempts: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

mockTestSchema.index({ exam: 1, isActive: 1 });
mockTestSchema.index({ isPremium: 1 });

mockTestSchema.set("toJSON", { versionKey: false });

export const MockTest = mongoose.model<IMockTest>("MockTest", mockTestSchema);
