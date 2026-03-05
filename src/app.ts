import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { env } from "./config/env";
import { errorHandler, notFound } from "./middleware/error.middleware";
import { logger } from "./utils/logger";

// Routes
import authRoutes         from "./routes/auth.routes";
import questionRoutes     from "./routes/question.routes";
import testRoutes         from "./routes/test.routes";
import attemptRoutes      from "./routes/attempt.routes";
import analyticsRoutes    from "./routes/analytics.routes";
import leaderboardRoutes  from "./routes/leaderboard.routes";
import notificationRoutes from "./routes/notification.routes";
import plannerRoutes      from "./routes/planner.routes";
import subscriptionRoutes from "./routes/subscription.routes";
import adminRoutes        from "./routes/admin.routes";

const app = express();

// ─── Security ───────────────────────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ─── Rate Limiting ───────────────────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { success: false, message: "Too many auth attempts, please try again later." },
});

app.use(globalLimiter);

// ─── Body Parsing ────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// ─── Logging ─────────────────────────────────────────────────────────────────
if (env.NODE_ENV !== "test") {
  app.use(
    morgan(env.NODE_ENV === "production" ? "combined" : "dev", {
      stream: { write: (msg) => logger.http(msg.trim()) },
    })
  );
}

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ status: "ok", env: env.NODE_ENV, timestamp: new Date().toISOString() });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
const API = "/api/v1";

app.use(`${API}/auth`,          authLimiter, authRoutes);
app.use(`${API}/questions`,     questionRoutes);
app.use(`${API}/tests`,         testRoutes);
app.use(`${API}/attempts`,      attemptRoutes);
app.use(`${API}/analytics`,     analyticsRoutes);
app.use(`${API}/leaderboard`,   leaderboardRoutes);
app.use(`${API}/notifications`,  notificationRoutes);
app.use(`${API}/planner`,       plannerRoutes);
app.use(`${API}/subscriptions`,  subscriptionRoutes);
app.use(`${API}/admin`,         adminRoutes);

// ─── 404 + Error Handler ──────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

export default app;
