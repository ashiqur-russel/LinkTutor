import { Router } from 'express';
import { bookingController } from './booking.controller';

const router = Router();

// Define routes
router.get('/', bookingController.getAll);

export default router;
