import { Router } from "express";
import { UserRoutes } from "../modules/User/User.routes";
import { AuthRoutes } from "../modules/Auth/Auth.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
