import { Router } from "express";
import { getLeaderboard } from "../controllers/leaderboard.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Optionally authenticated (rank shown if logged in)
router.get("/", authenticate, getLeaderboard);

export default router;
