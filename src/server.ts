import dotenv from "dotenv";
import express, { Express } from "express";
import goalRouter from "./routes/goalRoutes.js";

dotenv.config();

const port = process.env.PORT;
const app: Express = express();

app.use("/api/goals", goalRouter);

app.listen(port, () => console.log(`Server start on port ${port}`));
