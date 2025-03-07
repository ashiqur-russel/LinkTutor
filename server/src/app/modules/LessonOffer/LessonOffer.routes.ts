import { Router } from 'express';
import { lessonOfferController } from './lessonOffer.controller';

const router = Router();

// Define routes
router.get('/', lessonOfferController.getAll);

export default router;
