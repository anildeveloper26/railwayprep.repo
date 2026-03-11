import mongoose, { Document, Schema } from "mongoose";

export type Subject = "Mathematics" | "Reasoning" | "General Knowledge" | "Technical" | "Current Affairs";
export type Difficulty = "Easy" | "Medium" | "Hard";

export interface IOption {
  key: "A" | "B" | "C" | "D";
  text: string;
}

export interface IQuestion extends Document {
  subject: Subject;
  topic: string;
  difficulty: Difficulty;
  year?: number;
  exam?: string;
  questionText: string;
  questionTextHindi?: string;
  options: IOption[];
  optionsHindi?: IOption[];
  correctOption: "A" | "B" | "C" | "D";
  explanation: string;
  explanationHindi?: string;
  isPYQ: boolean;
  tags: string[];
  usageCount: number;
  isActive: boolean;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const questionSchema = new Schema<IQuestion>(
  {
    subject: {
      type: String,
      enum: ["Mathematics", "Reasoning", "General Knowledge", "Technical", "Current Affairs"],
      required: true,
    },
    topic: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    year: { type: Number, min: 1990, max: new Date().getFullYear() },
    exam: { type: String, trim: true },
    questionText: { type: String, required: true, trim: true },
    questionTextHindi: { type: String, trim: true },
    optionsHindi: {
      type: [{ key: { type: String, enum: ["A", "B", "C", "D"] }, text: { type: String } }],
      default: undefined,
    },
    explanationHindi: { type: String, trim: true },
    options: {
      type: [
        {
          key: { type: String, enum: ["A", "B", "C", "D"], required: true },
          text: { type: String, required: true },
        },
      ],
      validate: {
        validator: (opts: IOption[]) => opts.length === 4,
        message: "Exactly 4 options required",
      },
    },
    correctOption: { type: String, enum: ["A", "B", "C", "D"], required: true },
    explanation: { type: String, required: true, trim: true },
    isPYQ: { type: Boolean, default: false },
    tags: [{ type: String, lowercase: true, trim: true }],
    usageCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

questionSchema.index({ subject: 1, topic: 1 });
questionSchema.index({ isPYQ: 1, year: -1 });
questionSchema.index({ tags: 1 });

questionSchema.set("toJSON", { versionKey: false });

export const Question = mongoose.model<IQuestion>("Question", questionSchema);
