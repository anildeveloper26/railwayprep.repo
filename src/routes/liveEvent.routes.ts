import { Router } from "express";
import {
  listEvents, getEvent, registerForEvent, submitEvent,
  getEventLeaderboard, createEvent, updateEvent,
} from "../controllers/liveEvent.controller";
import { authenticate } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";

const router = Router();

router.get("/",                    authenticate, listEvents);
router.get("/:id",                 authenticate, getEvent);
router.post("/:id/register",       authenticate, registerForEvent);
router.post("/:id/submit",         authenticate, submitEvent);
router.get("/:id/leaderboard",     authenticate, getEventLeaderboard);
router.post("/",                   authenticate, requireAdmin, createEvent);
router.patch("/:id",               authenticate, requireAdmin, updateEvent);

export default router;
