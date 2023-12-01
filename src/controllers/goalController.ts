import { Request, Response } from "express";

// @desc Get all goals
// @route GET /api/goals
// @access Private
const getGoals = (req: Request, res: Response) => {
    const message = "Get goals"
  res.status(200).json({ message: message });
  console.log(message);

};

// @desc Get a goal
// @route GET /api/goals/:id
// @access Private
const getGoal = (req: Request, res: Response) => {
  res.status(200).json({ message: `Get Goal with id ${req.params.id}` });
};

// @desc Set a goal
// @route SET /api/goals
// @access Private
const setGoal = (req: Request, res: Response) => {
  res.status(200).json({ message: "Set goal" });
};

// @desc Update a goal
// @route Update /api/goals/:id
// @access Private
const updateGoal = (req: Request, res: Response) => {
  res.status(200).json({ message: `Update goal ${req.params.id}` });
};

// @desc Delete a goal
// @route Detlete /api/goals/:id
// @access Private
const deleteGoal = (req: Request, res: Response) => {
  res.status(200).json({ message: `Delete goal ${req.params.id}` });
};

export { getGoals, getGoal, setGoal, updateGoal, deleteGoal };
