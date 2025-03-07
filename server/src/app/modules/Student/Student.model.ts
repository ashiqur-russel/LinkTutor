import { Schema } from "mongoose";
import { IStudent } from "./Student.interface";
import { UserRole } from "../User/User.interface";
import User from "../User/User.model";

const StudentSchema: Schema<IStudent> = new Schema({
  classLevel: { type: String, required: true },
  guardian: {
    name: { type: String },
    phone: { type: String },
    email: { type: String },
    relationship: { type: String },
  },
});

const Student = User.discriminator<IStudent>(UserRole.STUDENT, StudentSchema);

export default Student;
