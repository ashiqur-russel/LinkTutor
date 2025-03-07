import { Router } from "express";
import { AuthController } from "./Auth.controller";

const router = Router();

// Define routes
router.post("/login", AuthController.loginUser);

export const AuthRoutes = router;
