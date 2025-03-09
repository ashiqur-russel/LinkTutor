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

export const getUserUpcomingBookings = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    //const userId = req.user._id.toString();
    const upcomingBookings = await bookingServices.getUserUpcomingBookings(
      userId
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Upcoming bookings retrieved successfully",
      data: upcomingBookings,
    });
  }
);

export const bookingControllers = {
  getAllBookings,
  getUserBookings,
  getUserUpcomingBookings,
};
