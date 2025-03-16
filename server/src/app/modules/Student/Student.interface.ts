import { IUser } from "../User/User.interface";

export interface IStudent extends IUser {
  classLevel: string;
  guardian?: {
    name?: string;
    phone?: string;
    email?: string;
    relationship?: string;
  };
}
