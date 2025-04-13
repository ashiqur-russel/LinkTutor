import AppError from "../../errors/appError";
import { StatusCodes } from "http-status-codes";
import Review from "./review.model";

import { Booking } from "../booking/booking.model";
import Tutor from "../Tutor/Tutor.model";
import mongoose from "mongoose";

const leaveReview = async (
  payload: { rating: number; comment: string },
  bookingId: string,
  studentId: string
) => {
  const { rating, comment } = payload;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const booking = await Booking.findOne({
      _id: bookingId,
      studentId: studentId,
      bookingStatus: "active",
    }).session(session);

    if (!booking) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "You need to complete a session before leaving a review for this booking."
      );
    }

    const existingReview = await Review.findOne({
      bookingId: bookingId,
      studentId: studentId,
      tutorId: booking.tutorId,
    }).session(session);

    if (existingReview) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "You have already reviewed this tutor."
      );
    }

    if (!rating || !comment) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Review must include both a rating and a comment."
      );
    }

    const newReview = new Review({
      studentId: studentId,
      tutorId: booking.tutorId,
      bookingId: bookingId,
      rating,
      comment,
    });

    await newReview.save({ session });

    await updateTutorRating(booking.tutorId.toString(), session);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return newReview;
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateTutorRating = async (
  tutorId: string,
  session: mongoose.ClientSession
) => {
  try {
    const reviews = await Review.find({ tutorId: tutorId }).session(session);

    const totalRatings = reviews.length;
    const sumRatings = reviews.reduce(
      (sum, review) => sum + (review.rating ?? 0),
      0
    );

    const averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0;

    const updatedUser = await Tutor.findByIdAndUpdate(
      tutorId,
      { $set: { averageRating: averageRating } },
      { new: true, session }
    );

    if (!updatedUser) {
      throw new AppError(StatusCodes.NOT_FOUND, "Tutor not found.");
    }

    console.log(updatedUser);

    return updatedUser;
  } catch (error: any) {
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getReview = async (tutorId: string) => {
  try {
    const reviews = await Review.find({ tutor: tutorId }).populate(
      "student",
      "name email"
    );

    const avgRating =
      reviews.reduce((acc, review) => acc + (review.rating ?? 0), 0) /
      reviews.length;

    return { reviews, avgRating };
  } catch (error: any) {
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const ReviewService = {
  leaveReview,
  getReview,
};
