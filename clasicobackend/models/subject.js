import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String, // Cloudinary or URL
    },
  },
  { timestamps: true }
);

export default mongoose.model('Subject', subjectSchema);
