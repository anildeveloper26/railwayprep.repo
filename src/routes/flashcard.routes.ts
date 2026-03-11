import { Router } from "express";
import {
  getFlashcards,
  reviewFlashcard,
  getFlashcardProgress,
  createCustomFlashcard,
} from "../controllers/flashcard.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);

router.get("/",             getFlashcards);
router.get("/progress",     getFlashcardProgress);
router.post("/custom",      createCustomFlashcard);
router.post("/:id/review",  reviewFlashcard);

export default router;
