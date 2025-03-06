import { Router } from 'express';
import { TutorController } from './Tutor.controller';

const router = Router();

// Define routes
router.get('/', TutorController.getAll);

export default router;
