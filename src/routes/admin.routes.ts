import { Router } from "express";
import {
  getDashboardStats, listUsers, deactivateUser, getSystemStats,
} from "../controllers/admin.controller";
import { authenticate } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";

const router = Router();

router.use(authenticate, requireAdmin);

router.get("/dashboard", getDashboardStats);
router.get("/stats",     getSystemStats);
router.get("/users",     listUsers);
router.patch("/users/:userId/deactivate", deactivateUser);

export default router;
