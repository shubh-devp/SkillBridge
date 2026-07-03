const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema(
  {
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Test',
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    answers: [
      {
        questionIndex: Number,
        selectedOption: Number,
        isCorrect: Boolean,
        marksObtained: Number,
      },
    ],
    totalMarksObtained: {
      type: Number,
      default: 0,
    },
    percentage: {
      type: Number,
      default: 0,
    },
    isPassed: {
      type: Boolean,
      default: false,
    },
    timeTaken: {
      type: Number,
      comment: 'Time taken in minutes',
    },
    attemptNumber: {
      type: Number,
      default: 1,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

testResultSchema.index({ test: 1, student: 1 });

module.exports = mongoose.model('TestResult', testResultSchema);
