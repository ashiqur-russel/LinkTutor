import { Router } from 'express';
import { BookingController } from './Booking.controller';

const router = Router();

// Define routes
router.get('/', BookingController.getAll);

export default router;
