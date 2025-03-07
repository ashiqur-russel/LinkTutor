import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import UserService from "./User.service";

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createStudent(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Student created successfully",
    data: result,
  });
});

const createTutor = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createTutor(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Tutor created successfully",
    data: result,
  });
});

export default { createStudent, createTutor };
