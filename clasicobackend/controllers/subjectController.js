import Subject from '../models/subject.js';


export const createSubject = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    const subject = new Subject({ name, description, image });
    await subject.save();

    res.status(201).json(subject);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create subject', details: err.message });
  }
};

// Get all subjects
export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subjects' });
  }
};

// Get subject by ID
export const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) return res.status(404).json({ error: 'Subject not found' });
    res.json(subject);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subject' });
  }
};

// Update subject
export const updateSubject = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      { name, description, image },
      { new: true }
    );
    if (!subject) return res.status(404).json({ error: 'Subject not found' });
    res.json(subject);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update subject' });
  }
};

// Delete subject
export const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) return res.status(404).json({ error: 'Subject not found' });
    res.json({ message: 'Subject deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete subject' });
  }
};




// export const createSubject = async (req, res) => {
//   try {
//     const { name, description } = req.body;

//     const newSubject = new Subject({
//       name,
//       description,
//       teacher: req.user.id, // make sure `req.user` exists
//     });

//     await newSubject.save();

//     res.status(201).json({ message: 'Subject created successfully', subject: newSubject });
//   } catch (err) {
//     console.error('❌ Subject creation failed:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };