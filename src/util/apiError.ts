import { Response } from "express";
import { Log } from "./logger";


const apiError= (res: Response, status: number, message: string) =>{
    res.status(status)
    Log(message, 'error');
    throw new Error(message)
}

export default apiError;