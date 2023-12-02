import dotenv from "dotenv";
import express, { Express, ErrorRequestHandler } from "express";
import "colors"

import ConnectMongoDB from "./data/mongo-config.js";
import goalRouter from "./routes/goal-routes.js";
import ErrorHandler from "./middleware/error-middlewar.js";
import { Log } from "./util/logger.js";

dotenv.config();
const port = process.env.PORT;

ConnectMongoDB();
const app: Express = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalRouter);

app.use(ErrorHandler);

app.listen(port, () => Log(`Server start on port ${port}`));
