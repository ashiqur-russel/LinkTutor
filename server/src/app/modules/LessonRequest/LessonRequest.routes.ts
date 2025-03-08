import { Router } from "express";
import { lessonRequestControllers } from "./lessonRequest.controller";

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

export const LssonRequestrRoutes = router;
