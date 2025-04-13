import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { UserRole } from "../User/User.interface";
import auth from "../../middleware/auth";
import { bookingControllers } from "./booking.controller";

const router = Router();

router.get("/", bookingControllers.getAllBookings);
router.get("/:userId", bookingControllers.getUserBookings);
router.put(
  "/:bookingId/cancel",
  auth(UserRole.STUDENT, UserRole.STUDENT),
  bookingControllers.cancelBooking
);

//router.get("/my", getMyBookings);

//router.get("/my-upcoming", getMyUpcomingBookings);

export const BookingRoutes = router;
