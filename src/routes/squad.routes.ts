import { Router } from "express";
import {
  getMySquads, createSquad, getSquad, joinSquad, leaveSquad,
  getSquadLeaderboard, getMessages, postMessage,
} from "../controllers/squad.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);

router.get("/",                     getMySquads);
router.post("/",                    createSquad);
router.get("/:id",                  getSquad);
router.post("/:id/join",            joinSquad);
router.delete("/:id/leave",         leaveSquad);
router.get("/:id/leaderboard",      getSquadLeaderboard);
router.get("/:id/messages",         getMessages);
router.post("/:id/messages",        postMessage);

export default router;
