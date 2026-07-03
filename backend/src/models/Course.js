const mongoose = require('mongoose');
const slugify = require('slugify');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
      minlength: [5, 'Title must be at least 5 characters'],
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      short: {
        type: String,
        required: [true, 'Short description is required'],
        maxlength: [300, 'Short description cannot exceed 300 characters'],
      },
      full: {
        type: String,
        required: [true, 'Full description is required'],
      },
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'JEE Advanced',
        'JEE Main',
        'NEET',
        'CBSE',
        'ICSE',
        'State Board',
        'Programming',
        'Competitive Exams',
        'Skill Development',
        'Other',
      ],
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'],
      default: 'Beginner',
    },
    thumbnail: {
      type: String,
      default: '',
    },
    price: {
      amount: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative'],
      },
      currency: {
        type: String,
        default: 'INR',
        enum: ['INR'],
      },
      discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
    },
    duration: {
      totalHours: { type: Number, default: 0 },
      totalLectures: { type: Number, default: 0 },
      totalWeeks: { type: Number, default: 0 },
    },
    syllabus: [
      {
        week: Number,
        title: String,
        topics: [String],
      },
    ],
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Teacher is required'],
    },
    rating: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0 },
    },
    enrolledCount: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    tags: [String],
    prerequisites: [String],
    whatYouWillLearn: [String],
    language: {
      type: String,
      default: 'Hindi',
      enum: ['Hindi', 'English', 'Hinglish', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Bengali'],
    },
    mode: {
      type: String,
      enum: ['Live Online', 'Recorded', 'Hybrid', 'Classroom'],
      default: 'Live Online',
    },
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Batch',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

courseSchema.index({ category: 1, isPublished: 1 });
courseSchema.index({ 'price.amount': 1 });
courseSchema.index({ tags: 1 });
courseSchema.index({ 'rating.average': -1 });

courseSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

courseSchema.virtual('discountedPrice').get(function () {
  return this.price.amount - (this.price.amount * this.price.discount) / 100;
});

module.exports = mongoose.model('Course', courseSchema);
