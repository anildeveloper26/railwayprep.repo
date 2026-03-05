import { Router } from "express";
import { getMyAnalytics } from "../controllers/analytics.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);
router.get("/", getMyAnalytics);

export default router;
