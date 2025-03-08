import { Router } from "express";
import { bookingControllers } from "./booking.controller";

const router = Router();

router.get("/", bookingControllers.getAllBookings);
router.get("/:userId", bookingControllers.getUserBookings);

export const BookingRoutes = router;
