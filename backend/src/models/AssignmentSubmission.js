const mongoose = require('mongoose');

const assignmentSubmissionSchema = new mongoose.Schema(
  {
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment',
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
    },
    attachments: [String],
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['submitted', 'graded', 'resubmitted'],
      default: 'submitted',
    },
    grade: {
      marksObtained: Number,
      feedback: String,
      gradedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      gradedAt: Date,
    },
    isLate: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

assignmentSubmissionSchema.index({ assignment: 1, student: 1 }, { unique: true });

module.exports = mongoose.model('AssignmentSubmission', assignmentSubmissionSchema);
