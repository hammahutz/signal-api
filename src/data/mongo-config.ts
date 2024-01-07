import {connect} from "mongoose";
import { Log } from "../util/logger";

const ConnectMongoDB = async () => {
    try {
        const conn = await connect(process.env.MONGO_URI!);
        Log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(process.env.NODE_ENV)

    } catch (error) {
        Log(error, "error");
        process.exit(1);
    }
};

export default ConnectMongoDB;