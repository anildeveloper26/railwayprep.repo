import { Router } from "express";
import {
  register, login, refreshTokens, logout, getMe, updateProfile,
} from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { registerSchema, loginSchema } from "../validators/auth.validator";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login",    validate(loginSchema),    login);
router.post("/refresh",  refreshTokens);
router.post("/logout",   authenticate, logout);
router.get("/me",        authenticate, getMe);
router.patch("/me",      authenticate, updateProfile);

export default router;
