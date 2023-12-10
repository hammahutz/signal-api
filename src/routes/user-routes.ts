import { Router } from "express";
import {registerUser, getUsers} from "../controllers/user-controller";

const UserRouter: Router = Router();

UserRouter.route("/")
    .get(getUsers)
    .post(registerUser);

UserRouter.route("/:id")
    .get()
    .put()
    .delete();

export default UserRouter;