import { Request, Response } from "express";
import { Subscription } from "../models/Subscription.model";
import { User } from "../models/User.model";
import { AppError, sendSuccess } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const PLAN_PRICES: Record<string, { amount: number; days: number }> = {
  monthly: { amount: 199, days: 30 },
  quarterly: { amount: 499, days: 90 },
  annual: { amount: 1499, days: 365 },
};

export const getPlans = asyncHandler(async (_req: Request, res: Response) => {
  sendSuccess(res, {
    plans: [
      {
        id: "free",
        name: "Free",
        price: 0,
        duration: "forever",
        features: [
          "1 Mock Test per week",
          "50 PYQ Questions",
          "Basic Analytics",
        ],
      },
      {
        id: "monthly",
        name: "Monthly",
        price: 199,
        duration: "month",
        badge: "Popular",
        isPopular: true,
        features: [
          "Unlimited Mock Tests",
          "5000+ PYQ Questions",
          "Full Analytics",
          "Study Planner",
          "Leaderboard Access",
          "Ad-free Experience",
          "SC/ST/OBC Category Guide",
        ],
      },
      {
        id: "quarterly",
        name: "Quarterly",
        price: 499,
        duration: "3 months",
        badge: "Save 16%",
        features: [
          "Everything in Monthly",
          "Advanced Analytics",
          "Priority Support",
        ],
      },
      {
        id: "annual",
        name: "Annual",
        price: 1499,
        duration: "year",
        badge: "Best Value",
        features: [
          "Everything in Quarterly",
          "1 Mentorship Session",
          "Early Access to New Tests",
        ],
      },
    ],
  });
});

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { plan } = req.body as { plan: string };
  const planInfo = PLAN_PRICES[plan];
  if (!planInfo) throw new AppError("Invalid plan", 400);

  const startDate = new Date();
  const endDate = new Date(startDate.getTime() + planInfo.days * 24 * 60 * 60 * 1000);

  const subscription = await Subscription.create({
    userId: req.user!.userId,
    plan,
    amount: planInfo.amount,
    status: "pending",
    startDate,
    endDate,
  });

  // In production: create Razorpay order here and return orderId
  sendSuccess(
    res,
    {
      subscriptionId: subscription._id,
      amount: planInfo.amount,
      currency: "INR",
      // razorpayOrderId: razorpayOrder.id (when integrated)
    },
    "Order created",
    201
  );
});

export const verifyPayment = asyncHandler(async (req: Request, res: Response) => {
  const { subscriptionId, razorpayPaymentId, razorpaySignature } = req.body;

  const subscription = await Subscription.findById(subscriptionId);
  if (!subscription || String(subscription.userId) !== req.user!.userId) {
    throw new AppError("Subscription not found", 404);
  }

  // In production: verify Razorpay signature here
  // const isValid = verifyRazorpaySignature(...)

  subscription.razorpayPaymentId = razorpayPaymentId;
  subscription.razorpaySignature = razorpaySignature;
  subscription.status = "success";
  await subscription.save();

  await User.findByIdAndUpdate(req.user!.userId, {
    subscriptionPlan: subscription.plan,
    subscriptionExpiresAt: subscription.endDate,
  });

  sendSuccess(res, { subscription }, "Payment verified and subscription activated");
});

export const getMySubscription = asyncHandler(async (req: Request, res: Response) => {
  const subscription = await Subscription.findOne({
    userId: req.user!.userId,
    status: "success",
  }).sort({ createdAt: -1 });

  sendSuccess(res, { subscription });
});
