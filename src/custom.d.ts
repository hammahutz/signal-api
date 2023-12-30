import { User } from "./model/user-model";

declare global {
   namespace Express {
     interface Request {
       user: User
     }
   }
 }