import { Schema, Model } from "mongoose";
import { IStudent } from "./Student.interface";
import { UserRole } from "../User/User.interface";
import User from "../User/User.model";

const GuardianSchema: Schema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  relationship: { type: String },
});

const StudentSchema: Schema = new Schema({
  grade: { type: String, required: true },
  guardian: { type: GuardianSchema, required: true },
});

const Student: Model<IStudent> = User.discriminator<IStudent>(
  UserRole.STUDENT,
  StudentSchema
);

export default Student;
