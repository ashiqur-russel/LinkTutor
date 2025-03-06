import { Router } from 'express';
import { UserController } from './User.controller';

const router = Router();

// Define routes
router.get('/', UserController.getAll);

export default router;
