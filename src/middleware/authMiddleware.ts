import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../model/user-model";
import { log } from "console";

const protect = expressAsyncHandler(
  async (req: Request, res: Response, next) => {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defind in the environment variables");
    }

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");

        next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error("Not authorized");
      }
    }

    if (!token) {
      res.status(400);
      throw new Error("Not authorized, no token");
    }

  }
);

export { protect };
