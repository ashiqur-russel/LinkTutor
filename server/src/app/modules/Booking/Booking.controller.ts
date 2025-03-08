import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookingServices } from "./booking.service";

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingServices.getAllBookings();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bookigns fetched successfully",
    data: result,
  });
});

const getUserBookings = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await bookingServices.getUserBookings(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bookigns fetched successfully",
    data: result,
  });
});

export const bookingControllers = { getAllBookings, getUserBookings };
