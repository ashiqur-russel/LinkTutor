// src/app/modules/payment/payment.route.ts
import express from "express";
import auth from "../../middleware/auth";
import { UserRole } from "../User/User.interface";
import { PaymentControllers } from "./payment.controller";

const router = express.Router();

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  PaymentControllers.stripeWebhookHandler
);

router.get(
  "/:userId",
  auth(UserRole.STUDENT, UserRole.TUTOR, UserRole.ADMIN),
  PaymentControllers.getUserPaymentHistory
);

export const PaymentRoutes = router;
