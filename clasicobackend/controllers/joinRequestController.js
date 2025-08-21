import JoinRequest from '../models/joinRequest.js';

// @desc Get all join requests for the logged-in teacher
// @route GET /api/join-requests/teacher
// @access Private (Teacher)
export const getTeacherJoinRequests = async (req, res) => {
  try {
    const teacherId = req.user.id; // Auth middleware must populate req.user

    const requests = await JoinRequest.find({ teacher: teacherId })
      .populate('student', 'name email gender')
      .populate('subject', 'title')
  .lean();

    res.status(200).json(requests);
  } catch (err) {
    console.error('❌ Error fetching teacher join requests:', err);
    res.status(500).json({ message: 'Server error while fetching join requests' });
  }
};

export const createJoinRequest = async (req, res) => {
  try {
    const { teacherId, subjectId } = req.body;
    const studentId = req.user.id; // from protect middleware

    // Check if join request already exists (optional)
    const existing = await JoinRequest.findOne({ student: studentId, teacher: teacherId, subject: subjectId });
    if (existing) {
      return res.status(400).json({ message: 'Join request already sent' });
    }

    const joinRequest = new JoinRequest({
      student: studentId,
      teacher: teacherId,
      subject: subjectId,
      status: 'pending',
    });

    await joinRequest.save();

    res.status(201).json({ message: 'Join request created', joinRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





export const updateJoinRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const joinRequest = await JoinRequest.findById(id);
    if (!joinRequest) {
      return res.status(404).json({ message: 'Join request not found' });
    }

    joinRequest.status = status;
    await joinRequest.save();

    res.json({ message: `Request ${status} successfully` });
  } catch (error) {
    console.error('❌ Error updating join request:', error);
    res.status(500).json({ message: 'Failed to update status' });
  }
};

export const getStudentJoinRequests = async (req, res) => {
  try {
    const requests = await JoinRequest.find({ student: req.user.id })
      .populate('teacher', 'name')
      .populate('subject', 'title');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch join requests' });
  }
};
