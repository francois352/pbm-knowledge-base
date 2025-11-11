/**
 * HRV Routes
 */

import { Router } from 'express';
import { HRVController } from '../controllers/hrv.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const hrvController = new HRVController();

// All HRV routes require authentication
router.use(authenticate);

router.get('/sessions', hrvController.getSessions);
router.post('/sessions', hrvController.createSession);
router.get('/stats', hrvController.getStats);
router.get('/sessions/:id', hrvController.getSessionById);

export default router;
