import { Model } from "mongoose";

export enum UserRole {
  STUDENT = "student",
  TUTOR = "tutor",
  ADMIN = "admin",
}

export interface IAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country?: string;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  address: IAddress;
  phone?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {
  checkUserExist(userId: any): Promise<IUserDocument | null>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isUserExistsByEmail(email: string): Promise<IUserDocument | null>;
}
