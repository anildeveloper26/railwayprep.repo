import { Router } from "express";
import {
  getReferralLink,
  getReferralStats,
  applyReferralCode,
  redeemCredits,
} from "../controllers/referral.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);

router.get("/link",    getReferralLink);
router.get("/stats",   getReferralStats);
router.post("/apply",  applyReferralCode);
router.post("/redeem", redeemCredits);

export default router;
