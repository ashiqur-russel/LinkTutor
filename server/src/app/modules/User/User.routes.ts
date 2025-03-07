import { Router } from "express";
import UserController from "./User.controller";

const router = Router();

router.post("/create-student", UserController.createStudent);
router.post("/create-tutor", UserController.createTutor);
export const UserRoutes = router;
