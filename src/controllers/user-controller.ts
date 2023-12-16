import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import * as userService from "../service/user-service";
import User from "../model/user-model";

export const getUsers = expressAsyncHandler(
  async (req: Request, res, Response) => {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  }
);

/**
 * @description Register a new user
 * @route POST /api/users
 * @access Public
 */
export const registerUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!userService.validUserModel(name, email, password)) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    if (await userService.userExists(email)) {
      res.status(400);
      throw new Error(`User with email ${email} already exist`);
    }

    const user = await userService.createUser(name, email, password);
    if (!user) {
      res.status(500);
      throw new Error(`Can't create user. Please contact admin`);
    }

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: userService.generateJWT(user.id),
    });
  }
);

export const loginUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await userService.findUserByEmail(email);

    if (!user) {
      res.status(400);
      throw new Error(`Invalid credentials, try again`);
    }

    if (!(await userService.passwordValid(password, user))) {
      res.status(400);
      throw new Error(`Invalid credentials, try again`);
    }

    var token = userService.generateJWT(user.id);

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    });
  }
);

export const getUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    var user = await userService.findUserById(req.user._id);

    if (!user) {
      res.status(400);
      throw new Error(`Can't find a user with id ${req.user._id}`);
    }

    res.json(user);
  }
);

export const getMe = expressAsyncHandler(
  async (req: Request, res: Response) => {
    res.json(req.user);
  }
);
