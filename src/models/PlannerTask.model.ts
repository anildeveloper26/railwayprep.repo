import mongoose, { Document, Schema } from "mongoose";

export type TaskPriority = "High" | "Medium" | "Low";

export interface IPlannerTask extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  subject: string;
  topic: string;
  priority: TaskPriority;
  targetDate: Date;
  isCompleted: boolean;
  completedAt?: Date;
  estimatedMinutes: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const plannerTaskSchema = new Schema<IPlannerTask>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    topic: { type: String, required: true, trim: true },
    priority: { type: String, enum: ["High", "Medium", "Low"], default: "Medium" },
    targetDate: { type: Date, required: true },
    isCompleted: { type: Boolean, default: false },
    completedAt: { type: Date },
    estimatedMinutes: { type: Number, default: 30, min: 5 },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

plannerTaskSchema.index({ userId: 1, targetDate: 1 });

plannerTaskSchema.set("toJSON", { versionKey: false });

export const PlannerTask = mongoose.model<IPlannerTask>("PlannerTask", plannerTaskSchema);
