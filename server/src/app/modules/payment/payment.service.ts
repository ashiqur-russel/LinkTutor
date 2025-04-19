import config from "../../config";
import AppError from "../../errors/appError";
import { StatusCodes } from "http-status-codes";
import { LessonRequest } from "../lessonRequest/lessonRequest.model";
import User from "../User/User.model";
import { stripe } from "../../utils/stripe";
import { Payment } from "./payment.model";
import { UserRole } from "../User/User.interface";
import QueryBuilder from "../../builder/QueryBilder";
import mongoose from "mongoose";
import AggregateQueryBuilder from "../../builder/AggregateQueryBuilder";
import { IPayment } from "./payment.interface";
import { TMeta } from "../../utils/sendResponse";

export const createStripeCheckoutSession = async ({
  amount,
  lessonRequestId,
  studentId,
  tutorId,
  subject,
  duration,
}: {
  amount: number;
  lessonRequestId: string;
  studentId: string;
  tutorId: string;
  subject: string;
  duration: number;
}) => {
  try {
    const student = await User.findById(studentId);
    if (!student) {
      throw new AppError(StatusCodes.NOT_FOUND, "Student not found");
    }

    const studentEmail = student.email;

    const lessonRequest = await LessonRequest.findById(lessonRequestId);
    if (!lessonRequest) {
      throw new AppError(StatusCodes.NOT_FOUND, "Lesson request not found");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Lesson on ${subject}`,
              description: `Lesson with ${tutorId}`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        lessonRequestId,
        studentId,
        tutorId,
        subject,
        duration,
        studentEmail,
      },
      mode: "payment",
      success_url: `${config.stripe.frontend_url}/student/payment-success`,
      cancel_url: `${config.stripe.frontend_url}/payment-cancelled`,
      payment_intent_data: {
        capture_method: "manual",
      },
    });

    return { sessionId: session.id, lessonRequestId };
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to create checkout session"
    );
  }
};

const capturePayment = async (paymentIntentId: string) => {
  try {
    const lessonRequest = await LessonRequest.findOne({
      paymentIntentId: paymentIntentId,
    });
    if (!lessonRequest) {
      throw new AppError(StatusCodes.NOT_FOUND, "Lesson request not found");
    }

    if (!lessonRequest.paymentIntentId) {
      throw new AppError(StatusCodes.NOT_FOUND, "PaymentIntent ID not found");
    }

    // Capture the payment for the PaymentIntent
    const paymentIntent = await stripe.paymentIntents.capture(
      lessonRequest.paymentIntentId
    );

    if (paymentIntent.status !== "succeeded") {
      throw new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Payment capture failed"
      );
    }

    // Optionally update the lesson request to indicate payment was successful
    lessonRequest.paymentStatus = "paid";
    await lessonRequest.save();

    return paymentIntent;
  } catch (error) {
    console.error("Error capturing payment:", error);
    throw error;
  }
};

const cancelPaymentIntent = async (lessonRequestId: string) => {
  try {
    const lessonRequest = await LessonRequest.findById(lessonRequestId);

    if (!lessonRequest) {
      throw new AppError(StatusCodes.NOT_FOUND, "Lesson request not found");
    }

    const paymentIntentId = lessonRequest.paymentIntentId;
    if (!paymentIntentId) {
      throw new AppError(StatusCodes.NOT_FOUND, "PaymentIntent ID not found");
    }

    await stripe.paymentIntents.cancel(paymentIntentId);

    lessonRequest.paymentStatus = "cancelled";
    await lessonRequest.save();

    return { success: true };
  } catch (error) {
    console.error("Error canceling payment intent:", error);
    throw error;
  }
};

const getUserPaymentHistory1 = async (
  userId: string,
  query?: Record<string, unknown>
) => {
  let result: any[] = [];
  let meta;
  const user = await User.findById({ _id: userId });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }

  const paymentModel = Payment as mongoose.Model<IPayment>;
  const aggregateQueryBuilder = new AggregateQueryBuilder(
    paymentModel,
    query || {}
  );

  if (user.role === UserRole.STUDENT) {
    aggregateQueryBuilder.filter().sort().paginate().fields();

    aggregateQueryBuilder.pipeline.unshift({
      $match: { studentId: new mongoose.Types.ObjectId(userId) },
    });
    aggregateQueryBuilder.pipeline.push(
      {
        $lookup: {
          from: "users",
          localField: "tutorId",
          foreignField: "_id",
          as: "tutor",
        },
      },
      { $unwind: { path: "$tutor", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "bookings",
          localField: "bookingId",
          foreignField: "_id",
          as: "booking",
        },
      },
      { $unwind: { path: "$booking", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          amount: 1,
          currency: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
          tutor: {
            name: "$tutor.name",
          },

          booking: {
            sessionDate: "$booking.sessionDate",
          },
        },
      }
    );

    result = await aggregateQueryBuilder.build();
    const total = await aggregateQueryBuilder.countTotal();
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 10;

    meta = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  if (user.role === UserRole.TUTOR) {
    aggregateQueryBuilder.filter().sort().paginate().fields();

    aggregateQueryBuilder.pipeline.unshift({
      $match: { tutorId: new mongoose.Types.ObjectId(userId) },
    });
    aggregateQueryBuilder.pipeline.push(
      {
        $lookup: {
          from: "users",
          localField: "studentId",
          foreignField: "_id",
          as: "student",
        },
      },
      { $unwind: { path: "$student", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "bookings",
          localField: "bookingId",
          foreignField: "_id",
          as: "booking",
        },
      },
      { $unwind: { path: "$booking", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          amount: 1,
          currency: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
          student: {
            name: "$student.name",
            classLevel: "$student.classLevel",
          },

          booking: {
            sessionDate: "$booking.sessionDate",
          },
        },
      }
    );

    result = await aggregateQueryBuilder.build();
    const total = await aggregateQueryBuilder.countTotal();
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 10;

    meta = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  return { result, meta };
};

const calculateStudentPaymentAggregations = async (
  userId: string,
  paymentModel: mongoose.Model<IPayment>
) => {
  const aggregationResult = await paymentModel.aggregate([
    { $match: { studentId: new mongoose.Types.ObjectId(userId) } },
    {
      $facet: {
        totalAmountSpent: [
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ],
        totalBookings: [{ $count: "count" }],
      },
    },
    {
      $project: {
        _id: 0,
        totalAmountSpent: { $arrayElemAt: ["$totalAmountSpent.total", 0] },
        totalBookings: { $arrayElemAt: ["$totalBookings.count", 0] },
      },
    },
  ]);

  return {
    totalAmountSpent: aggregationResult[0]?.totalAmountSpent || 0,
    totalBookings: aggregationResult[0]?.totalBookings || 0,
  };
};

const calculateTutorPaymentAggregations = async (
  userId: string,
  paymentModel: mongoose.Model<IPayment>
) => {
  const aggregationResult = await paymentModel.aggregate([
    { $match: { tutorId: new mongoose.Types.ObjectId(userId) } },
    {
      $facet: {
        totalAmountEarned: [
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ],
        totalBookings: [{ $count: "count" }],
      },
    },
    {
      $project: {
        _id: 0,
        totalAmountEarned: { $arrayElemAt: ["$totalAmountEarned.total", 0] },
        totalBookings: { $arrayElemAt: ["$totalBookings.count", 0] },
      },
    },
  ]);

  return {
    totalAmountEarned: aggregationResult[0]?.totalAmountEarned || 0,
    totalBookings: aggregationResult[0]?.totalBookings || 0,
  };
};

const getUserPaymentHistory = async (
  userId: string,
  query?: Record<string, unknown>
) => {
  let result: any[] = [];
  let meta: any = {};
  const user = await User.findById({ _id: userId });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }

  const paymentModel = Payment as mongoose.Model<IPayment>;
  const aggregateQueryBuilder = new AggregateQueryBuilder(
    paymentModel,
    query || {}
  );

  if (user.role === UserRole.STUDENT) {
    aggregateQueryBuilder.filter().sort().paginate().fields();

    aggregateQueryBuilder.pipeline.unshift({
      $match: { studentId: new mongoose.Types.ObjectId(userId) },
    });
    aggregateQueryBuilder.pipeline.push(
      {
        $lookup: {
          from: "users",
          localField: "tutorId",
          foreignField: "_id",
          as: "tutor",
        },
      },
      { $unwind: { path: "$tutor", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "bookings",
          localField: "bookingId",
          foreignField: "_id",
          as: "booking",
        },
      },
      { $unwind: { path: "$booking", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          amount: 1,
          status: 1,
          createdAt: 1,
          tutor: {
            name: "$tutor.name",
          },
          booking: {
            sessionDate: "$booking.sessionDate",
            subject: "$booking.subject",
          },
        },
      }
    );

    result = await aggregateQueryBuilder.build();
    const total = await aggregateQueryBuilder.countTotal();
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 10;
    const aggregations = await calculateStudentPaymentAggregations(
      userId,
      paymentModel
    );

    meta = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      totalAmountSpent: aggregations.totalAmountSpent,
      totalBookings: aggregations.totalBookings,
    };
  }

  if (user.role === UserRole.TUTOR) {
    aggregateQueryBuilder.filter().sort().paginate().fields();

    aggregateQueryBuilder.pipeline.unshift({
      $match: { tutorId: new mongoose.Types.ObjectId(userId) },
    });
    aggregateQueryBuilder.pipeline.push(
      {
        $lookup: {
          from: "users",
          localField: "studentId",
          foreignField: "_id",
          as: "student",
        },
      },
      { $unwind: { path: "$student", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "bookings",
          localField: "bookingId",
          foreignField: "_id",
          as: "booking",
        },
      },
      { $unwind: { path: "$booking", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          amount: 1,
          status: 1,
          createdAt: 1,
          student: {
            name: "$student.name",
            classLevel: "$student.classLevel",
          },
          booking: {
            sessionDate: "$booking.sessionDate",
            subject: "$booking.subject",
          },
        },
      }
    );

    result = await aggregateQueryBuilder.build();
    const total = await aggregateQueryBuilder.countTotal();
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 10;
    const aggregations = await calculateTutorPaymentAggregations(
      userId,
      paymentModel
    );

    meta = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      totalAmountEarned: aggregations.totalAmountEarned,
      totalBookings: aggregations.totalBookings,
    };
  }

  return { result, meta };
};

export const PaymentServices = {
  createStripeCheckoutSession,
  capturePayment,
  cancelPaymentIntent,
  getUserPaymentHistory,
};
