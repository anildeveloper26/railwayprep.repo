import { Router } from "express";
import {
  createQuestion, listQuestions, getQuestion,
  updateQuestion, deleteQuestion, getPYQTopics,
} from "../controllers/question.controller";
import { authenticate } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";
import { validate } from "../middleware/validate.middleware";
import { createQuestionSchema } from "../validators/test.validator";

const router = Router();

// Public
router.get("/",           listQuestions);
router.get("/pyq-topics", getPYQTopics);
router.get("/:id",        getQuestion);

// Admin only
router.post("/",      authenticate, requireAdmin, validate(createQuestionSchema), createQuestion);
router.patch("/:id",  authenticate, requireAdmin, updateQuestion);
router.delete("/:id", authenticate, requireAdmin, deleteQuestion);

export default router;
