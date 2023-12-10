import { Router } from "express";
import {registerUser, getUsers, loginUser, getUser} from "../controllers/user-controller";
import { protect } from "../middleware/authMiddleware";

const UserRouter: Router = Router();

UserRouter.route("/")
    .get(getUsers)
    .post(registerUser);

UserRouter.route("/:id")
    .get()
    .put()
    .delete();

UserRouter.route("/login")
    .post(loginUser)

    UserRouter.route("/me")
    .get(protect, getUser)

export default UserRouter;