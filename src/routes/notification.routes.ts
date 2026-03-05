import { Router } from "express";
import {
  listNotifications, getNotification,
  createNotification, updateNotification, deleteNotification,
} from "../controllers/notification.controller";
import { authenticate } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";

const router = Router();

// Public
router.get("/",    listNotifications);
router.get("/:id", getNotification);

// Admin only
router.post("/",      authenticate, requireAdmin, createNotification);
router.patch("/:id",  authenticate, requireAdmin, updateNotification);
router.delete("/:id", authenticate, requireAdmin, deleteNotification);

export default router;
