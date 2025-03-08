// lessonRequest.controller.ts
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ILessonRequest } from "./lessonRequest.interface";
import { LessonRequestServices } from "./lessonRequest.service";

export const createLessonRequest = catchAsync(
  async (req: Request, res: Response) => {
    const data = await LessonRequestServices.createLessonRequest(req.body);

    sendResponse<ILessonRequest>(res, {
      statusCode: 201,
      success: true,
      message: "Lesson request created successfully",
      data,
    });
  }
);

export const getMyLessonRequest = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    await LessonRequestServices.getMyLessonRequest(userId);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Lesson request fetched successfully",
      data: {},
    });
  }
);

export const getAllLessonRequests = catchAsync(
  async (req: Request, res: Response) => {
    const data = await LessonRequestServices.getAllLessonRequests();

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Lesson request fetched successfully",
      data: {},
    });
  }
);
export const lessonRequestControllers = {
  createLessonRequest,
  getMyLessonRequest,
  getAllLessonRequests,
};
