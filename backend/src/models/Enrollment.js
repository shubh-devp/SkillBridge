const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled', 'expired'],
      default: 'active',
    },
    progress: {
      completedLectures: { type: Number, default: 0 },
      totalLectures: { type: Number, default: 0 },
      percentage: { type: Number, default: 0, min: 0, max: 100 },
      lastAccessed: Date,
    },
    paymentInfo: {
      razorpayOrderId: String,
      razorpayPaymentId: String,
      amount: Number,
      currency: { type: String, default: 'INR' },
      status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending',
      },
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
    completionDate: Date,
    certificateIssued: {
      type: Boolean,
      default: false,
    },
    certificateUrl: String,
  },
  {
    timestamps: true,
  }
);

enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });
enrollmentSchema.index({ status: 1 });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
