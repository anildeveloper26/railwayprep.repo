import cors from "cors";
import type { Request, Response, NextFunction } from "express";
import { env } from "../config/env";
import { logger } from "../utils/logger";

// ─── Parse allowed origins from env ──────────────────────────────────────────
// CLIENT_ORIGIN can be a comma-separated list of:
//   - exact origins:   "https://railwayprep.app"
//   - subdomains glob: "*.railwayprep.app"
//   - wildcard:        "*"
const rawOrigins = env.CLIENT_ORIGIN
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const allowedExact = new Set(rawOrigins.filter((o) => !o.startsWith("*.")));
const allowedSubdomainRoots = rawOrigins
  .filter((o) => o.startsWith("*."))
  .map((o) => o.slice(2)); // strip leading "*."

const hasWildcard = allowedExact.has("*");

/**
 * Returns true if the given origin is permitted.
 *
 * Edge cases handled:
 *  1. Wildcard "*" — only safe when credentials are NOT required
 *  2. Exact match
 *  3. Subdomain wildcard  e.g. "*.railwayprep.app" matches "admin.railwayprep.app"
 */
function isOriginAllowed(origin: string): boolean {
  if (hasWildcard) return true;
  if (allowedExact.has(origin)) return true;

  // Subdomain check: origin must be https and end with ".{root}"
  for (const root of allowedSubdomainRoots) {
    try {
      const url = new URL(origin);
      // Reject plain HTTP subdomains in production
      if (env.NODE_ENV === "production" && url.protocol !== "https:") continue;
      if (url.hostname === root || url.hostname.endsWith(`.${root}`)) return true;
    } catch {
      // Malformed origin — reject
    }
  }

  return false;
}

// ─── CORS options ─────────────────────────────────────────────────────────────
export const corsOptions: cors.CorsOptions = {
  origin(origin, callback) {
    // No origin header: server-to-server, Postman, curl, mobile apps — allow
    if (!origin) return callback(null, true);

    if (isOriginAllowed(origin)) {
      // When credentials: true the reflected origin must be explicit (never "*")
      return callback(null, origin);
    }

    // Log blocked attempts for production monitoring
    logger.warn(`CORS blocked origin: ${origin}`);
    const err = new CorsError(`Origin '${origin}' is not permitted by CORS policy`);
    return callback(err, false);
  },

  credentials: true,

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "X-Device-ID",
    "X-CSRF-Token",
  ],

  // Headers the browser JS can read from the response
  exposedHeaders: [
    "X-RateLimit-Limit",
    "X-RateLimit-Remaining",
    "X-RateLimit-Reset",
    "X-Total-Count",    // for paginated list responses
  ],

  // Cache preflight for 24 h — eliminates repeated OPTIONS requests in production
  maxAge: 86_400,

  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// ─── Custom error class so error middleware can return 403 ────────────────────
export class CorsError extends Error {
  readonly status = 403;
  readonly code = "CORS_ORIGIN_NOT_ALLOWED";
  constructor(message: string) {
    super(message);
    this.name = "CorsError";
  }
}

// ─── Middleware stack ─────────────────────────────────────────────────────────
const corsMiddleware = cors(corsOptions);

/**
 * Handle preflight and attach CORS headers.
 * Must be registered BEFORE helmet and all routes.
 */
export function applyCors(req: Request, res: Response, next: NextFunction): void {
  corsMiddleware(req, res, (err) => {
    if (err) {
      // Provide a clean JSON 403 instead of leaking a generic 500
      const status = err instanceof CorsError ? 403 : 500;
      res.status(status).json({
        success: false,
        code: err instanceof CorsError ? err.code : "CORS_ERROR",
        message: err.message,
      });
      return;
    }
    next();
  });
}

/**
 * Explicit OPTIONS handler — must be registered BEFORE route definitions.
 * Responds 204 No Content to all preflight requests.
 */
export const handlePreflight = cors(corsOptions);
