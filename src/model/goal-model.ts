import { Schema, model } from "mongoose";

const GoalSchema = new Schema(
  {
    text: { type: String, require: [true, "Please add a text value!"] },
  },
  {
    timestamps: true,
  }
);

export default model("Goal", GoalSchema);

