import { Schema, model } from "mongoose";

const GoalSchema = new Schema(
  {
    user: {type: Schema.Types.ObjectId, require: true, ref: 'User'},
    text: { type: String, require: [true, "Please add a text value!"] },
  },
  {
    timestamps: true,
  }
);

export default model("Goal", GoalSchema);

