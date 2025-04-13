import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { ReviewService } from "./review.service";

const leaveReview = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { bookingId } = req.params;

  console.log("first", userId, bookingId, req.body);

  const result = await ReviewService.leaveReview(req.body, bookingId, userId);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Review has been given successfully",
    data: result,
  });
});

const getReview = catchAsync(async (req: Request, res: Response) => {
  const { tutorId } = req.params;

  const result = await ReviewService.getReview(tutorId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Reviews fetched successfully",
    data: result,
  });
});

export const ReviewControllers = {
  leaveReview,
  getReview,
};
