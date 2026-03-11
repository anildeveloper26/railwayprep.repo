import mongoose, { Document, Schema } from "mongoose";

export interface IFlashcard extends Document {
  subject: string;
  topic: string;
  front: string;  // question/prompt
  back: string;   // answer/explanation
  tags: string[];
  isCustom: boolean;
  createdBy?: mongoose.Types.ObjectId; // for custom cards
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFlashcardProgress extends Document {
  userId: mongoose.Types.ObjectId;
  flashcardId: mongoose.Types.ObjectId;
  easeFactor: number;    // SRS ease factor (starts at 2.5)
  interval: number;      // days until next review
  repetitions: number;   // times reviewed
  nextReviewDate: Date;
  lastResult: "easy" | "hard" | "again";
  createdAt: Date;
  updatedAt: Date;
}

const flashcardSchema = new Schema<IFlashcard>(
  {
    subject: { type: String, required: true, index: true },
    topic: { type: String, required: true },
    front: { type: String, required: true, trim: true },
    back: { type: String, required: true, trim: true },
    tags: [{ type: String }],
    isCustom: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

flashcardSchema.set("toJSON", { versionKey: false });

export const Flashcard = mongoose.model<IFlashcard>("Flashcard", flashcardSchema);

const flashcardProgressSchema = new Schema<IFlashcardProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    flashcardId: { type: Schema.Types.ObjectId, ref: "Flashcard", required: true },
    easeFactor: { type: Number, default: 2.5 },
    interval: { type: Number, default: 1 },
    repetitions: { type: Number, default: 0 },
    nextReviewDate: { type: Date, default: Date.now },
    lastResult: { type: String, enum: ["easy", "hard", "again"], default: "again" },
  },
  { timestamps: true }
);

flashcardProgressSchema.index({ userId: 1, flashcardId: 1 }, { unique: true });
flashcardProgressSchema.index({ userId: 1, nextReviewDate: 1 });
flashcardProgressSchema.set("toJSON", { versionKey: false });

export const FlashcardProgress = mongoose.model<IFlashcardProgress>(
  "FlashcardProgress",
  flashcardProgressSchema
);
