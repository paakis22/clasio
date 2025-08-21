import express from 'express';
import { getTeacherJoinRequests,createJoinRequest,getStudentJoinRequests} from '../controllers/joinRequestController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { updateJoinRequestStatus } from '../controllers/joinRequestController.js';


const router = express.Router();

// GET /api/join-requests/teacher
router.post('/', protect, createJoinRequest);
router.get('/student/requests', protect, getStudentJoinRequests);

router.get('/teacher', protect, getTeacherJoinRequests);

router.patch('/:id/status', protect, updateJoinRequestStatus);


export default router;
