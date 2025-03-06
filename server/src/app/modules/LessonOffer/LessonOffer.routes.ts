import { Router } from 'express';
import { LessonOfferController } from './LessonOffer.controller';

const router = Router();

// Define routes
router.get('/', LessonOfferController.getAll);

export default router;
