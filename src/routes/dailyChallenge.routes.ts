import { Router } from "express";
import {
  getDailyChallenge,
  submitDailyChallenge,
  getStreak,
} from "../controllers/dailyChallenge.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);

router.get("/",        getDailyChallenge);
router.post("/submit", submitDailyChallenge);
router.get("/streak",  getStreak);

export default router;
