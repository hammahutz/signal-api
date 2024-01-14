import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Goal from "../model/goal-model";
import { LogError, LogSuccess } from "../util";
import { IGoal, IGoalUpdate } from "../interfaces";

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

export const completeGoal = expressAsyncHandler(async (req: Request<{ id: string }>, res: Response) => {
  const goalId = req.params.id;
  const userID = req.user._id;

  const completedGoal = await Goal.findByIdAndUpdate(goalId, { completeDate: new Date(Date.now()) } as IGoalUpdate, {
    new: true,
  }).where("user", userID);

  if (!updateGoal || completedGoal?.errors || !completedGoal?.isModified) {
    const errorMessage = `Can't complete goal with ${goalId} \n${completedGoal?.errors}\nIs modified?:${completedGoal?.isModified}`;
    LogError(errorMessage);
    throw new Error(errorMessage);
  }

  LogSuccess(`Updated goal with id ${goalId}\n${completedGoal}`);

  res.status(200).json(completedGoal);
});

export const resetGoal = expressAsyncHandler(async (req: Request<{ id: string }>, res: Response) => {
  const goalId = req.params.id;
  const userID = req.user._id;

  const goalDocument = await Goal.findById(goalId);
  const goalObject = goalDocument?.toObject<IGoal>();

  if (!updateGoal || goal?.errors || !goal?.isModified) {
    const errorMessage = `Can't complete goal with ${goalId} \n${goal?.errors}\nIs modified?:${goal?.isModified}`;
    LogError(errorMessage);
    throw new Error(errorMessage);
  }

  LogSuccess(`Updated goal with id ${goalId}\n${goal}`);

  res.status(200).json(goal);
});

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
