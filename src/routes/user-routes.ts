import { Router } from "express";
import {registerUser} from "../controllers/user-controller";

const UserRouter: Router = Router();

UserRouter.route("/")
    .get()
    .post(registerUser);

UserRouter.route("/:id")
    .get()
    .put()
    .delete();

export default UserRouter;