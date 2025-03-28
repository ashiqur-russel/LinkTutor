import { Router } from "express";
import { TutorController } from "./Tutor.controller";

const router = Router();

router.get("/", TutorController.getAllTutors);

export const TutorRoutes = router;
