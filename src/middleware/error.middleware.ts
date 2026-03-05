import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import mongoose from "mongoose";
import { AppError, sendError } from "../utils/apiResponse";
import { logger } from "../utils/logger";
import { env } from "../config/env";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Zod validation errors
  if (err instanceof ZodError) {
    const fieldErrors = err.flatten().fieldErrors;
    sendError(res, "Validation failed", 422, fieldErrors);
    return;
  }

  // Known operational errors
  if (err instanceof AppError) {
    sendError(res, err.message, err.statusCode);
    return;
  }

  // Mongoose duplicate key
  if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
    const field = Object.keys(err.keyPattern ?? {})[0] ?? "field";
    sendError(res, `${field} already exists`, 409);
    return;
  }

  // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(err.errors).map((e) => e.message).join(", ");
    sendError(res, messages, 400);
    return;
  }

  // Mongoose cast error (invalid ObjectId)
  if (err instanceof mongoose.Error.CastError) {
    sendError(res, `Invalid ${err.path}: ${err.value}`, 400);
    return;
  }

  // JWT errors
  if (err instanceof Error) {
    if (err.name === "JsonWebTokenError") {
      sendError(res, "Invalid token", 401);
      return;
    }
    if (err.name === "TokenExpiredError") {
      sendError(res, "Token expired", 401);
      return;
    }
  }

  // Unhandled errors
  logger.error("Unhandled error:", err);
  const message = env.NODE_ENV === "production" ? "Internal server error" : (err as Error).message;
  sendError(res, message, 500);
}

export function notFound(req: Request, res: Response): void {
  sendError(res, `Route ${req.originalUrl} not found`, 404);
}
