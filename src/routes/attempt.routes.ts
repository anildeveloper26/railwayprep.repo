import { Router } from "express";
import { submitAttempt, getMyAttempts, getAttemptById } from "../controllers/attempt.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { submitAttemptSchema } from "../validators/attempt.validator";

const router = Router();

router.use(authenticate);

router.post("/:testId/submit", validate(submitAttemptSchema), submitAttempt);
router.get("/",                getMyAttempts);
router.get("/:attemptId",      getAttemptById);

export default router;
