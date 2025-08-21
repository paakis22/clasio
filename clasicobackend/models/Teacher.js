
import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },

  name: { type: String, required: true },
  email: { type: String, required: true },
  // subject: { type: String },
  bio: { type: String },
  gender: { type: String },
  address: { type: String },
  resume: {
    url: String,
    public_id: String,
  },
  image: {
    url: String,
    public_id: String,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  hasPaid: { type: Boolean, default: true }, // ✅ track payment status
  approvalEmailSent: {
    type: Boolean,
    default: false,
  },
  //  fee: {
  //   type: Number,
  //   required: true,
  //   default: 2000, // LKR or any value
  // }

}, { timestamps: true });

export default mongoose.model('Teacher', teacherSchema);
