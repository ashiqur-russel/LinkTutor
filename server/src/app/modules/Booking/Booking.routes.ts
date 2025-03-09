import { Router } from "express";
import { bookingControllers } from "./booking.controller";

const router = Router();

router.get("/", bookingControllers.getAllBookings);
router.get("/:userId", bookingControllers.getUserBookings);

//router.get("/my", getMyBookings);

//router.get("/my-upcoming", getMyUpcomingBookings);

export const BookingRoutes = router;
