// student.model.ts
import mongoose, { Schema, Model } from "mongoose";
import { IUser } from "../User/User.interface";

export interface IGuardian {
  name: string;
  phone: string;
  email?: string;
  relationship?: string;
}

export interface IStudent extends IUser {}
