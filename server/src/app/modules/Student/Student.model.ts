import { Schema } from "mongoose";
import { IStudent } from "./Student.interface";
import { UserRole } from "../User/User.interface";
import User from "../User/User.model";

const guardianSchema: Schema = new Schema({
  name: { type: String, required: false },
  phone: { type: String, required: false },
  email: { type: String, required: false },
  relationship: { type: String, required: false },
});

const StudentSchema: Schema<IStudent> = new Schema({
  classLevel: { type: String, required: false, default: null },
  guardian: {
    type: guardianSchema,
    required: false,
    default: null,
  },
});

const Student = User.discriminator<IStudent>(UserRole.STUDENT, StudentSchema);

export default Student;
