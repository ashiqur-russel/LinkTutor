import { Router } from "express";
import { lessonRequestControllers } from "./lessonRequest.controller";
import { TutorController } from "../Tutor/Tutor.controller";
import { Auth } from "../Auth/Auth.model";
import { UserRole } from "../User/User.interface";
import auth from "../../middleware/auth";

const router = Router();

router.post(
  "/create-lesson-request",
  lessonRequestControllers.createLessonRequest
);

router.get("/", lessonRequestControllers.getAllLessonRequests);

router.get("/:userId/my-request", lessonRequestControllers.getMyLessonRequest);
router.get(
  "/:userId/my-future-request",
  lessonRequestControllers.getMyUpcomingLessonRequest
);

router.post(
  "/:id/decline-request",
  lessonRequestControllers.declineLessonRequest
);

router.post(
  "/:id/cancel-request",
  auth(UserRole.STUDENT),
  lessonRequestControllers.cancelessonRequest
);

router.post("/:id/accept-request", lessonRequestControllers.acceptRequest);

export const LssonRequestrRoutes = router;
