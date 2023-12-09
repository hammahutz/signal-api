
import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, require: [true, "Please add a name!"] },
    email: { type: String, require: [true, "Please add a email!"], unique: true },
    password: { type: String, require: [true, "Please add a password!"] },
  },
  {
    timestamps: true,
  }
);

export default model("User", UserSchema);

