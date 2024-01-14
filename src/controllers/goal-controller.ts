import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Goal from "../model/goal-model";
import { LogError, LogSuccess } from "../util";
import { IGoal, IGoalUpdate } from "../interfaces";
import { UpdateQuery } from "mongoose";

/**
 *
 * @desc Get all goals
 * @route GET /api/goals
 * @access Private
 */
export const getGoals = expressAsyncHandler(async (req: Request, res: Response) => {
  const goals = await Goal.find({ user: req.user._id });
  LogSuccess(`getGoals\n${goals}`);
  res.status(200).json(goals);
});

/**
 * @description Get a goal
 * @route GET /api/goals/:id
 * @access Private
 */
export const getGoal = expressAsyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const goal = await Goal.findById(id).where("user", req.user._id);

  if (!goal) {
    const errorMessage = `Bad request! Cant find the goal with id: ${id}`;
    LogError(errorMessage);
    res.status(400);
    throw new Error(errorMessage);
  }

  LogSuccess(`Get goal with id ${id}\n${goal}`);
  res.status(200).json(goal);
});

/**
 * @desc Set a goal
 * @route SET /api/goals
 * @access Private
 */
export const setGoal = expressAsyncHandler(async (req: Request, res: Response) => {
  if (!req.body.text) {
    const errorMessage = "Bad request! Cant set the goal, please add a text field.";
    LogError(errorMessage);
    res.status(400);
    throw new Error(errorMessage);
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user._id,
  });
  LogSuccess(`A new goal was set\n${goal}`);
  res.status(201).json(goal);
});

/**
 * @desc Update a goal
 * @route Update /api/goals/:id
 * @access Private
 */
export const updateGoal = expressAsyncHandler(
  async (req: Request<{ id: string }, object, IGoalUpdate>, res: Response) => {
    const goalUpdate = req.body;
    const goalId = req.params.id;
    const userID = req.user._id;

    const updatedGoal = await Goal.findByIdAndUpdate(goalId, goalUpdate, { new: true }).where("user", userID);

    if (!updateGoal || updatedGoal?.errors || !updatedGoal?.isModified) {
      const errorMessage = `Can't update goal with ${goalId} ${goalUpdate} \n${updatedGoal?.errors}\nIs modified?:${updatedGoal?.isModified}`;
      LogError(errorMessage);
      throw new Error(errorMessage);
    }

    LogSuccess(`Updated goal with id ${goalId}\n${updatedGoal}`);

    res.status(200).json(updatedGoal);
  }
);

export const setStatus = expressAsyncHandler(
  async (req: Request<{ id: string }, object, { isCompleted: boolean }>, res: Response) => {
    const goalId = req.params.id;
    const userID = req.user._id;
    const goalStatus = req.body;

    if (goalStatus.isCompleted === undefined) {
      const errorMessage = `Can't toggle goal with ${goalId}`;
      LogError(errorMessage);
      res.status(400).json({ message: "Bad Request, did not include 'isCompleted: boolean'" });
      throw new Error(errorMessage);
    }

    const updateQuery: UpdateQuery<IGoal> = goalStatus.isCompleted
      ? { completeDate: new Date(Date.now()) }
      : { $unset: { completeDate: "" } };

    const updatedGoal = await Goal.findByIdAndUpdate(goalId, updateQuery, { new: true }).where("user", userID);

    if (!updatedGoal || updatedGoal?.errors || !updatedGoal?.isModified) {
      const errorMessage = `Can't toggle goal with ${goalId} \n${updatedGoal?.errors}\nIs modified?:${updatedGoal?.isModified}`;
      LogError(errorMessage);
      throw new Error(errorMessage);
    }

    LogSuccess(`Rest the goal with id ${goalId}\n${updatedGoal}`);

    res.status(200).json(updatedGoal);
  }
);

/**
 * @desc Delete a goal
 * @route Delete /api/goals/:id
 * @access Private
 */
export const deleteGoal = expressAsyncHandler(async (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id;

  const deletedGoal = await Goal.findByIdAndDelete(id).where("user", req.user._id);

  if (deletedGoal.ok === 0) {
    const errorMessage = `Can't delete goal with ${id} - Deleted goal${deletedGoal}`;
    LogError(errorMessage);
    throw new Error(errorMessage);
  }

  const successMessage = `Deleted goal with id ${id}\n${deletedGoal}`;
  LogSuccess(successMessage);

  res.status(200).json({ id });
});
