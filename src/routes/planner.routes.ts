import { Router } from "express";
import {
  getMyTasks, createTask, updateTask, deleteTask, getPlannerStats,
} from "../controllers/planner.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { plannerTaskSchema } from "../validators/attempt.validator";

const router = Router();

router.use(authenticate);

router.get("/",        getMyTasks);
router.get("/stats",   getPlannerStats);
router.post("/",       validate(plannerTaskSchema), createTask);
router.patch("/:id",   updateTask);
router.delete("/:id",  deleteTask);

export default router;
