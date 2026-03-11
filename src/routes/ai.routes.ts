import { Router } from "express";
import { generateStudyPlan } from "../controllers/aiStudyPlan.controller";
import { extractQuestions, approveQuestions } from "../controllers/aiQuestion.controller";
import { authenticate } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";

const router = Router();

// AI Study Plan — any authenticated user
router.post("/study-plan",           authenticate, generateStudyPlan);

// AI Question Generator — admin only
router.post("/extract-questions",    authenticate, requireAdmin, extractQuestions);
router.post("/questions/approve",    authenticate, requireAdmin, approveQuestions);

export default router;
