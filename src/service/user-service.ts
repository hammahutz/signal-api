import User from "../model/user-model";
import { IUser } from "../interfaces";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

export const validUserModel = ({ name, email, password }: IUser) => {
  if (!name || !email || !password) {
    return false;
  }
  return true;
};

export const userExists = async ({ email }: IUser) => {
  const user = await User.findOne({ email });

  if (user) {
    return true;
  }
  return false;
};

export const createUser = async ({ name, email, password }: IUser) => {
  if (!process.env.GEN_SALT) {
    throw new Error("GEN_SALT is not defined in the environment variables");
  }
  const saltGenerations = parseInt(process.env.GEN_SALT) ?? 10;
  const salt = await bcrypt.genSalt(saltGenerations);
  const hashedPassword: string = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hashedPassword });
  return user;
};

export const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

export const findUserByEmail = async (email: string) => await User.findOne({ email });

export const findUserById = async (id: ObjectId) => await User.findById(id);

//TODO Gör så att det går att använda string som type
export const passwordValid = async ({ password }: IUser, dbUser: IUser): Promise<boolean> => {
  const validPassword = bcrypt.compare(password, dbUser.password);

  return validPassword;
};

export const generateJWT = ({ _id }: IUser) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }

  const id = _id.toString();
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
