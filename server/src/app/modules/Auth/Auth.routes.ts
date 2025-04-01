import { Router } from "express";
import { AuthController } from "./Auth.controller";

const router = Router();

// Define routes
router.post("/login", AuthController.loginUser);
router.post(
  "/refresh-token",
  // validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);
export const AuthRoutes = router;
