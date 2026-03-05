import { Router } from "express";
import {
  getPlans, createOrder, verifyPayment, getMySubscription,
} from "../controllers/subscription.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Public
router.get("/plans", getPlans);

// Authenticated
router.use(authenticate);
router.get("/my",          getMySubscription);
router.post("/order",      createOrder);
router.post("/verify",     verifyPayment);

export default router;
