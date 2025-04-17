import express from "express";
import auth from "../../middleware/auth";
import { ReviewControllers } from "./review.controller";
import { UserRole } from "../User/User.interface";

const router = express.Router();

router.post(
  "/:tutorId",
  auth(UserRole.STUDENT),
  ReviewControllers.leaveReview
);
router.get("/:tutorId", auth(UserRole.TUTOR), ReviewControllers.getReview);
router.get(
  "/student/reviews",
  auth(UserRole.STUDENT),
  ReviewControllers.getReviewsByStudent
);
router.put(
  "/update/:reviewId",
  auth(UserRole.STUDENT),
  ReviewControllers.updateReview
);

export const ReviewRoutes = router;
