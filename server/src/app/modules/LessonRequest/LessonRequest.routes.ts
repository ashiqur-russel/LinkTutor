import { Router } from "express";
import { lessonRequestControllers } from "./lessonRequest.controller";
import { UserRole } from "../User/User.interface";
import auth from "../../middleware/auth";

const router = Router();

router.post(
  "/create-lesson-request",
  auth(UserRole.STUDENT),
  lessonRequestControllers.createLessonRequest
);

router.get(
  "/",
  auth(UserRole.ADMIN),
  lessonRequestControllers.getAllLessonRequests
);

router.get(
  "/:userId/my-request",
  auth(UserRole.STUDENT, UserRole.TUTOR),
  lessonRequestControllers.getMyLessonRequest
);
router.get(
  "/:userId/my-future-request",
  auth(UserRole.STUDENT, UserRole.TUTOR),
  lessonRequestControllers.getMyUpcomingLessonRequest
);

router.post(
  "/:id/decline-request",
  auth(UserRole.TUTOR),
  lessonRequestControllers.declineLessonRequest
);

router.post(
  "/:id/cancel-request",
  auth(UserRole.STUDENT),
  lessonRequestControllers.cancelessonRequest
);

router.post(
  "/:id/accept-request",
  auth(UserRole.TUTOR),
  lessonRequestControllers.acceptRequest
);

export const LssonRequestrRoutes = router;
