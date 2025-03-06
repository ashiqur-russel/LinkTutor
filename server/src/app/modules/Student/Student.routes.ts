import { Router } from 'express';
import { StudentController } from './Student.controller';

const router = Router();

// Define routes
router.get('/', StudentController.getAll);

export default router;
