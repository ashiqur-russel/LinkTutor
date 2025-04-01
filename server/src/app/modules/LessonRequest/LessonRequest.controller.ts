// lessonRequest.controller.ts
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ILessonRequest } from "./lessonRequest.interface";
import { LessonRequestServices } from "./lessonRequest.service";

export const createLessonRequest = catchAsync(
  async (req: Request, res: Response) => {
    console.log("inside create lesson re controller");

    const data = await LessonRequestServices.createLessonRequest(req.body);
    console.log("inside create lesson re controller data res:", data);

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

    const { result, meta } = await LessonRequestServices.getMyLessonRequest(
      userId,
      req.query
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Lesson request fetched successfully",
      data: result,
      meta: meta,
    });
  }
);

export const getMyUpcomingLessonRequest = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    const { result, meta } =
      await LessonRequestServices.getMyUpcomingLessonRequest(userId, req.query);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Upcoming Lesson request fetched successfully",
      data: result,
      meta: meta,
    });
  }
);

export const getAllLessonRequests = catchAsync(
  async (req: Request, res: Response) => {
    const { result, meta } = await LessonRequestServices.getAllLessonRequests(
      req.query
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Lesson request fetched successfully",
      data: result,
      meta: meta,
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

const cancelessonRequest = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("inside cancel request controller");

  const updatedRequest = await LessonRequestServices.cancelLessonRequest(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Lesson request cancelled successfully!",
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
  getMyUpcomingLessonRequest,
  cancelessonRequest,
};
