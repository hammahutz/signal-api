import { Request, Response } from "express";
import apiError from "../util/apiError";
import User from "../model/user-model";
import bcrypt from "bcryptjs";
import { StringExpression } from "mongoose";
import { Log } from "../util/logger";
import jwt  from "jsonwebtoken";

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
  return users;
};

export const findUserByEmail = async (email: string) =>
  await User.findOne({ email });

export const findUserById = async (_id: string) => await User.findById(_id);

//TODO Gör så att det går att använda string som type
export const passwordValid = async (passwordA: any, passwordB: any) => {
  const validRequest = passwordA && passwordB;
  const validPassword = await bcrypt.compare(passwordA, passwordB);

  return validRequest && validPassword;
};

export const generateJWT = (id: string) => {
  if(!process.env.JWT_SECRET){
    throw new Error('JWT_SECRET is not defind in the environment variables');
  }

  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}
