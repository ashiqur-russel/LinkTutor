import { Request, Response } from "express";
import { TutorServices } from "./Tutor.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { StatusCodes } from "http-status-codes";

const getAllTutors = catchAsync(async (req, res) => {
  const result = await TutorServices.getAllTutors(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Users are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

export const TutorController = {
  getAllTutors,
};
