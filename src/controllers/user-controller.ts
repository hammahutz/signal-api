import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import * as userService from "../service/user-service";
import User, { IUser } from "../model/user-model";

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
    const userData = req.body as IUser;

    if (!userService.validUserModel(userData)) {
      res.status(400);
      throw new Error(
        `Please add all fields. Name: ${
          userData.name ? "Valid" : "Invalid"
        }, Email: ${userData.email ? "Valid" : "Invalid"}, Password: ${
          userData.password ? "Valid" : "Invalid"
        }`
      );
    }

    if (await userService.userExists(userData)) {
      res.status(400);
      throw new Error(`User with email ${userData.email} already exist`);
    }

    const newUser = await userService.createUser(userData);
    if (!newUser) {
      res.status(500);
      throw new Error(`Can't create user. Please contact admin`);
    }

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token: userService.generateJWT(newUser.id),
    });
  }
);

export const loginUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const userData = req.body as IUser;
    const userDb = await userService.findUserByEmail(userData.email);

    if (!userDb) {
      res.status(400);
      throw new Error(`Invalid credentials, try again`);
    }

    if (!(await userService.passwordValid(userData, userDb))) {
      res.status(400);
      throw new Error(`Invalid credentials, try again`);
    }

    var token = userService.generateJWT(userDb.id);

    res.json({
      _id: userDb.id,
      name: userDb.name,
      email: userDb.email,
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
