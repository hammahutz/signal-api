import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../model/user-model";
import { LogError } from "../util";

const protect = expressAsyncHandler(async (req: Request, res: Response, next) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }

  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      //Get Token
      token = req.headers.authorization.split(" ")[1];
      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

      //Get user from token
      req.user = await User.findById(decoded._id).select("_id name email");

      next();
    } catch (error) {
      LogError(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(400);
    const error = "Not authorized, no token";
    LogError(error);
    throw new Error(error);
  }
});

export { protect };
