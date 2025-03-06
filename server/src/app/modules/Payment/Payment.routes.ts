import { Router } from 'express';
import { PaymentController } from './Payment.controller';

const router = Router();

// Define routes
router.get('/', PaymentController.getAll);

export default router;
