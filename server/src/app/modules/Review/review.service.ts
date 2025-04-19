import AppError from "../../errors/appError";
import { StatusCodes } from "http-status-codes";
import Review from "./review.model";

import { Booking } from "../booking/booking.model";
import Tutor from "../Tutor/Tutor.model";
import mongoose from "mongoose";
import { UserRole } from "../User/User.interface";

const leaveReview = async (
  payload: { rating: number; comment: string },
  tutorId: string,
  studentId: string
) => {
  const { rating, comment } = payload;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const booking = await Booking.findOne({
      studentId: studentId,
      tutorId: tutorId,
      bookingStatus: "active",
    }).session(session);

    if (!booking) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "You need to complete atleast one session with this tutor before leaving a review."
      );
    }

    const existingReview = await Review.findOne({
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

    return updatedUser;
  } catch (error: any) {
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getReview = async (tutorId: string) => {
  try {
    const reviews = await Review.find({ tutorId })
    .select('studentId rating comment updatedAt -_id') 
    .populate('studentId', 'name -_id');
    
    return { reviews };
  } catch (error: any) {
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getReviewsByStudentId = async (studentId: string) => {
  try {
    const reviews = await Review.find({
      studentId: studentId,
    }).populate("tutorId", "name");

    return reviews;
  } catch (error: any) {
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateReviewByStudent = async (
  studentId: string,
  reviewId: string,
  payload: { rating?: number; comment?: string }
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { rating, comment } = payload;

    if (!rating && !comment) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "At least one of rating or comment must be provided."
      );
    }

    const review = await Review.findOne({
      _id: reviewId,
      studentId,
    }).session(session);

    if (!review) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        "Review not found or unauthorized."
      );
    }

    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;

    await review.save({ session });

    await updateTutorRating(review.tutorId.toString(), session);

    await session.commitTransaction();
    session.endSession();

    return review;
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const ReviewService = {
  leaveReview,
  getReview,
  getReviewsByStudentId,
  updateReviewByStudent,
};
