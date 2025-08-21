import Classroom from '../models/Classroom.js';
import mongoose from 'mongoose';



// export const createClass = async (req, res) => {
//   try {
//     const newClass = await Classroom.create({
//       title: req.body.title,
//       module: req.body.module,
//       duration: req.body.duration,
//       fee: req.body.fee,
//       // zoomLink: req.body.zoomLink,
    
//       teacher: req.user.id,  // assuming req.user.id contains teacher's ObjectId
//       image: req.file ? {
//         url: req.file.path,
//         public_id: req.file.filename,
//       } : undefined,
//     });

//     res.status(201).json(newClass);
//   } catch (err) {
//     console.error('Error creating class:', err);
//     res.status(500).json({ error: 'Cannot create class' });
//   }
// };

export const createClass= async (req, res) => {
  try {
    const { title, module, duration, fee } = req.body;
    
    const classroom = new Classroom({
      title,
      module,
      duration,
      fee,
      teacher: req.user.id,  // ✅ This must be set!
      image: req.file ? { url: req.file.path } : undefined,
          zoomLink: req.body.zoomLink,
    });

    await classroom.save();

    res.status(201).json(classroom);
  } catch (err) {
    console.error('❌ Error creating class:', err.message);
    res.status(500).json({ error: 'Failed to create class' });
  }
};




// Get all classes (if teacher, only their classes, else all)
export const getAllClasses = async (req, res) => {
  try {
    let classes;
    if (req.user.role === 'teacher') {
      classes = await Classroom.find({ teacher: req.user.id }).populate('teacher', 'name email');
    } else {
      classes = await Classroom.find().populate('teacher', 'name email');
    }
    res.json(classes);
  } catch (err) {
    console.error('Error fetching classes:', err);
    res.status(500).json({ error: 'Server error' });
  }
};



// Get class by ID with teacher and students populated
// export const getClassById = async (req, res) => {
//   try {
//     const classroom = await Classroom.findById(req.params.id)
//       .populate('teacher', 'name email')
//       .populate('students', 'name email');

//     if (!classroom) return res.status(404).json({ error: 'Class not found' });
//     res.json(classroom);
//   } catch (err) {
//     console.error('Error fetching class:', err);
//     res.status(500).json({ error: 'Error fetching class' });
//   }
// };
export const getClassById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid class ID' });
  }

  try {
    const classroom = await Classroom.findById(id)
      .populate('teacher', 'name email')
      .populate('students', 'name email');

    if (!classroom) return res.status(404).json({ error: 'Class not found' });
    res.json(classroom);
  } catch (err) {
    console.error('Error fetching class:', err);
    res.status(500).json({ error: 'Error fetching class' });
  }
};

// Student join a class
// controllers/joinRequestController.js

export const sendJoinRequest = async (req, res) => {
  const { teacherId, subjectId } = req.body;

  try {
    const existing = await JoinRequest.findOne({
      student: req.user.id,
      teacher: teacherId,
      subject: subjectId
    });

    if (existing) {
      return res.status(400).json({ message: 'Request already sent.' });
    }

    const request = new JoinRequest({
      student: req.user.id,
      teacher: teacherId,
      subject: subjectId,
    });

    await request.save();

    res.status(201).json({ message: 'Join request sent.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send request.' });
  }
};


// Update class (only teacher of the class or admin)
export const updateClass = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) return res.status(404).json({ error: 'Class not found' });

    if (req.user.role !== 'admin' && classroom.teacher.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    classroom.title = req.body.title || classroom.title;
    classroom.module = req.body.module || classroom.module;
    classroom.duration = req.body.duration || classroom.duration;
    classroom.fee = req.body.fee || classroom.fee;
    classroom.zoomLink = req.body.zoomLink || classroom.zoomLink;

    if (req.file) {
      classroom.image = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    await classroom.save();
    res.json({ message: 'Class updated', classroom });
  } catch (err) {
    console.error('Update class error:', err);
    res.status(500).json({ error: 'Update failed' });
  }
};



// Delete class (only teacher of the class or admin)
export const deleteClass = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) return res.status(404).json({ error: 'Class not found' });

    if (req.user.role !== 'admin' && classroom.teacher.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await classroom.deleteOne();
    res.json({ message: 'Class deleted' });
  } catch (err) {
    console.error('Delete class error:', err);
    res.status(500).json({ error: 'Delete failed' });
  }
};



export const getClassesByTeacherId = async (req, res) => {
  try {
         
     console.log("✅ API hit: /teacher/:id/classes");
    console.log("Teacher ID:", req.params.id);

    const teacherId = req.params.id;
    const classes = await Classroom.find({ teacher: teacherId }).populate('teacher', 'name email');

    res.json(classes);
  } catch (err) {
    console.error('Error fetching teacher classes:', err.message);
    res.status(500).json({ error: 'Error fetching teacher classes' });
  }
};




  export const getStudentRequests = async (req, res) => {
  try {
    const requests = await JoinRequest.find()
      .populate('student', 'name email') // Adjust fields as needed
      .populate('teacher', 'name email')
      .populate('subject', 'title');

    res.status(200).json(requests);
  } catch (err) {
    console.error('Error fetching join requests:', err);
    res.status(500).json({ error: 'Error fetching join requests.' });
  }
};

export const getTeacherJoinRequests = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const requests = await JoinRequest.find({ teacher: teacherId })
      .populate('student', 'name email gender')
      .populate('subject', 'title');

    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch join requests' });
  }
}; 




// PATCH: /api/join-requests/:id/status
export const updateJoinRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value.' });
  }

  try {
    const joinRequest = await JoinRequest.findById(id);

    if (!joinRequest) {
      return res.status(404).json({ error: 'Join request not found.' });
    }

    // Optional: ensure teacher can only update their own requests
    if (joinRequest.teacher.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this request.' });
    }

    joinRequest.status = status;
    await joinRequest.save();

    res.status(200).json({ message: 'Status updated successfully.', joinRequest });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update join request status.' });
  }
};







export const approveRequest = async (req, res) => {
  const { requestId } = req.params;

  try {
    const request = await JoinRequest.findById(requestId);

    if (!request) return res.status(404).json({ error: 'Request not found' });

    request.status = 'accepted';
    await request.save();

    res.status(200).json({ message: 'Request approved' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to approve request' });
  }
};
export const getStudentClasses = async (req, res) => {
  try {
    const studentId = req.user.id;

    const classes = await Classroom.find({ students: studentId })
      .populate('teacher', 'name email')
      .populate('subject', 'title');

    res.json(classes);
  } catch (err) {
    console.error('Error fetching student classes:', err);
    res.status(500).json({ error: 'Error fetching student classes' });
  }
};


