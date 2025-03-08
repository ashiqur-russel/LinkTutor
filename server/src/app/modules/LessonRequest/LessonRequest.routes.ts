import { Router } from "express";
import { lessonRequestControllers } from "./lessonRequest.controller";
import { TutorController } from "../Tutor/Tutor.controller";

const router = Router();

router.post(
  "/create-lesson-request",
  lessonRequestControllers.createLessonRequest
);

router.get("/", lessonRequestControllers.getAllLessonRequests);

router.get("/:userId/my-request", lessonRequestControllers.getMyLessonRequest);

router.post(
  "/:id/decline-request",
  lessonRequestControllers.declineLessonRequest
);

router.post("/:id/accept-request", lessonRequestControllers.acceptRequest);

export const LssonRequestrRoutes = router;
