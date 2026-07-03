const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Batch name is required'],
      trim: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    schedule: [
      {
        day: {
          type: String,
          enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        },
        startTime: String,
        endTime: String,
      },
    ],
    maxStudents: {
      type: Number,
      default: 50,
    },
    enrolledCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming',
    },
    mode: {
      type: String,
      enum: ['Live Online', 'Classroom', 'Hybrid'],
      default: 'Live Online',
    },
    platform: String,
    meetingLink: String,
    fee: {
      amount: Number,
      currency: { type: String, default: 'INR' },
    },
  },
  {
    timestamps: true,
  }
);

batchSchema.index({ course: 1, status: 1 });
batchSchema.index({ startDate: 1 });

module.exports = mongoose.model('Batch', batchSchema);
