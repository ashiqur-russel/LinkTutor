import { Router } from 'express';
import { AdminController } from './Admin.controller';

const router = Router();

// Define routes
router.get('/', AdminController.getAll);

export default router;
