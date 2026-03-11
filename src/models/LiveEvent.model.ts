import mongoose, { Document, Schema } from "mongoose";

export interface ILiveEvent extends Document {
  title: string;
  exam: string;
  testId: mongoose.Types.ObjectId;
  scheduledAt: Date;
  registrationDeadline: Date;
  durationMinutes: number;
  registeredUsers: mongoose.Types.ObjectId[];
  status: "upcoming" | "live" | "ended";
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILiveEventAttempt extends Document {
  eventId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  answers: {
    questionId: mongoose.Types.ObjectId;
    selectedOption: string;
    isCorrect: boolean;
  }[];
  score: number;
  percentage: number;
  timeTaken: number;
  rank?: number;
  submittedAt: Date;
  createdAt: Date;
}

const liveEventSchema = new Schema<ILiveEvent>(
  {
    title: { type: String, required: true, trim: true },
    exam: { type: String, required: true },
    testId: { type: Schema.Types.ObjectId, ref: "MockTest", required: true },
    scheduledAt: { type: Date, required: true },
    registrationDeadline: { type: Date, required: true },
    durationMinutes: { type: Number, required: true, min: 10 },
    registeredUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    status: { type: String, enum: ["upcoming", "live", "ended"], default: "upcoming" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

liveEventSchema.set("toJSON", { versionKey: false });
export const LiveEvent = mongoose.model<ILiveEvent>("LiveEvent", liveEventSchema);

const liveEventAttemptSchema = new Schema<ILiveEventAttempt>(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "LiveEvent", required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    answers: [
      {
        questionId: { type: Schema.Types.ObjectId, ref: "Question" },
        selectedOption: String,
        isCorrect: Boolean,
      },
    ],
    score: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 },
    timeTaken: { type: Number, default: 0 },
    rank: { type: Number },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

liveEventAttemptSchema.index({ eventId: 1, userId: 1 }, { unique: true });
liveEventAttemptSchema.set("toJSON", { versionKey: false });
export const LiveEventAttempt = mongoose.model<ILiveEventAttempt>("LiveEventAttempt", liveEventAttemptSchema);
