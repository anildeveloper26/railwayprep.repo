import mongoose, { Document, Schema } from "mongoose";

export interface IReferral extends Document {
  referrerId: mongoose.Types.ObjectId;
  refereeId: mongoose.Types.ObjectId;
  referralCode: string;
  status: "pending" | "converted";
  convertedAt?: Date;
  creditsAwarded: number; // premium days awarded to referrer
  createdAt: Date;
  updatedAt: Date;
}

export interface IReferralStats extends Document {
  userId: mongoose.Types.ObjectId;
  referralCode: string;
  totalReferrals: number;
  convertedReferrals: number;
  pendingCredits: number;   // days not yet redeemed
  redeemedCredits: number;  // days already redeemed
  createdAt: Date;
  updatedAt: Date;
}

const referralSchema = new Schema<IReferral>(
  {
    referrerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    refereeId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    referralCode: { type: String, required: true },
    status: { type: String, enum: ["pending", "converted"], default: "pending" },
    convertedAt: { type: Date },
    creditsAwarded: { type: Number, default: 7 }, // 7 days per referral
  },
  { timestamps: true }
);

referralSchema.set("toJSON", { versionKey: false });

export const Referral = mongoose.model<IReferral>("Referral", referralSchema);

const referralStatsSchema = new Schema<IReferralStats>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    referralCode: { type: String, required: true, unique: true, uppercase: true },
    totalReferrals: { type: Number, default: 0 },
    convertedReferrals: { type: Number, default: 0 },
    pendingCredits: { type: Number, default: 0 },
    redeemedCredits: { type: Number, default: 0 },
  },
  { timestamps: true }
);

referralStatsSchema.set("toJSON", { versionKey: false });

export const ReferralStats = mongoose.model<IReferralStats>("ReferralStats", referralStatsSchema);
