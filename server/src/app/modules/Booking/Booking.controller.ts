import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookingServices } from "./Booking.service";

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingServices.getAllBookings(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bookigns fetched successfully",
    data: result,
  });
});

const getUserBookings = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await bookingServices.getUserBookings(userId, req.query);

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

export const cancelBooking = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req.user;

  const { bookingId } = req.params;
  const { reason } = req.body;

  const cancelledBooking = await bookingServices.cancelBooking(
    bookingId,
    userInfo,
    reason
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking cancelled successfully",
    data: cancelledBooking,
  });
});

export const bookingControllers = {
  getAllBookings,
  getUserBookings,
  getUserUpcomingBookings,
  cancelBooking,
};
