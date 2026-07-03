const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    enrollment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Enrollment',
      required: true,
    },
    certificateId: {
      type: String,
      unique: true,
      required: true,
    },
    issueDate: {
      type: Date,
      default: Date.now,
    },
    grade: {
      type: String,
      enum: ['A+', 'A', 'B+', 'B', 'C'],
    },
    percentage: {
      type: Number,
    },
    certificateUrl: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

certificateSchema.index({ student: 1 });

module.exports = mongoose.model('Certificate', certificateSchema);
