import { Request, Response } from "express";
import apiError from "../util/apiError";
import User from "../model/user-model";
import bcrypt from "bcryptjs";
import { StringExpression } from "mongoose";

const UserService = (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const getAllUsers = async () => await User.find();
  const getUser = () => {
    req.params.id

}

  const checkUserModel = (name: string, email: string, password: string) => {
    if (!name || !email || !password) {
        return false;
      apiError(
        res,
        400,
        `Please add all fields: Name ${name ? "VALID" : name}, Email ${
          email ? "VALID" : email
        } and Password ${password ? "VALID" : password}`
      );
    }
    return true
  };

  const userExists = async (email: string) => {
    const user = await User.findOne({ email });
    if (user) {
        return true;
      apiError(res, 400, `User with email ${email} already exists`);
    }
    return true;
  };

  const createUser = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedPassword });
    return user;
  }

  return { checkUserModel, checkIfUserExists, createUser };
};

export default UserService;
