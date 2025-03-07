import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import AppError from "../../errors/appError";
import User from "../User/User.model";
import { IStudent } from "../Student/Student.interface";
import { ITutor } from "../Tutor/Tutor.interface";
import { UserRole } from "./User.interface";
import Tutor from "../Tutor/Tutor.model";

import Student from "../Student/Student.model";

const createStudent = async (studentData: IStudent) => {
  studentData.role = UserRole.STUDENT;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const existingUser = await User.findOne({
      email: studentData.email,
    }).session(session);
    if (existingUser) {
      throw new AppError(
        StatusCodes.NOT_ACCEPTABLE,
        "Email is already registered"
      );
    }

    const newStudent = new Student(studentData);
    const createdStudent = await newStudent.save({ session });

    await session.commitTransaction();
    return createdStudent;
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    throw error;
  } finally {
    session.endSession();
  }
};

const createTutor = async (tutorData: ITutor) => {
  tutorData.role = UserRole.TUTOR;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const existingUser = await User.findOne({ email: tutorData.email }).session(
      session
    );
    if (existingUser) {
      throw new AppError(
        StatusCodes.NOT_ACCEPTABLE,
        "Email is already registered"
      );
    }

    const newTutor = new Tutor(tutorData);
    const createdTutor = await newTutor.save({ session });

    await session.commitTransaction();
    return createdTutor;
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    throw error;
  } finally {
    session.endSession();
  }
};

export default {
  createStudent,
  createTutor,
};
