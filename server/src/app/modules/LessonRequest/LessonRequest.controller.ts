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

const declineLessonRequest = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const updatedRequest = await LessonRequestServices.declineLessonRequest(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Lesson request declined successfully!",
    data: updatedRequest,
  });
});

export const acceptRequest = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const { request, booking } = await LessonRequestServices.acceptRequest(id);

  // Return success
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Lesson request accepted successfully, booking created!",
    data: {
      request,
      booking,
    },
  });
});

export const lessonRequestControllers = {
  createLessonRequest,
  getMyLessonRequest,
  getAllLessonRequests,
  declineLessonRequest,
  acceptRequest,
};
