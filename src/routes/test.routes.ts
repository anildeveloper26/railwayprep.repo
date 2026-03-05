import { Router } from "express";
import {
  createTest, listTests, getTest, getTestForReview,
  updateTest, deleteTest, addQuestionsToTest,
} from "../controllers/test.controller";
import { authenticate } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";
import { validate } from "../middleware/validate.middleware";
import { createTestSchema, listTestsSchema } from "../validators/test.validator";

const router = Router();

// Public list, auth required to take test
router.get("/",                                  validate(listTestsSchema), listTests);
router.get("/:testId",             authenticate, getTest);
router.get("/:testId/review",      authenticate, getTestForReview);

// Admin only
router.post("/",                   authenticate, requireAdmin, validate(createTestSchema), createTest);
router.patch("/:testId",           authenticate, requireAdmin, updateTest);
router.delete("/:testId",          authenticate, requireAdmin, deleteTest);
router.post("/:testId/questions",  authenticate, requireAdmin, addQuestionsToTest);

export default router;
