import { connect } from "mongoose";
import { Log, LogError } from "../util";

const ConnectMongoDB = async () => {
  try {
    const conn = await connect(process.env.MONGO_URI!);
    Log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    LogError(error);
    process.exit(1);
  }
};

export default ConnectMongoDB;
