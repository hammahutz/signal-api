import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import {validUserModel, userExists, createUser, getAllUsers} from "../service/user-service";


const getUsers = expressAsyncHandler(
  async (req: Request, res, Response) => {
    const users = await getAllUsers();
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
    const {name, email, password} = req.body;

    if(!validUserModel(name, email, password)){
      res.status(400);
      throw new Error('Please add all fields');
    }

    if(await userExists(email)){
      res.status(400);
      throw new Error(`User with email ${email} already exist`);
    }

    const user = await createUser(name, email, password);
    if (!user) {
      res.status(500);
      throw new Error(`Can't create user. Please contact admin`);
    }

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
export { getUsers, registerUser };
