import dotenv from "dotenv";
import express, { Express, ErrorRequestHandler } from "express";
import "colors"

import connectDb from "./data/connectDb.js";
import goalRouter from "./routes/goalRoutes.js";
import errorHandler from "./middleware/errorMiddlewar.js";

dotenv.config();
const port = process.env.PORT;

connectDb();
const app: Express = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalRouter);

app.use(errorHandler);

app.listen(port, () => console.log(`Server start on port ${port}`.cyan.underline));
