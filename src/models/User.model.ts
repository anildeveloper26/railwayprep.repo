import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export type UserRole = "student" | "admin";
export type Category = "General" | "OBC" | "SC" | "ST" | "EWS";
export type ExamType = "RRB NTPC" | "RRB Group D" | "RRB JE" | "RRB ALP" | "RPF";
export type SubscriptionPlan = "free" | "monthly" | "quarterly" | "annual";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  category: Category;
  targetExam: ExamType;
  subscriptionPlan: SubscriptionPlan;
  subscriptionExpiresAt?: Date;
  avatar?: string;
  testsAttempted: number;
  averageScore: number;
  totalPoints: number;
  refreshToken?: string;
  deviceId?: string;
  preferredLanguage: "en" | "hi";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [60, "Name must be at most 60 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    category: {
      type: String,
      enum: ["General", "OBC", "SC", "ST", "EWS"],
      required: [true, "Category is required"],
    },
    targetExam: {
      type: String,
      enum: ["RRB NTPC", "RRB Group D", "RRB JE", "RRB ALP", "RPF"],
      required: [true, "Target exam is required"],
    },
    subscriptionPlan: {
      type: String,
      enum: ["free", "monthly", "quarterly", "annual"],
      default: "free",
    },
    subscriptionExpiresAt: { type: Date },
    avatar: { type: String },
    testsAttempted: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 },
    refreshToken: { type: String, select: false },
    deviceId: { type: String, select: false },
    preferredLanguage: { type: String, enum: ["en", "hi"], default: "en" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

// Remove sensitive fields from JSON output
userSchema.set("toJSON", {
  transform: (_doc, ret) => {
    const r = ret as unknown as Record<string, unknown>;
    delete r["password"];
    delete r["refreshToken"];
    delete r["__v"];
    return r;
  },
});

export const User = mongoose.model<IUser>("User", userSchema);
