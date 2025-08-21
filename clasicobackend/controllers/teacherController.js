import mongoose from 'mongoose';

import Teacher from '../models/Teacher.js';

// controllers/teacherController.js

export const createTeacher = async (req, res) => {
  try {
    const userId = req.user?.id;
    const email = req.user?.email; // ✅ extract from token/session
    const { name, bio, gender, address, subject } = req.body;

    if (!userId || !email) {
      return res.status(401).json({ error: 'Unauthorized: Missing user info' });
    }

    const existing = await Teacher.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const subjectId = new mongoose.Types.ObjectId(subject);

    const newTeacher = await Teacher.create({
      userId,
      name,
      email, // ✅ use authenticated email
      subject: subjectId,
      bio,
      gender,
      address,
      resume: {
        url: req.files?.resume?.[0]?.path || '',
        public_id: req.files?.resume?.[0]?.filename || ''
      },
      image: {
        url: req.files?.image?.[0]?.path || '',
        public_id: req.files?.image?.[0]?.filename || ''
      },
    });

    res.status(201).json({ message: 'Profile submitted. Awaiting admin approval.', teacher: newTeacher });
  } catch (err) {
    console.error("Teacher Creation Error:", err.message);
    res.status(500).json({ error: 'Cannot create teacher', detail: err.message });
  }
};




// Get All
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching teachers' });
  }
};



// Get By ID
export const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching teacher' });
  }
};

// Update
export const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' });

    const { name, email, bio } = req.body;
    if (req.file) teacher.avatar = req.file.path;

    teacher.name = name || teacher.name;
    teacher.email = email || teacher.email;
    teacher.bio = bio || teacher.bio;

    await teacher.save();
    res.json({ message: 'Updated', teacher });
  } catch (err) {
    res.status(500).json({ error: 'Error updating teacher' });
  }
};

// Delete
export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting teacher' });
  }
};




export const checkTeacherProfile = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ userId: req.user.id });

    if (!teacher) {
      return res.json({ hasProfile: false });
    }

    return res.json({
      hasProfile: true,
      hasPaid: teacher.hasPaid
    });
  } catch (err) {
    console.error('Profile check error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};



export const checkApprovalStatus = async (req, res) => {
  try {
    console.log('🧠 req.user:', req.user); // Check if this has .id
    const teacher = await Teacher.findOne({ userId: req.user.id });

    if (!teacher) {
      console.log('🚫 Teacher not found for userId:', req.user.id);
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.json({
      status: teacher.status,
      hasPaid: teacher.hasPaid || false,
    });
  } catch (err) {
    console.error('❌ Backend error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};





// controllers/teacherController.js
export const getApprovalStatus = async (req, res) => {
  try {
    const userId = req.user.id;

    const teacher = await Teacher.findOne({ userId });

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.json({
      status: teacher.status,
      hasPaid: teacher.hasPaid || false,
    });
  } catch (err) {
    console.error('❌ Error fetching teacher:', err.message);
    res.status(500).json({ error: 'Error fetching teacher' });
  }
};





// export const getOwnTeacherProfile = async (req, res) => {
//   try {
//     const teacher = await Teacher.findOne({ user: req.user.id });
//     if (!teacher) return res.status(404).json({ error: "Profile not found" });

//     res.json(teacher);
//   } catch (err) {
//     res.status(500).json({ error: "Server Error" });
//   }
// };



export const getOwnTeacherProfile = async (req, res) => {
  try {
    console.log("🧪 req.user:", req.user); // Add this for debugging
const teacher = await Teacher.findOne({ userId: req.user.id });
    if (!teacher) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(teacher);
  } catch (err) {
    console.error("❌ Error in getOwnTeacherProfile:", err.message);
    res.status(500).json({ error: "Error fetching teacher" });
  }
};

// controllers/teacherController.js


export const getTeachersBySubjectId = async (req, res) => {
  const { subjectId } = req.params;

  try {
    const teachers = await Teacher.find({
      subject: subjectId,
      status: 'approved',
      hasPaid: false,
    }).populate('subject', 'title') // Optional: populate subject title
      .select('-__v');

    res.json(teachers);
  } catch (err) {
    console.error('Error fetching teachers by subject ID:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// controllers/teacherController.js
export const getMyProfile = async (req, res) => {
  try {
    const profile = await Teacher.findOne({ userId: req.user.id }).populate('subject');
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};





