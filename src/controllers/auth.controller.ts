import { Request, Response } from "express";
import { User } from "../models/User.model";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt";
import { AppError, sendSuccess } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { env } from "../config/env";

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: "/",
};

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, category, targetExam } = req.body;

  const exists = await User.findOne({ email });
  if (exists) throw new AppError("Email already registered", 409);

  const user = await User.create({ name, email, password, category, targetExam });

  const payload = { userId: String(user._id), role: user.role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);

  sendSuccess(res, { user, accessToken }, "Account created successfully", 201);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, isActive: true }).select("+password +refreshToken");
  if (!user) throw new AppError("Invalid email or password", 401);

  const valid = await user.comparePassword(password);
  if (!valid) throw new AppError("Invalid email or password", 401);

  const payload = { userId: String(user._id), role: user.role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);

  const userObj = user.toJSON();
  sendSuccess(res, { user: userObj, accessToken }, "Login successful");
});

export const refreshTokens = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken as string | undefined;
  if (!token) throw new AppError("Refresh token required", 401);

  let payload;
  try {
    payload = verifyRefreshToken(token);
  } catch {
    throw new AppError("Invalid or expired refresh token", 401);
  }

  const user = await User.findById(payload.userId).select("+refreshToken");
  if (!user || user.refreshToken !== token) throw new AppError("Session expired, please login again", 401);

  const newPayload = { userId: String(user._id), role: user.role };
  const accessToken = signAccessToken(newPayload);
  const refreshToken = signRefreshToken(newPayload);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);
  sendSuccess(res, { accessToken }, "Tokens refreshed");
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (userId) {
    await User.findByIdAndUpdate(userId, { $unset: { refreshToken: 1 } });
  }

  res.clearCookie("refreshToken", { path: "/" });
  sendSuccess(res, null, "Logged out successfully");
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user!.userId);
  if (!user) throw new AppError("User not found", 404);
  sendSuccess(res, { user });
});

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const allowedUpdates = ["name", "category", "targetExam", "avatar"];
  const updates: Record<string, unknown> = {};

  for (const key of allowedUpdates) {
    if (req.body[key] !== undefined) updates[key] = req.body[key];
  }

  const user = await User.findByIdAndUpdate(req.user!.userId, updates, {
    new: true,
    runValidators: true,
  });

  if (!user) throw new AppError("User not found", 404);
  sendSuccess(res, { user }, "Profile updated");
});
