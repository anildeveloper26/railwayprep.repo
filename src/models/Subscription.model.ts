import mongoose, { Document, Schema } from "mongoose";

export type PaymentStatus = "pending" | "success" | "failed" | "refunded";

export interface ISubscription extends Document {
  userId: mongoose.Types.ObjectId;
  plan: "free" | "monthly" | "quarterly" | "annual";
  amount: number;
  currency: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  status: PaymentStatus;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const subscriptionSchema = new Schema<ISubscription>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    plan: {
      type: String,
      enum: ["free", "monthly", "quarterly", "annual"],
      required: true,
    },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "INR" },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    status: {
      type: String,
      enum: ["pending", "success", "failed", "refunded"],
      default: "pending",
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

subscriptionSchema.index({ userId: 1, status: 1 });

subscriptionSchema.set("toJSON", { versionKey: false });

export const Subscription = mongoose.model<ISubscription>("Subscription", subscriptionSchema);
