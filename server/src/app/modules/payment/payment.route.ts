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

export const PaymentRoutes = router;
