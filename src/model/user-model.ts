import { Schema, model } from "mongoose";
import { IUser } from "../interfaces";

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, require: [true, "Please add a name!"] },
    email: {
      type: String,
      require: [true, "Please add a email!"],
      unique: true,
    },
    password: { type: String, require: [true, "Please add a password!"] },
  },
  {
    timestamps: true,
  }
);

export default model("User", UserSchema);
