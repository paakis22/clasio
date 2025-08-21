import express from 'express';
import {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} from '../controllers/subjectController.js';

import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public
router.get('/', getAllSubjects);
router.get('/:id', getSubjectById);

// Admin-only
router.post('/', protect, isAdmin, createSubject);
router.put('/:id', protect, isAdmin, updateSubject);
router.delete('/:id', protect, isAdmin, deleteSubject);
router.post('/', protect, createSubject);
export default router;
