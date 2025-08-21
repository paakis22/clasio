import mongoose from 'mongoose';

const classroomSchema = new mongoose.Schema({
  title: String,
  module: String,
  duration: String,
  
  zoomLink: String,
  fee: {
  type: Number,
  required: true,
},
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',  // Use exact model name with correct casing
    required: true,
  },
  image: {
    url: String,
    public_id: String,
  },

  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  }],
}, { timestamps: true });

export default mongoose.model('Classroom', classroomSchema);



// models/JoinRequest.js
// import mongoose from 'mongoose';

// const joinRequestSchema = new mongoose.Schema({
//   student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
//   teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
//   subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
//   role: { type: String }, // should be 'student'

//   status: {
//     type: String,
//     enum: ['pending', 'accepted', 'rejected'],
//     default: 'pending',
//   }
// }, { timestamps: true });

// export default mongoose.model('JoinRequest', joinRequestSchema);


