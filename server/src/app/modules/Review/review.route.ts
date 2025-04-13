import express from "express";
import auth from "../../middleware/auth";
import { ReviewControllers } from "./review.controller";
import { UserRole } from "../User/User.interface";

const router = express.Router();

router.post(
  "/:bookingId",
  auth(UserRole.STUDENT),
  ReviewControllers.leaveReview
);
router.get("/:tutorId", auth(UserRole.TUTOR), ReviewControllers.getReview);

export const ReviewRoutes = router;
