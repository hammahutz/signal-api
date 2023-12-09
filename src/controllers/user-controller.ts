import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import UserService from "../service/user-service";

const getAllUsers = expressAsyncHandler(
  async (req: Request, res, Response) => {
    const userService = UserService(req, res)
    const users = userService.getAllUsers();
    res.status(200).json(users);
  }
);

/**
 * @description Register a new user
 * @route POST /api/users
 * @access Public
 */
const registerUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const userService = UserService(req, res);

    userService.checkUserModel();
    await userService.checkIfUserExists();
    const user = await userService.createUser();

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  }
);

const loginUser = expressAsyncHandler(async (req: Request, res: Response) => {
  res.json({ message: "loginUser" });
});

const getUser = expressAsyncHandler(async (req: Request, res: Response) => {
  res.json({ message: "Get user" });
});
export { registerUser };
