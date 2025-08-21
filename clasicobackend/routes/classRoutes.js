import express from 'express';
import multer from 'multer';
import { storage } from '../middleware/cloudinaryUpload.js';

import {
  createClass,
  getAllClasses,
  getClassById,
sendJoinRequest,
  updateClass,
  deleteClass,
   getClassesByTeacherId,getStudentRequests,approveRequest,
  getTeacherJoinRequests,
  updateJoinRequestStatus, 
  getStudentClasses
} from '../controllers/classroomController.js';



import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ storage });

// Create class (teacher only)
router.post(
  '/',
  protect,
  authorizeRoles('teacher'),
  upload.single('image'),
  createClass
);

// Get all classes (teacher, admin, student)
router.get(
  '/',
  protect,
  authorizeRoles('teacher', 'admin', 'student'),
  getAllClasses
);



// Get single class by ID (all roles)
router.get(
  '/:id',
  getClassById
);



// Update class (teacher or admin)
router.put(
  '/:id',
  protect,
  authorizeRoles('teacher', 'admin'),
  upload.single('image'),
  updateClass
);

// Delete class (teacher or admin)
router.delete(
  '/:id',
  protect,
  authorizeRoles('teacher', 'admin'),
  deleteClass
);

  router.get('/teacher/:id/classes', getClassesByTeacherId);

router.post('/send', protect, sendJoinRequest);
router.get('/student', protect, getStudentRequests);
router.put('/approve/:requestId', protect, approveRequest);
router.get('/teacher', protect, getTeacherJoinRequests);

router.patch('/:id/status', protect, authorizeRoles('teacher'), updateJoinRequestStatus);
router.get('/student/classes', protect, getStudentClasses);




export default router;
