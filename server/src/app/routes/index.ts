import { Router } from "express";
import { UserRoutes } from "../modules/User/User.routes";
import { AuthRoutes } from "../modules/Auth/Auth.routes";
import { LssonRequestrRoutes } from "../modules/lessonRequest/lessonRequest.routes";
import { BookingRoutes } from "../modules/booking/booking.routes";
import { TutorRoutes } from "../modules/Tutor/Tutor.routes";
import { PaymentRoutes } from "../modules/payment/payment.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/tutor",
    route: TutorRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/request",
    route: LssonRequestrRoutes,
  },
  {
    path: "/bookings",
    route: BookingRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
