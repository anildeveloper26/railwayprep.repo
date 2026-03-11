import { Router } from "express";
import {
  getComments, createComment, voteComment, deleteComment, pinComment,
} from "../controllers/comment.controller";
import { authenticate } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";

const router = Router();

router.get("/",          authenticate, getComments);
router.post("/",         authenticate, createComment);
router.post("/:id/vote", authenticate, voteComment);
router.delete("/:id",    authenticate, deleteComment);
router.patch("/:id/pin", authenticate, requireAdmin, pinComment);

export default router;
