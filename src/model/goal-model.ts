import { Schema, model } from "mongoose";
import { IGoal } from "../interfaces";

const GoalSchema = new Schema<IGoal>(
  {
    user: { type: Schema.Types.ObjectId, require: true, ref: "User" },
    text: { type: String, require: [true, "Please add a text value!"] },
    completeDate: { type: Date },
    archiveDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

export default model("Goal", GoalSchema);
