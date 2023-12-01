import express, { Router } from "express";
import {
  getGoals,
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goalController";

const goalRouter: Router = express.Router();

goalRouter.route("/").get(getGoals).post(setGoal);

goalRouter.route("/:id").get(getGoal).put(updateGoal).delete(deleteGoal);

export default goalRouter;
