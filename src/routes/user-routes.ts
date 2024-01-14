import { Router } from "express";
import * as userController from "../controllers/user-controller";
import { protect } from "../middleware/authMiddleware";

const UserRouter: Router = Router();

UserRouter.route("/").get(userController.getUsers).post(userController.registerUser);

UserRouter.route("/:id").get().put().delete();

UserRouter.route("/login").post(userController.loginUser);

UserRouter.route("/me").get(protect, userController.getMe);

export default UserRouter;
