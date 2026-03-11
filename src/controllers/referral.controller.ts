import { Request, Response } from "express";
import { User } from "../models/User.model";
import { Referral, ReferralStats } from "../models/Referral.model";
import { AppError, sendSuccess } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import crypto from "crypto";

function generateCode(userId: string): string {
  return crypto.createHash("sha256").update(userId).digest("hex").slice(0, 8).toUpperCase();
}

async function getOrCreateStats(userId: string): Promise<InstanceType<typeof ReferralStats>> {
  let stats = await ReferralStats.findOne({ userId });
  if (!stats) {
    const code = generateCode(userId);
    stats = await ReferralStats.create({ userId, referralCode: code });
  }
  return stats;
}

// GET /referrals/link  — get user's unique referral code + stats
export const getReferralLink = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const stats = await getOrCreateStats(userId);
  sendSuccess(res, {
    referralCode: stats.referralCode,
    totalReferrals: stats.totalReferrals,
    convertedReferrals: stats.convertedReferrals,
    pendingCredits: stats.pendingCredits,
    redeemedCredits: stats.redeemedCredits,
  });
});

// GET /referrals/stats  — same as link but explicit
export const getReferralStats = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const stats = await getOrCreateStats(userId);
  const referrals = await Referral.find({ referrerId: userId })
    .populate("refereeId", "name email createdAt")
    .sort({ createdAt: -1 });

  sendSuccess(res, {
    referralCode: stats.referralCode,
    totalReferrals: stats.totalReferrals,
    convertedReferrals: stats.convertedReferrals,
    pendingCredits: stats.pendingCredits,
    redeemedCredits: stats.redeemedCredits,
    referrals,
  });
});

// POST /referrals/apply  — called after registration with a referral code
// Body: { referralCode }
export const applyReferralCode = asyncHandler(async (req: Request, res: Response) => {
  const refereeId = req.user!.userId;
  const { referralCode } = req.body as { referralCode: string };

  if (!referralCode) throw new AppError("Referral code is required", 400);

  // Check if referee already used a referral code
  const alreadyReferred = await Referral.findOne({ refereeId });
  if (alreadyReferred) throw new AppError("You have already used a referral code", 409);

  const referrerStats = await ReferralStats.findOne({
    referralCode: referralCode.toUpperCase(),
  });
  if (!referrerStats) throw new AppError("Invalid referral code", 404);

  if (referrerStats.userId.toString() === refereeId) {
    throw new AppError("You cannot use your own referral code", 400);
  }

  // Create referral record
  const referral = await Referral.create({
    referrerId: referrerStats.userId,
    refereeId,
    referralCode: referralCode.toUpperCase(),
    status: "converted",
    convertedAt: new Date(),
    creditsAwarded: 7,
  });

  // Update referrer's stats: +7 days credit
  referrerStats.totalReferrals += 1;
  referrerStats.convertedReferrals += 1;
  referrerStats.pendingCredits += 7;
  await referrerStats.save();

  // Give referee 3 bonus days (extend subscription or mark for extension)
  const referee = await User.findById(refereeId);
  if (referee) {
    const now = new Date();
    const base = referee.subscriptionExpiresAt && referee.subscriptionExpiresAt > now
      ? referee.subscriptionExpiresAt
      : now;
    referee.subscriptionExpiresAt = new Date(base.getTime() + 3 * 24 * 60 * 60 * 1000);
    if (referee.subscriptionPlan === "free") referee.subscriptionPlan = "monthly";
    await referee.save();
  }

  sendSuccess(res, { referral }, "Referral applied. You received 3 bonus premium days!", 201);
});

// POST /referrals/redeem  — redeem pending credits
export const redeemCredits = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const stats = await ReferralStats.findOne({ userId });
  if (!stats || stats.pendingCredits <= 0) {
    throw new AppError("No credits available to redeem", 400);
  }

  const daysToRedeem = stats.pendingCredits;

  // Extend user's subscription
  const user = await User.findById(userId);
  if (!user) throw new AppError("User not found", 404);

  const now = new Date();
  const base = user.subscriptionExpiresAt && user.subscriptionExpiresAt > now
    ? user.subscriptionExpiresAt
    : now;
  user.subscriptionExpiresAt = new Date(base.getTime() + daysToRedeem * 24 * 60 * 60 * 1000);
  if (user.subscriptionPlan === "free") user.subscriptionPlan = "monthly";
  await user.save();

  stats.redeemedCredits += daysToRedeem;
  stats.pendingCredits = 0;
  await stats.save();

  sendSuccess(res, {
    daysRedeemed: daysToRedeem,
    newExpiryDate: user.subscriptionExpiresAt,
  }, `Redeemed ${daysToRedeem} premium days!`);
});
