const mongoose = require('mongoose');

const testSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Test title is required'],
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
    type: {
      type: String,
      enum: ['mock', 'weekly', 'chapter', 'full_syllabus'],
      default: 'mock',
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
      comment: 'Duration in minutes',
    },
    totalMarks: {
      type: Number,
      required: [true, 'Total marks is required'],
    },
    passingMarks: {
      type: Number,
      required: [true, 'Passing marks is required'],
    },
    questions: [
      {
        question: { type: String, required: true },
        options: [String],
        correctAnswer: { type: Number, required: true, comment: 'Index of correct option' },
        marks: { type: Number, default: 1 },
        negativeMarks: { type: Number, default: 0.25 },
        explanation: String,
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },
    scheduledDate: Date,
    deadlineDate: Date,
    attemptsAllowed: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

testSchema.index({ course: 1, type: 1 });

module.exports = mongoose.model('Test', testSchema);
