import { Request, Response } from "express";
import Stripe from "stripe";
import config from "../../config";
import { StatusCodes } from "http-status-codes";
import { LessonRequest } from "../lessonRequest/lessonRequest.model";
import sendResponse from "../../utils/sendResponse";
import { stripe } from "../../utils/stripe";
import catchAsync from "../../utils/catchAsync";
import { PaymentServices } from "./payment.service";

export const stripeWebhookHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const sig = req.headers["stripe-signature"];
    if (!sig) {
      sendResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
        message: "Webhook Error: Missing signature",
        data: null,
      });
      return;
    }

    let event: Stripe.Event;
    const webhookSecret = config.stripe.stripe_webhook_secret_live as string;

    try {
      const body = req.body as Buffer;
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
      sendResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
        message: `Webhook Signature Error: ${(err as Error).message}`,
        data: null,
      });
      return;
    }

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        const metadataFromCheckout = session.metadata;
        const lessonRequestIdFromCheckout =
          metadataFromCheckout?.lessonRequestId;

        if (lessonRequestIdFromCheckout) {
          try {
            const lessonRequest = await LessonRequest.findById(
              lessonRequestIdFromCheckout
            );

            if (lessonRequest) {
              lessonRequest.paymentIntentId = session.payment_intent as string;
              lessonRequest.paymentStatus = "hold";
              await lessonRequest.save();
              console.log(
                `Lesson request ${lessonRequestIdFromCheckout} updated after checkout completion.`
              );
            } else {
              console.log(
                `Lesson request not found for ID: ${lessonRequestIdFromCheckout}`
              );
            }
          } catch (error) {
            console.error(
              "Error updating lesson request after checkout completion:",
              error
            );
          }
        }

        sendResponse(res, {
          statusCode: StatusCodes.OK,
          success: true,
          message: "Checkout session completed event received and processed.",
          data: null,
        });
        break;
      case "payment_intent.amount_capturable_updated":
        const paymentIntentCapturable = event.data
          .object as Stripe.PaymentIntent;
        const metadataCapturable = paymentIntentCapturable.metadata;

        const lessonRequestIdCapturable = metadataCapturable.lessonRequestId;
        if (!lessonRequestIdCapturable) {
          console.warn(
            "Lesson Request ID not found in payment intent metadata for amount_capturable_updated"
          );
          break;
        }

        try {
          const lessonRequestCapturable = await LessonRequest.findById(
            lessonRequestIdCapturable
          );

          if (!lessonRequestCapturable) {
            break;
          }

          if (paymentIntentCapturable.status === "requires_capture") {
            lessonRequestCapturable.paymentStatus = "hold";
            await lessonRequestCapturable.save();

            sendResponse(res, {
              statusCode: StatusCodes.OK,
              success: true,
              message: "Payment authorized, awaiting tutor's capture.",
              data: null,
            });
          } else if (paymentIntentCapturable.status === "succeeded") {
            lessonRequestCapturable.paymentStatus = "paid";
            await lessonRequestCapturable.save();

            sendResponse(res, {
              statusCode: StatusCodes.OK,
              success: true,
              message: "Payment captured and lesson request updated.",
              data: null,
            });
          }
        } catch (error) {
          console.error(
            "Error processing payment_intent.amount_capturable_updated:",
            error
          );
        }
        break;
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data
          .object as Stripe.PaymentIntent;
        const metadataSucceeded = paymentIntentSucceeded.metadata;
        const lessonRequestIdSucceeded = metadataSucceeded.lessonRequestId;

        if (lessonRequestIdSucceeded) {
          try {
            const lessonRequestSucceeded = await LessonRequest.findById(
              lessonRequestIdSucceeded
            );
            if (
              lessonRequestSucceeded &&
              lessonRequestSucceeded.paymentStatus !== "paid"
            ) {
              lessonRequestSucceeded.paymentStatus = "paid";
              await lessonRequestSucceeded.save();
              console.log(
                `Lesson request ${lessonRequestIdSucceeded} updated to 'paid' due to payment_intent.succeeded.`
              );
            }
          } catch (error) {
            console.error(
              "Error updating lesson request on payment_intent.succeeded:",
              error
            );
          }
        }
        sendResponse(res, {
          statusCode: StatusCodes.OK,
          success: true,
          message: "Payment intent succeeded event received.",
          data: null,
        });
        break;
      case "payment_intent.payment_failed":
        const paymentIntentFailed = event.data.object as Stripe.PaymentIntent;
        const metadataFailed = paymentIntentFailed.metadata;
        const lessonRequestIdFailed = metadataFailed.lessonRequestId;

        if (lessonRequestIdFailed) {
          try {
            const lessonRequestFailed = await LessonRequest.findById(
              lessonRequestIdFailed
            );
            if (lessonRequestFailed) {
              lessonRequestFailed.paymentStatus = "failed";
              await lessonRequestFailed.save();
              console.log(
                `Lesson request ${lessonRequestIdFailed} updated to 'failed' due to payment_intent.payment_failed.`
              );
            }
          } catch (error) {
            console.error(
              "Error updating lesson request on payment_intent.payment_failed:",
              error
            );
          }
        }
        sendResponse(res, {
          statusCode: StatusCodes.OK,
          success: true,
          message: "Payment intent failed event received.",
          data: null,
        });
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
        sendResponse(res, {
          statusCode: StatusCodes.OK,
          success: true,
          message: `Received unhandled event type: ${event.type}`,
          data: null,
        });
    }
  } catch (error) {
    console.error("Webhook Error:", error);
    sendResponse(res, {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      success: false,
      message:
        "Internal Server Error: Something went wrong in webhook processing",
      data: null,
    });
  }
};

export const getUserPaymentHistory = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { result, meta } = await PaymentServices.getUserPaymentHistory(
      userId,
      req.query
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Payment history fetchedsuccessfully",
      data: result,
      meta: meta
        ? {
            ...meta,
            totalPage: meta.totalPages,
          }
        : undefined,
    });
  }
);

export const PaymentControllers = {
  stripeWebhookHandler,
  getUserPaymentHistory,
};
