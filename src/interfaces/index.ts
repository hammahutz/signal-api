import { ObjectId } from "mongoose";

export interface IGoal {
  _id: ObjectId;
  user: ObjectId;
  text?: string;
  completeDate?: Date | null;
  archiveDate?: Date;
}

export interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
}

export interface IGoalUpdate {
  text?: string;
  completeDate?: Date;
  archiveDate?: Date;
}
