import { Router } from "express";
import { TutorController } from "./Tutor.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../User/User.interface";

const router = Router();

router.get("/", TutorController.getAllTutors);
router.get("/tutors",auth(UserRole.STUDENT),TutorController.getStudentTutorsList);

router.get("/:tutorId", TutorController.getTutorInfo);



export const TutorRoutes = router;
