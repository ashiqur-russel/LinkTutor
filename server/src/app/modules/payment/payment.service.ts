import config from "../../config";
import AppError from "../../errors/appError";
import { StatusCodes } from "http-status-codes";
import { LessonRequest } from "../lessonRequest/lessonRequest.model";
import User from "../User/User.model";
import { stripe } from "../../utils/stripe";

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

    console.log(session);

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
    // Ensure the `paymentIntentId` is a string
    console.log("Capturing payment with paymentIntentId:", paymentIntentId);

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

export const PaymentServices = {
  createStripeCheckoutSession,
  capturePayment,
  cancelPaymentIntent,
};
