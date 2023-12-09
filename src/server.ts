import dotenv from "dotenv";
import express, { Express, ErrorRequestHandler } from "express";
import "colors";

import ConnectMongoDB from "./data/mongo-config.js";
import GoalRouter from "./routes/goal-routes.js";
import UserRouter from "./routes/user-routes.js";
import ErrorHandler from "./middleware/error-middleware.js";
import { Log } from "./util/logger.js";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", GoalRouter);
app.use("/api/users", UserRouter);

app.use(ErrorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => Log(`Server start on port ${port}`));

ConnectMongoDB();
