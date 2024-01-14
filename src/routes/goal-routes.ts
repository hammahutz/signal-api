import { Router } from "express";
import * as goalController from "../controllers/goal-controller";
import { protect } from "../middleware/authMiddleware";

const GoalRouter: Router = Router();

GoalRouter.route("/").get(protect, goalController.getGoals).post(protect, goalController.setGoal);

GoalRouter.route("/:id")
  .get(protect, goalController.getGoal)
  .patch(protect, goalController.updateGoal)
  .delete(protect, goalController.deleteGoal);

GoalRouter.route("/status/:id").patch(protect, goalController.setStatus);

export default GoalRouter;
