import { Request, Response, NextFunction } from "express";
import { verifyAccessToken, JwtPayload } from "../utils/jwt";
import { AppError } from "../utils/apiResponse";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Authentication required", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyAccessToken(token);

    // Device lock: if a deviceId is bound to this session, the request must come from that device
    if (payload.deviceId) {
      const requestDeviceId = req.headers["x-device-id"] as string | undefined;
      if (!requestDeviceId || requestDeviceId !== payload.deviceId) {
        return next(new AppError("Access restricted to the device where you logged in", 403));
      }
    }

    req.user = payload;
    next();
  } catch {
    next(new AppError("Invalid or expired token", 401));
  }
}
