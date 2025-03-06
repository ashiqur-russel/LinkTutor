import { Router } from 'express';
import { ReviewController } from './Review.controller';

const router = Router();

// Define routes
router.get('/', ReviewController.getAll);

export default router;
