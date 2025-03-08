import { Router } from "express";
import { lessonRequestControllers } from "./lessonRequest.controller";

const router = Router();

router.post(
  "/create-lesson-request",
  lessonRequestControllers.createLessonRequest
);

export const LssonRequestrRoutes = router;
