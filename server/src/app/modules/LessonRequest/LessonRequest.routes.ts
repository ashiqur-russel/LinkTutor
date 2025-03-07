import { Router } from 'express';
import { lessonRequestController } from './lessonRequest.controller';

const router = Router();

// Define routes
router.get('/', lessonRequestController.getAll);

export default router;
