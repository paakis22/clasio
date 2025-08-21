import express from 'express';
import {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
getMyProfile,
getTeachersBySubjectId

} from '../controllers/teacherController.js';

import { checkTeacherProfile } from '../controllers/teacherController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

import multer from 'multer';
import { storage } from '../middleware/cloudinaryUpload.js'; // ✅ Make sure the filename is correct
import { checkApprovalStatus } from '../controllers/teacherController.js';
import { getApprovalStatus } from '../controllers/teacherController.js';

const upload = multer({ storage });

const router = express.Router();

// CREATE: Teacher with image and resume

router.post(
  '/',
  protect, // <-- add this here
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
  ]),
  createTeacher
);

//  Get all teachers
router.get('/', getAllTeachers);


// Get single teacher by ID
// router.get('/:id/public',getTeacherById);


// Teacher profile image

//  DELETE: Teacher
router.delete('/:id', deleteTeacher);




router.get('/check-profile', protect, authorizeRoles('teacher'), checkTeacherProfile);

router.get('/check-approval-status', protect, authorizeRoles('teacher'), checkApprovalStatus);
router.get('/approval-status/id', protect, authorizeRoles('teacher'), getApprovalStatus);

router.get('/subject/id/:subjectId', getTeachersBySubjectId);

// router.get('/me', protect, getMyProfile);

// routes/teacherRoutes.js
router.get('/me', protect, getMyProfile);
router.get('/:id', protect,getTeacherById);

router.put('/:id', upload.single('image'), updateTeacher);

export default router;
