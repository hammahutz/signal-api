import { Router } from "express";
import {
  getGoals,
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goal-controller";

const GoalRouter: Router = Router();

GoalRouter.route("/").get(getGoals).post(setGoal);

GoalRouter.route("/:id").get(getGoal).put(updateGoal).delete(deleteGoal);

export default GoalRouter;
