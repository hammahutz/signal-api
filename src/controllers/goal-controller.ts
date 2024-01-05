import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Goal from "../model/goal-model";
import { Log } from "../util/logger";
import { stat } from "fs";
import { log } from "console";

/**
 * @desc Get all goals
 * @route GET /api/goals
 * @access Private
 */
export const getGoals = expressAsyncHandler(async (req: Request, res: Response) => {
  const goals = await Goal.find({ user: req.user._id });
  Log(`getGoals\n${goals}`, "success");
  res.status(200).json(goals);
});

/**
 * @description Get a goal
 * @route GET /api/goals/:id
 * @access Private
 */
export const getGoal = expressAsyncHandler(async (req: Request, res: Response) => {
  var id = req.params.id;
  const goal = await Goal.findById(id).where("user", req.user._id);

  if (!goal) {
    var errorMessage = `Bad request! Cant find the goal with id: ${id}`;
    Log(errorMessage, "error");
    res.status(400);
    throw new Error(errorMessage);
  }

  Log(`Get goal with id ${id}\n${goal}`, "success");
  res.status(200).json(goal);
});

/**
 * @desc Set a goal
 * @route SET /api/goals
 * @access Private
 */
export const setGoal = expressAsyncHandler(async (req: Request, res: Response) => {
  console.log(req.body)
  if (!req.body.text) {
    var errorMessage =
      "Bad request! Cant set the goal, please add a text field.";
    Log(errorMessage, "error");
    res.status(400);
    throw new Error(errorMessage);
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user._id,
  });
  Log(`A new goal was set\n${goal}`, "success");
  res.status(201).json(goal);
});

/**
 * @desc Update a goal
 * @route Update /api/goals/:id
 * @access Private
 */
export const updateGoal = expressAsyncHandler(async (req: Request, res: Response) => {
  if (!req.body.text) {
    var errorMessage = `Bad request! Cant update goal, please add a text field`;
    Log(errorMessage, "error");
    res.status(400);
    throw new Error(errorMessage);
  }

  var id = req.params.id;
  const goal = await Goal.findById(id).where("user", req.user._id);

  if (!goal) {
    var errorMessage = `Bad request! Cant find the goal to update with id: ${id}`;
    Log(errorMessage, "error");
    res.status(400);
    throw new Error(errorMessage);
  }

  const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, { new: true }).where("user", req.user._id);

  Log(`Updated goal with id ${id}\n${updatedGoal}`, "success");

  res.status(200).json({ id: id, text: req.body.text });
});

/**
 * @desc Delete a goal
 * @route Delete /api/goals/:id
 * @access Private
 */
export const deleteGoal = expressAsyncHandler(async (req: Request, res: Response) => {
  var id = req.params.id;
  const goal = await Goal.findById(id).where("user", req.user._id);

  if (!goal) {
    var errorMessage = `Bad request! Cant find the goal to delete with id: ${id}`;
    Log(errorMessage, "error");
    res.status(400);
    throw new Error(errorMessage);
  }

  var deletedGoal = await Goal.findByIdAndDelete(id).where("user", req.user._id);;
  var successMessage = `Deleted goal with id ${id}\n${deletedGoal}`;
  Log(successMessage, "success");

  res.status(200).json({ id: id });
});
