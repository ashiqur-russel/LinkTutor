import { Router } from 'express';
import { LessonRequestController } from './LessonRequest.controller';

const router = Router();

// Define routes
router.get('/', LessonRequestController.getAll);

export default router;
