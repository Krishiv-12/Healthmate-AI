import express from 'express';
import { getStats } from '../controllers/adminController.js';
import { authMiddleware, roleMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get(
  '/stats',
  authMiddleware,
  roleMiddleware(['admin']),
  getStats
);

export default router;
