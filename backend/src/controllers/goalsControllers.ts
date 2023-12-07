import {
  NextFunction,
  Request,
  Request as ExpressRequest,
  Response,
} from "express";
import Goal from "../models/goal.model";
import User from "../models/user.model";

interface CustomRequest extends ExpressRequest {
  user?: any;
}

// @route http://localhost:5000/api/goals
const getAllGoals = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
};

// @desc    Get goals
const getGoalByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(200).json({ message: "get by id" });
};

// @route http://localhost:5000/api/goals
const setGoal = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
    selectedDates: req.body.selectedDates,
    user: req.user.id,
  });

  res.status(200).json(goal);
};

// @route http://localhost:5000/api/goals/:id
const updateGoal = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {

  // res.status(200).json({ message: "update goal" + req.params.id });
   const goalId = req.params.id;

  const goal = await Goal.findById(goalId);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);

  // Make sure user is exists
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  // Make sure user is the owner of the goal
  // @ts-ignore: Unreachable code error
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(goalId, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
};

// @route http://localhost:5000/api/goals/:id
const deleteGoal = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  // @ts-ignore: Unreachable code error
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  // @ts-ignore: Unreachable code error
  await goal.deleteOne();

  res.status(200).json({ id: req.params.id });
};

export default {
  getAllGoals,
  getGoalByUserId,
  setGoal,
  updateGoal,
  deleteGoal,
};
