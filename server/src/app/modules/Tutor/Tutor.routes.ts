import { Router } from "express";
import { TutorController } from "./Tutor.controller";

const router = Router();

router.get("/", TutorController.getAllTutors);
router.get("/:tutorId", TutorController.getTutorInfo);


export const TutorRoutes = router;
