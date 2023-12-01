import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
/**
 * @desc Get all goals
 * @route GET /api/goals
 * @access Private
 */
const getGoals = expressAsyncHandler(async (req: Request, res: Response) => {
  const message = "Get goals";
  res.status(200).json({ message: message });
  console.log(message);
});

// @desc Get a goal
// @route GET /api/goals/:id
// @access Private
const getGoal = expressAsyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: `Get Goal with id ${req.params.id}` });
});

// @desc Set a goal
// @route SET /api/goals
// @access Private
const setGoal = expressAsyncHandler(async (req: Request, res: Response) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  res.status(200).json({ message: `Set goal: ${req.body.text}` });
});

// @desc Update a goal
// @route Update /api/goals/:id
// @access Private
const updateGoal = expressAsyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: `Update goal ${req.params.id}` });
});

// @desc Delete a goal
// @route Detlete /api/goals/:id
// @access Private
const deleteGoal = expressAsyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: `Delete goal ${req.params.id}` });
});

export { getGoals, getGoal, setGoal, updateGoal, deleteGoal };
