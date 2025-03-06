import { Router } from 'express';
import { AuthController } from './Auth.controller';

const router = Router();

// Define routes
router.get('/', AuthController.getAll);

export default router;
