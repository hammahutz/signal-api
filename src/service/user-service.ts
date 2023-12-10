import { Request, Response } from "express";
import apiError from "../util/apiError";
import User from "../model/user-model";
import bcrypt from "bcryptjs";
import { StringExpression } from "mongoose";
import { Log } from "../util/logger";

export const validUserModel = (
  name: string,
  email: string,
  password: string
) => {
  if (!name || !email || !password) {
    return false;
  }
  return true;
};

export const userExists = async (email: string) => {
  const user = await User.findOne({ email });
  if (user) {
    return true;
  }
  return false;
};

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword: string = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hashedPassword });
  return user;
};

export const getAllUsers = async () => {
  const users = await User.find();
  return users
};
