// lessonRequest.service.ts

import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import { ILessonRequest } from "./lessonRequest.interface";
import { LessonRequest } from "./lessonRequest.model";
import { UserRole } from "../User/User.interface";
import Tutor from "../Tutor/Tutor.model";
import Student from "../Student/Student.model";
import { checkTimeslotAvailability } from "../../utils/timeslot.utils";
import {
  getUTCMinutes,
  getUtcWeekdayName,
  parseTimeToMinutes,
} from "./lessonRequest.utils";
import User from "../User/User.model";
import { format } from "date-fns";
import { Booking } from "../booking/booking.model";
import mongoose, { Types } from "mongoose";
import QueryBuilder from "../../builder/QueryBilder";
import { PaymentServices } from "../payment/payment.service";
import { Payment } from "../payment/payment.model";
import { stripe } from "../../utils/stripe";
import { IBooking } from "../booking/booking.interface";
import { PaymentStatus } from "../booking/booking.constant";
import { IPayment } from "../payment/payment.interface";
import { bookingServices } from "../booking/booking.service";

/**
 * createLessonRequest:
 * 1. Tutor & student must exist and be active.
 * 2. Requested timeslot must be in the future and within tutor's availability.
 * 3. Only 1-hour or 2-hour sessions are allowed (60 or 120 minutes).
 * 4. If any existing request (pending, accepted, or declined) overlaps the same timeslot,
 *    block the new request.
 */

const createLessonRequest = async (payload: ILessonRequest) => {
  try {
    const tutorUser = await Tutor.findById(payload.tutorId);
    if (!tutorUser || tutorUser.role !== UserRole.TUTOR) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        "Tutor does not exist or is not active!"
      );
    }

    const studentUser = await Student.findById(payload.studentId);
    if (!studentUser || studentUser.role !== UserRole.STUDENT) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        "Student does not exist or is not active!"
      );
    }

    const sessionStart = new Date(payload.sessionStart);
    const sessionEnd = new Date(payload.sessionEnd);
    sessionStart.setSeconds(0, 0);
    sessionEnd.setSeconds(0, 0);

    // Check for overlapping session requests for the same tutor, where status is "accepted" (for other students)
    const existingRequest = await LessonRequest.findOne({
      tutorId: payload.tutorId,
      status: "accepted",
      studentId: { $ne: payload.studentId },
      $or: [
        {
          sessionStart: { $lt: sessionEnd },
          sessionEnd: { $gt: sessionStart },
        },
      ],
    });

    if (existingRequest) {
      throw new AppError(
        StatusCodes.CONFLICT,
        `The tutor is not available on this selected time!.`
      );
    }

    const lessonRequest = await LessonRequest.create({
      ...payload,
      sessionStart,
      sessionEnd,
      duration:
        (sessionEnd.getTime() - sessionStart.getTime()) / (1000 * 60 * 60),
    });

    const duration = lessonRequest.duration;
    const hourRate = tutorUser?.hourRate;
    if (!hourRate) {
      throw new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Tutor hourly rate is missing!"
      );
    }
    const { sessionId } = await PaymentServices.createStripeCheckoutSession({
      amount: hourRate * Number(duration),
      studentId: payload.studentId.toString(),
      lessonRequestId: lessonRequest._id.toString(),
      tutorId: lessonRequest.tutorId.toString(),
      subject: lessonRequest.subject,
      duration: Number(duration),
    });

    if (!sessionId) {
      throw new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to create payment session."
      );
    }

    return { sessionId };
  } catch (error) {
    console.error("Error creating lesson request:", error);
    throw error;
  }
};

const getAllLessonRequests = async (query: Record<string, unknown>) => {
  const lessonQuery = new QueryBuilder(LessonRequest.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await lessonQuery.modelQuery;
  const meta = await lessonQuery.countTotal();

  return { result, meta };
};

const getLessonRequestById = async (id: string) => {
  return LessonRequest.findById(id);
};

const getMyLessonRequest = async (
  userId: string,
  query: Record<string, unknown>
) => {
  const user = await (User as any).checkUserExist(userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User does not exist!");
  }

  let filter = {};
  if (user.role === UserRole.STUDENT) {
    filter = { studentId: userId };
  } else if (user.role === UserRole.TUTOR) {
    filter = { tutorId: userId };
  }

  const lessonQuery = new QueryBuilder(
    LessonRequest.find(filter)
      .populate("tutorId", "name _id")
      .populate("studentId", "name _id"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await lessonQuery.modelQuery;
  const meta = await lessonQuery.countTotal();

  return { result, meta };
};

const getMyUpcomingLessonRequest = async (
  userId: string,
  query: Record<string, unknown>
) => {
  const user = await (User as any).checkUserExist(userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User does not exist!");
  }

  let filter = {};
  const currentDate = new Date();

  if (user.role === UserRole.STUDENT) {
    filter = { studentId: userId, sessionDate: { $gte: currentDate } };
  } else if (user.role === UserRole.TUTOR) {
    filter = { tutorId: userId, sessionDate: { $gte: currentDate } };
  }

  const lessonQuery = new QueryBuilder(
    LessonRequest.find(filter)
      .populate("tutorId", "name _id")
      .populate("studentId", "name _id"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  
  const result = await lessonQuery.modelQuery;
  const meta = await lessonQuery.countTotal();

  return { result, meta };
};

/**
 * Tutor declines a lesson request by ID.
 * @param requestId The _id of the lesson request document
 * TODO: Validate tutor should be matched witht he request tutorID
 */
const declineLessonRequest = async (requestId: string) => {
  const request = await LessonRequest.findById(requestId);

  if (!request) {
    throw new AppError(StatusCodes.NOT_FOUND, "Lesson request not found!");
  }

  if (request.isDeclined) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "This request is already declined!"
    );
  }

  if (request.isAccepted) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Request is already accepted and cannot be declined!"
    );
  }

  request.isDeclined = true;
  request.status = "declined";
  await request.save();

  return request;
};

const cancelLessonRequest = async (requestId: string) => {
  const request = await LessonRequest.findById(requestId);

  if (!request) {
    throw new AppError(StatusCodes.NOT_FOUND, "Lesson request not found!");
  }

  if (request.status === "cancelled") {
    throw new AppError(
      StatusCodes.CONFLICT,
      "This request is already cancelled!"
    );
  }

  if (request.isAccepted) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Request is already accepted and cannot be cancelled!"
    );
  }

  request.status = "cancelled";
  await request.save();

  return request;
};


const acceptRequest = async (requestId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const request = await LessonRequest.findById(requestId).session(session);
    if (!request) {
      throw new AppError(StatusCodes.NOT_FOUND, "Lesson request not found!");
    }

    if (request.isDeclined) {
      throw new AppError(
        StatusCodes.CONFLICT,
        "Cannot accept a request that is already declined!"
      );
    }
    if (request.isAccepted) {
      throw new AppError(
        StatusCodes.CONFLICT,
        "This request is already accepted!"
      );
    }

    request.isAccepted = true;
    request.status = "accepted";
    await request.save({ session });

    if (!request.paymentIntentId) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "No payment intent ID found for this request"
      );
    }

    // Retrieve the payment (capture)
    const paymentIntent = await stripe.paymentIntents.retrieve(
      request.paymentIntentId
    );

    if (paymentIntent.status === "requires_capture") {
      const capturedPayment = await stripe.paymentIntents.capture(
        paymentIntent.id
      );

      if (capturedPayment.status === "succeeded") {
        request.paymentStatus = "paid";
        await request.save({ session });

        const paymentData = new Payment({
          lessonRequestId: request._id,
          paymentIntentId: capturedPayment.id,
          amount: capturedPayment.amount_received / 100,
          currency: capturedPayment.currency,
          status: "paid",
          studentId: request.studentId,
          tutorId: request.tutorId,
        });
        await paymentData.save({ session });

        const bookingPayload: Partial<IBooking> = {
          tutorId: request.tutorId,
          studentId: request.studentId,
          lessonRequestId: request._id,
          subject: request.subject,
          sessionDate: request.sessionDate,
          sessionStart: request.sessionStart,
          sessionEnd: request.sessionEnd,
          paymentStatus: PaymentStatus.PAID,
        };
        const newBooking = await bookingServices.createBooking(
          bookingPayload,
          session
        );

        // Add bookingId to Payment
        await Payment.findOneAndUpdate(
          { lessonRequestId: request._id },
          { bookingId: newBooking._id },
          { session }
        );

        await session.commitTransaction();
        session.endSession();
        return request;
      } else {
        console.error(
          `Payment capture failed for PaymentIntent ${paymentIntent.id}. Status: ${capturedPayment.status}`
        );
        throw new AppError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          `Payment capture failed. Status: ${capturedPayment.status}`
        );
      }
    } else if (paymentIntent.status === "succeeded") {
      // If the payment intent is already succeeded, it might have been captured by a webhook.
      // In this case, we should still proceed to create the booking if not already done.
      if (request.paymentStatus !== "paid") {
        request.paymentStatus = "paid";
        await request.save({ session });

        const existingPayment = await Payment.findOne({
          lessonRequestId: request._id,
        }).session(session);
        if (!existingPayment) {
          const paymentData = new Payment({
            lessonRequestId: request._id,
            paymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount_received / 100,
            currency: paymentIntent.currency,
            status: "paid",
            studentId: request.studentId,
            tutorId: request.tutorId,
          });
          await paymentData.save({ session });
        }

        const existingBooking = await Booking.findOne({
          lessonRequestId: request._id,
        })
          .session(session)
          .exec();
        if (!existingBooking) {
          const bookingPayload: Partial<IBooking> = {
            tutorId: request.tutorId,
            studentId: request.studentId,
            lessonRequestId: request._id,
            subject: request.subject,
            sessionDate: request.sessionDate,
            sessionStart: request.sessionStart,
            sessionEnd: request.sessionEnd,
            paymentStatus: PaymentStatus.PAID,
          };
          const newBooking = await bookingServices.createBooking(
            bookingPayload,
            session
          );

          // Add bookingId to Payment
          await Payment.findOneAndUpdate(
            { lessonRequestId: request._id },
            { bookingId: newBooking._id },
            { session }
          );
        }
      }

      await session.commitTransaction();
      session.endSession();
      return request;
    } else {
      console.warn(
        `PaymentIntent ${paymentIntent.id} is not ready for capture. Status: ${paymentIntent.status}`
      );
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        `PaymentIntent is not ready for capture. Current status: ${paymentIntent.status}`
      );
    }
  } catch (error) {
    console.error(`Error accepting lesson request ${requestId}:`, error);
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const LessonRequestServices = {
  createLessonRequest,
  getAllLessonRequests,
  getLessonRequestById,
  getMyLessonRequest,
  declineLessonRequest,
  acceptRequest,
  getMyUpcomingLessonRequest,
  cancelLessonRequest,
};
